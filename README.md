## ConectaTestFront

Aplicación frontend desarrollada con Angular 18

# Despliegue usando Docker:
1. Una vez descargado el proyecto, en la terminal, ubicados en la raiz del proyecto ejecutamos el comando ```docker build -t conecta-test-front .``` para construir la imagen
2. Cuando la imagen se haya construido correctamente, ejecutamos el comando ```docker run -d -p 8081:8081 --name conecta-front-cont conecta-test-front:latest```

La aplicación estara disponible en el navegador en http://localhost:4201/


