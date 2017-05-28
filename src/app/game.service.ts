import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import * as _ from 'underscore';

import { Hangman } from './hangman/hangman.helper';
import { WordService } from './word/word.service';

// Holder of state information for the Hangman game.
export interface StatusInfo {
    caption: string;
    hangWord: Array<string>;
    guessWord: Array<string>;
    missedLetters: Array<string>;
    maxLetters: number;
    active: boolean;
}

@Injectable()
export class PlayGameService {

    public statusInfo: StatusInfo = {
        caption: 'Welcome to Hangman Game!',
        hangWord: ['h', 'a', 'n', 'g', 'm', 'a', 'n'],
        guessWord: ['h', 'a', 'n', 'g', 'm', 'a', 'n'],
        missedLetters: [],
        maxLetters: Hangman.maxGuessess(),
        active: false
    };

    // Monitors count of body parts.
    private bodyPartsSubject = new Subject<number>();
    private bodyPartsObservable = this.bodyPartsSubject.asObservable();

    // Get reference to word source.
    constructor(private wordService: WordService) {
    }

    // Important! -> This is an "instance" method for the class!
    playLetter = (letter: string): void => {

        if (this.statusInfo.active) {
            let guessList = this.statusInfo.guessWord;
            const hangList = this.statusInfo.hangWord;
            guessList = Hangman.applyGuess(letter, guessList, hangList);
            this.statusInfo.guessWord = guessList;

            const missedLetters = this.statusInfo.missedLetters;
            this.statusInfo.missedLetters = Hangman.applyGuess_(letter, missedLetters, hangList);
            this.bodyPartsSubject.next(this.statusInfo.missedLetters.length);

            //Check if passed word is equal to word from api
            if (_.isEqual(this.statusInfo.hangWord, this.statusInfo.guessWord)) {
                if (this.statusInfo.missedLetters.length == 0) {
                    this.statusInfo.caption = 'Congratulations! Fantastic play!';
                } else {
                    this.statusInfo.caption = 'Congratulations on your win!';
                }
                this.statusInfo.active = false;
            }

            //Check if user have no chances to
            else if (this.statusInfo.missedLetters.length >= Hangman.maxGuessess()) {
                this.statusInfo.active = false;
                this.statusInfo.caption = 'Game Over';
                this.statusInfo.guessWord = this.statusInfo.hangWord;
            }

            else {
                this.statusInfo.caption = '';
            }
        }
    }

    //Cover word from api
    coverGuessWord(array: Array<string>): Array<string> {
        let arrayLength = array.length;
        let coverArray = [];
        for (let i = 0; i < arrayLength; i++) {
            if (array[i] == '-') {
                coverArray.push('-');
            } else {
                coverArray.push('_');
            }
        }
        return coverArray;
    }

    // Important! -> This is an "instance" method for the class!
    newGame = (): void => {

        this.statusInfo.caption = '';
        this.statusInfo.hangWord = this.wordService.getWord();
        this.statusInfo.guessWord = this.coverGuessWord(this.statusInfo.hangWord);

        this.statusInfo.missedLetters = [];
        this.bodyPartsSubject.next(this.statusInfo.missedLetters.length);
        this.statusInfo.active = true;
    }

    // Pass a routine that processes count of body parts.
    consumeBodyParts(consumer: (parts: number) => any): void {
        this.bodyPartsObservable.subscribe(consumer);
    }
}