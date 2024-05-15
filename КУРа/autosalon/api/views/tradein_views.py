from rest_framework import generics
from ..models import Car
from ..models import UserCar
from rest_framework import status
from rest_framework.response import Response
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated
from ..models import TradeIn
from ..serializers import TradeInSerializer

@api_view(['POST'])
@permission_classes([IsAuthenticated])
def TradeInCreateView(request, car_id):
    user = request.user
    data = request.data
    userCar = UserCar.objects.get(_id=request.data['userCarId'])
    car = Car.objects.get(_id=car_id)
    tradeIn = TradeIn.objects.create(
        user=user,
        userCar=userCar,
        car=car,
    )
    serializer = TradeInSerializer(tradeIn, many=False)
    return Response(serializer.data)

@api_view(['GET'])
@permission_classes([IsAuthenticated])
def getMyTradeIns(request):
 user = request.user
 tradeins = user.tradein_set.all()
 serializer = TradeInSerializer(tradeins, many=True)
 return Response(serializer.data)

@api_view(['DELETE'])
@permission_classes([IsAuthenticated])
def deleteTradeIn(request, tradein_id):
 user = request.user
 tradein = TradeIn.objects.get(_id=tradein_id, user=user)
 if tradein.user != user:
     return Response({'detail' : 'You are not authorized'})
 tradein.delete()
 return Response({'detail': 'Trade-in deleted successfully'})
