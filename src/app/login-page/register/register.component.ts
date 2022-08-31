import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { User } from 'src/app/interfaces/user';
import { AuthenticationService } from 'src/app/services/authentication.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

  registrationForm = this.formBuilder.group({
    name: [''],
    email: [''],
  password:['']
  })
  isError = false;
  
  constructor(
    private authService: AuthenticationService,
    private router: Router,
    private formBuilder: FormBuilder
  ) { }

  ngOnInit(): void {
  }

  register(): void{
    this.authService.register(<User>this.registrationForm.value).subscribe(
      {
        next: (data)=>{
          console.log(data)
          this.router.navigate(['/'])
        },
        error: (err)=>{
          if (err.status === 403){
            this.isError = true
          }
        }
      }
    )
  }

}
