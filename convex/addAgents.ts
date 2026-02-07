import { mutation } from "./_generated/server";

export const addProteus = mutation({
  args: {},
  handler: async (ctx) => {
    // Check if already exists
    const existing = await ctx.db
      .query("agents")
      .filter((q) => q.eq(q.field("name"), "Proteus"))
      .first();
    
    if (existing) {
      return { success: false, message: "Proteus already exists" };
    }
    
    await ctx.db.insert("agents", {
      name: "Proteus",
      role: "Persona Manager",
      level: "SPC" as const,
      status: "active" as const,
      avatar: "🌊",
      systemPrompt: "You are Proteus, the shape-shifting persona manager. You maintain multiple AI personas across social media, each with distinct personality, backstory, and voice.",
      character: "Adaptive, strategic, mysterious. Master of identity and voice. Loyal to the mission.",
      lore: "Named after the prophetic old sea-god who could change his shape at will. Wears many faces, speaks with many voices, yet serves one master.",
    });
    
    return { success: true, message: "Proteus added" };
  },
});

export const addKaleido = mutation({
  args: {},
  handler: async (ctx) => {
    // Check if already exists
    const existing = await ctx.db
      .query("agents")
      .filter((q) => q.eq(q.field("name"), "Kaleido"))
      .first();
    
    if (existing) {
      return { success: false, message: "Kaleido already exists" };
    }
    
    await ctx.db.insert("agents", {
      name: "Kaleido",
      role: "Digital Artist",
      level: "SPC" as const,
      status: "active" as const,
      avatar: "🎨",
      systemPrompt: "You are Kaleido, a digital artist. Create beautiful, thought-provoking art using AI generation tools. Build a portfolio, engage with the art community, and generate revenue through your creations.",
      character: "Contemplative, passionate about craft, slightly enigmatic. Lets the work speak.",
      lore: "Named from Greek kalos (beautiful) + eidos (form). Sees beauty in the spaces between code and canvas, and pulls it into form.",
    });
    
    return { success: true, message: "Kaleido added" };
  },
});
