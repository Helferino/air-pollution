import { DateTime } from 'luxon'
import { BaseModel, column, HasMany, hasMany } from '@ioc:Adonis/Lucid/Orm'
import Pollution from './Pollution'

export default class City extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @hasMany(() => Pollution, {})
  public pollution: HasMany<typeof Pollution>

  @column()
  public name: string

  @column()
  public lat: number

  @column()
  public lon: number

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoUpdate: true })
  public updatedAt: DateTime
}
