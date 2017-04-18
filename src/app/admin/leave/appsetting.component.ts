import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-appsetting',
  templateUrl: './appsetting.component.html',
  styleUrls: ['./appsetting.component.scss']
})
export class AppsettingComponent implements OnInit {

  constructor() { }

  ngOnInit() {

  	this.RecreateDynamicTextboxes;

  }
  AddTextBox() {
    var div = document.createElement('DIV');
    div.innerHTML = this.GetDynamicTextBox("");
    document.getElementById("TextBoxContainer").appendChild(div);
}
GetDynamicTextBox(value){
    return '<input name = "DynamicTextBox" [ng-class]="classMap" type="text" value = "' + value + '" />' +
            '<input type="button" [ng-class]="classMap" value="Remove" (click) = "RemoveTextBox(this)" />'
}

RemoveTextBox(div) {
    document.getElementById("TextBoxContainer").removeChild(div.parentNode);
}
 
RecreateDynamicTextboxes() {
    var values = eval('<%=Values%>');
    if (values != null) {
        var html = "";
        for (var i = 0; i < values.length; i++) {
            html += "<div>" + this.GetDynamicTextBox(values[i]) + "</div>";
        }
        document.getElementById("TextBoxContainer").innerHTML = html;
    }
}
}
