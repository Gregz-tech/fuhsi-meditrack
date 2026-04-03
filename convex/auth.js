import { mutation } from "./_generated/server";
import { v } from "convex/values";

// --- 1. REGISTER USER ---
export const register = mutation({
  args: {
    name: v.string(),
    role: v.string(),
    email: v.string(),
    password: v.string(),
    matric: v.optional(v.string()),
    dept: v.optional(v.string()),
    level: v.optional(v.string()),
    staffId: v.optional(v.string()),
    visitorType: v.optional(v.string()),
    occupation: v.optional(v.string()),
  },
  handler: async (ctx, args) => {
    // Check if user email already exists
    const existingUser = await ctx.db
      .query("users")
      .filter((q) => q.eq(q.field("email"), args.email))
      .first();

    if (existingUser) {
      throw new Error("A user with this email already exists.");
    }

    // Save the new user to the database
    const userId = await ctx.db.insert("users", args);
    return await ctx.db.get(userId);
  },
});

// --- 2. LOGIN USER ---
export const login = mutation({
  args: {
    loginId: v.string(), // This can be Email, Matric Number, or Staff ID
    password: v.string(),
  },
  handler: async (ctx, args) => {
    // Look for the user by matching any of the 3 possible IDs
    const user = await ctx.db
      .query("users")
      .filter((q) => q.or(
        q.eq(q.field("email"), args.loginId),
        q.eq(q.field("matric"), args.loginId),
        q.eq(q.field("staffId"), args.loginId)
      ))
      .first();

    // Verify user exists and password matches
    if (!user || user.password !== args.password) {
      throw new Error("Invalid credentials. Please try again.");
    }

    return user; // Success! Return the user data to the frontend
  },
});