from django.urls import path
from django.conf.urls import include

from . import views
from . import apiviews


urlpatterns = [
    path('', views.UserView.as_view()),
    path('accounts/', include('django.contrib.auth.urls')),
    path('api/users', apiviews.UserViewSet.as_view({'get': 'list'})),
    path('api/users/<str:pk>', apiviews.UserViewSet.as_view({
        'get': 'retrieve',
        'put': 'update'
    })),
]
