import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';

import { AngularFire, FirebaseObjectObservable, FirebaseListObservable } from 'angularfire2';

import { NoteUtil, NoteModel } from './note-util'
import { NoteEditPage } from './note-edit';

@Component({
  selector: 'page-note-view',
  templateUrl: 'note-view.html'
})
export class NoteViewPage {

  key: string
  itemObservable: FirebaseObjectObservable<any>
  itemHistory: FirebaseListObservable<any>
  item = new NoteModel()
  showHistory = false

  constructor(public navCtrl: NavController, public navParams: NavParams,
      public af: AngularFire) {
    this.key = navParams.get('key');
    console.log('key : ' + this.key);
    this.itemObservable = NoteUtil.getNote(this.af, this.key)
    this.itemObservable.subscribe(snapshot => {
      console.log('snapshot : ' + JSON.stringify(snapshot))
      this.item.title = snapshot.title
      this.item.content = snapshot.content
    });
    this.itemHistory = NoteUtil.listNoteHistory(this.af, this.key)
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad NoteViewPage');
  }

  onEditClicked() {
    this.navCtrl.push(NoteEditPage, {
      key: this.key
    });
  }

  onDeleteClicked() {
    NoteUtil.remove(this.af, this.key)
    this.navCtrl.pop();
  }

  onHistoryClicked() {
    this.showHistory = !this.showHistory
  }

  onRestoreClicked(data) {
    var noteModel = new NoteModel(data);
    NoteUtil.update(this.af, this.itemObservable.$ref.key, noteModel)
  }

}
