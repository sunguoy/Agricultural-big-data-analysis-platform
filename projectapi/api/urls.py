from django.urls import path
from . import views

urlpatterns = [
    path('login/',views.Login.as_view()),
    path('register/', views.Register.as_view()),
    path("topmiddle/", views.TopMiddle.as_view()),
    path("topleft/", views.TopLeft.as_view()),
    path("bottonleft/",views.BottonLeft.as_view()),
    path("bottonright/", views.BottonRight.as_view()),
    path("bottonmiddle/",views.BottunMiddle.as_view()),
    path("topright/",views.TopRight.as_view()),
    path("lowestleft/", views.LowestLeft.as_view()),
    path("lowestmiddle/",views.LowestMiddle.as_view()),
    path("lowestright/", views.LowestRight.as_view()),
    path("allcity/",views.AllCity.as_view()),
    path("bestleft/",views.BestLeft.as_view())
]
