import Env from '@ioc:Adonis/Core/Env'

export const url: string = 'http://api.openweathermap.org'
export const key: string = Env.get('OPENWEATHER_KEY')