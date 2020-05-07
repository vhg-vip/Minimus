import { BehaviorSubject } from 'rxjs';
import { Injectable } from '@angular/core';

@Injectable({
    providedIn: 'root'
})
export class UiService {

    darkModeState: BehaviorSubject<boolean>;

    constructor(){
        this.darkModeState = new BehaviorSubject<boolean>(false);
    }
}