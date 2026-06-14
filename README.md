# Tu Turno Web

Aplicación web de tienda de juegos de mesa desarrollada con Angular 19, migrada desde un proyecto HTML/CSS/Bootstrap puro como parte del curso DSY2202.

## Descripción

Tu Turno Web es una PYME ficticia que vende juegos de mesa. La aplicación permite a los usuarios navegar por categorías de juegos, registrarse, iniciar sesión, agregar productos al carrito y gestionar su perfil. Incluye además un panel de administración.

## Tecnologías utilizadas

- Angular 19
- Bootstrap 5.3
- TypeScript
- HTML5 / CSS3
- localStorage / sessionStorage

## Funcionalidades

- Catálogo de juegos por categoría (Rol, Familiares, Estrategia, Fiesta)
- Registro de usuarios con validaciones
- Login con redirección según rol (cliente / admin)
- Navbar dinámico según sesión activa
- Carrito de compras persistente en localStorage
- Perfil de usuario editable con validaciones
- Panel de administración con gestión de usuarios y productos
- Recuperación de contraseña

## Credenciales de administrador

| Campo | Valor |
|---|---|
| Usuario | admin |
| Contraseña | Admin123! |

## Instalación y ejecución

Clona el repositorio e instala las dependencias:

```bash
npm install
```

Levanta el servidor de desarrollo:

```bash
ng serve
```

Abre el navegador en `http://localhost:4200/`

## Estructura del proyecto

src/app/

├── pages/

│   ├── home/

│   ├── juegos-rol/

│   ├── juegos-familiares/

│   ├── juegos-estrategia/

│   ├── juegos-fiesta/

│   ├── login/

│   ├── registro/

│   ├── recuperar-contrasena/

│   ├── carrito/

│   ├── perfil/

│   └── admin-dashboard/

├── shared/

│   └── navbar/

└── services/

└── session.ts

## Directivas Angular utilizadas

- `*ngFor` — renderizado de listas dinámicas
- `*ngIf` — renderizado condicional
- `[(ngModel)]` — binding bidireccional en formularios
- `[class]`, `[src]`, `[type]` — binding de atributos
- `(click)` — manejo de eventos
- `routerLink` — navegación entre páginas

## Autor

Desarrollado por Fernando Reyes — DSY2202