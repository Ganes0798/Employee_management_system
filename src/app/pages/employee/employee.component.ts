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
  id: any;
  empRoles: any =[];


  constructor(private _formBuilder: UntypedFormBuilder, private _commonService: CommonService, private _changeDetectorRef: ChangeDetectorRef){
    this.loadTableData();
  }

  loadTableData() {
    this._commonService.getEmployee().subscribe(data => {
      this.dataSource.data = data;
    });
  }



  ngOnInit(): void {
  
    this.formEmptyData();
    this.getEmp();
    this.getRoles();
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

  formEmptyData(){
    this.userForm = this._formBuilder.group({
      emloyeeFirstName: ['', Validators.required],
      employeeLastName: ['', Validators.required],
      employeeEmail: ['', Validators.required],
      employeePassword: ['', Validators.required],
      employeeRole: ['', Validators.required]
    });
  }


  formwithData(data:any){
    this.userForm = this._formBuilder.group({
      emloyeeFirstName: [data.employeeFirstName, Validators.required],
      employeeLastName: [data.employeeLastName, Validators.required],
      employeeEmail: [data.employeeEmail, Validators.required],
      employeePassword: [data.employeePassword, Validators.required],
      employeeRole: [data.employeeRole.designation, Validators.required]
    });
  }

  getTitle(bookId: string) {
    return this.empRoles.find((roles:any) => roles.id === bookId).designation!;
  }


  //Get API

  getRoles(){
    this._commonService.getDesignation().subscribe({
      next: (response: any) => {
            if(response.code == 200 && response.success == true)
            {
                this.empRoles = response.result;
            }
      },
      error: (err:any) => {

      }
    })
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

                this.drawer.close();
            this.dataSource._renderChangesSubscription;
            this.userForm.reset();
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

// Update Employee
updateEmployee(data:any, id:number){
  id = this.id;
  const jsonInput = {
    "id": this.id,
    "employeeFirstName": data.emloyeeFirstName,
    "employeeLastName": data.employeeLastName,
    "employeeEmail": data.employeeEmail,
    "employeePassword": data.employeePassword,
    "employeeRole": data.employeeRole
  }
  this._commonService.updateEmployee(jsonInput).subscribe({
    next: (response:any) => {
          if(response.code == 200 && response.success == true)
          {
            Swal.fire({
              title: response.message + "!",
              text: "Click Ok to Proceed",
              icon: "success"
            });

            this.drawer.close();
            this.dataSource._renderChangesSubscription;
          }
    },
     error: (err:any) => {
      Swal.fire({
        title: err.message + "!",
        text: "Click Ok to Proceed",
        icon: "error"
      });
     }
  })
}

//Delete Api

deleteRow(id: number) {
  Swal.fire({
    title: 'Are you sure?',
    text: 'Do you want to delete this record?',
    icon: 'warning',
    showCancelButton: true,
    confirmButtonText: 'Yes, delete it!',
    cancelButtonText: 'No, keep it'
  }).then((result) => {
    if (result.isConfirmed) {
      this._commonService.deleteData(id).subscribe(() => {
        Swal.fire(
          'Deleted!',
          'The record has been deleted.',
          'success'
        );
        this.loadTableData(); // Reload the table data
      }, error => {
        Swal.fire(
          'Error!',
          'An error occurred while deleting the record.',
          'error'
        );
      });
    }
  });
}

  submit(form_type: any, data:any){
    
    this.drawer.open();

   

    if(form_type == 'add')
    {
      this.button_text = 'Add';
      this.drawer_title = 'Add Employee';
      // this.addUserForm();
      this.formEmptyData();
    }
    else if (form_type == 'update')
    {
      this.button_text = 'Update';
      this.drawer_title = 'Update Employee';
      this.formwithData(data);
    }
    else
    {
      this.button_text = false;
      this.drawer_title = 'View Employee';
      this.formwithData(data);
    }
}

formSubmit(){
  if(this.userForm.valid)
  {
    if(this.button_text == 'Add')
    {
      this.addEmployee(this.userForm.value);
    }
    else if (this.button_text == 'Update')
    {
      this.addEmployee(this.userForm.value);
    }
  }
}


  ngAfterViewInit(): void{
    this.dataSource.paginator = this.paginator;
    this.paginator.pageSize = 10;
  }


}
