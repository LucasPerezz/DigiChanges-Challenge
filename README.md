### Link Frontend

https://digi-changes-challenge.vercel.app/


### Link Backend

https://digichanges-challenge-backend.onrender.com/api/v1


### Link Repositorio de Github

https://github.com/LucasPerezz/DigiChanges-Challenge


### Tecnologias 

## Frontend
Tailwind Css
Daisy UI
Next.Js
TypeScript
Vercel

## Backend
Express.Js
TypeScript
Jest with Supertest
MongoDB
Mongoose
Render 

## Herramientas
Postman
Visual Studio Code
Git
Github

## Documentacion
Migracion de npm a pnpm
https://britishgeologicalsurvey.github.io/development/migrating-from-npm-to-pnpm/


## Notas
Agregar una dependencia con pnpm -> pnpm add [dependencia] -w //Instala la dependencia en el workspace


Feedback frontend:
[X] Faltan loaders que den una mejor experiencia de usuario, cuando la API tarda en responder no se sabe si la APP se trabo o hay que esperar.
[] Se duplica el codigo innecesariamente, por ejemplo, en la paginación se repite la misma lógica en todos los page.
[X] Se dejaron varios logs a lo largo de la app.
[X] La app, a veces, crashea cuando queres ver un detalle de una entidad.
[Back [X], front[]] La paginación esta hecha solo de el front-end, es decir, se hace un get all y de ahí se pagina. Lo que debería hacerse es hacer un limit y un offset para pedir solo la cantidad de items necesarios por pagina.


Feedback backend:
[X] No se implementaron filtros ni paginación
[X] Se dejo la carpeta DIST en el repositorio. (Esto es mala practica, no esn necesario subir el build a github)
[] Se manejan ciclos iterativos para guardar información en la DB cuando podríamos hacer un insertMany.
[] Lógica de la aplicación se concentra en el controlador, cuando no es su funcionalidad, debería haber casos de uso / servicios. (estudiar arquitectura en capas)
[X] No usar NPM como gestor de paquetes, usar PNPM.
