import { Component, OnInit } from '@angular/core';
import { Subject } from 'rxjs/Subject';
import { PlayGameService, StatusInfo } from "app/game.service";

@Component({
    selector: 'app-game-status',
    templateUrl: './game-status.component.html',
    styleUrls: ['./game-status.component.scss']
})
export class GameStatusComponent implements OnInit {

    // 'New Game' button events are pushed to this subject.
    public newGameSubject = new Subject();

    statusInfo: StatusInfo;

    constructor(playGameService: PlayGameService) {

        this.statusInfo = playGameService.statusInfo;
    }

    ngOnInit() { }

    // Pass a routine that processes New Game requests.
    consumeNewGame(consumer: () => any): void {
        this.newGameSubject.asObservable().subscribe(consumer);
    }
}