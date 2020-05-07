import { Component, OnInit, OnDestroy } from '@angular/core';
import { UiService } from './service/UI/ui.service';
import { Subscription } from 'rxjs';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit, OnDestroy{
  
  title = 'Minimus';
  showMenu: boolean ;
  darkModeActive: boolean ;
  subUI: Subscription;

  constructor(public ui: UiService, public router: Router){

  }

  ngOnInit(): void {
    this.subUI = this.ui.darkModeState.subscribe((value) => {
      this.darkModeActive = value;
    })
  }

  ngOnDestroy(){
    this.subUI.unsubscribe();
  }

  toggleMenu(){
    this.showMenu = !this.showMenu;
    console.log(this.showMenu);
  }
  modeToggleSwitch(){
    this.ui.darkModeState.next(!this.darkModeActive)
  }

  closeMenu(){
    if(this.showMenu == true){
      this.showMenu = false;
      console.log(this.showMenu);
    }
  }
  
}
