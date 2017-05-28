import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs';


@Injectable()
export class WordService {

    private word: Array<string>;

    constructor(private http: Http) {
        this.getWord();
    }

    getWord(){
        this.http.request('http://api.wordnik.com:80/v4/words.json/randomWord?hasDictionaryDef=true&minCorpusCount=0&maxCorpusCount=-1&minDictionaryCount=1&maxDictionaryCount=-1&minLength=5&maxLength=11&api_key=a2a73e7b926c924fad7001ca3111acd55af2ffabf50eb4ae5')
        .subscribe((res: Response) => {
            this.word = res.json().word.toUpperCase().split('');
        });

        return this.word;
    }
}