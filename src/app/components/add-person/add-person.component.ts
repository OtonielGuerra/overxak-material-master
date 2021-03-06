import { Component, OnInit } from '@angular/core';
import { Persona } from 'src/app/models/Persona';
import { PersonaService } from 'src/app/services/persona.service';
import { MatSnackBar, MatDialogRef } from '@angular/material';
import { HomeComponent } from '../home/home.component';

@Component({
  selector: 'app-add-person',
  templateUrl: './add-person.component.html',
  styleUrls: ['./add-person.component.css']
})
export class AddPersonComponent implements OnInit {
  person: Persona = new Persona('', '', '', '', '', '', null, '', [], '','','','', null, '', '', '','','', '','', '' ,'', '', []);
  religions: any[] = [
    {value: 'Católico', viewValue: 'Católico'},
    {value: 'Evangélico', viewValue: 'Evangélico'},
    {value: 'Ateo', viewValue: 'Ateo'}
  ];
  generos: any[] = [
    {value: 'Masculino', viewValue: 'Masculino'},
    {value: 'Femenino', viewValue: 'Femenino'}
  ];
  roles: any[] = [
    'padre',
    'madre',
    'hijo',
    'encargado'
  ];
  removable = true;
  emailInput: string=""; 
  phoneInput: string = "";
  hidden: boolean = true;
  emails = [];
  emailArray = [];
  phoneArray = [];
  sector: string = "";
  cuadra: string = "";
  edificio: string = "";
  piso: string = "";
  apartamento: string = "";
  estados: any[] = [
    {value: 'Solter@', viewValue: 'Solter@'},
    {value: 'Unión de hecho', viewValue: 'Unión de hecho'},
    {value: 'Casad@', viewValue: 'Casad@'}
  ];
  departments = [
    'Alta Verapaz',
    'Baja Verapaz,',
    'Chimaltenango',
    'Chiquimula',
    'El Progreso',
    'Escuintla',
    'Guatemala',
    'Huehuetenango',
    'Izabal',
    'Jalapa',
    'Jutiapa',
    'Petén',
    'Quetzaltenango',
    'Quiché',
    'Retalhuleu',
    'Sacatepéquez',
    'San Marcos',
    'Santa Rosa',
    'Sololá',
    'Suchitepéquez',
    'Totonicapán',
    'Zacapa'   
  ]
  constructor(public rest: PersonaService, private snack: MatSnackBar, private dialogRef: MatDialogRef<HomeComponent>) { 
    console.log(this.person.role);
  }

  ngOnInit() {
  }

  mostrarCampos(){
    this.hidden = !this.hidden;
  }

  removeE(emailArray){
    let unique = {};
    emailArray.forEach(function(i) {
      if(!unique[i]){
        unique[i] = true;
      }
    });
    return Object.keys(unique);
  }


  addPhone(){
    if(this.phoneInput !== ""){
      this.phoneArray.push(this.phoneInput)
      this.phoneInput = "";
    }else{
      this.snack.open('Debe ingresar un teléfono', 'Cerrar', {
        duration: 2500
      })
    }
  }



  addEmail(){
    if(this.emailInput !== ""){
      if(this.emailArray.length < 5){
        this.emailArray.push(this.emailInput)
        this.snack.open('Correo electrónico agregado', 'Cerrar', {
          duration: 2500
        })

        this.emailInput = ""
        console.log(this.emailArray)

      }else{
        this.snack.open('No puede ingresar más de 5 correos', 'Cerrar', 
        {
          duration: 2500
        })
      }

    }else{
      this.snack.open('Debe ingresar un correo electrónico', 'Cerrar', 
      {
        duration: 2500
      })
    }

  }

  onSubmit(){
    this.person.correos = this.emailArray;
    this.person.numeros = this.phoneArray;
    this.person.apto = this.apartamento;
    this.person.cuadra = this.cuadra;
    this.person.sector = this.sector;
    this.person.edificio = this.edificio;
    this.person.piso = this.piso;
    this.rest.setPersona(this.person).subscribe(res => {
      if(res.personaSave && res.personaSave._id){
        this.snack.open('Persona guardada con éxito', 'Cerrar', {
          duration: 2500
        })
        this.dialogRef.close()
        console.log(res.personaSave._id)
      }else{
        this.snack.open('No se pudo guardar la persona', 'Cerrar', {
          duration: 2500
        })
      }
    }, (err) => {
      console.log(<any>err)
    })
    console.log(this.person);
  }

  remove(phone): void {
    const index = this.phoneArray.indexOf(phone);

    if (index >= 0) {
      this.phoneArray.splice(index, 1);
    }
  }



  eliminar(email:any) : void{
    const index = this.emailArray.indexOf(email);

    if(index >= 0){
      this.emailArray.splice(index, 1)
    }
  }

}
