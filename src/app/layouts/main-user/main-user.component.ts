
import { Component } from '@angular/core';
import { CommonModule, NgIf } from '@angular/common';
import { Router, RouterLink, RouterOutlet } from '@angular/router';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzLayoutModule } from 'ng-zorro-antd/layout';
import { NzMenuModule } from 'ng-zorro-antd/menu';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { SESSION } from '../../share/constant/session.constant';
import { NzAvatarModule } from 'ng-zorro-antd/avatar';
import { NzDropDownModule, NzPlacementType } from 'ng-zorro-antd/dropdown';
import { ISession, IUser } from '../interfaces/login.interface';
import { EditProfileComponent } from './drawers/edit-profile/edit-profile.component';

@Component({
  selector: 'app-main-user',
  standalone: true,
  imports: [
    CommonModule,
    RouterLink, 
    RouterOutlet,
    EditProfileComponent, 
    NzIconModule, 
    NzLayoutModule, 
    NzMenuModule,
    NzButtonModule,
    NzAvatarModule,
    NzDropDownModule,
    NgIf
  ],
  templateUrl: './main-user.component.html',
  styleUrl: './main-user.component.scss'
})
export class MainUserComponent {
  isCollapsed: boolean = false;
  showDrawerProfile: boolean = false;
  listOfPosition: NzPlacementType[] = ['bottomLeft', 'bottomCenter', 'bottomRight', 'topLeft', 'topCenter', 'topRight'];
  id: string = '';
  nicKname: string = '';
  nicKnameAvatar: string = "";
  isAdmin: boolean = false


    

  constructor(
    private router: Router
  ){}

  ngOnInit(): void {
    this.getUserData()
  }

  getUserData(){
    const userSession = localStorage.getItem(SESSION.localStorage);
    if (userSession) {
      const session: ISession = JSON.parse(localStorage.getItem(SESSION.localStorage) || '');
      if (session.user){
        this.id = session.user._id || '';
        this.nicKname = session.user.nickName;
        this.nicKnameAvatar = session.user.nickName.substring(0, 1).toUpperCase();
        this.isAdmin = session.user.isAdmin || false;
      }
    };
  }

  cerrarSesion(){
    localStorage.removeItem(SESSION.localStorage)
    this.router.navigate(['/']);

  }

  showEditUser(){
    this.showDrawerProfile = true;

  }
}








