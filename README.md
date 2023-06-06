# Busy

Este proyecto fue generado con [Angular CLI](https://github.com/angular/angular-cli) versión 15.2.2.

## Primeros pasos

Lo primero que hay que tener en cuenta es que se tiene que instalar Angular y Nodejs
`npm i @angular/cli`
y node: https://nodejs.org/es/download

y tanto en la carpeta principal como en la API se ejecuta el siguiente comando: `npm install --force`
Como paso extra, hay que crear en la api un archivo llamado `.env` con este texto: `SECRET_JWT_SEED=holaxd`


## ¿Cómo lo hago funcionar en mi máquina?

En una consola posicionate en la carpeta de Busy y con las últimas versiones de NodeJS y Angular podrás poner el comando `ng serve` o `ng serve -o` para abrir automáticamente una pestaña. El siguiente paso sería ingresar a la API Rest `cd api` y poner `node server` o si tienes nodemon que es más cómodo: `nodemon`

`http://localhost:4200/` La aplicación se recargará automáticamente cada cuando guardes un archivo

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory.
