import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Navbar } from './shared/navbar/navbar';
import { SessionService } from './services/session';
/**
 * Componente raíz de la aplicación Tu Turno Web.
 * Inicializa el SessionService y renderiza el navbar global y el router outlet.
 */
@Component({
  selector: 'app-root',
  imports: [RouterOutlet, Navbar],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  constructor(private session: SessionService) {}
}