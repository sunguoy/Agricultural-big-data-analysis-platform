import tarfile
from django.shortcuts import render
from django.views import View
from django_redis import get_redis_connection
import json
from django.http import JsonResponse
from .models import User
import pandas as pd
import os


data = pd.read_csv(os.path.join(os.path.dirname(__file__),"data.csv"))
allcity = set(','.join(data["county_year"].values.tolist()).replace("_", "").replace("2013", "").replace("2014", "").replace(
    "2015", "").replace("2016", "").replace("2017", "").replace("2018", "").replace("2019", "").split(","))

class AllCity(View):

    def post(self,request):
        return JsonResponse({"msg":"ok","data":list(allcity)})


# Create your views here.

class Login(View):

    def post(self, request):
        data = request.POST
        username = data.get("username")
        users = User.objects.filter(username=username)
        if users:
            password = data.get("password")
            if password == users[0].password:
                request.session["name"] = username
                return JsonResponse({"msg": "登录成功", "code": 200})
            return JsonResponse({"msg": "密码错误", "code": 201})
        return JsonResponse({"msg": "用户不存在", "code": 202})


class Register(View):

    def post(self, request):
        data = request.POST
        print(data)
        if data.post("pass1") != data.get("pass2"):
            return JsonResponse({"msg": "两次密码不一致", "code": 204})
        User.objects.create(username=data.get("username"),
                            password=data.get("pass1"))
        return JsonResponse({"msg": "注册成功", "data": 203})


# for i in range(2013, 2020):
#         print(data[data["county_year"] == f"长丰_{i}"]["18周平均气压均值"].values)

class TopLeft(View):

    def post(self,request):
        # 18周平均气温均值  18周最低气温均值  18周最高气温均值
        da = json.loads(request.body.decode())
        print(data)
        citys = ["长丰", "巢湖", "当涂", "东芝", "肥东"]
        # week = 18
        target = "相对湿度均值"
        if "city" in da and da["city"]!=[]:
            citys = da["city"]
        # if "week" in da and da["week"]!=[]:
        #     week = da["week"][0]
        if "target" in da and da["target"] != []:
            target = da["target"][0]
        datas = [f"2013年-2019年第18周-41周{target}"]
        list1 = [datas,[2013,2014,2015,2016,2017,2018,2019]]
        da = []
        for city in citys:
            datass = []
            for i in range(2013, 2020):
                for week in range(18,42):
                    val = data[data["county_year"] ==
                            f"{city}_{i}"][f"{week}周{target}"].values[0]
                    datass.append(val)
            da.append({
                "cityname":city,
                "data":datass
            })
        list1.append(da)
        list1.append(citys)    
        return JsonResponse({"msg": "ok", "data": list1})

class TopMiddle(View):

    def post(self,request):
        da = json.loads(request.body.decode())
        city = "长丰"
        week = 18
        if "city" in da and da["city"] != []:
            city = da["city"][0]
        if "week" in da and da["week"] != []:
            week = da["week"][0]
        datas = [f"2013年-2019年{city}第{week}周气温均值"]
        datas.append([2013,2014,2015,2016,2017,2018,2019])
        avg = []
        min = []
        max = []
        for i in range(2013, 2020):
            avg.append(str(data[data["county_year"] == f"{city}_{i}"][f"{week}周平均气温均值"].values[0])[0:5])
            min.append(str(data[data["county_year"] ==
                            f"{city}_{i}"][f"{week}周最低气温均值"].values[0])[0:5])
            max.append(str(data[data["county_year"] ==
                                f"{city}_{i}"][f"{week}周最高气温均值"].values[0])[0:5])
        datas.append(avg) 
        datas.append(min)
        datas.append(max)
        return JsonResponse({"msg": "ok","data":datas})

class TopRight(View):

    def post(self,request):
        pass

class BottonLeft(View):

    def post(self,request):
        da = json.loads(request.body.decode())
        citys = ["长丰", "巢湖", "当涂", "东芝", "肥东"]
        ss = ["相对湿度均值", "最小相对湿度均值","日照时数均值"]
        week = 18
        year = 2013
        if "city" in da and da["city"] != []:
            city = da["city"]
        if "week" in da and da["week"] != []:
            week = da["week"][0]
        if "target" in da and da["target"] != []:
            ss = da["target"]
        if "year" in da and da["year"] != []:
            year = da["year"][0]
        list1 = [citys]
        da = []
        for i in ss:
            datass = []
            for city in citys:
                val = data[data["county_year"] ==
                           f"{city}_{year}"][f"{week}周{i}"].values[0]
                datass.append(str(val)[0:5])
            da.append({
                "cityname":i,
                "data":datass
            })
        list1.append(da)
        list1.append(ss)    
        return JsonResponse({"msg": "ok", "data": list1})

class BottonRight(View):

    def post(slef,request):
        da = json.loads(request.body.decode())
        target = "总降水量"
        citys = ["长丰", "巢湖", "当涂", "东芝", "肥东"]
        years = 2013
        week = 18
        if "city" in da and da["city"] != []:
            citys = da["city"]
        if "week" in da and da["week"] != []:
            week = da["week"][0]
        if "target" in da and da["target"] != []:
            target = da["target"][0]
        if "year" in da and da["year"] != []:
            years = da["year"][0]
        datas = [f"{years}年城市第{week}周城市{target}占比"]
        da = []
        for city in citys:
            val = data[data["county_year"] ==
                           f"{city}_{years}"][f"{week}周{target}"].values[0]
            da.append({
                "name": city,
                "value":val
            })
        datas.append(da)
        return JsonResponse({"msg":"ok","data":datas})

class TopRight(View):

    def post(self,request):
        da = json.loads(request.body.decode())
        target = "日降水量均值"
        citys = ["长丰", "巢湖", "当涂", "东芝", "肥东"]
        week = 18
        if "city" in da and da["city"] != []:
            citys = da["city"]
        if "week" in da and da["week"] != []:
            week = da["week"][0]
        if "target" in da and da["target"] != []:
            target = da["target"][0]
        # if "year" in da and da["year"] != []:
        #     years = da["year"][0]
        # datas = [f"{years}年城市第{week}周城市{target}占比"]
        datas = [f"2013-2019年第{week}周城市{target}",citys]
        da = []
        for city in citys:
            datass = []
            for i in range(2013,2020):
                val = data[data["county_year"] ==
                           f"{city}_{i}"][f"{week}周{target}"].values[0]
                datass.append(val)
            da.append({
                "cityname":city,
                "data":datass
            })
        datas.append(da)
        return JsonResponse({"msg":"ok","data":datas})

class BottunMiddle(View):

    def post(self,request):
        da = json.loads(request.body.decode())
        citys = ["长丰", "巢湖", "当涂"]
        target = "日照时数均值"
        week = 18
        if "city" in da and da["city"] != []:
            citys = da["city"]
        if "week" in da and da["week"] != []:
            week = da["week"][0]
        if "target" in da and da["target"] != []:
            target = da["target"][0]
        list1 = [f"各城市2013-2019年第{week}周{target}",citys]
        da = []
        for city in citys:
            dats = []
            for i in range(2013,2020):
                val = data[data["county_year"] ==
                           f"{city}_{i}"][f"{week}周{target}"].values[0]
                dats.append(str(val)[0:4])
            da.append({
                "cityname":city,
                "data":dats
            })
        list1.append(da)
        return JsonResponse({"msg":"ok","data":list1})


class LowestLeft(View):

    def post(self,request):
        das = json.loads(request.body.decode())
        target = "日照时数均值"
        da = []
        min = 100000
        max = 0
        minyear = 0
        maxyear = 0
        week = 18
        if "week" in das and das["week"] != []:
            week = das["week"][0]
        if "target" in das and das["target"] != []:
            target = das["target"][0]
        print(target)
        text = f"2013-2019年所有城市第{week}周{target}分布图"
        list1 = []
        for i in range(2013,2020):
            for city in allcity:
                l = []
                val = data[data["county_year"] ==
                            f"{city}_{i}"][f"{week}周{target}"].values[0]
                l.append(i)
                l.append(str(val)[0:4])
                da.append(l)
                if val < min:
                    min = val
                    minyear = i
                if max < val:
                    max = val
                    maxyear = i
        mininfo = [minyear,min]
        maxinfo = [maxyear,max]
        list1 = [[mininfo,maxinfo],da,text]
        return JsonResponse({"msg":"ok","data":list1})


                

class LowestMiddle(View):

    def post(self,request):
        da = json.loads(request.body.decode())
        city = "长丰"
        year = 2013
        week = 18
        target = ["平均气压均值", "最小相对湿度均值", "最大风速均值", "总降水量", "最低气温"]
        if "city" in da and da["city"] != []:
            city = da["city"][0]
        if "week" in da and da["week"] != []:
            week = da["week"][0]
        if "target" in da and da["target"] != []:
            target = da["target"]
        if "year" in da and da["year"]!= []:
            year = da["year"][0]
        list1 = [[city]]
        tars = []
        vals = []
        for tar in target:
            max = data[f"{week}周{tar}"].sort_values().tolist()[-1]
            tars.append({
                "name":tar,
                "max":int(max)
            })
        for tar in target:
            val = data[data["county_year"] == f"{city}_{year}"][f"{week}周{tar}"].values[0]
            vals.append(int(val))
        list1.append(tars)
        list1.append([{
            "name":city,
            "value":vals
        }])
        return JsonResponse({"msg":"ok","data":list1})

class LowestRight(View):

    def post(self,request):
        pass


class BestLeft(View):

    def post(self, request):
        # 18周平均气温均值  18周最低气温均值  18周最高气温均值
        da = json.loads(request.body.decode())
        citys = "长丰"
        # week = 18
        year = 2013
        target = "相对湿度均值"
        if "city" in da and da["city"] != []:
            citys = da["city"][0]
        if "year" in da and da["year"]!=[]:
            year = da["year"][0]
        if "target" in da and da["target"] != []:
            target = da["target"][0]
        wwws = []
        for we in range(18,42):
            wwws.append(we)
        datas = [f"{year}年{citys}第18周-41周{target}"]
        list1 = [datas, wwws]
        da = []
        datass = []
        for i in range(int(year), int(year)+1):
            for week in range(18, 42):
                val = data[data["county_year"] ==
                            f"{citys}_{i}"][f"{week}周{target}"].values[0]
                datass.append(val)
        print(datass)
        da.append({
            "cityname": citys,
            "data": datass
        })
        list1.append(da)
        list1.append([citys])
        return JsonResponse({"msg": "ok", "data": list1})
