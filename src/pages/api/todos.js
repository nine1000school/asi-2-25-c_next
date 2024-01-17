import { readDatabase } from "@/db/readDatabase"
import { writeDatabase } from "@/db/writeDatabase"

const handle = async (req, res) => {
  // Create => POST
  if (req.method === "POST") {
    // CREATE
    const { description, isDone = false } = req.body
    const db = await readDatabase()
    const newTodo = {
      id: db.lastId + 1,
      description,
      isDone,
    }
    const newTodos = {
      ...db.todos,
      [newTodo.id]: newTodo,
    }

    await writeDatabase({
      ...db,
      lastId: newTodo.id,
      todos: newTodos,
    })

    res.send(newTodo)

    return
  }

  // Read => GET (collection)
  if (req.method === "GET") {
    // READ
    const { todos } = await readDatabase()

    res.send(Object.values(todos))

    return
  }

  res.status(404).send({ error: "Not found" })
}

export default handle
