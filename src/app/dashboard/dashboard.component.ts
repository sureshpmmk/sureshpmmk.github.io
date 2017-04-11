import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  templateUrl: 'dashboard.component.html'
})
export class DashboardComponent implements OnInit {
  
  public loggedUser = localStorage.getItem("username");
  ngOnInit() {  
    // this.loggedUser = localStorage.getItem("username");
  }
}
