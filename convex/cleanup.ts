import { mutation } from "./_generated/server";
import { v } from "convex/values";

/**
 * Delete old completed tasks to keep the database lean.
 * Keeps the most recent N tasks and deletes older "done" tasks.
 */
export const archiveOldTasks = mutation({
  args: {
    keepRecent: v.optional(v.number()), // How many recent tasks to keep (default: 50)
  },
  handler: async (ctx, args) => {
    const keepRecent = args.keepRecent ?? 50;
    
    // Get all done tasks, ordered by creation time (oldest first)
    const doneTasks = await ctx.db
      .query("tasks")
      .filter((q) => q.eq(q.field("status"), "done"))
      .order("asc")
      .collect();
    
    // Calculate how many to delete
    const toDelete = doneTasks.length > keepRecent 
      ? doneTasks.slice(0, doneTasks.length - keepRecent)
      : [];
    
    let deleted = 0;
    for (const task of toDelete) {
      // Delete associated messages first
      const messages = await ctx.db
        .query("messages")
        .filter((q) => q.eq(q.field("taskId"), task._id))
        .collect();
      
      for (const msg of messages) {
        await ctx.db.delete(msg._id);
      }
      
      // Delete associated activities
      const activities = await ctx.db
        .query("activities")
        .filter((q) => q.eq(q.field("targetId"), task._id))
        .collect();
      
      for (const act of activities) {
        await ctx.db.delete(act._id);
      }
      
      // Delete the task
      await ctx.db.delete(task._id);
      deleted++;
    }
    
    return { 
      deleted, 
      remaining: doneTasks.length - deleted,
      total: doneTasks.length 
    };
  },
});

/**
 * Delete auto-generated "Agent task" tasks in batches
 * Run multiple times until deleted=0
 */
export const deleteAgentTasks = mutation({
  args: {
    batchSize: v.optional(v.number()),
  },
  handler: async (ctx, args) => {
    const batchSize = args.batchSize ?? 10;
    
    // Find tasks that start with "Agent task" (auto-generated) - limited batch
    const allTasks = await ctx.db.query("tasks").order("desc").take(200);
    const agentTasks = allTasks
      .filter(t => 
        t.title.startsWith("Agent task") || 
        t.description?.includes("OpenClaw agent task")
      )
      .slice(0, batchSize);
    
    let deleted = 0;
    for (const task of agentTasks) {
      // Delete associated messages (limit to avoid hitting cap)
      const messages = await ctx.db
        .query("messages")
        .filter((q) => q.eq(q.field("taskId"), task._id))
        .take(100);
      
      for (const msg of messages) {
        await ctx.db.delete(msg._id);
      }
      
      // Delete associated activities
      const activities = await ctx.db
        .query("activities")
        .filter((q) => q.eq(q.field("targetId"), task._id))
        .take(50);
      
      for (const act of activities) {
        await ctx.db.delete(act._id);
      }
      
      // Delete associated documents
      const docs = await ctx.db
        .query("documents")
        .filter((q) => q.eq(q.field("taskId"), task._id))
        .take(20);
      
      for (const doc of docs) {
        await ctx.db.delete(doc._id);
      }
      
      // Delete the task
      await ctx.db.delete(task._id);
      deleted++;
    }
    
    return { deleted, remaining: agentTasks.length - deleted };
  },
});

/**
 * Get stats about the database
 */
export const getStats = mutation({
  args: {},
  handler: async (ctx) => {
    const tasks = await ctx.db.query("tasks").collect();
    const messages = await ctx.db.query("messages").collect();
    const activities = await ctx.db.query("activities").collect();
    
    const tasksByStatus: Record<string, number> = {};
    for (const task of tasks) {
      tasksByStatus[task.status] = (tasksByStatus[task.status] || 0) + 1;
    }
    
    return {
      tasks: tasks.length,
      messages: messages.length,
      activities: activities.length,
      tasksByStatus,
    };
  },
});
