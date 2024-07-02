import { Component, Input, ViewChild, computed, signal } from '@angular/core';
import {MatSidenav, MatSidenavModule} from '@angular/material/sidenav'
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatStepperModule} from '@angular/material/stepper';
import {MatIconModule} from '@angular/material/icon';
import {MatListModule} from '@angular/material/list';
import {MatMenuModule} from '@angular/material/menu'
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

interface MenuItem {
  icon: string;
  label: string;
  route: string;
  showSubmenu: boolean;
}

@Component({
  selector: 'app-sidenav',
  standalone: true,
  imports: [CommonModule ,MatSidenavModule,MatToolbarModule,MatStepperModule,MatIconModule,  MatListModule, MatMenuModule,RouterModule],
  templateUrl: './sidenav.component.html',
  styleUrl: './sidenav.component.scss'
})
export class SidenavComponent {

  isExpanded = true;
  showSubmenu: boolean = false;
  isShowing = false;
  showSubSubMenu: boolean = false;

  sidenavCollapsed = signal(false);
  @Input() set collapsed (val: boolean)
  {
    this.sidenavCollapsed.set(val);
  }
  menuItems: MenuItem[] = [
    { icon: 'dashboard', label: 'Dashboard', route: '/dashboard', showSubmenu: false },
    { icon: 'supervisor_account', label: 'Employees', route: '/employee', showSubmenu: false }
  ];

  toggleSubmenu(item: MenuItem) {
    item.showSubmenu = !item.showSubmenu;
  }
  profilePic = computed(() => this.sidenavCollapsed() ? '32' : '100');
 
}
