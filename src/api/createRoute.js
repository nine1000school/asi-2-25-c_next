import mongoose from "mongoose"

export const createRoute = (handle) => async (req, res) => {
  await mongoose.connect(process.env.DB_URL)

  try {
    await handle(req, res)
  } finally {
    await mongoose.disconnect()
  }
}
