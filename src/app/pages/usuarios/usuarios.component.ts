import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzTableModule } from 'ng-zorro-antd/table';
import { IUser } from './interfaces/usuarios.interface';
import { UsuariosService } from './services/usuarios.service';

@Component({
  selector: 'app-usuarios',
  standalone: true,
  imports: [
    FormsModule,
    NzInputModule,
    NzButtonModule, 
    NzTableModule    
  ],
  templateUrl: './usuarios.component.html',
  styleUrl: './usuarios.component.scss'
})
export class UsuariosComponent {
  value: string = '';
  listOfUser: IUser[] = [];

  constructor(
    private usuariosService: UsuariosService
  ){}

  ngOnInit(): void {
    //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
    //Add 'implements OnInit' to the class.
    this.getUsers()
  }

  getUsers(){
    this.usuariosService.getUsers().subscribe((users: IUser[])=>{
      this.listOfUser = users
    })
  }

}
