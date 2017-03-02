import {Component, OnInit, OnDestroy} from '@angular/core';
import {Observable, Subscription} from "rxjs";
import {AngularFire} from "angularfire2";
import {User} from "../users/user";

@Component({
  selector: 'cp-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit, OnDestroy {
  toolbarTitle = 'CP2';
  users : User[];
  fbSub : Subscription;
  userSub : Subscription;

  constructor(private af: AngularFire) {

  }

  ngOnInit() {
    this.fbSub = this.af.auth.subscribe(authState => {
        if(authState && authState.auth) {
        this.userSub = this.af.database.list('/users')
          .subscribe(result => {
            this.users =result
          });
      } else{
          this.users = [];
        }
    },
    err => {
      this.users = [];
    });
  }

  ngOnDestroy(){
    if(this.fbSub){
      this.fbSub.unsubscribe();
    }
    if(this.userSub){
      this.userSub.unsubscribe();
    }
  }
}
