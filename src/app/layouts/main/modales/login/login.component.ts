import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, FormsModule, NonNullableFormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzModalModule } from 'ng-zorro-antd/modal';
import { Router } from '@angular/router';
import { SESSION } from '../../../../share/constant/session.constant';
import { LoginService } from '../../services/login.service';
import { ILoginUser, ISession, IUser, IUserSession } from '../../../interfaces/login.interface';
import { NzFormModule } from 'ng-zorro-antd/form';



@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    FormsModule,
    ReactiveFormsModule,
    NzInputModule,
    NzButtonModule,
    NzModalModule,
    NzFormModule
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {
  myForm!: FormGroup;
  isVisible: boolean = true;
  initErrorForm: boolean = false;

  constructor(
    private loginService: LoginService,
    // private message: NzMessageService,
    private router: Router,
    private fb: NonNullableFormBuilder
  ){
    this.initForm()
  }

  initForm(){
    this.myForm = this.fb.group({
      email: new FormControl('',[
        Validators.required,
        Validators.email
      ]),
      password: new FormControl('', [
        Validators.required,
        Validators.minLength(4)
      ]),
      remember: [true]
    })
  }

  login(){
    this.initErrorForm = true;
    if(this.myForm.valid){
      this.loginService.loginUser(this.myForm.value).subscribe((resultLogin:ISession)=>{
        localStorage.setItem(SESSION.localStorage, JSON.stringify(resultLogin));
        if(resultLogin?.token){
          this.getAndCheckUser();
        }
      })
    }
  }

  getAndCheckUser(){
    let session: ISession = JSON.parse(localStorage.getItem(SESSION.localStorage) || '');
    this.loginService.getAndCheckUser().subscribe((user:IUserSession)=>{
      if (user) {
        const userChoosed = user.users;
        session.user = userChoosed;
        this.isVisible = false;
        this.router.navigate(['/logado'])
      } else{
        session.token = '';
      }
      localStorage.setItem(SESSION.localStorage, JSON.stringify(session))
     

    })
  }
  cancelar(){
    this.isVisible = false;
  }
 
  get mail() { return this.myForm?.get('email')}
  get pass() { return this.myForm?.get('password')}  

}
