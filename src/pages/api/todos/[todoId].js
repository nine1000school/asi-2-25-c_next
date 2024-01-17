import { readDatabase } from "@/db/readDatabase"
import { writeDatabase } from "@/db/writeDatabase"

const handle = async (req, res) => {
  const todoId = Number.parseInt(req.query.todoId, 10)
  const db = await readDatabase()
  const todo = db.todos[todoId]

  if (!todo) {
    res.status(404).send({ error: "Not found" })

    return
  }

  // Read => GET (item)
  if (req.method === "GET") {
    res.send(todo)
  }

  // Update => PATCH
  if (req.method === "PATCH") {
    const { description, isDone } = req.body
    const updatedTodo = {
      ...todo,
      description: description ?? todo.description,
      isDone,
    }
    const newTodos = {
      ...db.todos,
      [todoId]: updatedTodo,
    }

    await writeDatabase({ ...db, todos: newTodos })

    res.send(updatedTodo)

    return
  }

  // Delete => DELETE
  if (req.method === "DELETE") {
    const {
      // eslint-disable-next-line no-unused-vars
      todos: { [todoId]: _, ...todos },
    } = db

    await writeDatabase({
      ...db,
      todos,
    })

    res.send(todo)

    return
  }

  res.status(404).send({ error: "Not found" })
}

export default handle
