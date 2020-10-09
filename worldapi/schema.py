import graphene
from graphene_django import DjangoObjectType
from django.db.models import Q
from graphene import ObjectType
from .models import City, Country, CountryLanguage

class CityType(DjangoObjectType):
    class Meta:
        model = City

class CountryType(DjangoObjectType):
    class Meta:
        model = Country

class CountryLanguageType(DjangoObjectType):
    class Meta:
        model = CountryLanguage

#################################################
# This class will defines get requests
#################################################
class Query(graphene.ObjectType):
    #################################################
    # Get all cities by name
    #################################################
    getCitiesByName = graphene.List(
        CityType,
        city_name=graphene.String(),
        first=graphene.Int(),
        jump=graphene.Int(),
    )

    def resolve_getCitiesByName(self, info, city_name, first=None, jump=None, **kwargs):
        all_getCitiesByName = City.objects.all()
        if city_name:
            filter = Q(city_name=city_name)
            filtered = all_getCitiesByName.filter(filter)

            if jump:
                filtered = filtered[jump:]
            if first:
                filtered = filtered[:first]

        return filtered  

    #################################################
    # Get all cities by country code 
    #################################################
    getAllCities = graphene.List(
        CityType,
        city_countrycode=graphene.String(),
        first=graphene.Int(),
        jump=graphene.Int(),
    )

    def resolve_getAllCities(self, info, city_countrycode, **kwargs):
        all_getAllCities = City.objects.all()

        if city_countrycode:
            filter = Q(city_countrycode=city_countrycode)
            filtered = all_getAllCities.filter(filter)

        return filtered  

    #################################################
    # Get all countries by countinent
    ################################################# 
    getAllCountries = graphene.List(
        CountryType,
        country_continent=graphene.String()
    )

    def resolve_getAllCountries(self, info, country_continent, **kwargs):
        all_getAllCountries = Country.objects.all()

        if country_continent:
            filter = Q(country_continent=country_continent)
            filtered = all_getAllCountries.filter(filter)
            
        return filtered  

    #################################################
    # Get all regions by country region
    ################################################# 
    getAllRegions = graphene.List(
        CountryType,
        country_region=graphene.String()
    )

    def resolve_getAllRegions(self, info, country_region, **kwargs):
        all_getAllRegions = Country.objects.all()

        if country_region:
            filter = Q(country_region=country_region)
            filtered = all_getAllRegions.filter(filter)
            
        return filtered  

    #################################################
    # Get all country language info by country code
    ################################################# 
    getAllCountryLanguage = graphene.List(
        CountryLanguageType,
        countrylanguage_countrycode=graphene.String()
    )

    def resolve_getAllCountryLanguage(self, info, countrylanguage_countrycode, **kwargs):
        all_getAllCountryLanguage = CountryLanguage.objects.all()

        if countrylanguage_countrycode:
            filter = Q(countrylanguage_countrycode=countrylanguage_countrycode)
            filtered = all_getAllCountryLanguage.filter(filter)
            
        return  filtered  

##################################################################################################
# This class will define post requests to update or add data
##################################################################################################
class AddCity(graphene.Mutation):
     # The class attributes define the response of the mutation
    city = graphene.Field(CityType)

    class Arguments:
         # The input arguments for this mutation
        city_id = graphene.Int(required=True)
        city_name = graphene.String(required=True)
        city_countrycode = graphene.String(required=True)
        city_district = graphene.String(required=True)
        city_population = graphene.Int(required=True)

    def mutate(
        self,
        info,
        city_id,
        city_name,
        city_countrycode,
        city_district,
        city_population,
        **kwargs
    ):
       
        city = City(
            city_id = city_id,
            city_name = city_name,
            city_countrycode = city_countrycode,
            city_district = city_district,
            city_population = city_population
        )

        city.save()
        # Return an instance of this mutation
        return AddCity(city=city)

##################################################################################################
# This class will define delete requests
##################################################################################################
class DeleteCity(graphene.Mutation):
    # The class attributes define the response of the mutation
    city = graphene.Field(CityType)

    class Arguments:
        # The input arguments for this mutation
        city_id = graphene.Int(required=True)

    def mutate(self,info,city_id,**kwargs):
            city = City.objects.get(pk=city_id)

            if city is not None:
                city.delete()

            return city.city_id

class Mutation(graphene.ObjectType):
    add_city = AddCity.Field()
    delete_city = DeleteCity.Field()

schema = graphene.Schema(query=Query, mutation=Mutation)
