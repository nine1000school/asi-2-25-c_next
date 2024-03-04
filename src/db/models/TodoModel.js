import mongoose from "mongoose"
import { todoSchema } from "../schemas/todoSchema.js"

export const TodoModel =
  mongoose.models.Todo || mongoose.model("Todo", todoSchema)
