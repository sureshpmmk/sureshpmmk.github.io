import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';

import { Holiday } from '../../shared/holiday.model';
import { HolidayService } from '../../shared/holiday.service';

@Component({
  selector: 'app-appsetting',
  templateUrl: './appsetting.component.html',
  styleUrls: ['../../../assets/css/custom.css']
})
export class AppsettingComponent implements OnInit {

  holidays = [];
  holiday;
  holidaydescription = null;
  holidaydate;
  buttonText = "Add";
  buttonType = "Add";
  holidayIndex;
  formShowFlagText = 'fa fa-plus fa-lg';
  formShowFlag = false;
  holiday_index;
  notValid;

  @ViewChild('f') holidayForm: NgForm;
  constructor(private holidayService: HolidayService,
              private router: Router) { }

  ngOnInit() {  
  	
  }

  onSaveHoliday(){

     this.notValid = '';
  	if(this.holidayForm.valid){
  	if(this.buttonType == "Save"){
  	this.holidays = this.holidayService.updateHolidayEntry(this.holidayIndex,this.holidayForm.value); 
  	this.holidayForm.reset(); 
  	this.buttonText = "Add";
    this.buttonType = "Add";
    }
    else{
  	this.holidays = this.holidayService.addHolidayEntry(this.holidayForm.value); 
  	this.holidayForm.reset();
    }
  }else{
    this.notValid ="Form is not valid.";
  }

  }
   deleteHoliday(holidayIndex: number) {
  	this.holidayService.removeHolidayEntry(holidayIndex);
  }

  updateHoliday(holidayIndex: number)
  {
  	this.getOneHoliday(holidayIndex); 
  	this.holidayIndex = holidayIndex; 	
  }

   getOneHoliday(holidayIndex: number) {
    
    this.holiday = this.holidayService.getOneHoliday(holidayIndex);  


    this.holidaydescription   = this.holiday.holidaydescription;
    this.holidaydate  = this.holiday.holidaydate;
    this.buttonText = "Save";
    this.buttonType = "Save";
       
  }

  toggleFlag() {
    this.formShowFlag = (this.formShowFlag === false) ? true : false;
    this.formShowFlagText = (this.formShowFlag === false) ? 'fa fa-plus fa-lg' : 'fa fa-minus fa-lg';
  }
  showModel(holidayId:string){ 
    this.holiday_index = holidayId;             
  }  
}
