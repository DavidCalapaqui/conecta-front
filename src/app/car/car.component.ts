import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators,ReactiveFormsModule } from '@angular/forms';
import { ICarDto } from './carDto.interface';
import { CarService } from './car.service';
import { UppercaseDirective } from '../directives/uppercase.directive';
import { CommonModule, NgIf } from '@angular/common';


@Component({
  selector: 'app-car',
  standalone: true,
  imports: [ReactiveFormsModule, UppercaseDirective, CommonModule],
  templateUrl: './car.component.html',
  styleUrl: './car.component.css'
})
export class CarComponent implements OnInit {
  
  carForm!: FormGroup;
  circulationForm!: FormGroup;

  defaultDateTime!: string;

  ngOnInit():void{
    console.log('ngOnInit');
    this.defaultDateTime = new Date().toISOString().slice(0,16);
    this.circulationForm = this.fb.group({
      plate:['', [Validators.required, Validators.pattern(/^[A-Z]{3}\d{3,4}$/)]],
      dateTime:[this.defaultDateTime, [Validators.required]]
    })

    this.carForm = this.fb.group({
      plate:['',[ Validators.required, Validators.pattern(/^[A-Z]{3}\d{3,4}$/)]],
      color:['', [Validators.required, Validators.maxLength(30)]],
      automaker:['',[ Validators.required, Validators.maxLength(30)]],
      model:['', [Validators.required, Validators.maxLength(30)]],
      vim:['', [Validators.required, Validators.maxLength(17)]],
    })
  }


  constructor(private fb: FormBuilder){}

  async onSubmit(){
    if(!this.carForm.valid){ return }
    const carData:ICarDto = this.carForm.value;
    console.log({carData});
    await CarService.saveCar(carData);
    this.carForm.reset()
  }

  async getCanCirculation(){
    if(!this.circulationForm.valid){ return }
    const plate = this.circulationForm.value.plate;
    const dateTime = this.circulationForm.get('dateTime')?.value;
    await CarService.getCirculation(plate, dateTime);
    this.circulationForm.reset()
  }

}
