import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef, MatSnackBar } from '@angular/material';
import { ActivatedRoute } from '@angular/router';
import { PersonaService } from '../services/persona.service';
import { Persona } from '../models/Persona';
import { HomeComponent } from '../components/home/home.component';

@Component({
  selector: 'app-delete-person',
  templateUrl: './delete-person.component.html',
  styleUrls: ['./delete-person.component.css']
})
export class DeletePersonComponent implements OnInit {
  param:any;
  loaded:boolean = false;
  persona:Persona;
  constructor(@Inject(MAT_DIALOG_DATA) public data: any, public activated: ActivatedRoute,
  public rest: PersonaService, public dialogRef: MatDialogRef<HomeComponent>, private snack: MatSnackBar) { 

  }
  
  ngOnInit() {
  }

  Delete(person:any){
    console.log(this.data.persona)
    this.rest.deletePersona(this.data.persona).subscribe(res => {
      if(res.deleted){
        this.snack.open('Persona eliminada con éxito', 'Cerrar', {
          duration: 2500
        })
        this.dialogRef.close()
      }else{
        this.snack.open('Error al eliminar la persona', 'Cerrar', {
          duration: 2500
        })
        this.dialogRef.close()
      }
     })
  }

  Cancel(){
    this.dialogRef.close()
  }

}
