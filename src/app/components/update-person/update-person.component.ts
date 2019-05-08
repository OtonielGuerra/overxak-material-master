import { Component, OnInit, Inject } from '@angular/core';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA, MatSnackBar} from '@angular/material';
import { Persona } from 'src/app/models/Persona';
import { PersonaService } from 'src/app/services/persona.service';
import { ActivatedRoute, Router } from '@angular/router';
import { HomeComponent } from '../home/home.component';

@Component({
  selector: 'app-update-person',
  templateUrl: './update-person.component.html',
  styleUrls: ['./update-person.component.css']
})
export class UpdatePersonComponent implements OnInit {
  persona: Persona
  param:any
  loaded:boolean = false;
  religions: any[] = [
    {value: 'Católico', viewValue: 'Católico'},
    {value: 'Evangélico', viewValue: 'Evangélico'},
    {value: 'Ateo', viewValue: 'Ateo'}
  ];
  generos: any[] = [
    {value: 'Masculino', viewValue: 'Masculino'},
    {value: 'Femenino', viewValue: 'Femenino'},
    {value: 'Otro', viewValue: 'Otro'}
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
  
  constructor(@Inject(MAT_DIALOG_DATA) public data: any, private rest: PersonaService, private activated: ActivatedRoute,
  private snack: MatSnackBar, public dialogRef: MatDialogRef<HomeComponent>, private router: Router) {
   }

  ngOnInit() {
    console.log(this.data)
   this.persona = this.data
  }

  getPerson(){
  }

  SaveChanges(){
    this.rest.updatePersona(this.data.persona).subscribe(res => {
      if(res.updated){
        this.snack.open('Persona actualizada con éxito', 'Cerrar', {
          duration: 2500
        })
        this.dialogRef.close()
        this.dialogRef.afterClosed()
        .toPromise()
        .then(() => this.getPerson())
      }else{
        this.snack.open('Error al actualizar la persona', 'Cerrar', {
          duration: 2500
        })
      }
     })
  }
}
