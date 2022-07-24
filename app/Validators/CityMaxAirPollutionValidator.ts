import { schema, CustomMessages } from '@ioc:Adonis/Core/Validator'
import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import { dateFormat } from './Schemas'

export default class CityMaxAirPollutionValidator {
  constructor(protected ctx: HttpContextContract) { }

  public schema = schema.create({
    from: schema.date({ format: dateFormat }),
    to: schema.date({ format: dateFormat })
  })

  public messages: CustomMessages = {}
}
