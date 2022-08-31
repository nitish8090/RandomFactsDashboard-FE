import { Component, OnInit, ViewEncapsulation  } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { User } from 'src/app/interfaces/user';
import { AuthenticationService } from 'src/app/services/authentication.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class LoginComponent implements OnInit {

  loginForm = this.formBuilder.group({
    email: ['', Validators.required],
  password:['', Validators.required]
  })
  isError = false;
  
  constructor(
    private authService: AuthenticationService,
    private formBuilder: FormBuilder,
    private router: Router,
  ) { }

  ngOnInit(): void {
  }

  login(): void {
    if(this.loginForm.valid){

    this.authService.logIn(<User>this.loginForm.value).subscribe({
      next: (data)=>{
        localStorage.setItem('usertoken', data.access_token);
        this.router.navigate(['/dashboard'])
      },
      error: (err)=>{
        console.log(err)
        this.isError = true;
      }
    })
    this.loginForm.reset()
  }
  }

}
