import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { RouterLink, Router } from '@angular/router';
import { NgIf } from '@angular/common';
import { SessionService } from '../../services/session';

@Component({
  selector: 'app-navbar',
  imports: [RouterLink, NgIf],
  templateUrl: './navbar.html',
  styleUrl: './navbar.css'
})
export class Navbar implements OnInit {

  usuarioActivo: any = null;

  constructor(
    public session: SessionService,
    private router: Router,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit() {
    this.session.usuarioActivo$.subscribe(usuario => {
      this.usuarioActivo = usuario;
      this.cdr.detectChanges();
    });
  }

  cerrarSesion() {
    this.session.cerrarSesion();
    this.router.navigate(['/']);
  }
}