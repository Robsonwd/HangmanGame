import { Component, OnInit } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { PlayGameService, StatusInfo } from '../game.service';

@Component({
    selector: 'app-hangman',
    templateUrl: './hangman.component.html',
    styleUrls: ['./hangman.component.scss']
})
export class HangmanComponent implements OnInit {

    statusInfo: StatusInfo;
    bodyPart: number;

    constructor(playGameService: PlayGameService) {

        this.statusInfo = playGameService.statusInfo;
        this.bodyPart = this.statusInfo.missedLetters.length;
    }

    ngOnInit() {
    }

    drawBody = (parts: number = 0): void => {
        this.bodyPart = parts;
    }
}
