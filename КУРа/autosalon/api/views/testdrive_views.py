from rest_framework import generics
from ..models import Car
from rest_framework import status
from rest_framework.response import Response
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated
from ..models import TestDrive
from ..serializers import TestDriveSerializer

class TestDriveCreateView(generics.CreateAPIView):
    queryset = TestDrive.objects.all()
    serializer_class = TestDriveSerializer

    def post(self, request, *args, **kwargs):
        # Получение данных из запроса
        user_id = request.data.get('user_id')
        # car_id = request.data.get('car_id')
        car_id = kwargs.get('car_id')  # получение car_id из URL
        date = request.data.get('date')
        time = request.data.get('time')

        # Преобразование даты и времени в соответствующие объекты
        date_object = date
        time_object = time

        # Получение объекта Car по car_id
        try:
            car = Car.objects.get(pk=car_id)
        except Car.DoesNotExist:
            return Response({'error': 'Car does not exist'}, status=404)

        # Сохранение записи о тест-драйве
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        serializer.save(car_id=car_id, user=request.user, date=date_object, time=time_object)

        return Response(serializer.data)

@api_view(['GET'])
@permission_classes([IsAuthenticated])
def getMyTestDrives(request):
    user = request.user
    testdrives = user.testdrive_set.all()
    serializer = TestDriveSerializer(testdrives, many=True)
    return Response(serializer.data)

@api_view(['DELETE'])
@permission_classes([IsAuthenticated])
def deleteTestDrive(request, testdrive_id):
    user = request.user
    testdrive = TestDrive.objects.get(_id=testdrive_id, user=user)
    if testdrive.user != user:
        return Response({'detail' : 'You are not authorized'})
    testdrive.delete()
    return Response({'detail': 'Test drive deleted successfully'})
