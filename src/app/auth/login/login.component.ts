import {Component, OnInit, OnDestroy} from '@angular/core';
import {Router} from '@angular/router';
import {MdSnackBar} from '@angular/material';
import {Subscription, Observable} from "rxjs";
import {AngularFire, AuthProviders, AuthMethods} from "angularfire2";
import {AuthUser} from "../authUser";

@Component({
  selector: 'cp-login',
  templateUrl: 'login.component.html'
})
export class LoginComponent implements OnInit, OnDestroy {

  loginError: string;
  request: Subscription;
  tryingToLogIn: boolean;

  constructor(public loginValidationBar: MdSnackBar,
              private router: Router,
              private af: AngularFire) {

  }

  login(user: AuthUser) {
    if (!this.tryingToLogIn) {
      this.tryingToLogIn = true;
      this.af.auth.login({
          email: user.email,
          password: user.password
        },
        {
          provider: AuthProviders.Password,
          method: AuthMethods.Password,
        })
        .then()
        .catch(err => {
          this.loginError = err.message;
          this.tryingToLogIn = false;
        });
    }

  }

  ngOnInit() {
    this.request = this.af.auth.subscribe(user => {
      if(user){
        this.loginError = null;
        this.router.navigate(['/']).then(() => {
          this.loginValidationBar.open("You are logged in", "Ok", {
            duration: 2000,
          });
        });
      }
    },
    err => {
      this.loginError = "An error occoured during login, see error in console";
      this.tryingToLogIn = false;
    },
    () => {
      this.tryingToLogIn = false;
    })
  }

  ngOnDestroy(){
    console.log('aha')
    if (this.request) {
      console.log('aha22')
      this.request.unsubscribe();
    }
  }

}
