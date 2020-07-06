import { Component, OnInit, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {


  @Output()
  textFinder = new EventEmitter<string>();

  constructor() { }

  ngOnInit() {
  }

  onKey(event: any) {
    if(event.keyCode === 13){
      this.textFinder.emit(event.target.value);
    }
  }


}
