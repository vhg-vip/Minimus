import { Component, OnInit, OnDestroy } from '@angular/core';
import { UiService } from 'src/app/service/UI/ui.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-add-card',
  templateUrl: './add-card.component.html',
  styleUrls: ['./add-card.component.scss']
})
export class AddCardComponent implements OnInit, OnDestroy {

  subUI: Subscription;
  darkMode: boolean;

  constructor(public ui: UiService) { }

  ngOnInit() {
    this.subUI = this.ui.darkModeState.subscribe((isDark) => {
      this.darkMode = isDark;
    })
  }

  ngOnDestroy(){
    this.subUI.unsubscribe();
  }

} 
