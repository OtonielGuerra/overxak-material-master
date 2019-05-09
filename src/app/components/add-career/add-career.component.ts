import { Component, OnInit } from '@angular/core';
import { Career } from 'src/app/models/Career';
import { CarreraService } from 'src/app/services/carrera.service';
import { MatDialog, MatSnackBar, MatDialogRef } from '@angular/material';
import { ListCareersComponent } from '../list-careers/list-careers.component'
import { Observable } from 'rxjs';
import { HomeComponent } from '../home/home.component';

@Component({
  selector: 'app-add-career',
  templateUrl: './add-career.component.html',
  styleUrls: ['./add-career.component.css']
})
export class AddCareerComponent implements OnInit {
  career: Career = new Career('', '', '');

  constructor(  public rest: CarreraService,
                private snack: MatSnackBar,
                private dialogRef: MatDialogRef<HomeComponent>) {  }

  ngOnInit() {
  }

  onSubmit(){
    this.rest.setCarrera(this.career).subscribe(res => {
      if(res.carreraSave && res.carreraSave._id){
        this.snack.open('Carrera guardada con exito')
      }
    })
  }

}
