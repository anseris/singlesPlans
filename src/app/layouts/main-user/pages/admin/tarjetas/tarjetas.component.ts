import { Component } from "@angular/core";
import { FormBuilder, FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from "@angular/forms";
import { BrowserModule } from "@angular/platform-browser";
import { NzButtonModule } from "ng-zorro-antd/button";
import { NzFormModule } from "ng-zorro-antd/form";
import { NzInputModule } from "ng-zorro-antd/input";
import { NzSelectModule } from "ng-zorro-antd/select";
import { QuillModule } from 'ngx-quill';


@Component({
  selector: 'app-tarjetas',
  standalone: true,
  imports: [
    FormsModule,
    ReactiveFormsModule,
    NzInputModule,
    NzButtonModule,
    QuillModule,
    NzSelectModule,
    NzFormModule   
  ],
  templateUrl: './tarjetas.component.html',
  styleUrl: './tarjetas.component.scss'
})
export class TarjetasComponent {

  meses = ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre']
  franjaEdad = ['20 a 35 años', '35 a 55 años', 'Mayores de 55 años'];
  tipoViaje = ['Naturaleza/Aventura', 'Turismo/Monumentos', 'Fiesta/Ocio'];

  initErrorForm: boolean = false;
  
  myForm!: FormGroup;
  constructor(
    private fb: FormBuilder
  ){
    this.initForms();
  }

  initForms(){
   
    this.myForm= this.fb.group({
      imagen: new FormControl(''),
      titulo: new FormControl(''),
      subtitulo: new FormControl(''),
      descripcion: new FormControl(''),
      destino: new FormControl(''),
      fechainicio: new FormControl(''),
      fechafin: new FormControl(''),
      mes: new FormControl(''),
      franjaedad: new FormControl(''),
      tipoviaje: new FormControl(''),
      periodo: new FormControl(''),
      precio: new FormControl(''),
      
    })
  }

  sendMessage(){
    this.initErrorForm = true;
    if(this.myForm.valid){
      console.log('formulario', this.myForm.value)
    }
  }

  get img() { return this.myForm?.get('imagen')}
  get tit() { return this.myForm?.get('titulo')}
  get subtit() { return this.myForm?.get('subtitulo')}
  get descrip() { return this.myForm?.get('descripcion')}
  get destin() { return this.myForm?.get('destino')}
  get fechini() { return this.myForm?.get('fechainicio')}
  get fechfin() { return this.myForm?.get('fechafin')}
  get mese() { return this.myForm?.get('mes')}
  get franja() { return this.myForm?.get('franjaedad')}
  get tipviaje() { return this.myForm?.get('tipoviaje')}
  get period() { return this.myForm?.get('periodo')}
  get preci() { return this.myForm?.get('precio')}

}
