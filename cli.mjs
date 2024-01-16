#!/usr/bin/env node
import { readFile, writeFile } from "node:fs/promises"

const readDatabase = async () => {
  const json = await readFile("./db.json", { encoding: "utf-8" })

  return JSON.parse(json)
}
const writeDatabase = async (todos) => {
  const json = JSON.stringify(todos)

  await writeFile("./db.json", json, { encoding: "utf-8" })

  return todos.length - 1
}
const printTodo = (todo, index) => console.log(`[${index}] ${todo}`)
const commands = {
  add: async (description) => {
    const newTodo = description.trim()

    if (!newTodo) {
      console.error("Error: missing description")
      process.exit(1)
    }

    const todos = await readDatabase()
    const newTodos = [...todos, newTodo]
    const newTodoIndex = await writeDatabase(newTodos)

    printTodo(newTodo, newTodoIndex)
  },
  delete: async (rawIndex) => {
    const indexToBeDeleted = Number.parseInt(rawIndex, 10)
    const todos = await readDatabase()

    if (
      (!indexToBeDeleted && indexToBeDeleted !== 0) ||
      !todos[indexToBeDeleted]
    ) {
      console.error("Error: invalid index")
      process.exit(1)
    }

    const newTodos = todos.filter((_, index) => index !== indexToBeDeleted)

    await writeDatabase(newTodos)
  },
  list: async () => {
    const todos = await readDatabase()

    todos.forEach(printTodo)
  },
}
// run
const [commandName, ...args] = process.argv.slice(2)
const command = commands[commandName]

if (!command) {
  console.error(`Error: no such command "${commandName}"`)
  process.exit(1)
}

command(...args)
