import { Component, ViewChild } from '@angular/core';
import { Nav, Platform } from 'ionic-angular';
import { StatusBar, Splashscreen, AppVersion } from 'ionic-native';

import { NoteListPage } from '../pages/note-list/note-list';


@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  @ViewChild(Nav) nav: Nav;

  rootPage: any = NoteListPage;

  pages: Array<{title: string, component: any}>;

  versionNumber = 'not available';

  constructor(public platform: Platform) {
    this.initializeApp();

    // used for an example of ngFor and navigation
    this.pages = [
      { title: 'Note', component: NoteListPage }
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

    });
  }

  openPage(page) {
    // Reset the content nav to have just this page
    // we wouldn't want the back button to show in this scenario
    this.nav.setRoot(page.component);
  }
}
