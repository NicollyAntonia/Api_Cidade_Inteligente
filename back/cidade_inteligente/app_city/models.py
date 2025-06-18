from django.db import models
from django.utils import timezone

#modelo de ambiente
class Ambiente(models.Model):
    sig = models.CharField(max_length=50, blank=True, null=True)  
    descricao = models.CharField(max_length=100)
    ni = models.CharField(max_length=20, blank=True, null=True)
    responsavel = models.CharField(max_length=100, blank=True, null=True)

    def __str__(self):
        return self.sig or f"Ambiente {self.pk}"

#modelo de sensor
class Sensor(models.Model):
    TIPO_CHOICES = [
        ('temperatura', 'Temperatura'),
        ('umidade', 'Umidade'),
        ('luminosidade', 'Luminosidade'),
        ('contador', 'Contador'),
    ]

    tipo = models.CharField(max_length=20, choices=TIPO_CHOICES)
    mac_address = models.CharField(max_length=50, blank=True, null=True)
    unidade_medida = models.CharField(max_length=20,blank=True, null=True)
    latitude = models.FloatField(blank=True, null=True)
    longitude = models.FloatField(blank=True, null=True)
    status = models.BooleanField(blank=True, null=True) 
    ambiente = models.ForeignKey(Ambiente, null=True, blank=True, on_delete=models.CASCADE)

    def __str__(self):
        if self.ambiente:
            return f"{self.tipo} ({self.mac_address}) - {self.ambiente.sig}"
        return f"{self.tipo} ({self.mac_address})"

#modelo de dados do sensor 
class DadoSensor(models.Model):
    sensor = models.ForeignKey(Sensor, on_delete=models.CASCADE, related_name='dados')
    temperatura = models.FloatField(blank=True, null=True)
    umidade = models.FloatField(blank=True, null=True)
    luminosidade = models.FloatField(blank=True, null=True)
    contador = models.IntegerField(blank=True, null=True)
    timestamp = models.DateTimeField(default=timezone.now,blank=True, null=True)


    def __str__(self):
        return f"{self.sensor.tipo} - {self.timestamp.strftime('%Y-%m-%d %H:%M:%S')}"

class HistoricoSensor(models.Model):
    ACOES = [
        ('criado', 'Criado'),
        ('atualizado', 'Atualizado'),
    ]

    sensor = models.ForeignKey(Sensor, on_delete=models.CASCADE, related_name='historicos')
    acao = models.CharField(max_length=10, choices=ACOES)
    data = models.DateTimeField(auto_now_add=True)
    dados_anteriores = models.JSONField(blank=True, null=True)

    def __str__(self):
        return f"{self.sensor} - {self.acao} em {self.data.strftime('%Y-%m-%d %H:%M:%S')}"
