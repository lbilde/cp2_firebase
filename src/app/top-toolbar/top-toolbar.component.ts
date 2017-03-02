import {Component, OnInit, Input} from '@angular/core';
import {MdSnackBar} from "@angular/material";
import {Router} from "@angular/router";
import {AngularFire} from "angularfire2";

@Component({
  selector: 'cp-top-toolbar',
  templateUrl: './top-toolbar.component.html',
  styleUrls: ['./top-toolbar.component.css']
})
export class TopToolbarComponent implements OnInit {
  @Input()
  title: string;

  user;

  constructor(private af: AngularFire,
              public loginValidationBar: MdSnackBar,
              private router: Router) {

  }

  logout() {
    this.af.auth.logout()
      .then(() => {
        this.router.navigate(['/login'])
          .then(() => {
            this.loginValidationBar.open("You are logged out", "Ok", {
              duration: 3000,
            });
          })
      })
      .catch(err => {
        this.loginValidationBar.open("Error" + err.message, "Ok", {
          duration: 3000,
        });
      });


  }

  ngOnInit() {
    this.af.auth.subscribe(user => {
      if (user) {
        this.user = user.auth;
      }
    });
  }

}
