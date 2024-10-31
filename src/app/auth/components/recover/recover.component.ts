import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FormControl, FormGroup, FormsModule, NonNullableFormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzFormModule } from 'ng-zorro-antd/form';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzInputModule } from 'ng-zorro-antd/input';
import { RecoverService } from '../../services/recover.service';
import { Router } from '@angular/router';
import { ISession, IUser } from '../../interfaces/login.interface';
import { IFullUser } from '../../../layouts/interfaces/users.interface';
import { RegistroService } from '../../services/registro.service';
import { UsuariosService } from '../../../layouts/main-user/services/usuarios.service';
import { SESSION } from '../../../share/constant/session.constant';
import { IUpdatePassword } from '../../interfaces/recover.interface';

@Component({
  selector: 'app-recover',
  standalone: true,
  imports: [
    FormsModule,
    ReactiveFormsModule,
    NzInputModule,
    NzButtonModule,
    NzFormModule,
    NzIconModule
  ],
  templateUrl: './recover.component.html',
  styleUrl: './recover.component.scss'
})
export class RecoverComponent {
  userId!: string;
  myForm!: FormGroup;
  initErrorForm: boolean = false;
  passwordVisible: boolean = false;
  repeatPasswordVisible: boolean = false;
  equalErrorForm: boolean = false;
  user!:IFullUser;

  constructor(
    private registroService: RegistroService,
    private recoverService: RecoverService,
    private usuariosService: UsuariosService,
    private route: ActivatedRoute,
    private router: Router,
    // private message: NzMessageService,
    private fb: NonNullableFormBuilder
  ){
    this.initForm()
  }

  ngOnInit(): void {
    // Recoge el parámetro 'id' de la URL
    this.route.queryParamMap.subscribe((queryParams) => {
      this.userId = queryParams.get('id') || '';
      console.log('ID del producto:', this.userId);
      this.getUser()
    });
  }


  initForm(){
    this.myForm = this.fb.group({
      email: new FormControl(''),
      password: new FormControl('', [
        Validators.required,
        Validators.minLength(4)
      ]),
      repeatPassword: new FormControl('', [
        Validators.required,
        Validators.minLength(4)
      ]),
      // remember: [true]
    })
  }

  getUser(){
      this.recoverService.getUser(this.userId).subscribe((user: IFullUser)=>{
        if(user){
          this.user= user;
          this.myForm.setValue({
            
            email: user.loginUser.email,
            password:'',
            repeatPassword: ''

          });
        }
    })
  }

  changePassword(){
    this.initErrorForm = true;
    if(this.myForm.value.password !== this.myForm.value.repeatPassword){
      this.equalErrorForm = true
     } else {
      // this.user.loginUser.password = this.myForm.value.password;
      this.updatePasswordUser()

    }

  }

  updatePasswordUser(){
    const payload: IUpdatePassword = {
      passwordToChange: this.myForm.value.password
    }

    this.recoverService.updatePassword(this.userId, payload).subscribe(_=>{
      // this.message.success('Usuario editado');
      // this.changeSession();
      this.router.navigate(['/login']);

    })    
  }

 
  


  

  // changeSession(){
  //   const userSession = localStorage.getItem(SESSION.localStorage);

  //   if (userSession) {
  //       const session: ISession = JSON.parse(localStorage.getItem(SESSION.localStorage) || '');
  //       if (session.user){
  //         const user = session.user;
  //         user.password = this.user.loginUser.nickName;
  //         user.email = this.user.loginUser.email;


  //         localStorage.setItem(SESSION.localStorage, JSON.stringify(session))
  //       }
  //   };

  // }

  backToHome(){
    this.router.navigate(['/']);
  }

  goToLogin(){
    this.router.navigate(['/login']);
  }

 


  get mail() { return this.myForm?.get('email')}
  get pass() { return this.myForm?.get('password')}  
  get repeatPass() { return this.myForm?.get('repeatPassword')}  


}
