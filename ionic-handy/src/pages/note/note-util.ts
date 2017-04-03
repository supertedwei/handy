import { AngularFire, FirebaseListObservable, FirebaseObjectObservable } from 'angularfire2';

import { User } from '../../common/user'

export class NoteUtil {

    static urlNoteItemList = "/note_list"
    static urlNoteItemHistory = "/note_history"

    private static getNoteListUrl(): string {
        return "/note/users/" + User.uid + this.urlNoteItemList
    }

    private static getNoteHistoryUrl(): string {
        return "/note/users/" + User.uid + this.urlNoteItemHistory
    }

    static getNoteList(af: AngularFire): FirebaseListObservable<any> {
        return af.database.list(this.getNoteListUrl())
    }

    static getNoteHistory(af: AngularFire, key: string): FirebaseListObservable<any> {
        return af.database.list(this.getNoteHistoryUrl() + "/" + key)
    }

    private static getNoteUrl(key: string): string {
        return this.getNoteListUrl() + "/" + key
    }

    private static pushHistory(af: AngularFire, key: string, value: NoteModel) {
        this.getNoteHistory(af, key).push(value)
    }

    static getNote(af: AngularFire, key: string): FirebaseObjectObservable<any> {
        return af.database.object(this.getNoteUrl(key))
    }

    static save(af: AngularFire, value: any): string {
        var key = this.getNoteList(af).push(value).key
        NoteUtil.pushHistory(af, key, value)
        return key
    }

    static update(af: AngularFire, key: string, value: any) {
        this.getNote(af, key).set(value)
        NoteUtil.pushHistory(af, key, value)
    }

    static remove(af: AngularFire, key: string) {
        this.getNote(af, key).remove()
        this.getNoteHistory(af, key).remove()
    }
}

export class NoteModel {
    title:string = ""
    content:string = ""

    constructor(snapshot?) {
        if (snapshot != null) {
            this.copy(snapshot)
        }
    }

    copy(snapshot) {
        this.title = snapshot.title
        this.content = snapshot.content
    }
}