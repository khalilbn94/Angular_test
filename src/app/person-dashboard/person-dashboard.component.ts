import { Component, OnInit } from '@angular/core';
import { FormBuilder , FormGroup} from '@angular/forms';
import { ApiService } from '../shared/api.service';
import { PersonModel } from './person.model';

@Component({
  selector: 'app-Person-dashboard',
  templateUrl: './Person-dashboard.component.html',
  styleUrls: ['./Person-dashboard.component.css']
})
export class PersonDashboardComponent implements OnInit {

  formValue!: FormGroup; 

  Personobj: PersonModel = new PersonModel;

  allPerson: any;

  btnUpdateShow:boolean = false;

  btnSaveShow:boolean = true;


  constructor(private formBuilder:FormBuilder, private api:ApiService ) { }

  ngOnInit(): void {
    this.formValue = this.formBuilder.group({
      fname:[''],
      lname:[''],
      email:[''],
    })
    this.AllPerson();
  }

  AddPerson(){
    this.Personobj.fname = this.formValue.value.fname;
    this.Personobj.lname = this.formValue.value.lname;
    this.Personobj.email = this.formValue.value.email;

    this.api.postPerson(this.Personobj).subscribe({
      next: (v) => {console.log(v)},
    error: (e) => {
      alert("Error")
      console.log(e)},
    complete: () => {
      console.log('complete')
      alert("Data Saved")
      this.AllPerson();
      this.formValue.reset();
    } })

  }

  AllPerson(){
    this.api.getPerson().subscribe(res => {
      this.allPerson = res;
    })
  }

  EditPerson(data:any){
    this.formValue.controls['fname'].setValue(data.fname);
    this.formValue.controls['lname'].setValue(data.lname);
    this.formValue.controls['email'].setValue(data.email);
    this.Personobj.id = data.id;
    this.UpdateShowBtn();
  }

  UpdatePerson(){
    
    this.Personobj.fname = this.formValue.value.fname;
    this.Personobj.lname = this.formValue.value.lname;
    this.Personobj.email = this.formValue.value.email;
   
    this.api.putPerson(this.Personobj,this.Personobj.id).subscribe(res => {
      alert("Data Updated");
      this.AllPerson();
      this.SaveShowBtn();
    })


  }


  DeletePerson(data:any){
    this.api.deletePerson(data.id).subscribe(res => {
      alert("Record Deleted");
      this.AllPerson();
    })

  }

  UpdateShowBtn()
  {
    this.btnUpdateShow = true;
    this.btnSaveShow = false;
  }
  SaveShowBtn()
  {
    this.btnUpdateShow = false;
    this.btnSaveShow = true;
  }



}
