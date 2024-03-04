import { Schema } from "mongoose"

export const todoSchema = new Schema({
  description: {
    type: String,
    required: true,
  },
  isDone: {
    type: Boolean,
    default: false,
  },
})
