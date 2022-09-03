import { Component, OnInit } from '@angular/core';
import { User } from '../interfaces/user';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-admin-panel',
  templateUrl: './admin-panel.component.html',
  styleUrls: ['./admin-panel.component.scss']
})
export class AdminPanelComponent implements OnInit {

  users : User[] = []
  successMessage = ''
  errorMessage = ''

  constructor(
    private userService: UserService,
  ) { }

  ngOnInit(): void {
    this.userService.getAllUsers().subscribe({
      next: (data) => {
        this.users = data;
      },
      error: (err) => {
        console.log(err)
      }
    })
  }

  deleteUser(userId: number): void {
    this.userService.deleteUser(userId).subscribe({
      next: (data) => {
        this.successMessage = 'Successfully deleted'
        setTimeout(()=>{this.successMessage = ''}, 3000)
        this.users = this.users.filter(function( obj ) {
          return obj.id !== userId;
        });
      },
      error: (err) => {
        console.log(err)
        if (err.status === 409){
          this.errorMessage = 'Cannot delete yourself'
          setTimeout(()=>{this.errorMessage = ''}, 3000)
        }
      }
    })
  }

}
