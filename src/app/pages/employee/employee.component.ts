import { CommonModule } from '@angular/common';
import { ChangeDetectorRef, Component, ViewChild } from '@angular/core';
import { ReactiveFormsModule, UntypedFormBuilder, Validators } from '@angular/forms';
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
import { CommonService } from '../../common-service/common.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-employee',
  standalone: true,
  imports: [MatTableModule, MatPaginatorModule,MatSidenavModule, MatIconModule, MatFormFieldModule,ReactiveFormsModule, MatInputModule, MatButtonModule,MatSelectModule, CommonModule, MatOptionModule, MatAutocompleteModule],
  templateUrl: './employee.component.html',
  styleUrl: './employee.component.scss'
})
export class EmployeeComponent {

  displayedColumns: string[] = ['firstName', 'lastName', 'email', 'role', 'action'];
  dataSource = new MatTableDataSource<any>;
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild('drawer') drawer!: MatDrawer;
    
  userForm:any;
  options: any;
  button_text: any;
  drawer_title: any;
  changeDetectorRefs: any;
  employees: any;


  constructor(private _formBuilder: UntypedFormBuilder, private _commonService: CommonService, private _changeDetectorRef: ChangeDetectorRef){}




  ngOnInit(): void {
    this.userForm = this._formBuilder.group({
      emloyeeFirstName: ['', Validators.required],
      employeeLastName: ['', Validators.required],
      employeeEmail: ['', Validators.required],
      employeePassword: ['', Validators.required],
      employeeRole: ['', Validators.required]
    });
    this.getEmp();
    this.loadData();

   this.options = [{value: 1, name: 'Senior Manager'}, {value:2, name:'Junior Manager'}, {value: 3,name: 'Project Leader'}, {value:4, name:'Worker'}]
  }

  //Get Employee
  getEmp(){
    this._commonService.getEmployee().subscribe({
      next: (response:any) => {
          this.dataSource = response.result;
      },
      error: (err:any) => {
           
      }
    })
  }

  loadData() {
    this._commonService.getEmployee().subscribe(data => {
      this.dataSource.data = data;
      this.dataSource.paginator = this.paginator;
      // this.dataSource.sort = this.sort;
      this._changeDetectorRef.detectChanges();
    });
  }

  //Add Employee

  addEmployee(data:any){
    const jsonInput = {
      "employeeFirstName": data.emloyeeFirstName,
      "employeeLastName": data. employeeLastName,
      "employeeEmail": data.employeeEmail,
      "employeePassword": data.employeePassword,
      "employeeRole": data.employeeRole
    }

    this._commonService.postEmployee(jsonInput).subscribe({
      next: (response:any) => {
        this.loadData();
        Swal.fire({
          title: response.message + "!",
          text: "Click Ok to Continue!",
          icon: "success"
        });

        this._commonService.sendEmail(jsonInput).subscribe({
            next: (response:any) => {
              if(response.code == 200 && response.success == true)
              {
                Swal.fire({
                  title: "Mail Sent to Employee!",
                  text: "Click Ok to Continue!",
                  icon: "success"
                });
              }
            },
            error:(err:any) => {
              Swal.fire({
                title:  "Mail Sent Successfully!",
                text: "Click Ok to Proceed",
                icon: "success"
              });
            }
        });
      },
      error: (err: any) => {
         Swal.fire({
           title: err.message + "!",
           text: "Click Ok to Proceed",
           icon: "warning"
         });
      }
    })
  }


  submit(form_type: any){
    
    this.drawer.open();

   

    if(form_type == 'add')
    {
      this.button_text = 'Add';
      this.drawer_title = 'Add User';
      // this.addUserForm();
    }
    // else if (form_type == 'update')
    // {
    //   this.button_text = 'Update';
    //   this.drawer_title = 'Update User';
    // }
    // else
    // {
    //   this.button_text = false;
    //   this.drawer_title = 'View User';
    // }
}

formSubmit(){
  if(this.userForm.valid)
  {
    if(this.button_text == 'Add')
    {
      this.addEmployee(this.userForm.value)
    }
  }
}


  ngAfterViewInit(): void{
    this.dataSource.paginator = this.paginator;
    this.paginator.pageSize = 10;
  }


}
