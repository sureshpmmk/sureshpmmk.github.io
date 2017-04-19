import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router'
@Component({
  templateUrl: './dashboard.component.html'
})
export class DashboardComponent implements OnInit {

  constructor(private router: Router){}
  public loggedUser = localStorage.getItem("username");
  ngOnInit() {  
    if(this.loggedUser == null)
    {
    	 this.router.navigate(['pages/login']);
    }
  }

}
