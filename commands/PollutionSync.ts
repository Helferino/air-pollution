import { args, BaseCommand } from '@adonisjs/core/build/standalone'
import City from 'App/Models/City';
import { getCities, getPollution } from 'App/Services/Openweather';
import { DateTime } from 'luxon';
import Pollution from 'App/Models/Pollution';
import { validator } from '@ioc:Adonis/Core/Validator'
import { pollutionRequestSchema } from 'App/Validators/Schemas';

export default class PollutionSync extends BaseCommand {

  public static commandName = 'pollution:sync'
  public static description = 'Sync data from api'

  public static settings = {
    loadApp: true,
    stayAlive: false
  }

  @args.string()
  public city: string

  @args.string({
    description: 'Date must be in YYYY-MM-DD format'
  })
  public from: string

  @args.string({
    required: false,
    description: 'Date must be in YYYY-MM-DD format'
  })
  public to: string

  public async run() {

    try {
      const { city: name, from, to } = await validator.validate({
        schema: pollutionRequestSchema,
        data: { city: this.city, from: this.from, to: this.to }
      })

      // Fetch city
      const citiesRes = await getCities(name)

      if (!citiesRes?.length) {
        this.logger.error(`City "${this.city}" not found`)
        return
      }

      const cityData = citiesRes[0]
      const lat = cityData.lat
      const lon = cityData.lon

      // Fetch data
      const pollutionData = (await getPollution(lat, lon, from, to))?.list

      // Find or create city in database
      const city = await City.firstOrCreate({ name: cityData.name }, { name: cityData.name, lat, lon })

      // Create pollution
      if (pollutionData) {
        for (const item of pollutionData) {
          const { co, no, no2, o3, so2, pm2_5, pm10, nh3 } = item.components
          const date = DateTime.fromSeconds(item.dt)
          const date_formatted = parseInt(date.toFormat('yyyyMMddHH'))

          // Create new data entry or update already existing one
          await Pollution.updateOrCreate(
            { cityId: city.id, date_formatted },
            { aqi: item.main.aqi, co, no, no2, o3, so2, pm2_5, pm10, nh3, date }
          )
        };
      }

      this.logger.success(`Synced ${pollutionData.length} data entires for city "${city.name}"`)
    } catch (e) {
      this.logger.error(e)
    }
  }
}
