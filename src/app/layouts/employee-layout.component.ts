import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from '../shared/authentication.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './employee-layout.component.html',
  styleUrls: ['./employee-layout.component.css']
})
export class EmployeeLayoutComponent implements OnInit {

  public disabled: boolean = false;
  public status: {isopen: boolean} = {isopen: false};
  public loggedUser = localStorage.getItem("username");
  headerDateInterval;
  headerDate;


  constructor(private authService : AuthenticationService) { 
    document.querySelector('body').classList.add('sidebar-hidden');
  }

  public toggled(open: boolean): void {
    console.log('Dropdown is now: ', open);
  }

  public toggleDropdown($event: MouseEvent): void {
    $event.preventDefault();
    $event.stopPropagation();
    this.status.isopen = !this.status.isopen;
  }

  public logOut()
  {
    clearInterval(this.headerDateInterval);
    this.authService.logout();
  }

  ngOnInit(): void {
    this.headerDateInterval = setInterval(() => {
        this.headerDate =  new Date();
     }, 1000);
  }
}
