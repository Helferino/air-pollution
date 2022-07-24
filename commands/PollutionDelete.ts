import { args, BaseCommand } from '@adonisjs/core/build/standalone'
import City from 'App/Models/City'

export default class PollutionDelete extends BaseCommand {

  public static commandName = 'pollution:delete'
  public static description = 'Delete all data entries based on entered city name'

  public static settings = {
    loadApp: true,
    stayAlive: false
  }

  @args.string()
  public city: string

  public async run() {
    try {
      const city = await City.findByOrFail('name', this.city)
      await city.related('pollution').query().delete()
      this.logger.success(`All pollution data for city "${city.name}" were deleted`)
    } catch(e) {
      this.logger.error(`Cannot find city "${this.city}" in database`)
    }
  }
}
