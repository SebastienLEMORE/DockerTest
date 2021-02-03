from django.contrib.auth.models import User
from rest_framework import status, viewsets
from rest_framework import permissions
from rest_framework.response import Response
from .serializers import UserSerializer

class UserViewSet(viewsets.ViewSet):
    serializer_class = UserSerializer
    permission_classes = [permissions.IsAuthenticated]
    
    def list(self, request):
        users = User.objects.all()
        serializer = self.serializer_class(users, many=True)
        return Response(serializer.data)

    def retrieve(self, request, pk=None):
        user = User.objects.get(id=pk)
        serializer = self.serializer_class(user)
        return Response(serializer.data)
    
    def update(self, request, pk=None):
        user = User.objects.get(id=pk)
        serializer = self.serializer_class(instance=user, data=request.data)
        serializer.is_valid(raise_exception=True)
        serializer.save()
        user = User.objects.get(id=pk)
        return Response(serializer.data, status=status.HTTP_202_ACCEPTED)
    
    
    