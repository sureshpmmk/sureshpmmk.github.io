import { Subject } from 'rxjs/Subject';

import { Leave } from './leave.model';

export class LeaveService {
  leaveEntryChanged = new Subject<Leave[]>();
  private leaves: Leave[] = [];

  getLeaveEntry() {
  	return this.leaves.slice();
  }

  addLeaveEntry(leave: Leave) {
  	this.leaves.push(leave);
    this.leaveEntryChanged.next(this.leaves.slice());
  }

  removeLeaveEntry(leaveIndex) {
    if (leaveIndex > -1) {
      this.leaves.splice(leaveIndex, 1);
      this.leaveEntryChanged.next(this.leaves.slice());
    }    
  }

  updateLeaveEntry(leaveIndex: number, leaveData: Leave) {
    if (leaveIndex > -1) {
      this.leaves[leaveIndex] = leaveData;
      this.leaveEntryChanged.next(this.leaves.slice());
    }    
  }

  getOneLeave(leaveIndex: number) {
    return this.leaves[leaveIndex];
  } 

}