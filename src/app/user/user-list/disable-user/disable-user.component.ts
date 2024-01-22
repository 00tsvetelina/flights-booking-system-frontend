import { Component, Inject, OnInit } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogActions, MatDialogClose, MatDialogTitle, MatDialogContent, MatDialog, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { UserService } from '../../../services/user.service';
import { User } from '../../../models/user';
import { Router } from '@angular/router';

@Component({
  selector: 'app-disable-user',
  standalone: true,
  imports: [
    MatDialogActions,
    MatDialogClose,
    MatDialogTitle,
    MatDialogContent,
    MatButtonModule
  ],
  templateUrl: './disable-user.component.html',
})
export class DisableUserComponent implements OnInit {

  userId?: number;

  constructor(
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

    onDisable(): void {
      this.userService.disableUser(this.userData.id, this.userData).subscribe({
        next: (user: User) => {
          this.userData.isEnabled = user.isEnabled;
          console.log("User was successfully disabled - id: ", this.userData.id);
        },
          error: () => {
          console.error("Cannot disable user with id: ", this.userData.id);
        }
      })
    }
  
}
