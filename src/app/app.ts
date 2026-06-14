import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { SessionService } from './services/session';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  constructor(private session: SessionService) {}
}