import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';

import { AngularFire, FirebaseListObservable } from 'angularfire2';

import { NoteAddPage } from '../note/note-add'
import { NoteViewPage } from '../note/note-view'


@Component({
  selector: 'page-note-list',
  templateUrl: 'note-list.html'
})
export class NoteListPage {

  list: FirebaseListObservable<any>;

  constructor(public navCtrl: NavController, public navParams: NavParams,
      public af: AngularFire) {
    this.list = this.af.database.list('/items');
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad NoteListPage');
  }

  onAddClicked() {
    this.navCtrl.push(NoteAddPage);
  }

  onItemClick(item) {
    console.log('item - ' + JSON.stringify(item));
    this.navCtrl.push(NoteViewPage, {
      key: item.$key
    });
  }

}
