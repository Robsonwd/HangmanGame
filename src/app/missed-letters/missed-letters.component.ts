import { Component, OnInit } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { PlayGameService, StatusInfo } from '../game.service';

@Component({
    selector: 'app-missed-letters',
    templateUrl: './missed-letters.component.html',
    styleUrls: ['./missed-letters.component.scss']
})
export class MissedLettersComponent implements OnInit {
    statusInfo: StatusInfo;

    constructor(playGameService: PlayGameService) {

        this.statusInfo = playGameService.statusInfo;
    }

    ngOnInit() {
    }

}
