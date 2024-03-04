#!/usr/bin/env node

import chalk from "chalk"
import { config } from "dotenv"
import mongoose from "mongoose"
import { TodoModel } from "./src/db/models/TodoModel.js"
// import { readDatabase } from "./src/db/readDatabase.js"
// import { writeDatabase } from "./src/db/writeDatabase.js"

config({ path: ".env.local" })

await mongoose.connect(process.env.DB_URL)

const printTodo = ({ _id, description, isDone }) => {
  const formatDone = isDone ? chalk.strikethrough : (x) => x

  // eslint-disable-next-line no-console
  console.log(
    formatDone(`${chalk.bgBlue(` ${_id} `.padStart(5, " "))} ${description}`),
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

    const newTodo = new TodoModel({
      description,
      isDone: false,
    })

    await newTodo.save()

    printTodo(newTodo)
  },
  toggle: async (id) => {
    try {
      const todo = await TodoModel.findById(id)

      if (!todo) {
        throw new Error("Not found")
      }

      todo.isDone = !todo.isDone

      await todo.save()

      printTodo(todo)
    } catch (err) {
      // eslint-disable-next-line no-console
      console.error(`No such todo (id=${id})`)
      process.exit(1)
    }
  },
  delete: async (id) => {
    try {
      const todo = await TodoModel.findByIdAndDelete(id)

      if (!todo) {
        throw new Error("Not found")
      }

      printTodo(todo)
    } catch (err) {
      // eslint-disable-next-line no-console
      console.error(`No such todo (id=${id})`)
      process.exit(1)
    }
  },
  list: async () => {
    const todos = await TodoModel.find()

    todos.forEach(printTodo)
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

await command(...args)
process.exit(0)
