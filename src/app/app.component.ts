import { Component, computed, signal } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatToolbarModule } from '@angular/material/toolbar';
import { NavigationEnd, Router, RouterOutlet } from '@angular/router';
import { SidenavComponent } from './sidenav/sidenav.component';
import { CommonModule } from '@angular/common';
import { MatMenuModule } from '@angular/material/menu';
import { LoginService } from './auth/login/login.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule,RouterOutlet, MatSidenavModule, MatToolbarModule, MatIconModule,SidenavComponent, MatMenuModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  loading: boolean = true;
  progress: number = 0; 
  isExpanded = true;
  collapsed = signal(false);
  sidenavWidth = computed(() => this.collapsed() ? '65px' : '250px');

  constructor(private router: Router, public _loginService: LoginService) {
    this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        this.isExpanded = (event.url !== '/login');
      }
    }),
    setTimeout(() => {
      this.loading = false;
    }, 3000);
  }

  isLoginPage(): boolean {
    return this.router.url === '/login' || this.router.url === '/forgot-pwd';
  }
}
