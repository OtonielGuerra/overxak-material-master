import { Component, OnInit, DoCheck, OnChanges, IterableDiffers, SimpleChanges, Input, ViewChild } from '@angular/core';
import { PersonaService } from 'src/app/services/persona.service';
import { MatDialog } from '@angular/material/dialog';
import { UpdatePersonComponent } from '../update-person/update-person.component';
import { Route, Router } from '@angular/router';
import { Persona } from 'src/app/models/Persona';
import { DeletePersonComponent } from 'src/app/delete-person/delete-person.component';
import {ChangeDetectorRef} from "@angular/core"
import { Observable } from 'rxjs';
import { MatSort } from '@angular/material';
import { AddPersonComponent } from '../add-person/add-person.component';
import { AssignRoleComponent } from '../assign-role/assign-role.component';
import { AddFamilyComponent } from '../add-family/add-family.component';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit{
  @Input() people : Observable<any>;

  actPerson: Persona;
  personas = [];
  selected = [];
  isChecked:boolean = false;
  filter:any = "Primer Nombre";
  iterableDiffer:any;
  data:any = "";
  displayedColumns: string[] = ['primer_nombre', 'segundo_nombre', 'primer_apellido', 'segundo_apellido', 'update_person'];
  filters: any[] = [
    {value: 'Primer Nombre', viewValue: 'Primer Nombre'},
    {value: 'Segundo Nombre', viewValue: 'Segundo Nombre'},
    {value: 'Primer Apellido', viewValue: 'Primer Apellido'},
    {value: 'Segundo Apellido', viewValue: 'Segundo Apellido'}
  ]
  constructor(public rest: PersonaService, public dialog: MatDialog, private router: Router,
    private ref: ChangeDetectorRef) {

     }

  ngOnInit() {
    this.getPersonas();
  }

  getPersonas(){
    this.rest.getPersonas()
    .subscribe(res => {
      console.log(res.todasLasPersonas);
      this.personas = res.todasLasPersonas;
    });
    
  }

  setPerson(person:Persona){
    this.actPerson = person;
  }

  Select(person, ev){
    if(ev.checked === true){
      this.selected.push(person); console.log('Insertado', this.selected)
    }else{
      for(let i=0; i< this.selected.length; i++){
        if(person._id === this.selected[i]._id){
          this.selected.splice(this.selected[i], 1)
          console.log('Eliminado', this.selected)
        }
      }
    }
    
  }

  AssignRole(person){
    let dialog = this.dialog.open(AssignRoleComponent, {
      width: '570px',
      height: '540px',
      data: {persona: person}
    })
  }

  AddPerson(){
    this.getPersonas()
    let dialog = this.dialog.open(AddPersonComponent, {
      width: '570px',
      height: '540px'
    })
    dialog.afterClosed().subscribe(res => {
      this.getPersonas()
    })
  }

AddFamily(){
  this.getPersonas()
  let dialog = this.dialog.open(AddFamilyComponent, {
    width: '570px',
    height: '540px'
  })
  dialog.afterClosed().subscribe(res => {
    this.getPersonas()
  })
}

  Edit(person:any){
    this.getPersonas()
    let dialog = this.dialog.open(UpdatePersonComponent, {
      width: '500px',
      height: '500px',
      data: {persona: person}
    })
    dialog.afterClosed().subscribe(res => {
      this.getPersonas()
    })
  }

  Delete(person:any){
    let dialog = this.dialog.open(DeletePersonComponent, {
      width: '330px',
      height: '190px',
      data: {persona: person}
    })
    dialog.afterClosed().subscribe(res => {
      this.getPersonas()
    })
  }

  Event(event){
    this.filter = ""
  }


  Search(ev){

    let val = ev.target.value;

    if(val && val.trim() != ''){
      if(this.filter === 'Primer Nombre'){
        this.personas = this.personas.filter((item) => {
          return (item.primer_nombre.toLowerCase().indexOf(val.toLowerCase()) > -1);
        })
      }else if(this.filter === 'Segundo Nombre'){
        this.personas = this.personas.filter((item) => {
          return (item.segundo_nombre.toLowerCase().indexOf(val.toLowerCase()) > -1);
        })
      }else if(this.filter === 'Primer Apellido'){
        this.personas = this.personas.filter((item) => {
          return (item.primer_apellido.toLowerCase().indexOf(val.toLowerCase()) > -1);
        })
      }else if(this.filter === 'Segundo Apellido'){
        this.personas = this.personas.filter((item) => {
          return (item.segundo_apellido.toLowerCase().indexOf(val.toLowerCase()) > -1);
        })
      }
    }else if(val === ''){
      this.getPersonas()
    }
  }

}
