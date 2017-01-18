import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';

import { AngularFire, FirebaseObjectObservable } from 'angularfire2';

@Component({
  selector: 'page-note-view',
  templateUrl: 'note-view.html'
})
export class NoteViewPage {

  key: string
  itemObservable: FirebaseObjectObservable<any>
  item = {title: "", content: ""}

  constructor(public navCtrl: NavController, public navParams: NavParams,
      public af: AngularFire) {
    this.key = navParams.get('key');
    console.log('key : ' + this.key);
    this.itemObservable = this.af.database.object("/items/" + this.key)
    this.itemObservable.subscribe(snapshot => {
      console.log('snapshot : ' + JSON.stringify(snapshot));
      this.item.title = snapshot.title
      this.item.content = snapshot.content
    });
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad NoteViewPage');
  }

}
