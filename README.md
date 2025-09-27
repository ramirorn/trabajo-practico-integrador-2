# 🧪 Trabajo Práctico Integrador 2 – Proyecto Integrador con MongoDB

## 📌 Descripción

Este proyecto es una implementación de un sistema backend utilizando Node.js, Express y MongoDB. Su objetivo es gestionar relaciones entre entidades mediante la elección entre embebido y referenciado, considerando las ventajas y desventajas de cada enfoque.

## 🧠 Decisiones de Modelado: Embebido vs Referenciado

### 📚 Embebido

**¿Por qué se eligió embebido?**

Se optó por el modelo embebido en relaciones uno a uno y uno a muchos donde los datos relacionados tienen una vida útil similar y no se actualizan con frecuencia. Esto permite:

- **Lecturas más rápidas**: Al almacenar los datos relacionados en un solo documento, se reduce la necesidad de múltiples consultas.
- **Atomicidad**: Las actualizaciones se realizan en un solo documento, garantizando consistencia.

**Ventajas:**

- Menor número de consultas.
- Mejor rendimiento en lecturas.
- Consistencia garantizada en actualizaciones.

**Desventajas:**

- Posible duplicación de datos.
- Documentos más grandes pueden afectar el rendimiento.
- Menos flexibilidad si los datos embebidos cambian con frecuencia.

### 🔗 Referenciado

**¿Por qué se eligió referenciado?**

Se optó por el modelo referenciado en relaciones muchos a muchos y cuando los datos relacionados pueden cambiar independientemente. Esto permite:

- **Flexibilidad**: Los cambios en los datos relacionados no requieren la actualización de múltiples documentos.
- **Escalabilidad**: Mejor manejo de grandes volúmenes de datos relacionados.

**Ventajas:**

- Reducción de duplicación de datos.
- Mayor flexibilidad en actualizaciones.
- Mejor manejo de relaciones complejas.

**Desventajas:**

- Necesidad de realizar múltiples consultas.
- Complejidad en la gestión de relaciones.
- Posibles problemas de consistencia si no se gestionan adecuadamente.

## 🛠️ Instalación y Configuración

### Requisitos

- Node.js 
- MongoDB (local o Atlas)

### Pasos

1. Clonar el repositorio:

   git clone https://github.com/ramirorn/trabajo-practico-integrador-2.git
   cd trabajo-practico-integrador-2
   code .

2. Instalar dependecias:
    npm i 

3. Modificar las variables de entorno:
    1. El .env.example tiene todo lo necesario para el correcto funcionamiento del proyecto.
    2. Cambia las variables de entorno por las de tu preferencia.

4. Levantar el servidor:
 _En el package.json ya tengo configurado el script para levantar app.js.
 _Solo debes escribir en la terminal lo siguiente: "npm run dev".
 _"dev" es el script que elegi para levantar el servidor.

### Validaciones personalizadas (custom) y su explicación

 .custom(async (tagId) => {
      const tag = await TagModel.findById(tagId);
      if (!tag) {
        throw new Error("El tag no existe");
      }
    }),
_Esta validacion verifica que la Tag exista, al buscarla por su ID

.custom(async (article) => {
      // Verifica la existencia del article
      const articleExist = await ArticleModel.findOne({ _id: article });
      if (!articleExist) throw new Error("El article no existe");
    }),
_Esta validacion tambien verifica existencia, en este caso de un Article

.custom(async (name) => {
      const nameExists = await TagModel.findOne({ name: name });
      if (nameExists) throw new Error("El nombre de la tag ya existe");
    }),
_Esta validacionverifica existencia del name

.custom(async (username) => {
      // Comprueba la existencia de un username
      const userNameExists = await UserModel.findOne({ username: username });
      if (userNameExists)
        throw new Error("El username ya existe, ingrese otro");
    }),
_Verifica si no existe un usuario con ese username

.custom(async (email) => {
      // Comprueba la existencia de un email
      const emailExists = await UserModel.findOne({ email: email });
      if (emailExists)
        throw new Error("El email ya esta en uso, pruebe con otro");
    }),
_Verifica si ese email esta en uso o no

# Estas son las validaciones que normalmente uso, suelo manejar los errores con throw new Error() que hace que no pase la validacion al justamente saltar el error


## COLECCION AUTH
### 📤 Request
# POST http://localhost:3000/api/auth/register
{
    "username":"prueba2",
    "email":"ramiro074@gmail.com",
    "password": "Abc12345",
    "role": "user",
    "profile": {
        "firstName":"Ramiro",
        "lastName":"Roman",
        "biography": "Holaaaaa",
        "avatarUrl": "https://example.com/avatar.png",
        "birthdate": "2006-09-29"
    }
}
### 📥 Response
{
    "ok": true,
    "msg": "Usuario creado correctamente",
    "user": {
        "username": "prueba2",
        "email": "ramiro074@gmail.com",
        "password": "$2b$10$LqtZCXprCIjNymVtt3YhZeLbH/ONYt1F4DnWus2yzi0L1oRLdL8BS",
        "role": "user",
        "deleted_at": null,
        "profile": {
            "firstName": "Ramiro",
            "lastName": "Roman",
            "biography": "Holaaaaa",
            "avatarUrl": "https://example.com/avatar.png",
            "birthdate": "2006-09-29T00:00:00.000Z"
        },
        "_id": "68d83e62a8b0812c80c4a65b",
        "createdAt": "2025-09-27T19:43:30.087Z",
        "updatedAt": "2025-09-27T19:43:30.087Z",
        "id": "68d83e62a8b0812c80c4a65b"
    }
}

## COLECCION USERS
### 📤 Request
# DELETE http://localhost:3000/api/users/68d83e62a8b0812c80c4a65b

### 📥 Response
{
    "ok": true,
    "message": "Usuario eliminado exitosamente",
    "data": {
        "profile": {
            "firstName": "Ramiro",
            "lastName": "Roman",
            "biography": "Holaaaaa",
            "avatarUrl": "https://example.com/avatar.png",
            "birthdate": "2006-09-29T00:00:00.000Z"
        },
        "_id": "68d83e62a8b0812c80c4a65b",
        "username": "prueba2",
        "email": "ramiro074@gmail.com",
        "password": "$2b$10$LqtZCXprCIjNymVtt3YhZeLbH/ONYt1F4DnWus2yzi0L1oRLdL8BS",
        "role": "user",
        "deleted_at": "2025-09-27T19:50:17.536Z",
        "createdAt": "2025-09-27T19:43:30.087Z",
        "updatedAt": "2025-09-27T19:50:17.537Z",
        "id": "68d83e62a8b0812c80c4a65b"
    }
}

## COLECCIÓN TAGS
### 📤 Request
# GET http://localhost:3000/api/tags

### 📥 Response
[
    {
        "_id": "68d7fbdb64b7e8e353472f79",
        "name": "tag numero 1",
        "description": "hola esta  es mi primer tag",
        "createdAt": "2025-09-27T14:59:39.431Z",
        "updatedAt": "2025-09-27T14:59:39.431Z",
        "__v": 0
    }
]

## COLECCIÓN ARTICLES
### 📤 Request
# GET http://localhost:3000/api/articles/my

### 📥 Response
{
    "ok": true,
    "message": "Estos son tus articulos",
    "comments": [
        {
            "_id": "68d8422225dc3aa72f1cd105",
            "title": "ramiroo",
            "content": "eeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee",
            "excerpt": "false",
            "status": "published",
            "author": "68d83fb9a8b0812c80c4a65f",
            "tags": [],
            "createdAt": "2025-09-27T19:59:30.996Z",
            "updatedAt": "2025-09-27T19:59:30.996Z",
            "id": "68d8422225dc3aa72f1cd105"
        }
    ]
}

## COLECCIÓN COMMENTS
### 📤 Request
# GET http://localhost:3000/api/comments/article/68d841c6a8b0812c80c4a665

### 📥 Response
{
    "ok": true,
    "Comment": [
        {
            "_id": "68d8430125dc3aa72f1cd109",
            "content": "HOLA TE MANDO UN SALUDO",
            "author": "68d83fb9a8b0812c80c4a65f",
            "article": {
                "content": "eeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee",
                "id": null
            },
            "createdAt": "2025-09-27T20:03:13.628Z",
            "updatedAt": "2025-09-27T20:03:13.628Z"
        }
    ]
}

## COLECCIÓN ARTICLE_TAG
### 📤 Request
# POST http://localhost:3000/api/articles/68d841c6a8b0812c80c4a665/tags/68d7fbdb64b7e8e353472f79

### 📥 Response
{
    "ok": true,
    "message": "Tag agregado al article",
    "addTagToArticle": {
        "_id": "68d841c6a8b0812c80c4a665",
        "title": "ramior",
        "content": "eeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee",
        "excerpt": "false",
        "status": "published",
        "author": "68d7f29acfa7993921a5eb8b",
        "tags": [
            "68d7fbdb64b7e8e353472f79"
        ],
        "createdAt": "2025-09-27T19:57:58.873Z",
        "updatedAt": "2025-09-27T20:05:18.741Z",
        "id": "68d841c6a8b0812c80c4a665"
    }
}

