import { DateTime } from 'luxon'
import { BaseModel, belongsTo, BelongsTo, column } from '@ioc:Adonis/Lucid/Orm'
import City from './City'

export default class Pollution extends BaseModel {

  @column({ isPrimary: true })
  public id: number

  @column()
  public cityId: number

  @belongsTo(() => City)
  public city: BelongsTo<typeof City>

  @column()
  public aqi: number

  @column()
  public co: number

  @column()
  public no: number

  @column()
  public no2: number

  @column()
  public o3: number

  @column()
  public so2: number

  @column()
  public pm2_5: number

  @column()
  public pm10: number

  @column()
  public nh3: number

  @column()
  public date_formatted: number

  @column()
  public timestamp: number

  @column.dateTime()
  public date: DateTime

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoUpdate: true })
  public updatedAt: DateTime
}
