import { Component, OnInit } from '@angular/core';
import { FbService } from 'src/app/service/fb/fb.service';
import { Router } from '@angular/router';
import { first } from 'rxjs/operators';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent implements OnInit {

  constructor(public fb: FbService, public router: Router) { }

  ngOnInit() {
  }

  signup(e){
    this.fb.signup(e.target.email.value, e.target.password.value).pipe(first()).subscribe(() => {
      this.router.navigateByUrl('');
    }, (err) => {
      console.log("error");
    })
  }
}
