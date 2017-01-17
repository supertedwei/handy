import { NgModule, ErrorHandler } from '@angular/core';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MyApp } from './app.component';

// Import the AF2 Module
import { AngularFireModule } from 'angularfire2';

import { FirebaseConfig } from './settings';
import { NoteListPage } from '../pages/note-list/note-list';
import { EmailSignUpPage } from '../pages/email-sign-up/email-sign-up';
import { EmailLoginPage } from '../pages/email-login/email-login';
import { SettingsPage } from '../pages/settings/settings';
import { SplashPage } from '../pages/splash/splash';

@NgModule({
  declarations: [
    MyApp,
    NoteListPage,
    EmailSignUpPage,
    EmailLoginPage,
    SettingsPage,
    SplashPage
  ],
  imports: [
    IonicModule.forRoot(MyApp),
    AngularFireModule.initializeApp(FirebaseConfig)
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    NoteListPage,
    EmailSignUpPage,
    EmailLoginPage,
    SettingsPage,
    SplashPage
  ],
  providers: [{provide: ErrorHandler, useClass: IonicErrorHandler}]
})
export class AppModule {}
