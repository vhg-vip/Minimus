import { Component, OnInit, OnDestroy } from '@angular/core';
import { UiService } from './service/UI/ui.service';
import { Subscription } from 'rxjs';
import { Router } from '@angular/router';
import { FbService } from './service/fb/fb.service';

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
  loggedIn = this.fb.isAuth();
  userEmail = '';

  constructor(
    public ui: UiService, 
    public router: Router,
    public fb: FbService
    ){

  }

  ngOnInit(): void {
    this.subUI = this.ui.darkModeState.subscribe((value) => {
      this.darkModeActive = value;
    })

    this.fb.auth.userData().subscribe( (user) => {
      this.userEmail = user.email;
      // console.log(this.userEmail)
    })
  }

  ngOnDestroy(){
    this.subUI.unsubscribe();
  }

  toggleMenu(){
    this.showMenu = !this.showMenu;
    // console.log(this.showMenu);
  }
  modeToggleSwitch(){
    this.ui.darkModeState.next(!this.darkModeActive)
  }

  closeMenu(){
    if(this.showMenu == true){
      this.showMenu = false;
      // console.log(this.showMenu);
    }
  }
;
  logout(){
    this.toggleMenu();
    this.router.navigateByUrl('/login');
    this.fb.auth.signout();
  }
  
}
