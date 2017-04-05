import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';

import { AngularFire, FirebaseListObservable } from 'angularfire2';

import { NoteUtil } from '../note/note-util'

@Component({
  selector: 'page-note-trash-view',
  templateUrl: 'note-trash-view.html'
})
export class NoteTrashViewPage {

  key: string
  itemHistory: FirebaseListObservable<any>

  constructor(public navCtrl: NavController, public navParams: NavParams,
      public af: AngularFire) {
    this.key = navParams.get('key');
    this.itemHistory = NoteUtil.listNoteHistoryTrash(this.af, this.key)
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad NoteTrashViewPage');
  }

  onUndoClicked() {
    NoteUtil.undo(this.af, this.key)
    this.navCtrl.pop()
  }

  onDeleteClicked() {
    NoteUtil.removeTrash(this.af, this.key)
    this.navCtrl.pop()
  }

}
