import { Component, OnInit } from '@angular/core';
import {
    HttpModule,
    Http,
    Response,
    RequestOptions,
    Headers
} from '@angular/http';
import { Observable, Subject } from 'rxjs';
import { PlayGameService, StatusInfo } from '../game.service'

@Component({
    selector: 'app-word',
    templateUrl: './word.component.html',
    styleUrls: ['./word.component.scss']
})

export class WordComponent implements OnInit {

    // Keys that have been "used" by the Hangman game.
    private usedKeySet: Set<string> = new Set<string>();

    statusInfo: StatusInfo;

    actualKeyObservable: Observable<string>;

    backgroundLetters: Array<number>;

    constructor(playGameService: PlayGameService) {

        this.statusInfo = playGameService.statusInfo;

        this.backgroundLetters = Array(this.statusInfo.maxLetters).fill(1);

        let isLetterAtoZ = (letter: string): boolean => {
            return ('A'.charCodeAt(0) <= letter.charCodeAt(0))
                && ('Z'.charCodeAt(0) >= letter.charCodeAt(0));
        }

        this.actualKeyObservable = Observable.fromEvent(document.body, 'keyup')
            .map((e: KeyboardEvent) => typeof (e.key) !== 'undefined' ? e.key : String.fromCharCode(e.keyCode))
            .map((text: string) => text.toUpperCase())
            .filter((text: string) => 1 === text.length)
            .filter((letter: string) => isLetterAtoZ(letter))
            .debounceTime(100);

    }

    ngOnInit() {

        // Stores keys that we've already used.
        this.consumeLetters((letter: string) => this.usedKeySet.add(letter));

    }

    // Return true when key has been used!
    isKeyUsed(letter: string): boolean {
        return this.usedKeySet.has(letter);
    }

    // Pass a function that consumes a stream of letters.
    consumeLetters(consumer: (letter: string) => any): void {

        // We're combining two observables together as one.
        this.actualKeyObservable
            .subscribe(consumer);
    }

}
