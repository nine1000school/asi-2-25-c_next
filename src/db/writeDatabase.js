import { writeFile } from "node:fs/promises"

export const writeDatabase = async (todos) => {
  const json = JSON.stringify(todos)

  await writeFile("./db.json", json, { encoding: "utf-8" })
}
