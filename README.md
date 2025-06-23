"Guia de Execução do Projeto Smart City
🖥️ Back-end (Django)
1. Acesse a pasta do back-end.
2. Crie o ambiente virtual:
python -m venv env
3. Ative o ambiente virtual:
•	Windows:
env\Scripts\activate
4. Instale as dependências do projeto:
pip install -r requirements.txt
Isso irá instalar todas as bibliotecas necessárias, como Django, djangorestframework, pandas, entre outras.
5. Instale o CORS Headers (caso ainda não esteja listado no requirements):
pip install django-cors-headers
6. Acesse a pasta principal do projeto Django:
cd cidade_inteligente
7. Inicie o servidor do Django:
python manage.py runserver
🌐 Front-end (React)
1. Abra uma nova aba do terminal e acesse a pasta do front-end.
2. Instale as dependências do projeto:
npm install
3. Instale bibliotecas adicionais necessárias:
npm install axios
npm install react-leaflet leaflet
4. Inicie o servidor do React:
npm start
⚠️ Dica em caso de erro no front-end
Se ocorrer algum erro relacionado a dependências, recomenda-se apagar os módulos e reinstalar:
rm -rf node_modules
rm package-lock.json
npm install
" 




