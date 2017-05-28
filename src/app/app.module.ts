import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { AppComponent } from './app.component';
import { HangmanComponent } from './hangman/hangman.component';
import { MissedLettersComponent } from './missed-letters/missed-letters.component';
import { WordComponent } from './word/word.component';
import { WordService } from './word/word.service';
import { PlayGameService } from './game.service';
import { GameStatusComponent } from './game-status/game-status.component';

@NgModule({
    declarations: [
        AppComponent,
        HangmanComponent,
        MissedLettersComponent,
        WordComponent,
        GameStatusComponent
    ],
    imports: [
        BrowserModule,
        FormsModule,
        HttpModule
    ],
    providers: [WordService,
        PlayGameService],
    bootstrap: [AppComponent]
})
export class AppModule { }
