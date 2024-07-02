import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ReactiveFormsModule, UntypedFormBuilder, Validators } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { Router, RouterModule } from '@angular/router';
import { LoginService } from '../login/login.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-forgot-pwd',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule,MatFormFieldModule, RouterModule],
  templateUrl: './forgot-pwd.component.html',
  styleUrl: './forgot-pwd.component.scss'
})
export class ForgotPwdComponent implements OnInit {

  forgotForm:any;

  constructor(private _formBuilder: UntypedFormBuilder, private _loginService: LoginService, private router: Router ){}


  ngOnInit(): void {
   
    this.forgotForm = this._formBuilder.group({
      email: ['', Validators.required],
      newpwd: ['', Validators.required]
    })
    
  }



  forgotPWd(data:any){
    if(this.forgotForm.valid)
    {
      this._loginService.forgotPassword(this.forgotForm.value).subscribe({
        next: (response:any) => {
          Swal.fire({
            title: response.message + "!",
            text: "Click Ok to Continue!",
            icon: "success"
          });
         this.router.navigate(['/login']);
          
        },
        error: (err:any) => {
          Swal.fire({
            title: err.message + "!",
            text: "Click Ok to Continue!",
            icon: "warning"
          }); 
        }
      })
    }
     
  }

}
