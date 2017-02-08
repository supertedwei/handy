import { AngularFire, FirebaseListObservable, FirebaseObjectObservable } from 'angularfire2';

import { User } from '../../common/user'

export class NoteUtil {

    static urlNoteItemList = "/note_list"

    private static getNoteListUrl(af: AngularFire): string {
        return "/note/users/" + User.uid + this.urlNoteItemList
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

    static push(af: AngularFire, value: any) {
        this.getNoteList(af).push(value)
    }
}

export class NoteModel {
    title:string = ""
    content:string = ""
}