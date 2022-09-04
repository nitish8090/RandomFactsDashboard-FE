import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { User } from 'src/app/interfaces/user';
import { AuthenticationService } from 'src/app/services/authentication.service';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.scss']
})
export class ResetPasswordComponent implements OnInit {

  resetPasswordForm = this.formBuilder.group({
    password: ['', Validators.required],
    repeatPassword: ['', Validators.required]
  })

  resetCode = '';
  error = '';

  constructor(
    private authService: AuthenticationService,
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router
  ) { }

  ngOnInit(): void {

    this.route.params.subscribe(params => {
      this.resetCode = params['resetCode'];

      if (!this.resetCode) {
        this.router.navigate(['/'])
      }
    });

  }

  resetPassword(): void {
    if (this.resetPasswordForm.value.password !== this.resetPasswordForm.value.repeatPassword) {
      this.error = 'Password are not same.'
      return
    }

    if (this.resetPasswordForm.valid) {
      var user = <User>this.resetPasswordForm.value
      user.reset_code = this.resetCode

      this.authService.resetPassword(user).subscribe(
        {
          next: (data) => {
            console.log(data)
            this.router.navigate(['/'])
          },
          error: (err) => {
            console.log(err)
            this.error = err.error
          }
        }
      )
    } else {
      this.error = 'Password cannot be blank'
    }
  }
}
