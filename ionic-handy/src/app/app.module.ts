import { NgModule, ErrorHandler } from '@angular/core';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MyApp } from './app.component';

// Import the AF2 Module
import { AngularFireModule } from 'angularfire2';

import { FirebaseConfig } from './config';
import { NoteListPage } from '../pages/note/note-list';
import { NoteAddPage } from '../pages/note/note-add';
import { NoteViewPage } from '../pages/note/note-view';
import { NoteEditPage } from '../pages/note/note-edit';
import { EmailSignUpPage } from '../pages/email-sign-up/email-sign-up';
import { EmailLoginPage } from '../pages/email-login/email-login';
import { SettingsPage } from '../pages/settings/settings';
import { SplashPage } from '../pages/splash/splash';
import { ElasticModule } from 'angular2-elastic';

@NgModule({
  declarations: [
    MyApp,
    NoteListPage,
    NoteAddPage,
    NoteViewPage,
    NoteEditPage,
    EmailSignUpPage,
    EmailLoginPage,
    SettingsPage,
    SplashPage
  ],
  imports: [
    IonicModule.forRoot(MyApp),
    AngularFireModule.initializeApp(FirebaseConfig),
    ElasticModule
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    NoteListPage,
    NoteAddPage,
    NoteViewPage,
    NoteEditPage,
    EmailSignUpPage,
    EmailLoginPage,
    SettingsPage,
    SplashPage
  ],
  providers: [{provide: ErrorHandler, useClass: IonicErrorHandler}]
})
export class AppModule {}
