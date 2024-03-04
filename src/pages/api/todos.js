import { createRoute } from "@/api/createRoute"
import { TodoModel } from "@/db/models/TodoModel"

const handle = createRoute(async (req, res) => {
  // Create => POST
  if (req.method === "POST") {
    // CREATE
    const { description, isDone = false } = req.body
    const newTodo = new TodoModel({ description, isDone })

    await newTodo.save()
    res.send(newTodo)

    return
  }

  // Read => GET (collection)
  if (req.method === "GET") {
    // READ
    const todos = await TodoModel.find()

    res.send(todos)

    return
  }

  res.status(404).send({ error: "Not found" })
})

export default handle
