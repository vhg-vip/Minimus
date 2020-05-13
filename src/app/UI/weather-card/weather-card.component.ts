import { Component, OnInit, Input, Output, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { WeatherService } from 'src/app/service/weather/weather.service';
import { UiService } from 'src/app/service/UI/ui.service';
import { FbService } from 'src/app/service/fb/fb.service';
import { first } from 'rxjs/operators';
import { EventEmitter } from 'protractor';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-weather-card',
  templateUrl: './weather-card.component.html',
  styleUrls: ['./weather-card.component.scss']
})
export class WeatherCardComponent implements OnInit, OnDestroy {

  condition: string;
  currentTemp: number;
  minTemp: number;
  maxTemp: number;
  cityName: string;
  subUI: Subscription;
  darkMode: boolean;
  cityAdded: boolean = false;

  constructor(public router: Router,
    public weather: WeatherService,
    public fb: FbService,
    public ui: UiService
  ) { }

  ngOnInit() {
    this.subUI = this.ui.darkModeState.subscribe( (isDark) => {
      this.darkMode = isDark;
    })
  }

  ngOnDestroy(){
    this.subUI.unsubscribe();
  }

  @Input() set city(city: string) {
    this.cityName = city;
    if (city != null) {
      this.weather.getWeather(city).pipe(first()).subscribe((payload) => {
        // console.log(payload);
        this.condition = payload.weather[0].main;
        this.currentTemp = Math.ceil(payload.main.temp);
      }, (err) => {
        console.log("error");
      })

      this.weather.getMaxTemp(city).subscribe((max) => {
        this.maxTemp = max;
      })
      this.weather.getMinTemp(city).subscribe((min) => {
        this.minTemp = min;
      })
    }
  }
  @Input() addMode: boolean;
  // @Output() cityStored = new EventEmitter();

  openDetail() {
    if(!this.addMode){
      this.router.navigateByUrl('/details/' + this.cityName);
    }
  }

  addCity() {
    this.fb.addCity(this.cityName).subscribe(() => {
      this.cityName = null;
      this.maxTemp = null;
      this.minTemp = null;
      this.condition = null;
      this.currentTemp = null;
      this.cityAdded = true;
      // this.cityStored.emit();
      setTimeout(() => this.cityAdded = false, 2000);
    })
  }

  removeCity(){
    this.fb.deleteCity(this.cityName).subscribe(()=>{
      
    })
  }

}
