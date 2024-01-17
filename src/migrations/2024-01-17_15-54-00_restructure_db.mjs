import { readFile, writeFile } from "node:fs/promises"
import { basename } from "node:path"

const DB_PATH = "./db.json"
const migrationName = basename(import.meta.url)
const run = async () => {
  const json = await readFile(DB_PATH, { encoding: "utf-8" })
  const todos = JSON.parse(json)

  if (todos.migrations?.includes(migrationName)) {
    // eslint-disable-next-line no-console
    console.log("Migration already done.")
    process.exit(0)
  }

  const data = {
    lastId: todos.length,
    todos: todos.map((description, index) => ({
      id: index + 1,
      description,
      isDone: false,
    })),
    migrations: [migrationName],
  }

  await writeFile(DB_PATH, JSON.stringify(data), { encoding: "utf-8" })

  // eslint-disable-next-line no-console
  console.log("Migration done!")
  process.exit(0)
}

run()
