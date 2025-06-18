import pandas as pd
import os
from collections import defaultdict
from app_city.models import Sensor, Ambiente, DadoSensor

CAMINHO_PLANILHAS = r'C:\Users\47819795808\Desktop\Integrador\dados\importação'

def importar_dados_de_planilhas():
    #importa ambientes
    df_amb = pd.read_excel(os.path.join(CAMINHO_PLANILHAS, 'ambientes.xlsx'))
    for _, row in df_amb.iterrows():
        Ambiente.objects.get_or_create(
            sig=str(row['sig']).strip(),
            defaults={
                'descricao': str(row.get('descricao', '')).strip(),
                'ni': str(row.get('ni', '')).strip(),
                'responsavel': str(row.get('responsavel', '')).strip()
            }
        )

    #consolidar dados dos sensores
    dados_consolidados = defaultdict(dict)
    tipos_sensores = ['temperatura', 'umidade', 'luminosidade', 'contador']

    for tipo in tipos_sensores:
        caminho_arquivo = os.path.join(CAMINHO_PLANILHAS, f'{tipo}.xlsx')
        if not os.path.exists(caminho_arquivo):
            continue

        df = pd.read_excel(caminho_arquivo)

        for _, row in df.iterrows():
            mac = row['mac_address']
            timestamp = row['timestamp']

            #obter ou criar sensor
            sensor, created = Sensor.objects.get_or_create(
                tipo=tipo,
                mac_address=mac,
                defaults={
                    'unidade_medida': row.get('unidade_medida', ''),
                    'latitude': row.get('latitude', 0.0),
                    'longitude': row.get('longitude', 0.0),
                    'status': str(row.get('status', '')).lower() in ['ativo', 'true', '1'],
                }
            )

            #atualizar dados do sensor se precisar
            atualizou = False
            if not created:
                if pd.notna(row.get('latitude')) and sensor.latitude != row['latitude']:
                    sensor.latitude = row['latitude']
                    atualizou = True
                if pd.notna(row.get('longitude')) and sensor.longitude != row['longitude']:
                    sensor.longitude = row['longitude']
                    atualizou = True
                if 'status' in row:
                    status_val = str(row['status']).lower() in ['ativo', 'true', '1']
                    if sensor.status != status_val:
                        sensor.status = status_val
                        atualizou = True
                if atualizou:
                    sensor.save()

            chave = (sensor.id, timestamp)
            if 'sensor' not in dados_consolidados[chave]:
                dados_consolidados[chave]['sensor'] = sensor
                dados_consolidados[chave]['timestamp'] = timestamp

            dados_consolidados[chave][tipo] = row.get('valor')

    #criar registros únicos de DadoSensor
    for dados in dados_consolidados.values():
        DadoSensor.objects.create(
            sensor=dados['sensor'],
            timestamp=dados['timestamp'],
            temperatura=dados.get('temperatura'),
            umidade=dados.get('umidade'),
            luminosidade=dados.get('luminosidade'),
            contador=dados.get('contador')
        )

    #importar histórico 
    caminho_historico = os.path.join(CAMINHO_PLANILHAS, 'histórico.xlsx')
    if os.path.exists('histórico.xlsx'):
        df_hist = pd.read_excel('histórico.xlsx')

        for _, row in df_hist.iterrows():
            mac = row['mac_address']
            timestamp = row['timestamp']
            if pd.isna(timestamp):
                continue
            timestamp = pd.to_datetime(timestamp)

            sensor = Sensor.objects.filter(mac_address=mac).first()
            if not sensor:
                continue  

            valor = row.get('valor')
            if valor is None:
                continue

            DadoSensor.objects.create(
                sensor=sensor,
                timestamp=timestamp,
                temperatura=valor if sensor.tipo == 'temperatura' else None,
                umidade=valor if sensor.tipo == 'umidade' else None,
                luminosidade=valor if sensor.tipo == 'luminosidade' else None,
                contador=valor if sensor.tipo == 'contador' else None,
            )

    print("Importação  concluída com sucesso.")
