# Restaurante App

## Introducción

La aplicación Restaurante App es una plataforma de pedido en línea Nuestra aplicación permite a los clientes explorar nuestro menú, realizar pedidos de manera fácil y segura.

## Características

- Menú digital
- Pedido en línea

## Requisitos del sistema

- Angular 18
- Ionic 7.2.0
- Node.js 22.5.1
- iOS 14.0 o superior
- Android 10.0 o superior

## Instalación y configuración

1. Descargue e instale las dependencias ejecutando `npm install`.
2. Configure la base de datos en firebase en `environment` cambiando los valores `firebaseConfig` con los valores de su
  cuenta del proyecto la Informacion la encuentras en ajustes Informacion del Proyecto de Firebase:

- configurar el siguiente archivo con los valores de tu app firebase:

```
// src/environments/environment.ts
export const environment = {
  production: false,
  firebaseConfig: {
    apiKey: "TU_API_KEY",
    authDomain: "TU_AUTH_DOMAIN",
    projectId: "TU_PROJECT_ID",
    storageBucket: "TU_STORAGE_BUCKET",
    messagingSenderId: "TU_MESSAGING_SENDER_ID",
    appId: "TU_APP_ID",
    measurementId: "TU_MEASUREMENT_ID"
  }
};

```
3. Ademas debes activar la opciones en Console firebase:
4. FireStore Database: Activar 
5. Authentication: Activar registrar por email y password
6. Storage: Activar

7. Para correr el proyecto `ng serve`

## Uso de la aplicación

1. Abra la aplicación registrarse en el login y navegue por el menú.
2. Seleccione los platos que desee ordenar y agregue al carrito.
3. Visualize las ventas realizadas

## Créditos y agradecimientos

- Desarrollado por Juan Rodriguez
- Agradecimientos a Quanto

## Licencia

La aplicación Restaurante App se distribuye bajo la licencia MIT.

## Tecnologias

**Client:** Angular 18, Ionic, TailwindCSS ,Firebase

**Server:** Node, Express ,Typescript ,Firebase

## Screenshots

![App Screenshot](https://firebasestorage.googleapis.com/v0/b/restaurante-fb-396ad.appspot.com/o/home.png?alt=media&token=d25d9659-06a4-4564-8633-61bf09c8d760)
