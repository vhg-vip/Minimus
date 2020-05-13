import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './pages/home/home.component';
import { WeatherCardComponent } from './UI/weather-card/weather-card.component';
import { AddCardComponent } from './UI/add-card/add-card.component';
import { DetailsComponent } from './pages/details/details.component';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { WeatherService } from './service/weather/weather.service';
import { AddcityComponent } from './pages/addcity/addcity.component';
import { AngularFireLiteAuth, AngularFireLite } from 'angularfire-lite';
import { environment } from 'src/environments/environment';
import {NguiAutoCompleteModule} from '@ngui/auto-complete';
import { LoginComponent } from './pages/login/login.component';
import { SignupComponent } from './pages/signup/signup.component';
import { ErrorComponent } from './ui/error/error.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    WeatherCardComponent,
    AddCardComponent,
    DetailsComponent,
    AddcityComponent,
    LoginComponent,
    SignupComponent,
    ErrorComponent,
    
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    AngularFireLite.forRoot(environment.config),
    NguiAutoCompleteModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
