import { readFile } from "node:fs/promises"

export const readDatabase = async () => {
  const json = await readFile("./db.json", { encoding: "utf-8" })

  return JSON.parse(json)
}
