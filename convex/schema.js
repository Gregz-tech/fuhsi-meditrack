import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";

export default defineSchema({
  // Existing Users Table
  users: defineTable({
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
  }),
  
  // 🏥 NEW: Health Records Table
  records: defineTable({
    userId: v.string(),      // Ties the record to the specific user's email/matric
    module: v.string(),      // e.g., "BMI", "Blood Pressure", "Mental Wellness"
    result: v.string(),      // e.g., "22.9" or "120/80"
    category: v.string(),    // e.g., "Normal Weight" or "Elevated"
    timestamp: v.number(),   // For sorting history from newest to oldest
  }),
});