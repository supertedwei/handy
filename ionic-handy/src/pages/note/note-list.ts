import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';

import { AngularFire, FirebaseListObservable } from 'angularfire2';

import { NoteAddPage } from '../note/note-add'
import { NoteViewPage } from '../note/note-view'

import { NoteUtil } from './note-util'


@Component({
  selector: 'page-note-list',
  templateUrl: 'note-list.html'
})
export class NoteListPage {

  list: FirebaseListObservable<any>;

  constructor(public navCtrl: NavController, public navParams: NavParams,
      public af: AngularFire) {
    this.list = NoteUtil.listNote(this.af);
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad NoteListPage');
  }

  onAddClicked() {
    this.navCtrl.push(NoteAddPage);
  }

  onItemClicked(item) {
    console.log('item - ' + JSON.stringify(item));
    this.navCtrl.push(NoteViewPage, {
      key: item.$key
    });
  }

  onDeleteClicked(item) {
    NoteUtil.getNote(this.af, item.$key).remove();
  }

}
