# Tu Turno Web

Aplicación web de tienda de juegos de mesa desarrollada con Angular 22, migrada desde un proyecto HTML/CSS/Bootstrap puro como parte del curso DSY2202.

## Descripción

Tu Turno Web es una PYME ficticia que vende juegos de mesa. La aplicación permite a los usuarios navegar por categorías de juegos, registrarse, iniciar sesión, agregar productos al carrito y gestionar su perfil. Incluye además un panel de administración.

## Tecnologías utilizadas

- Angular 22 (standalone components)
- Reactive Forms (`ReactiveFormsModule`)
- Bootstrap 5.3
- TypeScript
- HTML5 / CSS3
- localStorage / sessionStorage
- Vitest (pruebas unitarias)
- RxJS (`BehaviorSubject`, `Observable`)
- HttpClient (consumo de API externa)

## Funcionalidades

- Catálogo dinámico de juegos por categoría con ruta `/juegos/:categoria`
- Datos de productos consumidos desde API externa (GitHub Pages)
- Registro de usuarios con formulario reactivo, validaciones y detección de duplicados
- Login con redirección según rol (cliente / admin)
- Navbar global reactivo según sesión activa
- Carrito de compras con cantidad por producto, subtotal y eliminación individual
- Perfil de usuario editable con formulario reactivo y validaciones
- Panel de administración con gestión de usuarios y productos
- Recuperación de contraseña con formulario reactivo
- Guards de rutas para proteger `/perfil` y `/admin`

## Credenciales de administrador

| Campo | Valor |
|---|---|
| Usuario | admin |
| Contraseña | Admin123! |

## Instalación y ejecución

Clona el repositorio e instala las dependencias:

```bash
npm install --legacy-peer-deps
```

Levanta el servidor de desarrollo:

```bash
ng serve
```

Abre el navegador en `http://localhost:4200/`

## Documentación

Para generar y ver la documentación con Compodoc:

```bash
npm run compodoc
```

Abre el navegador en `http://127.0.0.1:8080`

## Pruebas unitarias

El proyecto usa Vitest como framework de pruebas, que Angular 22 incluye por defecto en reemplazo de Karma/Jasmine. Vitest utiliza la misma sintaxis que Jasmine (`describe`, `it`, `expect`, `beforeEach`), por lo que es funcionalmente equivalente.

Para ejecutar las pruebas:

```bash
ng test
```

**Resultado:** 16 archivos de prueba, 23 tests, todos en verde ✅

**Pruebas implementadas:**

| Archivo | Prueba | Descripción |
|---|---|---|
| `registro.spec.ts` | Formulario inválido con campos vacíos | Verifica que el formulario reactivo no sea válido si los campos obligatorios están vacíos |
| `registro.spec.ts` | Validación de formato de correo | Verifica que el campo correo sea inválido si no cumple el formato de email |
| `registro.spec.ts` | Contraseña inválida | Verifica que la contraseña sea inválida si no cumple el patrón de seguridad |
| `registro.spec.ts` | Contraseñas no coinciden | Verifica que confirmarContrasena tenga error si las contraseñas no coinciden |
| `registro.spec.ts` | Edad menor a 13 | Verifica que fechaNacimiento tenga error si el usuario tiene menos de 13 años |
| `session.spec.ts` | Creación del servicio | Verifica que el `SessionService` se instancie correctamente |
| `session.spec.ts` | Creación automática del admin | Verifica que el servicio cree un usuario admin por defecto si no existe en localStorage |

## API externa

Los productos se consumen desde una API JSON publicada en GitHub Pages:

https://fereyesp-cloud.github.io/api-productos/productos.json

El JSON tiene la siguiente estructura:

```json
{
  "categorias": [
    {
      "categoria": "Juegos de Rol",
      "productos": [
        {
          "id": 1,
          "nombre": "Caos en Neverwinter",
          "precio": 59990,
          "descuento": "10% con pagos en transferencia",
          "imagen": "img/caosNeverwinter .webp",
          "stock": 10
        }
      ]
    }
  ]
}
```

## Guards de rutas

| Ruta | Guard | Descripción |
|---|---|---|
| `/perfil` | `authGuard` | Redirige al login si no hay sesión activa |
| `/admin` | `adminGuard` | Redirige al home si el usuario no es admin |

## Formularios reactivos y validaciones

Los formularios de **Registro**, **Login**, **Recuperar contraseña** y **Perfil** fueron migrados a Reactive Forms (`FormBuilder`, `FormGroup`, `Validators`).

**Validaciones implementadas:**

- Todos los campos obligatorios no pueden estar vacíos (excepto dirección de despacho)
- El correo debe seguir el formato de un email válido
- Las contraseñas deben coincidir entre sí
- La contraseña debe tener entre 6 y 18 caracteres, con al menos una mayúscula, un número y un carácter especial
- La persona debe tener al menos 13 años para registrarse
- No se permiten correos ni nombres de usuario duplicados en el registro

## Estructura del proyecto

src/app/
├── guards/
│   ├── auth-guard.ts
│   └── admin.ts
├── pages/
│   ├── home/
│   ├── catalogo/
│   ├── productos-api/
│   ├── login/
│   ├── registro/
│   ├── recuperar-contrasena/
│   ├── carrito/
│   ├── perfil/
│   ├── admin-dashboard/
│   ├── juegos-rol/
│   ├── juegos-familiares/
│   ├── juegos-estrategia/
│   └── juegos-fiesta/
├── shared/
│   └── navbar/
└── services/
├── session.ts
├── producto.ts
└── productos-api.ts

## Directivas y características Angular utilizadas

- `*ngFor` — renderizado de listas dinámicas
- `*ngIf` — renderizado condicional
- `formControlName`, `[formGroup]` — formularios reactivos
- `[class]`, `[src]`, `[type]` — binding de atributos
- `(click)`, `(ngSubmit)` — manejo de eventos
- `routerLink` — navegación entre páginas
- `OnInit` — lifecycle hook para inicialización
- `ActivatedRoute` — lectura de parámetros de ruta dinámica
- `BehaviorSubject` — estado reactivo de sesión en tiempo real
- `ChangeDetectorRef` — detección manual de cambios en la vista
- `HttpClient` — consumo de API externa
- `Observable` + `subscribe` — manejo de datos asíncronos
- `CanActivate` — guards para protección de rutas

## Autor

Desarrollado por Fernando — DSY2202