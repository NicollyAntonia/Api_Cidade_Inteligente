from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import AmbienteViewSet, SensorViewSet,HistoricoSensorViewSet, DadoSensorViewSet, FiltroDadoSensorView,RegistroUsuarioView
from .views import ImportarDadosView, ExportarDadosView
from rest_framework_simplejwt.views import TokenObtainPairView,TokenRefreshView
from drf_spectacular.views import SpectacularAPIView, SpectacularRedocView, SpectacularSwaggerView


#urls do crud
router = DefaultRouter()
router.register(r'ambientes', AmbienteViewSet)
router.register(r'sensores', SensorViewSet)
router.register(r'dados', DadoSensorViewSet)
router.register(r'historico', HistoricoSensorViewSet)

urlpatterns = [
    path('', include(router.urls)),
    path('importar/', ImportarDadosView.as_view(), name='importar_dados'),
    path('exportar/', ExportarDadosView.as_view(), name='exportar_dados'),
    path('api/token/', TokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('cadastro/',RegistroUsuarioView.as_view(),name='registro-usuario'),
    path('api/token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
    path('dados/filtrar/', FiltroDadoSensorView.as_view(), name='filtro_dados'),
 

    #urls para gerrar doc automatica
    path('api/schema/', SpectacularAPIView.as_view(), name='schema'),
    path('api/docs/', SpectacularSwaggerView.as_view(url_name='schema'), name='swagger-ui'),
    path('api/redoc/', SpectacularRedocView.as_view(url_name='schema'), name='redoc'),
]
