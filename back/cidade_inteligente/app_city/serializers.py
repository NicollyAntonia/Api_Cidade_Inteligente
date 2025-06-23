from rest_framework import serializers
from .models import Ambiente, Sensor, DadoSensor,HistoricoSensor
from django.contrib.auth import get_user_model

#serializer cadastro 
User = get_user_model()

class UsuarioRegistroSerializer(serializers.ModelSerializer):
    password = serializers.CharField(write_only=True, min_length=6)

    class Meta:
        model = User
        fields = ['username', 'password', ]  # ou outros campos do seu modelo

    def create(self, validated_data):
        user = User.objects.create_user(
            username=validated_data['username'],
            password=validated_data['password'],
        )
        return user

#serializer para o modelo Ambiente
class AmbienteSerializer(serializers.ModelSerializer):
    class Meta:
        model = Ambiente
        fields = '__all__'

#serializer para o modelo Sensor
class SensorSerializer(serializers.ModelSerializer):
    class Meta:
        model = Sensor
        fields = '__all__'

#serializer para o modelo DadoSensor
class DadoSensorSerializer(serializers.ModelSerializer):
    class Meta:
        model = DadoSensor
        fields = '__all__'

#serializer para o modelo Historico
class HistoricoSensorSerializer(serializers.ModelSerializer):
    class Meta:
        model = HistoricoSensor
        fields = '__all__'
