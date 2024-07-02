import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule, ReactiveFormsModule, UntypedFormBuilder, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatDividerModule } from '@angular/material/divider';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { Router, RouterModule } from '@angular/router';
// import { LoginService } from './login.service';
import {MatSnackBar} from '@angular/material/snack-bar';
import { LoginService } from './login.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-login',
  standalone: true,
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
  imports: [CommonModule,
    ReactiveFormsModule, 
    MatButtonModule, 
    MatDividerModule, 
    MatFormFieldModule, 
    MatIconModule,
    MatInputModule,
    FormsModule,
  RouterModule]
})
export class LoginComponent implements OnInit {
  hide: any;
  loginForm: any;
  localToken: any;

  constructor(private _formBuilder: UntypedFormBuilder, 
              private _loginService: LoginService, 
              private _snackBar: MatSnackBar,
              private router: Router){}


  ngOnInit(): void {
         this.loginForm = this._formBuilder.group({
           email: ['', Validators.required],
           password: ['', Validators.required]
         });
  }

  loginAdmin(data: any){
    const jsonInput ={
      "email": data.email,
      "password": data.password
    }
    this._loginService.loginAsAdmin(jsonInput).subscribe({
      next: (response: any) => {
        if(response.code == 200 && response.success == true)
         {
          Swal.fire({
            title: response.message + "!",
            text: "Click Ok to Continue!",
            icon: "success"
          });
            this.localToken = response.result.token
            localStorage.setItem('token', this.localToken);
            this.router.navigate(['/dashboard']);
         }
         else{
          this._snackBar.open('Something Went Wrong');
         }
      },
      error: (err : any) => {
        this._snackBar.open(err.message, 'undo', {
          duration: 3000
        });
      }});
  }
}
