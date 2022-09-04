import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { User } from 'src/app/interfaces/user';
import { AuthenticationService } from 'src/app/services/authentication.service';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.scss']
})
export class ForgotPasswordComponent implements OnInit {

  forgotPasswordForm = this.formBuilder.group({
    email: ['', [Validators.required, Validators.email]]
  })

  resetLink = '';
  isError = false;
  error = '';
  
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

          this.resetLink = `${document.location.origin}/preview/RandomFacts/reset-password;resetCode=${data.reset_code}`
        },
        error: (err)=>{
          console.log(err)
          this.error = 'User not found'
          this.isError = true
        }
      }
    )
  }

}
