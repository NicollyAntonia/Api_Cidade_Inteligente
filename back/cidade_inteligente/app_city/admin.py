from django.contrib import admin
from .models import Ambiente, Sensor, DadoSensor

#definindo o que o admin pode fazer
@admin.register(Ambiente)
class AmbienteAdmin(admin.ModelAdmin):
    list_display = ('sig', 'descricao', 'ni', 'responsavel') 


@admin.register(Sensor)
class SensorAdmin(admin.ModelAdmin):
    list_display = ('tipo', 'mac_address', 'status', 'ambiente')


@admin.register(DadoSensor)
class DadoSensorAdmin(admin.ModelAdmin):
    list_display = ('sensor', 'temperatura', 'umidade', 'luminosidade', 'contador', 'timestamp')
    readonly_fields = ('timestamp',)
    list_filter = ('sensor__tipo', 'timestamp')
