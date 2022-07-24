import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class extends BaseSchema {
  protected tableName = 'pollution'

  public async up () {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id').primary()
      table.string('city_id')
      table.integer('aqi')
      table.float('co')
      table.float('no')
      table.float('no2')
      table.float('o3')
      table.float('so2')
      table.float('pm2_5')
      table.float('pm10')
      table.float('nh3')
      table.integer('date_formatted')
      table.timestamp('date')
      table.timestamp('created_at', { useTz: true })
      table.timestamp('updated_at', { useTz: true })
    })

    this.schema.alterTable(this.tableName, (table) => {
      table.foreign('city_id').references('cities.id').onDelete('CASCADE')
      table.index(['city_id', 'date_formatted'])
    })
  }

  public async down () {
    this.schema.dropTable(this.tableName)
  }
}
