import { Component, OnInit } from '@angular/core';
import { Family } from 'src/app/models/Family';
import { PersonaService } from 'src/app/services/persona.service';
import { MatDialog, MatSnackBar, MatDialogRef } from '@angular/material';
import { ListChildrensComponent } from '../list-childrens/list-childrens.component';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-add-family',
  templateUrl: './add-family.component.html',
  styleUrls: ['./add-family.component.css']
})
export class AddFamilyComponent implements OnInit {
  family: Family = new Family('','','','',[]);
  padres = [];
  madres = [];
  encargados = [];
  hijos = [];
  hijosList = [];
  selectedChildren = [];
  filter:any = "Primer Nombre";
  familyName = "";
  sons = [];


  constructor(private rest: PersonaService, private dialog: MatDialog, private snack: MatSnackBar,
    private dialogRef: MatDialogRef<AddFamilyComponent>) {
    this.getAll()
  }

  getAll(){
    this.rest.getPadres().subscribe(res =>{
      this.padres = res.padres
    })
    this.rest.getMadres().subscribe(res =>{
      this.madres = res.madres
    })
    this.rest.getEncargados().subscribe(res =>{
      this.encargados = res.encargados
    })
    this.rest.getHijos().subscribe(res =>{
      this.hijos = res.hijos
    })
    this.rest.getHijos()
    .subscribe(res => {
      this.hijosList = res.hijos
    })
  }

  SelectChildren(){
    let dialog = this.dialog.open(ListChildrensComponent, {
      width: '450px',
      height: '450px',
      hasBackdrop: true
    })
    dialog.afterClosed().subscribe(res => {
      console.log(res)
    })
  }

  ngOnInit() {
  }



  SearchKids(ev){
    let val = ev.target.value;

    if(val && val.trim() !== ''){
        this.hijosList = this.hijosList.filter((item) => {
          return (item.primer_nombre.toLowerCase().indexOf(val.toLowerCase()) > -1);
        })
    }
  }

  SaveFamilia(){
    this.family.hijos.forEach((hijo) => {
      this.selectedChildren.push({idHijo: hijo._id, name: hijo.primer_nombre + " " + hijo.primer_apellido})
    })
    this.family.hijos = this.selectedChildren;
    this.rest.setFamilia(this.family).subscribe(res => {
      console.log(res)
      if(res.familiaSave && res.familiaSave._id){
        this.snack.open('Familia guardada con éxito', 'Cerrar', {
          duration: 2500
        })
        this.dialogRef.close()
      }else if(res.message){
        this.snack.open('No se pudo guardar la familia: ' + res.message, 'Cerrar', {
          duration: 2500
        })
      }
    })
  }

  assign(){

  }



}
