import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { WeatherService } from 'src/app/service/weather/weather.service';
import { FbService } from 'src/app/service/fb/fb.service';
import { first } from 'rxjs/operators';

@Component({
  selector: 'app-addcity',
  templateUrl: './addcity.component.html',
  styleUrls: ['./addcity.component.scss']
})
export class AddcityComponent implements OnInit {

  city: string = "Rome"
  state: string = "";
  capital = [];
  temp: number ;
  checkFollow: boolean = false;
  cardCity;
  showNote: boolean = false;
  selectedCity: string;
  sub1;

  constructor(public http: HttpClient, public weather: WeatherService, public fb: FbService ) { }

  ngOnInit() {
    this.weather.getCityWeatherByName(this.city).subscribe((payload: any) => {
      // console.log(payload);
      this.state = payload[0].main;
    });
    this.weather.getCurrentTemp(this.city).subscribe( (temp: number) => {
      this.temp = Math.ceil(Number(temp));
      // console.log(this.temp);
    })

    this.http.get('https://restcountries.eu/rest/v2/all').pipe( (first())).subscribe( (countries: Array<any>) => {
      countries.forEach( (country: any) => {
        if(country.capital.length){
          this.capital.push(country.capital);
        }
      });
      this.capital.sort();
      console.log(this.capital);
    });

    this.sub1 = this.fb.getCities().subscribe((cities) => {
      // console.log(cities);
      Object.values(cities).forEach((city: any) => {
        if(city.name === 'Rome'){
          this.checkFollow = true;
        }
      });
    });

  }

  selectCity(city){
    if(this.capital.includes(city)){
      this.cardCity = city;
      // this.showNote = false;
    }
    else {
      this.showNote = true;
    }
    // console.log(city);
  }

  addCityOfTheMonth(){
    this.fb.addCity('Rome').subscribe(() => {
      this.checkFollow = true;
      this.fb.addCity('Rome');
    })
  }

  // ngOnDestroy(){
  //   this.sub1.unsubcribe();
  // }
  
}
