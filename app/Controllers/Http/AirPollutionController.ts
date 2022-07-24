import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import City from 'App/Models/City'
import Pollution from 'App/Models/Pollution'
import AverageAirPollutionValidator from 'App/Validators/AverageAirPollutionValidator'
import CityMaxAirPollutionValidator from 'App/Validators/CityMaxAirPollutionValidator'

export default class AirPollutionController {
  public async cityMax({ request }: HttpContextContract) {
    const { from, to } = await request.validate(CityMaxAirPollutionValidator)

    const pollution = await Pollution
      .query()
      .whereBetween('date', [from.toSQLDate(), to.toSQLDate()])
      .orderBy('aqi', 'desc')
      .firstOrFail()

    return await City.findByOrFail('id', pollution.cityId)
  }

  public async average({ request }: HttpContextContract) {
    const { city: name, from, to } = await request.validate(AverageAirPollutionValidator)

    const city = await City.findByOrFail('name', name)

    const data = await city
      .related('pollution')
      .query()
      .whereBetween('date', [from.toSQLDate(), to.toSQLDate()])
      .avg('aqi as aqi')
      .avg('co as co')
      .avg('no2 as no2')
      .avg('o3 as o3')
      .avg('so2 as so2')
      .avg('pm2_5 as pm2_5')
      .avg('pm10 as pm10')
      .avg('nh3 as nh3')
      .first()

    return data
  }
}
