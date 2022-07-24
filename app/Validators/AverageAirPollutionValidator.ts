import { CustomMessages } from '@ioc:Adonis/Core/Validator'
import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import { pollutionRequestSchema } from './Schemas'

export default class AverageAirPollutionValidator {
  constructor(protected ctx: HttpContextContract) { }

  public schema = pollutionRequestSchema
  public messages: CustomMessages = {}
}
