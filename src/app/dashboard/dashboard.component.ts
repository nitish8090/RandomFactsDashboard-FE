import { AfterViewInit, Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { Facts, User } from '../interfaces/user';
import { AuthenticationService } from '../services/authentication.service';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  user: User = <User>{};
  factForm = this.formBuilder.group({
    fact_text: [''],
  });
  isAdmin = false;

  constructor(
    private userService: UserService,
    private authService: AuthenticationService,
    private router: Router,
    private formBuilder: FormBuilder) { }

  ngOnInit(): void {
    this.refreshUserDetails();
    this.isAdmin = this.authService.isAdmin()
  }

  refreshUserDetails(): void{
    this.userService.getUserFacts().subscribe({
      next: (data)=>{
        this.user = data
      },
      error: (err)=>{
        console.log(err)
        if (err.status == 401){
          this.router.navigate(['/'])
        }
      }
    }
    )
  }

  postFact(): void{
    this.userService.postFact(<Facts>this.factForm.value, this.user.id).subscribe({
    })
    this.refreshUserDetails()
  }

  deleteFact(fact_id: any): void{
    this.userService.deleteFact(this.user.id, fact_id).subscribe()
    this.refreshUserDetails()
  }

}
