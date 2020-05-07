import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Subject, Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { first } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class WeatherService {

  constructor(public http: HttpClient) {

  }
  getWeather(city: string, metric: 'metric' | 'imperial' = 'metric'): Observable<any> {
    return this.http.get(
      `${environment.baseUrl}${city}&units=${metric}&appid=${environment.appID}`).pipe((first()));
  }

  getCityWeatherByName(city: string, metric: 'metric' | 'imperial' = 'metric'): Subject<string> {
    const dataSub = new Subject<string>();
    this.http.get(`${environment.baseUrl}${city}&units=${metric}&appid=${environment.appID}`).subscribe((data) => {
      dataSub.next(data['weather']);
    }, (err) => {
      console.log(err);
    });
    return dataSub;
  }

  getCityWeatherByNames(cities: Array<string>, metric: 'metric' | 'imperial' = 'metric'): Subject<any>{
    const citiesSubject = new Subject();
    cities.forEach( (city) => {
      citiesSubject.next(this.http.get(`${environment.baseUrl}${city}&units=${metric}&appid=${environment.appID}`));
    });
    return citiesSubject;
  }
  
  getWeatherState(city: string): Subject<string>{
    const dataSubject = new Subject<string>();
    this.http.get(`${environment.baseUrl}${city}&appid=${environment.appID}`).subscribe( (data) => {
      dataSubject.next(data['weather'][0].main);
    });
    return dataSubject;
  }

  getCurrentTemp(city: string,  metric: 'metric' | 'imperial' = 'metric'): Subject<number>{
    const dataSubject = new Subject<number>();
    this.http.get(`${environment.baseUrl}${city}&units=${metric}&appid=${environment.appID}`).subscribe( (weather: any) => {
      dataSubject.next(Math.round(Number(weather.main.temp)));
    })
    return dataSubject;
  }

  getCurrentHum(city: string, metric: 'metric' | 'imperial' = 'metric'): Subject<number>{
    const dataSubject = new Subject<number>();
    this.http.get(`${environment.baseUrl}${city}&units=${metric}&appid=${environment.appID}`).subscribe( (weather: any) => {
      dataSubject.next(weather.main.humidity);
    })
    return dataSubject;
  }

  getCurrentWind(city: string, metric: 'metric' | 'imperial' = 'metric'): Subject<number>{
    const dataSubject = new Subject<number>();
    this.http.get(`${environment.baseUrl}${city}&units=${metric}&appid=${environment.appID}`).subscribe( (weather: any) => {
      dataSubject.next(Math.round(Math.round(weather.wind.speed)));
    });
    return dataSubject;
  }

  getMaxTemp(city: string, metric: 'metric' | 'imperial' = 'metric'): Subject<number>{
    const dataSubject = new Subject<number>();
    this.http.get(`${environment.forecastUrl}${city}&units=${metric}&appid=${environment.appID}`).subscribe( (weather: any) => {
      let max = weather.list[0].main.temp;
      weather.list.forEach( (value) => {
        if(max < value.main.temp){
          max = value.main.temp;
        }
      });
      dataSubject.next(Math.round(max));
    });
    return dataSubject;
  }

  getMinTemp(city: string, metric: 'metric' | 'imperial' = 'metric'): Subject<number>{
    const dataSubject = new Subject<number>();
    this.http.get(`${environment.forecastUrl}${city}&units=${metric}&appid=${environment.appID}`).subscribe( (weather: any) => {
      let min = weather.list[0].main.temp;
      weather.list.forEach( (value) => {
        if(min > value.main.temp){
          min = value.main.temp;
        }
      });
      dataSubject.next(Math.round(min));
    });
    return dataSubject;
  }

  getForecast(city: string, metric: 'metric' | 'imperial' = 'metric'): Subject<any> {
    const dataSubject = new Subject<any>();
    this.http.get(`${environment.forecastUrl}${city}&units=${metric}&appid=${environment.appID}`).subscribe( (weather:any) => {
      dataSubject.next(weather.list);
    })
    return dataSubject;
  }

}
