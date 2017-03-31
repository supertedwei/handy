import { Component, ViewChild } from '@angular/core';
import { Nav, Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { AppVersion } from '@ionic-native/app-version';

import { AngularFire } from 'angularfire2';

import { NoteListPage } from '../pages/note/note-list';
import { EmailLoginPage } from '../pages/email-login/email-login';
import { SettingsPage } from '../pages/settings/settings';
import { SplashPage } from '../pages/splash/splash';
import { User } from '../common/user';

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  @ViewChild(Nav) nav: Nav;

  showMenu = false;
  rootPage: any = SplashPage;
  activePage: any;

  pages: Array<{id: string, title: string, component: any}>;

  versionNumber = 'not available';

  constructor(public platform: Platform, public statusBar: StatusBar, 
      public splashScreen: SplashScreen, public af: AngularFire,
      public appVersion: AppVersion) {
    this.initializeApp();

    // used for an example of ngFor and navigation
    this.pages = [
      { id: 'menu_title', title: 'Note', component: NoteListPage },
      { id: 'menu_settings', title: 'Settings', component: SettingsPage },
    ];

    this.activePage = this.pages[0];

  }

  initializeApp() {
    this.platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      this.statusBar.styleDefault();
      this.splashScreen.hide();

      if (this.platform.is('cordova')) {
        this.appVersion.getVersionNumber().then((s) => {
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
          User.uid = user.auth.uid
          User.email = user.auth.email
          this.nav.setRoot(NoteListPage)
        } else {
          this.showMenu = false;
          User.reset();
          this.nav.setRoot(EmailLoginPage)
        }
      });

    });
  }

  openPage(page) {
    // Reset the content nav to have just this page
    // we wouldn't want the back button to show in this scenario
    this.nav.setRoot(page.component);
    this.activePage = page;
  }

  checkActive(page) {
    return page == this.activePage;
  }
}
