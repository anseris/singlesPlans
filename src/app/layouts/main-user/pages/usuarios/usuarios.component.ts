import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzTableModule } from 'ng-zorro-antd/table';
import { NzModalModule } from 'ng-zorro-antd/modal';
import { NzMessageModule, NzMessageService } from 'ng-zorro-antd/message';
import { NzPopconfirmModule } from 'ng-zorro-antd/popconfirm';
import { UsuariosService } from '../../services/usuarios.service';
import { IFullUser } from '../../../interfaces/users.interface';
import { IUser } from '../../../interfaces/login.interface';

@Component({
  selector: 'app-usuarios',
  standalone: true,
  imports: [
    FormsModule,
    NzInputModule,
    NzButtonModule, 
    NzTableModule ,
    NzModalModule,
    NzMessageModule,
    NzPopconfirmModule
  ],
  templateUrl: './usuarios.component.html',
  styleUrl: './usuarios.component.scss'
})
export class UsuariosComponent {
  value: string = '';
  listOfUser: IFullUser[] = [];
  listOfUserTemp: IFullUser[] = [];
  isVisibleEdit: boolean = false;
  id: string = '';  

  form!: IUser
  

  constructor(
    private usuariosService: UsuariosService,
    private message: NzMessageService
  ){}

  ngOnInit(): void {
    //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
    //Add 'implements OnInit' to the class.
    this.getUsers();
    this.initForm()
  }

  initForm(){
    this.form = {
      nickName: '',
      email: '',
      password: ''

    }

  }

  getUsers(){
    this.usuariosService.getUsers().subscribe((users: IFullUser[])=>{
      this.listOfUser = users;
      this.listOfUserTemp = users;
    })
  }

  searchUser(){
    if(this.value){
      this.listOfUser = this.listOfUserTemp.filter((user:IFullUser)=> user.loginUser.nickName.toLocaleLowerCase().indexOf(this.value.toLocaleLowerCase()) > -1)
    } else{
      this.listOfUser = this.listOfUserTemp
    }
    
  }

  deleteUser(id: string ){
    this.usuariosService.deleteUser(id).subscribe(_=>{
      this.message.success('Usuario eliminado');
      this.getUsers();

    })
  }

  

 

  

  // showModalEdit(data: IFullUser){
  //   this.isVisibleEdit = true;
  //   this.form = data.loginUser;
  //   this.id = data._id || ';'
  //   // this.getUser(id)
  // }

  handleCancelEdit(){
    this.isVisibleEdit = false;
  }

  handleOkEdit(){
    // this.updateUser(this.idToEdit)
    this.isVisibleEdit = false;
  }

  // getUser(id: string ){
  //     this.usuariosService.getUser(id).subscribe((user: IUser)=>{
  //       this.nameToEdit = user.name;
  //       this.emailToEdit = user.email;
  //       this.passwordToEdit = user.password;
  //   })
  // }

  // updateUser(id: string) {
  //   const payload: IUser = {
  //     name: this.nameToEdit,
  //     email: this.emailToEdit,
  //     password: this.passwordToEdit,
  //   }
  //   this.usuariosService.updateUser(payload, id).subscribe(_=>{
  //     this.message.success('Usuario editado');
  //     this.getUsers();
  //     this.resetEdit()

  //   })
  // }

}
