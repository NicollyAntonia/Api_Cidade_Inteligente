from rest_framework import serializers
from .models import Ambiente, Sensor, DadoSensor,HistoricoSensor

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
