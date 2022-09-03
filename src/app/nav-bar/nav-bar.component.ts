import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthenticationService } from '../services/authentication.service';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.scss']
})
export class NavBarComponent implements OnInit {

  isLoggedIn = !!localStorage.getItem('usertoken');;

  constructor(
    private authService: AuthenticationService,
    private router: Router) { }

  ngOnInit(): void {
    this.router.events.subscribe((res) => { 
      this.isLoggedIn = !!localStorage.getItem('usertoken');;
  })
  }

  logOut(): void{
    localStorage.removeItem('usertoken')
    localStorage.removeItem('is_rf_admin')
    this.router.navigate(['/'])
  }

}
