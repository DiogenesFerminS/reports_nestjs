## INICIAR LA APP EN MODO DESARROLLO

1. Clonar el repositorio
2. Instalar los modulos de node
3. levantar la base de datos ```docker compose up -d ```
4. Renombra el .env-template a .env y asignar las variables de entorno
5. Iniciar el servidor ```npm run start:dev```
6. Ejecutar el seed llamando al endpoint get ```/api/seed```

## ENDPOINTS DISPONIBLES

1. ```localhost:8080/api/seed/``` para reconstruir la data para generar los reportes

2. ```localhost:8080/api/seed/test``` para ver toda la data construida

3. ```localhost:8080/api/basic-reports/employment-letter/``` para generar una constancia de empleo basica

4. ```localhost:8080/api/basic-reports/employment-letter/:id``` para generar una constancia de empleo personalizada con los datos del empleado

5. ```localhost:8080/api/basic-reports/countries/``` para generar tablas de todos los paises registrados en el DB

6. ```localhost:8080/api/basic-reports/countries/:id``` para generar reporte de un pais especifico por su id