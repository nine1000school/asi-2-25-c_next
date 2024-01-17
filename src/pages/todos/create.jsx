import { Button } from "@/components/Button"
import { Form } from "@/components/Form"
import { FormField } from "@/components/FormField"
import { Title } from "@/components/Title"
import axios from "axios"
import { Formik } from "formik"
import * as yup from "yup"

const initialValues = {
  description: "",
}
const validationSchema = yup.object({
  description: yup.string().min(1).required().label("Description"),
})
const TodoCreatePage = () => {
  const handleSubmit = async ({ description }, { resetForm }) => {
    await axios.post("/api/todos", { description })

    resetForm()
  }

  return (
    <>
      <Title>Create Todo</Title>
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

export default TodoCreatePage
