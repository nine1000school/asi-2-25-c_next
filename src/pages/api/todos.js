import { readDatabase } from "@/db/readDatabase"
import { writeDatabase } from "@/db/writeDatabase"

const handle = async (req, res) => {
  // Create => POST
  if (req.method === "POST") {
    // CREATE
    const { description: todo } = req.body
    const todos = await readDatabase()
    const newTodos = [...todos, todo]
    const newTodoIndex = await writeDatabase(newTodos)

    res.send({
      index: newTodoIndex,
      description: todo,
    })

    return
  }

  // Read => GET
  if (req.method === "GET") {
    // READ
    const todos = await readDatabase()

    res.send(todos)

    return
  }

  res.status(404).send({ error: "Not found" })
}

export default handle
