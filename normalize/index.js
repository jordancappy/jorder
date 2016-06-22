import { Schema, arrayOf } from 'normalizr'

const formSchema = new Schema('form', { idAttribute: 'id' })
const pageSchema = new Schema('page', { idAttribute: 'id' })
const questionSchema = new Schema('question', { idAttribute: 'id' })

formSchema.define({
  pages: arrayOf(pageSchema)
})

pageSchema.define({
  questions: arrayOf(questionSchema)
})