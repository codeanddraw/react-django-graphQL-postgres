import gql from 'graphql-tag'

export const GET_REGIONS = gql`
        query getAllRegions($countryContinent: String!) {
            getAllRegions(countryContinent:$countryContinent){
                countryRegion,
                countryCode,
                countryName
            }
        }`;

export const GET_CITIES = gql`
        query getAllCities($countryCode: String!) {
            getAllCities(cityCountrycode: $countryCode){
                cityId,
                cityName,
                cityCountrycode,
                cityDistrict,
                cityPopulation
            }
        }`;

export const ADD_CITY = gql`
        mutation updateCity($cityId: Int!, $cityName: String!, $cityCountrycode:  String!, $cityDistrict: String!, $cityPopulation: Int!) {
            addCity(cityId: $cityId, cityName: $cityName, cityCountrycode: $cityCountrycode, cityDistrict: $cityDistrict, cityPopulation: $cityPopulation) {
                city {
                    cityId,
                    cityName,
                    cityCountrycode,
                    cityDistrict,
                    cityPopulation
                }
            }
        }`;

export const DELETE_CITY = gql`
        mutation deleteCity($cityId: Int!){
            deleteCity(cityId: $cityId) {
                city {
                    cityId
                }
            }
        }`;