import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';

import { Holiday } from '../../shared/holiday.model';
import { HolidayService } from '../../shared/holiday.service';

@Component({
  selector: 'app-appsetting',
  templateUrl: './appsetting.component.html',
  styleUrls: ['./appsetting.component.scss']
})
export class AppsettingComponent implements OnInit {

  holidays = [];
  holiday;
  holidaydescription = null;
  holidaydate;
  buttonText = "Save Holiday";
  buttonType = "Save";
  holidayIndex;
  formShowFlagText = 'fa fa-plus fa-lg';
  formShowFlag = false;

  @ViewChild('f') holidayForm: NgForm;
  constructor(private holidayService: HolidayService,
              private router: Router) { }

  ngOnInit() {  
  	
  }

  onSaveHoliday(){

  	console.log(this.buttonType);
  	if(this.buttonType == "Update"){
  	this.holidays = this.holidayService.updateHolidayEntry(this.holidayIndex,this.holidayForm.value); 
  	this.holidayForm.reset(); 
  	this.buttonText = "Save Holiday";
    this.buttonType = "Save";
    }
    else{
  	this.holidays = this.holidayService.addHolidayEntry(this.holidayForm.value); 
  	this.holidayForm.reset();
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
    this.buttonText = "Update Holiday";
    this.buttonType = "Update";
       
  }

  toggleFlag() {
    this.formShowFlag = (this.formShowFlag === false) ? true : false;
    this.formShowFlagText = (this.formShowFlag === false) ? 'fa fa-plus fa-lg' : 'fa fa-minus fa-lg';
  }

  
}
