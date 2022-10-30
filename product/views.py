from django.shortcuts import render
from django.shortcuts import HttpResponse
from .models import Employee, Role, Department
from datetime import datetime
from django.db.models import Q

# Create your views here.
def index(request):
    return render(request, 'playerindex.html')

def table_view(request,*args,**kwargs):
    #print(args,kwargs)
    #print(request.user)
    #return HttpResponse("<h1>Hello World!!!</h1>")
    return render(request,"view_all_emp.html")

def all_emp(request):
    emps = Employee.objects.all()
    context = {
        "emps": emps
    }
    print(context)
    return render(request, 'view_all_emp.html', context)


def base_view(request,*args,**kwargs):
    #print(args,kwargs)
    #print(request.user)
    #return HttpResponse("<h1>Hello World!!!</h1>")
    return render(request,"base.html",{})

def home_view(request,*args,**kwargs):
    #print(args,kwargs)
    #print(request.user)
    #return HttpResponse("<h1>Hello World!!!</h1>")
    return render(request,"home2.html",{})

def news_view(request,*args,**kwargs):
    #print(args,kwargs)
    #print(request.user)
    #return HttpResponse("<h1>Hello World!!!</h1>")
    return render(request,"index.html",{})

def world_view(request,*args,**kwargs):
    #print(args,kwargs)
    #print(request.user)
    #return HttpResponse("<h1>Hello World!!!</h1>")
    return render(request,"worldleague.html",{})

def add_emp(request):
    if request.method == 'POST':
        first_name = request.POST['first_name']
        last_name = request.POST['last_name']
        club = str(request.POST['club'])
        nation = str(request.POST['nation'])
        pace = int(request.POST['pace'])
        dribbling = int(request.POST['dribbling'])
        shooting=int(request.POST['shooting'])
        defending = int(request.POST['defending'])
        passing = int(request.POST['passing'])
        physical = int(request.POST['physical'])
        new_emp = Employee(first_name= first_name, last_name=last_name, club=club, nation=nation, pace=pace, dribbling=dribbling, shooting = shooting,defending=defending ,passing=passing,physical=physical)
        new_emp.save()
        return HttpResponse('Employee added Successfully')
    elif request.method=='GET':
        return render(request,'add_emp.html')
    else:
        return HttpResponse("An Exception Occured! Employee Has Not Been Added")

def contact_view(request,*args,**kwargs):
    #print(args,kwargs)
    #print(request)
    mycontext={
        "mytest":'this is about django',
        "mynumber":123,
        'mylist':[456,589,'abc','CR7!!!'],
        'html':"<h2>just a tag</h2>"
    }
    return render(request,"contact.html",mycontext)

def product_detail_view(request):
    return render(request,"",{})

def player_view(request,*args,**kwargs):
    #print(args,kwargs)
    #print(request.user)
    #return HttpResponse("<h1>Hello World!!!</h1>")
    return render(request,"playerindex.html",{})

def remove_emp(request, emp_id = 0):
    if emp_id:
        try:
            emp_to_be_removed = Employee.objects.get(id=emp_id)
            emp_to_be_removed.delete()
            return HttpResponse("Employee Removed Successfully")
        except:
            return HttpResponse("Please Enter A Valid EMP ID")
    emps = Employee.objects.all()
    context = {
        'emps': emps
    }
    return render(request, 'remove_emp.html',context)



def filter_emp(request):
    if request.method == 'POST':
        name = request.POST['name']
        club= request.POST['club']
        nation = request.POST['nation']
        emps = Employee.objects.all()
        if name:
            emps = emps.filter(Q(first_name__icontains = name) | Q(last_name__icontains = name))
        if club:
            emps = emps.filter(dept__name__icontains = club)
        if nation:
            emps = emps.filter(role__name__icontains = nation)

        context = {
            'emps': emps
        }
        return render(request, 'view_all_emp.html', context)

    elif request.method == 'GET':
        return render(request, 'filter_emp.html')
    else:
        return HttpResponse('An Exception Occurred')