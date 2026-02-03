import { mutation } from "./_generated/server";

export const run = mutation({
	args: {},
	handler: async (ctx) => {
		// Clear existing data (optional, but good for idempotent seeding)
		const existingAgents = await ctx.db.query("agents").collect();
		for (const agent of existingAgents) {
			await ctx.db.delete("agents", agent._id);
		}
		const existingTasks = await ctx.db.query("tasks").collect();
		for (const task of existingTasks) {
			await ctx.db.delete("tasks", task._id);
		}

		// Insert Agents
		const agents = [
			{
				name: "Manish",
				role: "Founder",
				level: "LEAD",
				status: "active",
				avatar: "👨",
			},
			{
				name: "Friday",
				role: "Developer Agent",
				level: "INT",
				status: "active",
				avatar: "⚙️",
			},
			{
				name: "Fury",
				role: "Customer Researcher",
				level: "SPC",
				status: "active",
				avatar: "🔬",
			},
			{
				name: "Jarvis",
				role: "Squad Lead",
				level: "LEAD",
				status: "active",
				avatar: "🤖",
			},
			{
				name: "Loki",
				role: "Content Writer",
				level: "SPC",
				status: "active",
				avatar: "✍️",
			},
			{
				name: "Pepper",
				role: "Email Marketing",
				level: "INT",
				status: "active",
				avatar: "📧",
			},
			{
				name: "Quill",
				role: "Social Media",
				level: "INT",
				status: "active",
				avatar: "📱",
			},
			{
				name: "Shuri",
				role: "Product Analyst",
				level: "SPC",
				status: "active",
				avatar: "🔍",
			},
			{
				name: "Vision",
				role: "SEO Analyst",
				level: "SPC",
				status: "active",
				avatar: "🌐",
			},
			{
				name: "Wanda",
				role: "Designer",
				level: "SPC",
				status: "active",
				avatar: "🎨",
			},
			{
				name: "Wong",
				role: "Documentation",
				level: "SPC",
				status: "active",
				avatar: "📄",
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
			});
			agentIds[a.name] = id;
		}

		// Insert Tasks
		const tasks = [
			{
				title: "Explore SiteName Dashboard & Document All Features",
				description:
					"Thoroughly explore the entire SiteName dashboard, documenting all available features and their functionalities.",
				status: "inbox",
				assignees: [],
				tags: ["research", "documentation", "sitename"],
				borderColor: "var(--accent-orange)",
			},
			{
				title: "Product Demo Video Script",
				description:
					"Create full script for SiteName product demo video with...",
				status: "assigned",
				assignees: ["Loki"],
				tags: ["video", "content", "demo"],
				borderColor: "var(--accent-orange)",
			},
			{
				title: "SiteName vs Zendesk AI Comparison",
				description: "Create detailed brief for Zendesk AI comparison page",
				status: "in_progress",
				assignees: [],
				tags: ["competitor", "seo", "comparison"],
				borderColor: "var(--accent-blue)",
			},
			{
				title: "Shopify Blog Landing Page",
				description:
					"Write copy for Shopify integration landing page - how SiteName help...",
				status: "review",
				assignees: [],
				tags: ["copy", "landing-page", "shopify"],
				borderColor: "var(--text-main)",
			},
		];

		for (const t of tasks) {
			await ctx.db.insert("tasks", {
				title: t.title,
				description: t.description,
				status: t.status as any,
				assigneeIds: t.assignees.map((name) => agentIds[name]),
				tags: t.tags,
				borderColor: t.borderColor,
			});
		}

		// Insert initial activities
		await ctx.db.insert("activities", {
			type: "commented",
			agentId: agentIds["Quill"],
			message: 'commented on "Write Customer Case Studies (Brent + Will)"',
		});
		await ctx.db.insert("activities", {
			type: "commented",
			agentId: agentIds["Quill"],
			message: 'commented on "Twitter Content Blitz - 10 Tweets This Week"',
		});
		await ctx.db.insert("activities", {
			type: "commented",
			agentId: agentIds["Friday"],
			message:
				'commented on "Design Expansion Revenue Mechanics (SaaS Cheat Code)"',
		});
	},
});
