import { readDatabase } from "@/db/readDatabase"
import { writeDatabase } from "@/db/writeDatabase"

const handle = async (req, res) => {
  const todoIndex = Number.parseInt(req.query.todoIndex, 10)
  const todos = await readDatabase()

  if (!todos[todoIndex]) {
    res.status(404).send({ error: "Not found" })

    return
  }

  const todo = todos[todoIndex]

  // Read => GET (item)
  if (req.method === "GET") {
    res.send({
      index: todoIndex,
      description: todo,
    })
  }

  // Update => PATCH
  if (req.method === "PATCH") {
    const { description } = req.body
    const newTodos = todos.with(todoIndex, description)

    await writeDatabase(newTodos)

    res.send({
      index: todoIndex,
      description,
    })

    return
  }

  // Delete => DELETE
  if (req.method === "DELETE") {
    const newTodos = todos.filter((_, index) => index !== todoIndex)

    await writeDatabase(newTodos)

    res.send({
      index: todoIndex,
      description: todo,
    })

    return
  }

  res.status(404).send({ error: "Not found" })
}

export default handle
