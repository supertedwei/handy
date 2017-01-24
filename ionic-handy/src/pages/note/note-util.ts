import { AngularFire, FirebaseListObservable, FirebaseObjectObservable } from 'angularfire2';

export class NoteUtil {

    static urlNoteItemList = "/note_list"

    private static getNoteListUrl(af: AngularFire): string {
        let uid = af.auth.getAuth().uid
        console.log("uid : " + uid)
        return uid + this.urlNoteItemList
    }

    static getNoteList(af: AngularFire): FirebaseListObservable<any> {
        return af.database.list(this.getNoteListUrl(af))
    }

    private static getNoteUrl(af: AngularFire, key: string): string {
        return this.getNoteListUrl(af) + "/" + key
    }

    static getNote(af: AngularFire, key: string): FirebaseObjectObservable<any> {
        return af.database.object(this.getNoteUrl(af, key))
    }
}