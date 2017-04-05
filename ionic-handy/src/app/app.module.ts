import { NgModule, ErrorHandler } from '@angular/core';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MyApp } from './app.component';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { AppVersion } from '@ionic-native/app-version';

// Import the AF2 Module
import { AngularFireModule } from 'angularfire2';
import { ReversePipe } from 'ngx-pipes/src/app/pipes/array/reverse';

import { FirebaseConfig } from './config';
import { NoteListPage } from '../pages/note/note-list';
import { NoteAddPage } from '../pages/note/note-add';
import { NoteViewPage } from '../pages/note/note-view';
import { NoteEditPage } from '../pages/note/note-edit';
import { NoteTrashListPage } from '../pages/note-trash/note-trash-list'
import { NoteTrashViewPage } from '../pages/note-trash/note-trash-view'
import { EmailSignUpPage } from '../pages/email-sign-up/email-sign-up';
import { EmailLoginPage } from '../pages/email-login/email-login';
import { SettingsPage } from '../pages/settings/settings';
import { SplashPage } from '../pages/splash/splash';
import { ElasticModule } from 'angular2-elastic';

@NgModule({
  declarations: [
    MyApp,
    ReversePipe,
    NoteListPage,
    NoteAddPage,
    NoteViewPage,
    NoteEditPage,
    NoteTrashListPage,
    NoteTrashViewPage,
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
    NoteTrashListPage,
    NoteTrashViewPage,
    EmailSignUpPage,
    EmailLoginPage,
    SettingsPage,
    SplashPage
  ],
  providers: [
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    StatusBar,
    SplashScreen,
    AppVersion
  ]
})
export class AppModule {}
