import { Button } from "@/components/Button"
import { Form } from "@/components/Form"
import { FormField } from "@/components/FormField"
import { Title } from "@/components/Title"
import { readDatabase } from "@/db/readDatabase"
import axios from "axios"
import { Formik } from "formik"
import { useRouter } from "next/router"
import * as yup from "yup"

export const getServerSideProps = async ({ params: { todoIndex } }) => {
  const todos = await readDatabase()
  const todo = todos[todoIndex] || null

  return {
    props: {
      index: todoIndex,
      todo,
    },
  }
}
const validationSchema = yup.object({
  description: yup.string().min(1).required().label("Description"),
})
const TodoEditPage = ({ todo, index }) => {
  const router = useRouter()
  const initialValues = {
    description: todo,
  }
  const handleSubmit = async ({ description }) => {
    await axios.patch(`/api/todos/${index}`, { description })

    router.push("/todos")
  }

  if (!todo) {
    return "404 - Not found"
  }

  return (
    <>
      <Title>Editing todo #{index}</Title>
      <Formik
        onSubmit={handleSubmit}
        initialValues={initialValues}
        validationSchema={validationSchema}
      >
        <Form>
          <FormField name="description" placeholder="Enter a description" />
          <Button type="submit">SUBMIT</Button>
        </Form>
      </Formik>
    </>
  )
}

export default TodoEditPage
