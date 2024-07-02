import { ChangeDetectorRef, Component, ViewChild } from '@angular/core';
import { ReactiveFormsModule, UntypedFormBuilder } from '@angular/forms';
import { CommonService } from '../../common-service/common.service';
import { CommonModule } from '@angular/common';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatButtonModule } from '@angular/material/button';
import { MatOptionModule } from '@angular/material/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatSelectModule } from '@angular/material/select';
import { MatDrawer, MatSidenavModule } from '@angular/material/sidenav';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';

@Component({
  selector: 'app-task',
  standalone: true,
  imports: [MatTableModule, MatPaginatorModule,MatSidenavModule, MatIconModule, MatFormFieldModule,ReactiveFormsModule, MatInputModule, MatButtonModule,MatSelectModule, CommonModule, MatOptionModule, MatAutocompleteModule],
  templateUrl: './task.component.html',
  styleUrl: './task.component.scss'
})
export class TaskComponent {

  button_text:any;
  drawer_title: any;
  taskForm:any;

  displayedColumns: string[] = ['firstName', 'lastName', 'email', 'role', 'action'];
  dataSource = new MatTableDataSource<any>;
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild('drawer') drawer!: MatDrawer;

  constructor(private _formBuilder: UntypedFormBuilder, private _commonService: CommonService, private _changeDetectorRef: ChangeDetectorRef){
    
  }


  submit(form_type:any){

  }

  formSubmit(){

  }
}
