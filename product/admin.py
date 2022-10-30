from django.contrib import admin
from .models import Employee, Role, Department

# Register your models here.
from .models import product
admin.site.register(product)
admin.site.register(Employee)
admin.site.register(Role)
admin.site.register(Department)