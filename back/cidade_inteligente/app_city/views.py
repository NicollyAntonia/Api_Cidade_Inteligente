from rest_framework import viewsets, permissions,status
from rest_framework.generics import ListAPIView
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.permissions import IsAdminUser, IsAuthenticated, AllowAny
from django.utils.dateparse import parse_datetime
from .models import Ambiente, Sensor, DadoSensor,HistoricoSensor
from .serializers import AmbienteSerializer, SensorSerializer, DadoSensorSerializer, HistoricoSensorSerializer,UsuarioRegistroSerializer
from .importar import importar_dados_de_planilhas
from .exportar import exportar_dados
from django.contrib.auth.models import User

#cadastro usuario
class RegistroUsuarioView(APIView):
    permission_classes = [AllowAny]

    def post(self, request):
        username = request.data.get('username')
        password = request.data.get('password')

        if not username or not password:
            return Response({'erro': 'Usuário e senha são obrigatórios'}, status=status.HTTP_400_BAD_REQUEST)

        if User.objects.filter(username=username).exists():
            return Response({'erro': 'Usuário já existe'}, status=status.HTTP_400_BAD_REQUEST)

        User.objects.create_user(username=username, password=password)
        return Response({'mensagem': 'Usuário criado com sucesso'}, status=status.HTTP_201_CREATED)
    
#viewset para crud completo do modelo ambiente
class AmbienteViewSet(viewsets.ModelViewSet):
    queryset = Ambiente.objects.all()
    serializer_class = AmbienteSerializer
    permission_classes = [permissions.IsAuthenticated]  

    def perform_create(self, serializer):
        ambiente = serializer.save() 
        sensor, created = Sensor.objects.get_or_create(ambiente=ambiente)
        HistoricoSensor.objects.create(sensor=sensor, acao='criado')

    def perform_update(self, serializer):
        ambiente = self.get_object()
        sensor = Sensor.objects.get(ambiente=ambiente)
        dados_anteriores = {
            "tipo": sensor.tipo,
            "mac_address": sensor.mac_address,
            "unidade_medida": sensor.unidade_medida,
            "latitude": sensor.latitude,
            "longitude": sensor.longitude,
            "status": sensor.status,
            "ambiente": sensor.ambiente_id,
        }
        serializer.save()
        HistoricoSensor.objects.create(sensor=sensor, acao='atualizado', dados_anteriores=dados_anteriores)

#viewset para crud completo do modelo sensor
class SensorViewSet(viewsets.ModelViewSet):
    queryset = Sensor.objects.all()
    serializer_class = SensorSerializer
    permission_classes = [permissions.IsAuthenticated]

#viewset para crud completo do modelo dadosensor
class DadoSensorViewSet(viewsets.ModelViewSet):
    queryset = DadoSensor.objects.all()
    serializer_class = DadoSensorSerializer
    permission_classes = [permissions.IsAuthenticated]
    
#endpoint para filtrar dados dos sensores com múltiplos critérios
class FiltroDadoSensorView(ListAPIView):
    serializer_class = DadoSensorSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        queryset = DadoSensor.objects.select_related('sensor__ambiente')

        # filtros recebidos via query string
        sensor_id = self.request.query_params.get('sensor_id')
        tipo = self.request.query_params.get('tipo')
        data_inicio = self.request.query_params.get('data_inicio')
        data_fim = self.request.query_params.get('data_fim')
        sig = self.request.query_params.get('sig')
        historico_id = self.request.query_params.get('id')

        if sensor_id:
            queryset = queryset.filter(sensor__id=sensor_id)

        if tipo:
            queryset = queryset.filter(sensor__tipo=tipo)

        if data_inicio:
            data_inicio = parse_datetime(data_inicio)
            if data_inicio:
                queryset = queryset.filter(timestamp__gte=data_inicio)

        if data_fim:
            data_fim = parse_datetime(data_fim)
            if data_fim:
                queryset = queryset.filter(timestamp__lte=data_fim)

        if sig:
            queryset = queryset.filter(sensor__ambiente__sig__icontains=sig)

        if historico_id:
            queryset = queryset.filter(id=historico_id)

        return queryset.order_by('-timestamp')

#endpoint para importação de dados de planilhas 
class ImportarDadosView(APIView):
    permission_classes = [IsAdminUser]  

    def post(self, request):
        try:
            importar_dados_de_planilhas()  
            return Response({"mensagem": "Importação concluída com sucesso."})
        except Exception as e:
            return Response({"erro": str(e)}, status=500)

#endpoint para exportação de dados para excel 
class ExportarDadosView(APIView):
    permission_classes = [IsAdminUser]  

    def get(self, request):
        try:
            caminho = r'C:\Users\47819795808\Desktop\Integrador\dados\exportação\dados_exportados.xlsx'
            exportar_dados(caminho)  
            return Response({"mensagem": f"Exportação concluída. Arquivo salvo em: {caminho}"})
        except Exception as e:
            return Response({"erro": str(e)}, status=500)

class HistoricoSensorViewSet(viewsets.ReadOnlyModelViewSet):
    queryset = HistoricoSensor.objects.select_related('sensor')
    serializer_class = HistoricoSensorSerializer
    permission_classes = [permissions.IsAuthenticated]

