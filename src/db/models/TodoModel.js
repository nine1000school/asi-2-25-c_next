import { todoSchema } from "@/db/schemas/todoSchema"
import mongoose from "mongoose"

export const TodoModel =
  mongoose.models.Todo || mongoose.model("Todo", todoSchema)
