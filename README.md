# Tu Turno Web

Aplicación web de tienda de juegos de mesa desarrollada con Angular 19+, migrada desde un proyecto HTML/CSS/Bootstrap puro como parte del curso DSY2202.

## Descripción

Tu Turno Web es una PYME ficticia que vende juegos de mesa. La aplicación permite a los usuarios navegar por categorías de juegos, registrarse, iniciar sesión, agregar productos al carrito y gestionar su perfil. Incluye además un panel de administración.

## Tecnologías utilizadas

- Angular (standalone components)
- Reactive Forms (`ReactiveFormsModule`)
- Bootstrap 5.3
- TypeScript
- HTML5 / CSS3
- localStorage / sessionStorage
- Vitest (pruebas unitarias)

## Funcionalidades

- Catálogo de juegos por categoría (Rol, Familiares, Estrategia, Fiesta)
- Registro de usuarios con formulario reactivo y validaciones
- Login con redirección según rol (cliente / admin)
- Navbar dinámico según sesión activa
- Carrito de compras persistente en localStorage
- Perfil de usuario editable con formulario reactivo y validaciones
- Panel de administración con gestión de usuarios y productos
- Recuperación de contraseña con formulario reactivo

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

## Pruebas unitarias

El proyecto incluye pruebas unitarias ejecutadas con Vitest, siguiendo la misma sintaxis (`describe`, `it`, `expect`) que Jasmine.

Para ejecutar las pruebas:

```bash
ng test
```

**Pruebas implementadas:**

| Archivo | Prueba | Descripción |
|---|---|---|
| `registro.spec.ts` | Formulario inválido con campos vacíos | Verifica que el formulario reactivo de registro no sea válido si los campos obligatorios están vacíos |
| `registro.spec.ts` | Validación de formato de correo | Verifica que el campo correo sea inválido si no cumple el formato de email |
| `session.spec.ts` | Creación del servicio | Verifica que el `SessionService` se instancie correctamente |
| `session.spec.ts` | Creación automática del admin | Verifica que el servicio cree un usuario admin por defecto si no existe en localStorage |

Adicionalmente, todos los componentes cuentan con una prueba de creación (`should create`) para validar el correcto montaje del componente.

## Formularios reactivos y validaciones

Los formularios de **Registro**, **Login**, **Recuperar contraseña** y **Perfil** fueron migrados a Reactive Forms (`FormBuilder`, `FormGroup`, `Validators`).

**Validaciones implementadas:**

- Todos los campos obligatorios no pueden estar vacíos (excepto dirección de despacho, que es opcional)
- El correo debe seguir el formato de un email válido
- Las contraseñas (registro) deben coincidir entre sí
- La contraseña debe tener entre 6 y 18 caracteres, con al menos una mayúscula y un número
- La persona debe tener al menos 13 años para registrarse
- Cada formulario cuenta con botón de envío y botón de limpiar

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

## Directivas y características Angular utilizadas

- `*ngFor` — renderizado de listas dinámicas
- `*ngIf` — renderizado condicional
- `formControlName`, `[formGroup]` — formularios reactivos
- `[class]`, `[src]`, `[type]` — binding de atributos
- `(click)`, `(ngSubmit)` — manejo de eventos
- `routerLink` — navegación entre páginas
- `OnInit` — lifecycle hook para inicialización de formularios y carga de datos

## Autor

Desarrollado por Fernando — DSY2202