import { Component, ElementRef, OnInit } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  starting: boolean = false;
  start() {
    this.starting = true;
  }

  stop() {
    this.starting = false;
  }

  matrix: boolean[] = [];

  constructor() {}

  ngOnInit(): void {
    for (let i = 0; i < 10000; i++) {
      const random = Math.random() > 0.5;
      this.matrix.push(random);
    }
  }
}
