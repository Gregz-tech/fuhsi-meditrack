import { mutation, query } from "./_generated/server";
import { v } from "convex/values";

// 1. SAVE A NEW HEALTH RECORD
export const save = mutation({
  args: {
    userId: v.string(),
    module: v.string(),
    result: v.string(),
    category: v.string(),
  },
  handler: async (ctx, args) => {
    // Insert the record and automatically tag it with the exact current time
    const newRecordId = await ctx.db.insert("records", {
      ...args,
      timestamp: Date.now(),
    });
    return newRecordId;
  },
});

// 2. FETCH RECORDS FOR THE HISTORY PAGE
export const getUserRecords = query({
  args: { userId: v.string() },
  handler: async (ctx, args) => {
    // Find all records belonging to this user and sort them by newest first
    return await ctx.db
      .query("records")
      .filter((q) => q.eq(q.field("userId"), args.userId))
      .order("desc") 
      .collect();
  },
});