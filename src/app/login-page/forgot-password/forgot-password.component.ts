import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { User } from 'src/app/interfaces/user';
import { AuthenticationService } from 'src/app/services/authentication.service';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.scss']
})
export class ForgotPasswordComponent implements OnInit {

  forgotPasswordForm = this.formBuilder.group({
    email: ['']
  })

  resetLink = '';
  isError = false;
  
  constructor(
    private authService: AuthenticationService,
    private formBuilder: FormBuilder
  ) { }

  ngOnInit(): void {
  }

  forgotPassword(): void {
    this.authService.forgotPassword(<User>this.forgotPasswordForm.value).subscribe(
      {
        next: (data)=>{
          console.log(data)
          console.log(document.location)

          this.resetLink = `${document.location.origin}/reset-password;resetCode=${data.reset_code}`
        },
        error: (err)=>{
          console.log(err)
          this.isError = true
        }
      }
    )
  }

}
