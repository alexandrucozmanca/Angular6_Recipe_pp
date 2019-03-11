import {Component, OnInit} from '@angular/core';
import * as firebase from 'firebase';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  ngOnInit(): void {
    firebase.initializeApp({
      apiKey: 'AIzaSyDyoMXMTs39FvFJ_c5U_8vpivAI5JDXSyE',
      authDomain: 'angular6-tutorial-b62e0.firebaseapp.com',
    });
  }
}
