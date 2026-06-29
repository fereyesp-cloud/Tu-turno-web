import { Injectable } from '@angular/core';

/**
 * interfaz que defiuine la estructura de un producto
 */
export interface Producto {
  /** Nombre del juego */
  nombre: string;
   /** Categoría del juego */
  categoria: string;
  /** Descripción del juego */
  descripcion: string;
   /** Precio formateado del juego */
  precio: string;
  /** Precio numérico para cálculos */
  precioData: string;
  /** Información de descuento */
  descuento: string;
  /** Ruta de la imagen del juego */
  imagen: string;
}

/**
 * Servicio para la gestión de productos de la tienda
 */
@Injectable({
  providedIn: 'root'
})
export class ProductoService {

  /**
   * Gestion de los producto de juegos de rol
   */

  private juegosRol: Producto[] = [
    {
      nombre: 'Caos en Neverwinter',
      categoria: 'Juego de Rol',
      descripcion: 'En Caos en Neverwinter, vivirás una épica aventura cooperativa en el universo de Dungeons & Dragons.',
      precio: '$59.990',
      precioData: '59990',
      descuento: '10% con pagos en transferencia',
      imagen: 'img/caosNeverwinter .webp'
    },
    {
      nombre: 'El Señor De Los Anillos Lcg Caja Básica',
      categoria: 'Juego de Rol',
      descripcion: 'En El Señor de los Anillos: el Juego de Cartas, los jugadores reúnen un grupo de aventureros que intentan completar misiones en la Tierra Media.',
      precio: '$59.990',
      precioData: '59990',
      descuento: 'Sin descuento',
      imagen: 'img/señorDeAnillos .webp'
    },
    {
      nombre: 'Dungeons And Dragons Inicio - Héroes De Tierras Fronterizas',
      categoria: 'Juego de Rol',
      descripcion: 'Este juego de mesa cooperativo traslada la experiencia de D&D a un formato dinámico. Apto para diversos niveles de experiencia.',
      precio: '$69.990',
      precioData: '69990',
      descuento: 'Sin descuento',
      imagen: 'img/dungeons .webp'
    }
  ];

  /**
   * Gestion de los producto de juegos familiares
   */

  private juegosFamiliares: Producto[] = [
    {
      nombre: 'Basta',
      categoria: 'Juegos familiares',
      descripcion: 'Eleve su Noche de Juego con este completo juego de palabras de mesa, con una rueda con temporizador, 36 tarjetas en 144 categorías, para 2-8 jugadores.',
      precio: '$9.990',
      precioData: '9990',
      descuento: '10% con pagos en transferencia',
      imagen: 'img/juegoBasta .webp'
    },
    {
      nombre: 'Improvisado',
      categoria: 'Juegos familiares',
      descripcion: 'Improvisado es un alocado juego en el cual dos participantes se enfrentan en un duelo de actuación e improvisación frente a sus amigos.',
      precio: '$17.990',
      precioData: '17990',
      descuento: 'Sin descuento',
      imagen: 'img/improvisado .webp'
    },
    {
      nombre: 'Party & Co Family',
      categoria: 'Juegos familiares',
      descripcion: 'El verdadero juego de desafíos para toda la FAMILIA! Con dos niveles de dificultad: pruebas para niños y para adultos, con mímica, dibujo y preguntas.',
      precio: '$17.990',
      precioData: '17990',
      descuento: 'Sin descuento',
      imagen: 'img/partyFamily .webp'
    }
  ];

  /**
   * Se gestiona todos los productos de juegos de estrategia
   */

  private juegosEstrategia: Producto[] = [
    {
      nombre: 'EXIT: El laberinto maldito',
      categoria: 'Juegos de estrategia',
      descripcion: 'Juego de escape cooperativo para 1-4 personas, a partir de 10 años, con partidas de 60 a 90 minutos. Los jugadores exploran e interactúan con el entorno hasta hallar la salida.',
      precio: '$39.990',
      precioData: '39990',
      descuento: '10% con pagos en transferencia',
      imagen: 'img/ExitLaberintoMaldito .webp'
    },
    {
      nombre: 'CATAN',
      categoria: 'Juegos de estrategia',
      descripcion: 'Juego de estrategia clásico para 3-4 jugadores donde construyes y desarrollas tu propia civilización en una isla llena de recursos.',
      precio: '$29.990',
      precioData: '29990',
      descuento: 'Sin descuento',
      imagen: 'img/catan .webp'
    },
    {
      nombre: 'La Tripulación: Misión Mar Profundo',
      categoria: 'Juegos de estrategia',
      descripcion: 'Juego cooperativo de bazas para 2-5 jugadores, a partir de 10 años. Reúne tu equipo y lánzate a descubrir el legendario continente perdido de Mu.',
      precio: '$17.990',
      precioData: '17990',
      descuento: 'Sin descuento',
      imagen: 'img/tripulacion .webp'
    }
  ];

  /**
   * Se gestiona todos los productos de juegos de fiesta
   */

  private juegosFiesta: Producto[] = [
    {
      nombre: 'Si te ríes, tomas',
      categoria: 'Juegos de fiesta',
      descripcion: 'El juego de tomar para las personas que no pueden quedarse serias. ¿Podrás aguantarte la risa cuando alguien del grupo...?',
      precio: '$14.990',
      precioData: '14990',
      descuento: '10% con pagos en transferencia',
      imagen: 'img/SiteReisPierdes .webp'
    },
    {
      nombre: "Curao' Volao' o Weón de Cojones para Adultos",
      categoria: 'Juegos de fiesta',
      descripcion: 'Party game donde en cada turno un jugador actúa como juez y los participantes acusan a otro de encajar con la descripción de la carta. Quien acumule 7 cartas pierde.',
      precio: '$15.990',
      precioData: '15990',
      descuento: 'Sin descuento',
      imagen: 'img/curaoVolao .webp'
    },
    {
      nombre: 'Mójate el potito',
      categoria: 'Juegos de fiesta',
      descripcion: 'Juego de cartas para responder preguntas que harán sudar a más de alguno. Perfecto para fiestas, juntas y carretes.',
      precio: '$12.990',
      precioData: '12990',
      descuento: 'Sin descuento',
      imagen: 'img/Mojate .webp'
    }
  ];

  /**
   * Obtiene todos los juegos de rol
   * @returns obtiene todos los juegos asociados
   */

  getJuegosRol(): Producto[] {
    return this.juegosRol;
  }
  /**
   * Obtiene todos los juegos familiares
   * @returns obtiene todos los juegos asociados
   */

  getJuegosFamiliares(): Producto[] {
    return this.juegosFamiliares;
  }

  /**
   * Obtiene todos los juegos de estrategia
   * @returns obtiene todos los juegos asociados
   */

  getJuegosEstrategia(): Producto[] {
    return this.juegosEstrategia;
  }

  /**
   * Obtiene todos los juegos de fiesta
   * @returns obtiene todos los juegos asociados
   */

  getJuegosFiesta(): Producto[] {
    return this.juegosFiesta;
  }

  /**
  * Obtiene los juegos destacados (primero de cada categoría)
  * @returns Array con un juego destacado de cada categoría
  */

  getDestacados(): Producto[] {
    return [
      this.juegosRol[0],
      this.juegosFamiliares[0],
      this.juegosEstrategia[0],
      this.juegosFiesta[0]
    ];
  }

  /**
  * Obtiene todos los juegos disponibles en la tienda
  * @returns Array con todos los juegos de todas las categorías
  */

  getTodos(): Producto[] {
    return [
      ...this.juegosRol,
      ...this.juegosFamiliares,
      ...this.juegosEstrategia,
      ...this.juegosFiesta
    ];
  }
}