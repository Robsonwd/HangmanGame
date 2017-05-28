import { Component, AfterViewInit, ViewChild } from '@angular/core';

import { PlayGameService } from './game.service';
import { GameStatusComponent } from './game-status/game-status.component';
// import { KeyboardComponent } from './keyboard/keyboard.component' ;
import { HangmanComponent } from './hangman/hangman.component';
import { WordComponent } from './word/word.component';
import { MissedLettersComponent } from "app/missed-letters/missed-letters.component";


@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss']
})

export class AppComponent implements AfterViewInit {

    @ViewChild(WordComponent) private WordComponent: WordComponent;
    @ViewChild(GameStatusComponent) private GameStatusComponent: GameStatusComponent;
    @ViewChild(MissedLettersComponent) private MissedLettersComponent: MissedLettersComponent;
    @ViewChild(HangmanComponent) private hangmanComponent: HangmanComponent;

    constructor(private playGameService: PlayGameService) { }

    ngAfterViewInit(): void {
        this.GameStatusComponent.consumeNewGame(this.playGameService.newGame);
        this.WordComponent.consumeLetters(this.playGameService.playLetter);
        this.playGameService.consumeBodyParts(this.hangmanComponent.drawBody);
    }
}
