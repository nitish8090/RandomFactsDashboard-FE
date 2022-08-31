import { AfterViewInit, Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { Facts, User } from '../interfaces/user';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  user!: User;
  factForm = this.formBuilder.group({
    fact_text: [''],
  })

  constructor(
    private userService: UserService,
    private router: Router,
    private formBuilder: FormBuilder) { }

  ngOnInit(): void {
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
    this.ngOnInit()
  }

  deleteFact(fact_id: any): void{
    this.userService.deleteFact(this.user.id, fact_id).subscribe()
    this.ngOnInit()
  }

  logOut(): void{
    localStorage.removeItem('usertoken')
    this.router.navigate(['/'])
  }

}
