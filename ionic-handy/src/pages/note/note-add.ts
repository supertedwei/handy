import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';

import { AngularFire } from 'angularfire2';

import { NoteUtil, NoteModel} from './note-util'

@Component({
  selector: 'page-note-add',
  templateUrl: 'note-add.html'
})
export class NoteAddPage {

  item = new NoteModel()

  constructor(public navCtrl: NavController, public navParams: NavParams,
      public af: AngularFire) {}

  ionViewDidLoad() {
    console.log('ionViewDidLoad NoteAddPage');
  }

  onSaveClicked() {
    console.log("onSaveClicked : " + this.item.title)
    var key = NoteUtil.push(this.af, this.item)
    NoteUtil.pushHistory(this.af, key, this.item)
    this.navCtrl.pop();
  }

}
