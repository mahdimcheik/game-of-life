import { Component, ElementRef, OnInit, Type } from '@angular/core';
type point = {
  x: number;
  y: number;
};

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
  matrixNew: boolean[] = [];
  N: number = 100;
  interval: any;

  constructor() {}

  ngOnInit(): void {
    const total = this.N * this.N;
    for (let i = 0; i < total; i++) {
      const random = Math.random() > 0.5;
      this.matrix.push(random);
      this.matrixNew.push(false);
    }
  }

  calculateNextStep() {
    const total = this.N * this.N;
    this.interval = setInterval(() => {
      for (let i = 0; i < total; i++) {
        const X = Math.floor(i / this.N);
        const Y = i % this.N;

        const topX = X === 0 ? this.N - 1 : X - 1;
        const bottonX = X === this.N - 1 ? 0 : X + 1;
        const leftY = Y === 0 ? this.N - 1 : Y - 1;
        const rightY = Y === this.N - 1 ? 0 : Y + 1;

        let alives = 0;
        if (this.matrix[topX * this.N + Y]) alives++;
        if (this.matrix[bottonX * this.N + Y]) alives++;
        if (this.matrix[X * this.N + leftY]) alives++;
        if (this.matrix[X * this.N + rightY]) alives++;

        if (this.matrix[topX * this.N + rightY]) alives++;
        if (this.matrix[topX * this.N + leftY]) alives++;
        if (this.matrix[bottonX * this.N + rightY]) alives++;
        if (this.matrix[bottonX * this.N + leftY]) alives++;

        if (this.matrix[i]) {
          if (alives > 3) {
            this.matrixNew[i] = false;
          } else if (alives === 2 || alives === 3) {
            this.matrixNew[i] = true;
          } else if (alives < 2) {
            this.matrixNew[i] = false;
          }
        } else {
          if (alives === 3) {
            this.matrixNew[i] = true;
          }
        }
      }
      this.matrix = [...this.matrixNew];
    }, 100);
  }

  changeSingleState(event: boolean, index: number) {
    this.matrix[index] = event;
    this.matrixNew[index] = event;
  }

  startInterval() {
    this.calculateNextStep();
  }

  startcleanPage() {
    const total = this.N * this.N;
    clearInterval(this.interval);
    for (let i = 0; i < total; i++) {
      this.matrix[i] = false;
      this.matrixNew[i] = false;
    }
  }
  randomize() {
    const total = this.N * this.N;

    for (let i = 0; i < total; i++) {
      const random = Math.random() > 0.5;
      this.matrix[i] = random;
      this.matrixNew[i] = false;
    }
  }
}
