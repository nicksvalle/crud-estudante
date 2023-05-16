import { FormBuilder, FormGroup } from '@angular/forms';
import { EstudanteService } from '../estudante.service';
import { Estudante } from './../estudante';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-estudante',
  templateUrl: './estudante.component.html',
  styleUrls: ['./estudante.component.css']
})
export class EstudanteComponent implements OnInit {

  estudante : Estudante[] = [];
  isEditing : boolean = false;
  formGroupClient: FormGroup;
  ClientService: any;

  constructor (private estudanteService : EstudanteService, private formBuilder : FormBuilder){

    this.formGroupClient = formBuilder.group({
      id : [''],
      name : [''],
      email : [''],
      course : [''],
      telefone : ['']
    });
  }

  ngOnInit(): void {
    this.loadEstudante();
  }

  loadEstudante() {
    this.estudanteService.getEstudante().subscribe(
      {
        next : data => this.estudante = data
      }
      );
  }

  save(){
    if(this.isEditing)
    {
      this.estudanteService.update(this.formGroupClient.value).subscribe(
        {
          next: () => {
            this.loadEstudante();
            this.formGroupClient.reset();
            this.isEditing = false;
          }
        }
      )
    }
    else{
      this.estudanteService.save(this.formGroupClient.value).subscribe(
        {
          next: data => {
            this.estudante.push(data);
            this.formGroupClient.reset();
          }
        }
        );
    }
 }

  clean(){
    this.formGroupClient.reset();
    this.isEditing = false;
  }

  edit(estudante : Estudante){
    this.formGroupClient.setValue(estudante);
    this.isEditing = true;
  }

  delete(estudante : Estudante){
    this.estudanteService.delete(estudante).subscribe({
      next: () => this.loadEstudante()
    })
  }

}
