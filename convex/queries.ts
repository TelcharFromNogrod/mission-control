import { query } from "./_generated/server";

export const listAgents = query({
    args: {},
    handler: async (ctx) => {
        return await ctx.db.query("agents").collect();
    },
});

export const listTasks = query({
    args: {},
    handler: async (ctx) => {
        return await ctx.db.query("tasks").collect();
    },
});

export const listActivities = query({
    args: {},
    handler: async (ctx) => {
        const activities = await ctx.db.query("activities").order("desc").take(50);

        // Join with agents to get names for the feed
        const enrichedFeed = await Promise.all(
            activities.map(async (activity) => {
                const agent = await ctx.db.get(activity.agentId);
                return {
                    ...activity,
                    agentName: agent?.name ?? "Unknown Agent",
                };
            })
        );

        return enrichedFeed;
    },
});
