#!/usr/bin/env node

import chalk from "chalk"
import { readDatabase } from "./src/db/readDatabase.js"
import { writeDatabase } from "./src/db/writeDatabase.js"

const getTodoByRawId = async (rawId) => {
  const id = Number.parseInt(rawId, 10)
  const db = await readDatabase()
  const {
    todos: { [id]: todo, ...otherTodos },
  } = db

  if (!todo) {
    // eslint-disable-next-line no-console
    console.error("Error: no such id")
    process.exit(1)
  }

  return {
    db,
    id,
    todo,
    otherTodos,
  }
}
const printTodo = ({ id, description, isDone }) => {
  const formatDone = isDone ? chalk.strikethrough : (x) => x

  // eslint-disable-next-line no-console
  console.log(
    formatDone(`${chalk.bgBlue(` ${id} `.padStart(5, " "))} ${description}`),
  )
}
const commands = {
  add: async (rawDescription) => {
    const description = rawDescription.trim()

    if (!description) {
      // eslint-disable-next-line no-console
      console.error("Error: missing description")
      process.exit(1)
    }

    const db = await readDatabase()
    const lastId = db.lastId + 1
    const newTodo = {
      id: lastId,
      description,
      isDone: false,
    }

    await writeDatabase({
      ...db,
      lastId,
      todos: {
        ...db.todos,
        [lastId]: newTodo,
      },
    })

    printTodo(newTodo)
  },
  toggle: async (rawId) => {
    const { id, todo, otherTodos, db } = await getTodoByRawId(rawId)
    const updatedTodo = {
      ...todo,
      isDone: !todo.isDone,
    }

    await writeDatabase({
      ...db,
      todos: {
        ...otherTodos,
        [id]: updatedTodo,
      },
    })

    printTodo(updatedTodo)
  },
  delete: async (rawId) => {
    const { todo, otherTodos, db } = await getTodoByRawId(rawId)

    await writeDatabase({
      ...db,
      todos: otherTodos,
    })

    printTodo(todo)
  },
  list: async () => {
    const { todos } = await readDatabase()

    Object.values(todos).forEach(printTodo)
  },
}
// Run
const [commandName, ...args] = process.argv.slice(2)
const command = commands[commandName]

if (!command) {
  // eslint-disable-next-line no-console
  console.error(`Error: no such command "${commandName}"`)
  process.exit(1)
}

command(...args)
