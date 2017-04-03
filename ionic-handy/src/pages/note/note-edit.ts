import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';

import { AngularFire, FirebaseObjectObservable } from 'angularfire2';

import { NoteUtil, NoteModel } from './note-util'

@Component({
  selector: 'page-note-edit',
  templateUrl: 'note-edit.html'
})
export class NoteEditPage {

  key: string
  itemObservable: FirebaseObjectObservable<any>
  item = new NoteModel()
  originalItem = new NoteModel()

  constructor(public navCtrl: NavController, public navParams: NavParams,
      public af: AngularFire) {
    this.key = navParams.get('key');
    console.log('key : ' + this.key);
    this.itemObservable = NoteUtil.getNote(this.af, this.key)
    this.itemObservable.subscribe(snapshot => {
      console.log('snapshot : ' + JSON.stringify(snapshot));
      this.item = new NoteModel(snapshot)
      this.originalItem = new NoteModel(snapshot)
    });
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad NoteEditPage');
  }

  onEditClicked() {
    console.log("onEditClicked : " + this.item.title)
    this.itemObservable.set(this.item)
    NoteUtil.pushHistory(this.af, this.itemObservable.$ref.key, this.originalItem)
    this.navCtrl.pop();
  }

}
