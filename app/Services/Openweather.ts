import Config from '@ioc:Adonis/Core/Config'
import Axios from 'axios';
import { DateTime } from 'luxon';

interface ResCity {
  name: string,
  local_names: Record<string, string>,
  lat: number,
  lon: number,
  country: string,
  state?: string
}

interface PollutionData {
  dt: number,
  main: {
    aqi: number
  },
  components: {
    co: number,
    no: number,
    no2: number,
    o3: number,
    so2: number,
    pm2_5: number,
    pm10: number,
    nh3: number
  }
}

interface ResPollution {
  coord: number[],
  list: PollutionData[]
}

export const getCities = async (query: string, countryCode: string = 'SK'): Promise<ResCity[]> => {
  const url =`${Config.get('openweather.url')}/geo/1.0/direct`
  return (await Axios.get<ResCity[]>(url, {
    params: {
      q: `${query},${countryCode}`,
      limit: 1,
      appid: Config.get('openweather.key')
    }
  })).data;
}

export const getPollution = async (lat: number, lon: number, from: DateTime, to: DateTime): Promise<ResPollution> => {
  const start = Math.round(from.startOf('day').toSeconds())
  const end = Math.round(to.endOf('day').toSeconds())

  const url = `${Config.get('openweather.url')}/data/2.5/air_pollution/history`
  return (await Axios.get<ResPollution>(url, {
    params: {
      lat,
      lon,
      start,
      end,
      appid: Config.get('openweather.key')
    }
  })).data
}
