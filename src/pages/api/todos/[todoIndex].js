const handle = (req, res) => {
  const todoIndex = Number.parseInt(req.query.todoIndex, 10)

  // Update => PATCH
  if (req.method === "PATCH") {
    return
  }

  // Delete => DELETE
  if (req.method === "DELETE") {
    return
  }

  res.status(404).send({ error: "Not found" })
}

export default handle
