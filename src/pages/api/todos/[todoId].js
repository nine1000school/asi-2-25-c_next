import { createRoute } from "@/api/createRoute"
import { TodoModel } from "@/db/models/TodoModel"

const handle = createRoute(async (req, res) => {
  const { todoId } = req.query
  const todo = await TodoModel.findById(todoId)

  if (!todo) {
    res.status(404).send({ error: "Not found" })

    return
  }

  // Read => GET (item)
  if (req.method === "GET") {
    res.send(todo)

    return
  }

  // Update => PATCH
  if (req.method === "PATCH") {
    const { description, isDone } = req.body

    todo.description = description || todo.description
    todo.isDone = isDone ?? todo.isDone

    await todo.save()

    res.send(todo)

    return
  }

  // Delete => DELETE
  if (req.method === "DELETE") {
    await TodoModel.deleteOne({ _id: todoId })

    res.send(todo)

    return
  }

  res.status(404).send({ error: "Not found" })
})

export default handle
