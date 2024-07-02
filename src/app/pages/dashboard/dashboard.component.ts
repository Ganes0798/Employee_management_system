import { AfterViewInit, Component, ViewChild } from '@angular/core';
import {MatTableDataSource, MatTableModule} from '@angular/material/table';
import {OnInit} from '@angular/core'
import { MatPaginator } from '@angular/material/paginator';
import {MatPaginatorModule} from '@angular/material/paginator'
import { MatDrawer, MatSidenavModule } from '@angular/material/sidenav';
import { MatIconModule } from '@angular/material/icon';
import { MatFormFieldModule } from '@angular/material/form-field';
import { ReactiveFormsModule, UntypedFormBuilder, Validators } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import {MatButtonModule} from '@angular/material/button'
import { CommonService } from '../../common-service/common.service';
import Swal from 'sweetalert2';
import {MatSelectModule} from '@angular/material/select';
import { CommonModule } from '@angular/common';
import { MatOptionModule } from '@angular/material/core';
import {MatAutocompleteModule} from '@angular/material/autocomplete'

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [MatTableModule, MatPaginatorModule,MatSidenavModule, MatIconModule, MatFormFieldModule,ReactiveFormsModule, MatInputModule, MatButtonModule,MatSelectModule, CommonModule, MatOptionModule, MatAutocompleteModule],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss'
})
export class DashboardComponent{
}
