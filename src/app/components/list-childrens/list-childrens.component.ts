import { Component, OnInit } from '@angular/core';
import { PersonaService } from 'src/app/services/persona.service';

@Component({
  selector: 'app-list-childrens',
  templateUrl: './list-childrens.component.html',
  styleUrls: ['./list-childrens.component.css']
})
export class ListChildrensComponent implements OnInit {
  hijos = []
  constructor(private rest: PersonaService) { 
    this.rest.getHijos()
    .subscribe(res => {
      this.hijos = res.hijos
    })
  }

  ngOnInit() {
  }

  Pusher(ev){
    console.log(ev.target)
  }

}
