import { Component, Inject, OnInit } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogActions, MatDialogClose, MatDialogTitle, MatDialogContent, MatDialog, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { UserService } from '../../../services/user.service';
import { User } from '../../../models/user';
import { error } from 'console';
import { Router } from '@angular/router';
import { UserListComponent } from '../user-list.component';

@Component({
  selector: 'app-enable-user',
  standalone: true,
  imports: [ 
    MatDialogActions,
    MatDialogClose,
    MatDialogTitle,
    MatDialogContent,
    MatButtonModule
  ],
  templateUrl: './enable-user.component.html',
  styleUrl: './enable-user.component.css'
})
export class EnableUserComponent implements OnInit {

  userId?: number;
  
  constructor(
    private dialog: MatDialog,
    private userService: UserService,
    @Inject(MAT_DIALOG_DATA) private userData: any,
  ){}

  ngOnInit(): void {
    this.userService.getUserById(this.userData.id).subscribe({
      next: (user: User) => {
        this.userId = user.id;
      }
    })
  }

  onEnable(): void {
    this.userService.enableUser(this.userData.id, this.userData).subscribe({
      next: (user: User) => {
        this.userData.isEnabled = user.isEnabled;
        console.log("User successfully enabled - id: ", this.userData.id);
      }, 
      error: (error) => {
        console.error("Cannot enable user with id: ", this.userData.id);
      }
    })
  }

  
}
