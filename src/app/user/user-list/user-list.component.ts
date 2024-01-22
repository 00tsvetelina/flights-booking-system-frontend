import { NgFor, CommonModule } from '@angular/common';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule, MatDialogActions, MatDialogClose, MatDialogTitle, MatDialogContent, MatDialog } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { RouterLink } from '@angular/router';
import { UserService } from '../../services/user.service';
import { User } from '../../models/user';
import { DisableUserComponent } from './disable-user/disable-user.component';
import { EnableUserComponent } from './enable-user/enable-user.component';

@Component({
  selector: 'app-user-list',
  standalone: true,
  imports: [
    MatTableModule,
    MatIconModule,
    MatButtonModule,
    RouterLink, NgFor,
    CommonModule,
    MatPaginatorModule,
    MatSnackBarModule,
    MatDialogModule,
    MatDialogActions,
    MatDialogClose,
    MatDialogTitle,
    MatDialogContent
  ],
  templateUrl: './user-list.component.html',
  styleUrl: './user-list.component.css'
})

export class UserListComponent implements OnInit{
  
  displayedColumns: string[] = ['id', 'role', 'username', 'btn'];
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  dataSource!: MatTableDataSource <User, MatPaginator>;
  isEnabled: boolean = false;

  constructor(
    private userService: UserService,
    private dialog: MatDialog
  ){}

    ngOnInit(): void {
      this.userService.getAllUsers().subscribe({
        next: (users) => {
          this.dataSource = new MatTableDataSource<User>(users);
        }, error: (error) => {
          console.error('Cannot fetch data ', error)
        }}
      )
  }

  openDialogDisable(id: number): void{
    this.dialog.open(DisableUserComponent, {
      width: '250px',
      data: {
        id: id
      }
    });
  }

  openDialogEnable(id: number): void{
    this.dialog.open(EnableUserComponent, {
      width: '250px',
      data: {
        id: id
      }
    });
  }}

