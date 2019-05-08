import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-assign-role',
  templateUrl: './assign-role.component.html',
  styleUrls: ['./assign-role.component.css']
})
export class AssignRoleComponent implements OnInit {
  rols: any[] = ['Hijo', 'Padre', 'Madre', 'Encargado']
  constructor() { }

  ngOnInit() {
  }

}
