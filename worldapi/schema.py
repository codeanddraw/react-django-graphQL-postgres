import graphene
from graphene_django import DjangoObjectType
from django.db.models import Q
from graphene import ObjectType
from .models import City

class CityType(DjangoObjectType):
    class Meta:
        model = City

class Query(graphene.ObjectType):
    cities = graphene.List(
        CityType,
        city_id=graphene.Int(),
        first=graphene.Int(),
        jump=graphene.Int(),
    )

    def resolve_cities(self, info, city_id, first=None, jump=None, **kwargs):
        all_cities = City.objects.all()
        if city_id:
            filter = Q(city_id__icontains=city_id)
            filtered = all_cities.filter(filter)

            if jump:
                filtered = filtered[jump:]
            if first:
                filtered = filtered[:first]
            else: 
                filtered = City.objects.all()

        return filtered        

class AddCity(graphene.Mutation):
    addCity = graphene.Field(CityType)

    class Arguments:
        city_id = graphene.Int(required=True)
        city_name = graphene.String(required=True)
        country_code = graphene.String(required=True)
        city_district = graphene.String(required=True)
        city_population = graphene.Int(required=True)

    def mutate(
        self,
        info,
        city_id,
        city_name,
        country_code,
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
            country_code = country_code,
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
