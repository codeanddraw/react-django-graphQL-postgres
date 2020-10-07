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


class Query(graphene.ObjectType):
    cities = graphene.List(
        CityType,
        city_name=graphene.String(),
        first=graphene.Int(),
        jump=graphene.Int(),
    )

    def resolve_cities(self, info, city_name, first=None, jump=None, **kwargs):
        all_cities = City.objects.all()
        if city_name:
            filter = Q(city_name=city_name)
            filtered = all_cities.filter(filter)

            if jump:
                filtered = filtered[jump:]
            if first:
                filtered = filtered[:first]

        return filtered  

    allcities = graphene.List(
        CityType,
        city_countrycode=graphene.String(),
        first=graphene.Int(),
        jump=graphene.Int(),
    )

    def resolve_allcities(self, info, city_countrycode, **kwargs):
        cities = City.objects.all()

        if city_countrycode:
            filter = Q(city_countrycode=city_countrycode)
            filtered = cities.filter(filter)

        return filtered  

    countries = graphene.List(
        CountryType,
        country_continent=graphene.String()
    )

    def resolve_countries(self, info, country_continent, **kwargs):
        all_countries = Country.objects.all()

        if country_continent:
            filter = Q(country_continent=country_continent)
            filtered = all_countries.filter(filter)
            
        return filtered  

    regions = graphene.List(
        CountryType,
        country_region=graphene.String()
    )

    def resolve_regions(self, info, country_region, **kwargs):
        all_regions = Country.objects.all()

        if country_region:
            filter = Q(country_region=country_region)
            filtered = all_regions.filter(filter)
            
        return filtered    

class AddCity(graphene.Mutation):
    addCity = graphene.Field(CityType)

    class Arguments:
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

        # user = info.context.user
        # if user.is_anonymous:
        #     raise Exception("Not logged in!!")

        city = City(
            city_id = city_id,
            city_name = city_name,
            city_countrycode = city_countrycode,
            city_district = city_district,
            city_population = city_population
        )

        city.save()

        return AddCity(addCity=city)

class DeleteCity(graphene.Mutation):
    deleteCity = graphene.Field(CityType)

    class Arguments:
        city_id = graphene.Int(required=True)

    def mutate(
        self,
        info,
        city_id,
        **kwargs
    ):

        # user = info.context.user
        # if user.is_anonymous:
        #     raise Exception("Not logged in!!")

        city = City(
            city_id = city_id
        )

        print(city.delete())

        return True

class Mutation(graphene.ObjectType):
    add_city = AddCity.Field()
    delete_city = DeleteCity.Field()

schema = graphene.Schema(query=Query, mutation=Mutation)
