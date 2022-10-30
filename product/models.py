from email.policy import default
from django.db import models

# Create your models here.
class product(models.Model):
    title = models.TextField()
    description = models.TextField()
    price = models.TextField()
    summary = models.TextField()

class Department(models.Model):
    name = models.CharField(max_length=100,null=False)
    location = models.CharField(max_length=100)
    

    def __str__(self):
        return self.name


class Role(models.Model):
    name = models.CharField(max_length=100, null=False)

    def __str__(self):
        return self.name


class Employee(models.Model):
    first_name = models.CharField(max_length=100, null=False)
    last_name = models.CharField(max_length=100)
    club=models.CharField(max_length=100)
    nation = models.CharField(max_length=100)
    #pace = models.ForeignKey(Department, on_delete=models.CASCADE)
    #dribbling = models.ForeignKey(Role, on_delete=models.CASCADE)
    pace=models.IntegerField(default=0)
    dribbling=models.IntegerField(default=0)
    shooting = models.IntegerField(default=0)
    defending = models.IntegerField(default=0)
    passing=models.IntegerField(default=0)
    physical=models.IntegerField(default=0)


    def __str__(self):
        return "%s %s %s" %(self.first_name, self.last_name, self.club)