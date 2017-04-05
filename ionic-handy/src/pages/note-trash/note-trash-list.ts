import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';

import { AngularFire, FirebaseListObservable } from 'angularfire2';

import { NoteUtil } from '../note/note-util'

@Component({
  selector: 'page-note-trash-list',
  templateUrl: 'note-trash-list.html'
})
export class NoteTrashListPage {

  list: FirebaseListObservable<any>;

  constructor(public navCtrl: NavController, public navParams: NavParams,
      public af: AngularFire) {
    this.list = NoteUtil.listNoteTrash(this.af);
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad NoteTrashListPage');
  }

  onItemClicked(item) {
    console.log('item - ' + JSON.stringify(item));
    // this.navCtrl.push(NoteViewPage, {
    //   key: item.$key
    // });
  }

}
