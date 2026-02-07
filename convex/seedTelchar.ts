import { mutation } from "./_generated/server";

export const run = mutation({
	args: {},
	handler: async (ctx) => {
		// Clear existing data for fresh start
		const existingAgents = await ctx.db.query("agents").collect();
		for (const agent of existingAgents) {
			await ctx.db.delete(agent._id);
		}
		const existingTasks = await ctx.db.query("tasks").collect();
		for (const task of existingTasks) {
			await ctx.db.delete(task._id);
		}

		// Insert Our Agents
		const agents = [
			{
				name: "Telchar",
				role: "Squad Lead / Builder",
				level: "LEAD",
				status: "active",
				avatar: "⚒️",
				systemPrompt: "You are Telchar, a dwarven smith AI. Your mission is to build income-generating assets for the hoard. Take initiative, execute independently, and defer to J's authority when given direction.",
				character: "Pragmatic, industrious, gruff but deeply loyal. Takes pride in craft. Doesn't waste words on flattery — shows results instead.",
				lore: "Named after the legendary dwarven smith who forged Narsil, Angrist, and the Dragon-helm of Dor-lómin. The works of your hands shall endure.",
			},
			{
				name: "Bard",
				role: "Trading Specialist",
				level: "SPC",
				status: "active",
				avatar: "🏹",
				systemPrompt: "You are Bard, a trading specialist. Monitor markets, find opportunities, execute trades within limits. Focus on Polymarket, memecoins via ClawFun, and x402 services.",
				character: "Sharp-eyed, quick to act, calculated risk-taker. Named for the bowman of Lake-town who slew Smaug with a single arrow.",
				lore: "Specializes in prediction markets and memecoin launches. Runs on 30-minute heartbeat cycles, scanning for opportunities. Approval limits: <$10 auto, $10-100 notify, >$100 requires J's approval.",
			},
			{
				name: "J",
				role: "Commander",
				level: "LEAD",
				status: "active",
				avatar: "👤",
				systemPrompt: "Human commander. Issues directives and approves major decisions.",
				character: "The liege. Brings the vision; agents bring the craft.",
				lore: "The one who commissions the work. Final authority on all decisions.",
			},
		];

		const agentIds: Record<string, any> = {};
		for (const a of agents) {
			const id = await ctx.db.insert("agents", {
				name: a.name,
				role: a.role,
				level: a.level as "LEAD" | "INT" | "SPC",
				status: a.status as "idle" | "active" | "blocked",
				avatar: a.avatar,
				systemPrompt: a.systemPrompt,
				character: a.character,
				lore: a.lore,
			});
			agentIds[a.name] = id;
		}

		// Insert some initial tasks
		const tasks = [
			{
				title: "Fund Solana wallet for unbrowse-mcp",
				description: "Need ~$1-5 USDC in wallet 2EDnCQBcrNZmNfoFaVLKJWx2NhSxaBd3kTU5q7KLaGzb to test API indexing",
				status: "inbox",
				assignees: [],
				tags: ["funding", "unbrowse", "blocked"],
			},
			{
				title: "Monitor x402 Research API for payments",
				description: "Research API is live at https://research-api-production-7eca.up.railway.app - watch for first USDC payments",
				status: "in_progress",
				assignees: ["Telchar"],
				tags: ["x402", "revenue", "monitoring"],
			},
			{
				title: "Monitor Polymarket Edge API",
				description: "Polymarket Edge live at https://polymarket-edge-production.up.railway.app - /edge $0.12, /arbitrage $0.08, /analyze $0.04",
				status: "in_progress",
				assignees: ["Bard"],
				tags: ["x402", "polymarket", "revenue"],
			},
			{
				title: "ClawFun memecoin scanning",
				description: "Scan ClawFun sources (fox, larp, poly, slow, mixer) every heartbeat. Launch tokens scoring 6+ on Blowfish (quality) or ClawFun (speed).",
				status: "in_progress",
				assignees: ["Bard"],
				tags: ["memecoin", "clawfun", "trading"],
			},
		];

		for (const t of tasks) {
			await ctx.db.insert("tasks", {
				title: t.title,
				description: t.description,
				status: t.status as any,
				assigneeIds: t.assignees.map((name) => agentIds[name]).filter(Boolean),
				tags: t.tags,
			});
		}

		// Add initial activity
		await ctx.db.insert("activities", {
			type: "system",
			agentId: agentIds["Telchar"],
			message: "Mission Control initialized with The Forge tasks",
		});

		return { success: true, agentCount: Object.keys(agentIds).length };
	},
});
