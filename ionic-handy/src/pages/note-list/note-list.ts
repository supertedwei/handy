import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';

import { AngularFire } from 'angularfire2';


@Component({
  selector: 'page-note-list',
  templateUrl: 'note-list.html'
})
export class NoteListPage {

  constructor(public navCtrl: NavController, public navParams: NavParams,
    public af: AngularFire) {}

  ionViewDidLoad() {
    console.log('ionViewDidLoad NoteListPage');
  }

}
