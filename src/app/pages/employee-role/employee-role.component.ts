import { CommonModule } from '@angular/common';
import { ChangeDetectorRef, Component, OnInit, ViewChild } from '@angular/core';
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
  selector: 'app-employee-role',
  standalone: true,
  imports: [MatTableModule, MatPaginatorModule,MatSidenavModule, MatIconModule, MatFormFieldModule,ReactiveFormsModule, MatInputModule, MatButtonModule,MatSelectModule, CommonModule, MatOptionModule, MatAutocompleteModule],
  templateUrl: './employee-role.component.html',
  styleUrl: './employee-role.component.scss'
})
export class EmployeeRoleComponent implements OnInit {

  displayedColumns: string[] = ['firstName', 'lastName', 'email', 'action'];
  dataSource = new MatTableDataSource<any>;
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild('drawer') drawer!: MatDrawer;

  roleForm:any;
  options: any;
  button_text: any;
  drawer_title: any;
  changeDetectorRefs: any;
  employees: any;
  id: any;

  constructor(private _formBuilder: UntypedFormBuilder, private _commonService: CommonService, private _changeDetectorRef: ChangeDetectorRef){
    this.loadTableData();
  }


  loadTableData() {
    this._commonService.getEmployee().subscribe(data => {
      this.dataSource.data = data;
    });
  }



  ngOnInit(): void {
    this.formWithoutData();
    this.getRoles();
  }

  //Form With and Without Data 

  formWithoutData(){
    this.roleForm = this._formBuilder.group({
      designation: ['', Validators.required],
      salaryDetails: ['', Validators.required],
      position: ['', Validators.required]
    })
  }

  formWithData(data:any){
    this.roleForm = this._formBuilder.group({
      designation: [data.designation, Validators.required],
      salaryDetails: [data.salaryDetails, Validators.required],
      position: [data.position, Validators.required]
    })
  }


  //Get Api

  getRoles(){
    this._commonService.getDesignation().subscribe({
      next: (response:any) => {
        if(response.code == 200 && response.success == true)
        {
            this.dataSource = response.result;
        }
      },
      error: (err:any) => {
          
      }
    })
  }


  // Add Api

  addRoles(data:any){
    const jsonInput = {
      "designation": data.designation,
      "salaryDetails": data.salaryDetails,
      "position": data.position
    }

    this._commonService.postDesignation(jsonInput).subscribe({
      next: (response:any) => {
           if(response.code == 200 && response.success == true)
           {
            Swal.fire({
              title: response.message + "!",
              text: "Click Ok to Proceed",
              icon: "success"
            });

            this.drawer.close();
            this.dataSource.data = response.result;
            this.roleForm.reset();
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

  //Update Roles

  updateRoles(data:any, id:number){
    id = this.id;

    const jsonInput = {
      "id": this.id,
      "designation": data.designation,
      "salaryDetails": data.salaryDetails,
      "position": data.position
    }

    this._commonService.updateDesignation(jsonInput).subscribe({
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
        this._commonService.deleteDesignation(id).subscribe(() => {
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
      this.drawer_title = 'Add Designation';
      this.formWithoutData();
    }
    else if (form_type == 'update')
    {
      this.button_text = 'Update';
      this.drawer_title = 'Update Designation';
      this.formWithData(data);
      this.id = data.id
    }
    else
    {
      this.button_text = false;
      this.drawer_title = 'View Designation';
      this.formWithData(data);
    }
}

formSubmit(){
  if(this.button_text == 'Add')
  {
    this.addRoles(this.roleForm.value);
  }
  else if(this.button_text == 'Update')
  {
    this.updateRoles(this.roleForm.value, this.id);
  }
}
}
