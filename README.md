## Setup

- Skopirovat `.env.example` do `.env`
- Nastavit OpenWeather api kluc v `.env`
- Nainstalovat dependencies `npm install`
- Spustit migracie `node ace migration:run`
- Spustit aplikaciu cez `npm run dev`

Pouzil som `sqlite` kvoli jednoduchsiemu setupu, prepnutie na odporucany `postgres` je otazka par zmien

## Zadanie

[Link](https://madebyoutloud.notion.site/Back-end-zadanie-2022-0b6a2f10f7714bf3a2eab84b73b02ae6)

#### 1 - Synchronizacia dat z API
- Spustenie cez `node ace pollution:sync Bratislava 2022-07-01 2022-07-10`
- Validacia datumovych argumentov (musia byt vo formate YYYY-MM-DD inak to hodi error)
- Ak sa spusti rovnake mesto s rovnakym datum viac krat, data sa nevytvaraju duplicitne

#### 2 - Odstranenie dat podla nazvu mesta
- Spustenie cez `node ace pollution:delete Bratislava`

#### 3 - Vratenie priemernych hodnot mesta podla vybraneho rozsahu
- GET `/air-pollution/avg?city=Bratislava&from=2022-07-05&to=2022-07-15`
- Validacia query argumentov

#### 4 - Vratenie mesta s najvacsim znecistenim za urcite obdobie
- GET `/air-pollution/city-max?from=2021-07-01&to=2023-07-03`
- Validacia query argumentov

## Mozne vylepsenia do buducna

- Detailensji error output pri validaci entry argument pri ace commandoch
- Pridat viac fieldov do db, mozno locale z api k jednotlivym mestam a pod.
- `app/Controllers/Http/AirPollutionController:17` lepsie by bolo pouzit `preload()`
- Vyriesit error handling pre OpenWeather api
- Stlpec `date_formatted` tam je len z jedneho dovodu, nedalo sami akosi filtrovat podla `date` fieldu cez Lucid ORM tak som spravil alternativny field ktory je integer. Inak by stacil cisto `date` field
