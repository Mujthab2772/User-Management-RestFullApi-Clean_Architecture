import mongoose, { Schema } from "mongoose";

const auditLogSchema = new Schema({
  action: {
    type: String,
    required: true,
  },
  userId: {
    type: String,
    required: true,
  },
  message: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

export const AuditLog = mongoose.model("AuditLog", auditLogSchema);
