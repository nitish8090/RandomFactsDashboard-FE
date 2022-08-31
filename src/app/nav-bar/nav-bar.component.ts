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
  }

  logOut(): void{
    localStorage.removeItem('usertoken')
    this.router.navigate(['/'])
  }

}
