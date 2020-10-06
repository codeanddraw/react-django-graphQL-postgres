from django.db import models
from django.conf import settings


class Country(models.Model):
    code = models.CharField(primary_key=True, max_length=3)
    name = models.CharField(max_length=100)
    continent = models.CharField(max_length=100)
    region = models.CharField(max_length=100)
    # surfacearea real  
    indepyear = models.IntegerField()
    population = models.IntegerField()
    # lifeexpectancy real,
    # gnp numeric(10,2),
    # gnpold numeric(10,2),
    localname = models.CharField(max_length=100)
    governmentform = models.CharField(max_length=100)
    headofstate = models.TextField()
    capital = models.IntegerField()
    code2 = models.CharField(max_length=2)


class City(models.Model):
    city_id = models.AutoField(primary_key=True)
    city_name = models.CharField(max_length=100)
    # country_code = models.ForeignKey(Country, on_delete=models.CASCADE)
    country_code = models.CharField(max_length=100)
    city_district = models.CharField(max_length=100)
    city_population = models.IntegerField()

class CountryLanguage(models.Model):
    country_code = models.ForeignKey(City, on_delete=models.CASCADE)
    country_language = models.CharField(max_length=50)

    # is_official boolean NOT NULL,
    # percentage real NOT NULL


