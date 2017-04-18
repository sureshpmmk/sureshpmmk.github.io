import { Subject } from 'rxjs/Subject';

import { Holiday } from './holiday.model';

export class HolidayService {

  holidayEntryChanged = new Subject<Holiday[]>();
  private holidays: Holiday[] = [];

  getHolidayEntry() {
  	return this.holidays.slice();
  }

  addHolidayEntry(holiday: Holiday) {
  	this.holidays.push(holiday);
    this.holidayEntryChanged.next(this.holidays.slice());
    return this.holidays;
  }

   removeHolidayEntry(holidayIndex) {
    if (holidayIndex > -1) {
      this.holidays.splice(holidayIndex, 1);
      this.holidayEntryChanged.next(this.holidays.slice());
    }    
  }
   getOneHoliday(holidayIndex: number) {
    return this.holidays[holidayIndex];
  } 

   updateHolidayEntry(holidayIndex: number, holidayData: Holiday) {
    if (holidayIndex > -1) {
      this.holidays[holidayIndex] = holidayData;
      this.holidayEntryChanged.next(this.holidays.slice());
      return this.holidays;
    }    
  }


}