import pandas as pd
from app_city.models import DadoSensor

 #consulta todos os dados do modelo DadoSensor
def exportar_dados(caminho_arquivo):
    dados = DadoSensor.objects.select_related('sensor', 'sensor__ambiente').all().values(
        'sensor__tipo',
        'sensor__mac_address',
        'sensor__unidade_medida',
        'sensor__latitude',
        'sensor__longitude',
        'sensor__status',
        'sensor__ambiente__sig',
        'sensor__ambiente__descricao',
        'sensor__ambiente__ni',
        'sensor__ambiente__responsavel',
        'temperatura',
        'umidade',
        'luminosidade',
        'contador',
        'timestamp'
    )

    #remove o fuso horário da coluna timestamp
    df = pd.DataFrame(dados)
    if 'timestamp' in df.columns:
        df['timestamp'] = pd.to_datetime(df['timestamp']).dt.tz_localize(None)

    #renomea colunas para uma exportação mais legível 
    df.rename(columns={
        'sensor__tipo': 'tipo',
        'sensor__mac_address': 'mac_address',
        'sensor__unidade_medida': 'unidade_medida',
        'sensor__latitude': 'latitude',
        'sensor__longitude': 'longitude',
        'sensor__status': 'status',
        'sensor__ambiente__sig': 'ambiente',
        'sensor__ambiente__descricao': 'descricao',
        'sensor__ambiente__ni': 'ni',
        'sensor__ambiente__responsavel': 'responsavel'
    }, inplace=True)

    #exporta para arquivo Excel
    df.to_excel(caminho_arquivo, index=False)
