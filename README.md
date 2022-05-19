Esta app ANGULAR funciona como frontend del proyecto STAR WARS DATABASE.

Hace uso de los datos backend que son provistos mediante una aplicacion de Laravel por mi propia creación encontrada
en esta dirección: https://github.com/pablosmr7/star-wars

Las funcionalidades que se le han implementado a este fronend son las siguientes:

- Manejo de datos de naves espaciales de Star Wars en formato CRUD. (Create, Read, Update, Delete.)<br>

-Cada recurso de nave es capaz de mostrar todos sus piotos asociados <br>

- Manejo de pilotos asociados a naves espaciales: <br>
    -Cada nave puede asignarse pilotos nuevos desde un desplegable de pilotos.<br>
    -Cada nave puede eliminar cualquier piloto que tenga asignado.<br>
    
-Además, cada nave cuenta con un precio en creditos, pero nuestro cliente no entiende nuestra notación, por lo que se
ha cambiado el precio de cada nave a una notacion con caracteres especiales en base 15. Esta transformación se realiza en
frontend.<br>

Todas las partes de este proyecto se han realizado siguiendo el modelo SPA (Single Page Application).
Los factores que mas se han tenido en cuenta han sido, en orden: funcionalidad, adaptabilidad, y crecimiento exponencial y sencillo de la API
