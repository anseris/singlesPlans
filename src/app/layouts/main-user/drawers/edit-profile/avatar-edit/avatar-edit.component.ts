import { Component } from '@angular/core';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzMessageService } from 'ng-zorro-antd/message';
import { NzUploadChangeParam, NzUploadFile, NzUploadModule } from 'ng-zorro-antd/upload';
import { Observable, Observer } from 'rxjs';
import { NzAvatarModule } from 'ng-zorro-antd/avatar';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzModalModule } from 'ng-zorro-antd/modal';
import { GetUserService } from '../services/get-user.service';
import { IFullUser, IPersonalData } from '../../../../interfaces/users.interface';
import { UsuariosService } from '../../../services/usuarios.service';

@Component({
  selector: 'app-avatar-edit',
  standalone: true,
  imports: [
    NzUploadModule,
    NzButtonModule,
    NzAvatarModule,
    NzIconModule,
    NzModalModule 
  ],
  templateUrl: './avatar-edit.component.html',
  styleUrl: './avatar-edit.component.scss'
})
export class AvatarEditComponent {
  fileName: string = 'Subir archivo'
  file!: File
  image: any;
  isVisible: boolean = false;
  hasImage: boolean= false;
  payload!: IFullUser;
  imageUrl: string = '';
  id: string = '';
  fileChoosed: boolean = false;



  constructor(
    private getUserService: GetUserService,
    private usuariosService: UsuariosService
  ){
    this.getUserData();
  }

  getUserData() {
   
    this.getUserService.getUserData.subscribe({
      next: (user)=>{
        // this.userLogin = user.loginUser
        this.payload = {
          idLogin: user._id,
          loginUser: user.loginUser,
          personalData :user.personalData,
          accountData: user.accountData
        };

        this.imageUrl= user?.personalData?.image || ''
        this.id = user._id || ''
        this.hasImage = this.imageUrl === '' ? false : true
      }      
    })
  }

  


  openModal(){
    this.isVisible= true;
  }

  handleCancel(){
    this.isVisible= false;
  }

 
  

  async subirArchivo(event: Event){
    const target = event.target as HTMLInputElement
    if(target?.files){
      this.file= target?.files[0];
      const base64 = await this.fileToBase64(this.file)
      this.imageUrl  = base64
      this.hasImage= true
      this.fileChoosed = true;
    }
  }

  fileToBase64(file: File): Promise<string>{
    return new Promise((res, rej)=>{
      const reader = new FileReader();
      reader.onload = () => {
        if(typeof reader.result === 'string'){
          res(reader.result)
        } else {
          rej(new Error('error'))
        }
      }
      reader.onerror = (error) => rej(error)
      reader.readAsDataURL(file);
    })
  }
  saveImage(){
    if(this.payload?.personalData){
      this.payload.personalData.image = this.imageUrl
    }
    
    this.usuariosService.updateUser(this.payload, this.id).subscribe(_=>{
      console.log('Usuario editado');
      // this.message.success('Usuario editado');

    })
  }

  

}
