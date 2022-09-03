import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { User } from '../interfaces/user';
import { AuthenticationService } from '../services/authentication.service';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.scss']
})
export class UserProfileComponent implements OnInit {

  user : User = <User>{};
  isAdmin= false;

  successMessage = ''
  errorMessage = ''

  constructor(
    private userService: UserService,
    private authService: AuthenticationService,
    private router: Router,
    private route: ActivatedRoute,
    ) { }

  ngOnInit(): void {
    if (
      this.authService.isAdmin() 
      && (this.router.url.search('admin-panel') > 0)
      && (this.router.url.search('profile') > 0)
      ){
      // Call this from admin panel
      this.route.params.subscribe(params => {
        this.userService.getUser(params['id']).subscribe({
          next: (data) => {
            this.user = data;
            this.isAdmin = true;
          },
          error: (err) => {
            console.log(err)
            if (err.status == 401){
              this.router.navigate(['/'])
            }
          }
        })
      });
    }
    else if (this.authService.isAdmin() 
    && (this.router.url.search('admin-panel') > 0)
    && (this.router.url.search('create') > 0)){
      this.isAdmin = true;
    }
    else{
      // Call this from normal user
      this.userService.getProfile().subscribe({
        next: (data) => {
          this.user = data;
        },
        error: (err) => {
          console.log(err)
          if (err.status == 401){
            this.router.navigate(['/'])
          }
        }
      })
    }
  }

  updateProfile(): void {
    console.log(this.user)
    let service;
    if (this.authService.isAdmin()){
      // If admin is updating
      if (this.user.id){
        service = this.userService.putUser(this.user)
      } else {
        service = this.userService.postUser(this.user)
      }
      
    } else {
      // If normal user is updating
      service = this.userService.updateProfile(this.user)
    }

    service.subscribe({
      next: (data) => {
        this.successMessage = 'Successfully Updated';
      setTimeout(()=>{this.successMessage = ''}, 3000);
      },
      error: (err) => {
        console.log(err)
        this.errorMessage = `Some Error occured: ${JSON.stringify(err.error)}`
        setTimeout(()=>{this.errorMessage = ''}, 3000)

        if (err.status === 401){
          this.router.navigate(['/'])
        }
      }
    }
    
    )
    
  }

}
