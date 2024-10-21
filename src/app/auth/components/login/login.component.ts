import { Component } from '@angular/core';
import { FormControl, FormGroup, FormsModule, NonNullableFormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzFormModule } from 'ng-zorro-antd/form';
import { NzInputModule } from 'ng-zorro-antd/input';
import { LoginService } from '../../services/login.service';
import { Router } from '@angular/router';
import { SESSION } from '../../../share/constant/session.constant';
import { ISession, IUserSession } from '../../interfaces/login.interface';
import { NzIconModule } from 'ng-zorro-antd/icon';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    FormsModule,
    ReactiveFormsModule,
    NzInputModule,
    NzButtonModule,
    NzFormModule,
    NzIconModule
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {
  myForm!: FormGroup;
  initErrorForm: boolean = false;
  passwordVisible: boolean = false;

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
      // remember: [true]
    })
  }

  // submitForm(): void {
  //   if (this.myForm.valid) {
  //     this. login()
  //   } else {
  //     Object.values(this.myForm.controls).forEach(control => {
  //       if (control.invalid) {
  //         control.markAsDirty();
  //         control.updateValueAndValidity({ onlySelf: true });
  //       }
  //     });
  //   }
  // }

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
        this.router.navigate(['/logado'])
      } else{
        session.token = '';
      }
      localStorage.setItem(SESSION.localStorage, JSON.stringify(session))
     

    })
  }
 
  get mail() { return this.myForm?.get('email')}
  get pass() { return this.myForm?.get('password')}  

}


