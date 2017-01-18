import { Component, ViewChild } from '@angular/core';
import { Nav, Platform } from 'ionic-angular';
import { StatusBar, Splashscreen, AppVersion } from 'ionic-native';

import { AngularFire } from 'angularfire2';

import { NoteListPage } from '../pages/note/note-list';
import { EmailLoginPage } from '../pages/email-login/email-login';
import { SettingsPage } from '../pages/settings/settings';
import { SplashPage } from '../pages/splash/splash';


@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  @ViewChild(Nav) nav: Nav;

  showMenu = false;
  rootPage: any = SplashPage;

  pages: Array<{title: string, component: any}>;

  versionNumber = 'not available';

  constructor(public platform: Platform, public af: AngularFire) {
    this.initializeApp();

    // used for an example of ngFor and navigation
    this.pages = [
      { title: 'Note', component: NoteListPage },
      { title: 'Settings', component: SettingsPage },
    ];

  }

  initializeApp() {
    this.platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      StatusBar.styleDefault();
      Splashscreen.hide();


      if (this.platform.is('cordova')) {
        AppVersion.getVersionNumber().then((s) => {
          this.versionNumber = s;
          console.log('versionNumber : ' + this.versionNumber);
        })
      } else {
        console.log('not a cordova platform');
      }

      this.af.auth.subscribe(user => {
        console.log("MyApp : user - " + JSON.stringify(user));
        if (user != null && user.auth.emailVerified) {
          this.showMenu = true;
          this.nav.setRoot(NoteListPage)
        } else {
          this.showMenu = false;
          this.nav.setRoot(EmailLoginPage)
        }
      });


    });
  }

  openPage(page) {
    this.nav.setRoot(page.component);
  }
}
