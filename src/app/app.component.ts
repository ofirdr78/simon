import { Component } from '@angular/core';
import { TimerObservable } from 'rxjs/observable/TimerObservable';
import { Subscription } from 'rxjs/Subscription'

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  audio: any;
  randomButtons: string[];
  private tick: string;
  private subscription: Subscription;
  pathRed: string;
  pathBlue: string;
  pathGreen: string;
  pathYellow: string;
  donePlaying: boolean;
  indexForNotesPlaying: number;
  gameResult: string;
  clickedOnRandom: boolean;
  level: number;
  gameOver: boolean;


  private static colorToNote = {
    blue: 'Anote',
    red: 'Cnote',
    green: 'Fnote',
    yellow: 'Enote'
  };

  constructor() {
    this.audio = new Audio();
    this.randomButtons = ['green', 'blue', 'blue', 'yellow', 'red'];
    this.pathRed = "/assets/red.svg";
    this.pathBlue = "/assets/blue.svg";
    this.pathGreen = "/assets/green.svg";
    this.pathYellow = "/assets/yellow.svg";
    this.donePlaying = false;
    this.indexForNotesPlaying = -1;
    this.gameResult = '';
    this.generateRandom(1);
    this.clickedOnRandom = false;
    this.level = 1;
    this.gameOver = false;
  }

  playnote(color) {
    this.indexForNotesPlaying++;
    this.audio.src = `/assets/${AppComponent.colorToNote[color]}.mp3`;

    this.audio.load();
    this.audio.play();

    this.checkIfSimilarToRandom(color);


  }

  async playRandom() {
    this.gameResult = '';
    this.clickedOnRandom = true;
    for (let i = 0; i < this.randomButtons.length; i++) {
      await delay(600);
      if (this.randomButtons[i].search("blue") != -1) {
        this.resetButtons();
        this.audio.src = "/assets/Anote.mp3";
        this.pathBlue = "/assets/blue1.svg";
      }
      if (this.randomButtons[i].search("red") != -1) {
        this.resetButtons();
        this.audio.src = "/assets/Cnote.mp3";
        this.pathRed = "/assets/red1.svg";
      }
      if (this.randomButtons[i].search("yellow") != -1) {
        this.resetButtons();
        this.audio.src = "/assets/Enote.mp3";
        this.pathYellow = "/assets/yellow1.svg";
      }
      if (this.randomButtons[i].search("green") != -1) {
        this.resetButtons();
        this.audio.src = "/assets/Fnote.mp3";
        this.pathGreen = "/assets/green1.svg";
      }
      this.audio.load();
      this.audio.play();
      if (i + 1 == this.randomButtons.length) {
        await delay(600);
        this.resetButtons();
      }

    }

    function delay(ms: number) {
      return new Promise(resolve => setTimeout(resolve, ms));
    }

  }

  resetButtons() {
    this.pathRed = "/assets/red.svg";
    this.pathBlue = "/assets/blue.svg";
    this.pathGreen = "/assets/green.svg";
    this.pathYellow = "/assets/yellow.svg";
  }

  checkIfSimilarToRandom(color) {
    if (color !== this.randomButtons[this.indexForNotesPlaying]) {
      this.gameResult = "You were wrong... Game Over!"
      this.clickedOnRandom = true;
      this.indexForNotesPlaying = -1;
      this.gameOver = true;

    }

    if (this.indexForNotesPlaying + 1 == this.randomButtons.length && !this.gameOver) {
      this.gameResult = "Nice! let's make things a bit harder..."
      this.level += 1;
      this.generateRandom(this.level);
      this.indexForNotesPlaying = -1;
      this.clickedOnRandom = false;

    }

  }

  StartNewGame() {
    this.indexForNotesPlaying = -1;
    this.gameResult = '';
    this.generateRandom(1);
    this.clickedOnRandom = false;
    this.level = 1;
    this.gameOver = false;
  }


  generateRandom(x) {
    this.randomButtons = [];
    const keys: string[] = Object.keys(AppComponent.colorToNote);

    for (let i = 0; i < x; i++) {
      const rand = Math.floor(Math.random() * 4);
      this.randomButtons[i] = keys[rand];
    }
  }
}




