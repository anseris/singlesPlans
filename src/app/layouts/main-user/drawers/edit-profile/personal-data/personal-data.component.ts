import { Component, model } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { GetUserService } from '../services/get-user.service';
import { NzDatePickerModule } from 'ng-zorro-antd/date-picker';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzRadioModule } from 'ng-zorro-antd/radio';
import { NgIf } from '@angular/common';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzFormModule } from 'ng-zorro-antd/form';

@Component({
  selector: 'app-personal-data',
  standalone: true,
  imports: [
    FormsModule,
    ReactiveFormsModule,
    NzInputModule,
    NzButtonModule,
    NzDatePickerModule,
    NzRadioModule,
    NzIconModule,
    NzFormModule,
    NgIf 
  ],
  templateUrl: './personal-data.component.html',
  styleUrl: './personal-data.component.scss'
})
export class PersonalDataComponent {
  id: string = '';
  userSession = {};  
  myFormPersonal!: FormGroup;
  initErrorForm: boolean = false;
  showModuleEdit: boolean = false;
  personalForm = model()

  constructor(
    private getUserService: GetUserService,
    private fb: FormBuilder
  ){
    this.initForms();
  }

  // @Output() formChange = new EventEmitter<any>();

  ngOnInit(): void {
    this.getUserData()
    
  }

  initForms(){
   
    this.myFormPersonal= this.fb.group({
      image: new FormControl(''),
      name: new FormControl(''),
      secondName: new FormControl(''),
      birthDate: new FormControl(''),
      gender: new FormControl(''),
      phone: new FormControl(''),
    })
  }

  onChange(result: Date): void {
    console.log('onChange: ', result);
    this.savePersonalForm()
  }

  getUserData() {
    this.getUserService.getUserData.subscribe({
      next: (user)=>{
        if(user && user.personalData){
          this.myFormPersonal.setValue({
            image: user.personalData.image,
            name: user.personalData.name,
            secondName: user.personalData.secondName,
            birthDate: user.personalData.birthDate,
            gender: user.personalData.gender,
            phone: user.personalData.phone
          });
          this.personalForm.set(this.myFormPersonal)
        }        
      }      
    });
  }

  savePersonalForm(){
    if(this.myFormPersonal.valid && this.showModuleEdit){
      this.personalForm.set(this.myFormPersonal)
    }
  }

  changeshowModuleEdit(){
    this.showModuleEdit = true
  }

  
  get nombre() { return this.myFormPersonal?.get('name')}
  get apellidos() { return this.myFormPersonal?.get('secondName')}
  get fecha() { return this.myFormPersonal?.get('birthDate')}
  get genero() { return this.myFormPersonal?.get('gender')}
  get telefono() { return this.myFormPersonal?.get('phone')} 


}
