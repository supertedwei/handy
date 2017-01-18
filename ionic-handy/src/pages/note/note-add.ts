import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';

import { AngularFire } from 'angularfire2';

@Component({
  selector: 'page-note-add',
  templateUrl: 'note-add.html'
})
export class NoteAddPage {

  title:string = ""
  content:string = ""

  constructor(public navCtrl: NavController, public navParams: NavParams,
      public af: AngularFire) {}

  ionViewDidLoad() {
    console.log('ionViewDidLoad NoteAddPage');
  }

  onSaveClicked() {
    console.log("onSaveClicked : " + this.title)
    const items = this.af.database.list('items')
    items.push({title: this.title, content: this.content});
    this.navCtrl.pop();
  }

}
