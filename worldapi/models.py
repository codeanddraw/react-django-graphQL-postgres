from django.db import models
from django.conf import settings

class City(models.Model):
    city_id = models.AutoField(primary_key=True)
    city_name = models.TextField(default=None)
    city_countrycode = models.CharField(max_length=3)
    city_district = models.TextField(default=None)
    city_population = models.IntegerField()

class Country(models.Model):
    country_code = models.CharField(primary_key=True, max_length=3)
    country_name =  models.TextField(default=None)
    country_continent = models.TextField(default=None)
    country_region =  models.TextField(default=None)
    country_surfacearea = models.FloatField(default=None) 
    country_indepyear = models.SmallIntegerField(null=True)
    country_population = models.IntegerField(default=None)
    country_lifeexpectancy = models.FloatField(null=True) 
    country_gnp = models.DecimalField(max_digits=10,decimal_places=2,default=0.00),
    country_gnpold = models.DecimalField(max_digits=10,decimal_places=2,null=True),
    country_localname = models.TextField(default=None)
    country_governmentform = models.TextField(default=None)
    country_headofstate = models.TextField(null=True,blank=True)
    country_capital = models.ForeignKey(City, on_delete=models.CASCADE,default=None,db_column='country_capital')
    country_code2 = models.CharField(max_length=2,default=None)



class CountryLanguage(models.Model):
    countrylanguage_countrycode =  models.OneToOneField(Country,on_delete=models.CASCADE,db_column='countrylanguage_countrycode',primary_key=True)
    countrylanguage_language = models.TextField(default=None)
    countrylanguage_isofficial = models.BooleanField(default=None)
    countrylanguage_percentage = models.FloatField(default=None) 

    class Meta:
        unique_together = (('countrylanguage_countrycode', 'countrylanguage_language'),)

    



