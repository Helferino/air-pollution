import { schema } from '@ioc:Adonis/Core/Validator'

export const dateFormat = 'yyyy-MM-dd'

export const pollutionRequestSchema = schema.create({
  city: schema.string(),
  from: schema.date({ format: dateFormat }),
  to: schema.date({ format: dateFormat })
})