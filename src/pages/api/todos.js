const handle = (req, res) => {
  // Create => POST
  if (req.method === "POST") {
    // CREATE
    res.send("New Todo")

    return
  }
  // Read => GET
  if (req.method === "GET") {
    // READ
    res.send([])

    return
  }

  // Update => PATCH
  // Delete => DELETE

  res.status(404).send({ error: "Not found" })
}

export default handle
