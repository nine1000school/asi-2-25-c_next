import { readFile, writeFile } from "node:fs/promises"
import { basename } from "node:path"

const DB_PATH = "./db.json"
const migrationName = basename(import.meta.url)
const run = async () => {
  const json = await readFile(DB_PATH, { encoding: "utf-8" })
  const db = JSON.parse(json)

  if (db.migrations.includes(migrationName)) {
    // eslint-disable-next-line no-console
    console.log("Migration already done.")
    process.exit(0)
  }

  const newDatabase = {
    ...db,
    todos: Object.fromEntries(db.todos.map((todo) => [todo.id, todo])),
    migrations: [...db.migrations, migrationName],
  }

  await writeFile(DB_PATH, JSON.stringify(newDatabase), { encoding: "utf-8" })

  // eslint-disable-next-line no-console
  console.log("Migration done!")
  process.exit(0)
}

run()
