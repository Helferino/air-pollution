import Route from '@ioc:Adonis/Core/Route'
import AirPollutionController from 'App/Controllers/Http/AirPollutionController'

Route.get('/', async () => {
  return  'Jakub Urban - interview Outloud.co'
})

Route.get('/air-pollution/avg', ctx => {
	return new AirPollutionController().average(ctx)
})

Route.get('/air-pollution/city-max', ctx => {
  return new AirPollutionController().cityMax(ctx)
})
