import { AngularFire, FirebaseListObservable, FirebaseObjectObservable } from 'angularfire2';

import { User } from '../../common/user'

export class NoteUtil {

    static UrlNote = "/note_list"
    static UrlNoteHistory = "/note_history"
    static UrlTrashCan = "/trash_can"
    static UrlNoteTrash = NoteUtil.UrlTrashCan + NoteUtil.UrlNote
    static UrlNoteHistoryTrash = NoteUtil.UrlTrashCan + NoteUtil.UrlNoteHistory

    private static getNoteUrl(): string {
        return "/note/users/" + User.uid + NoteUtil.UrlNote
    }

    private static getNoteHistoryUrl(): string {
        return "/note/users/" + User.uid + NoteUtil.UrlNoteHistory
    }

    // private static getNoteTrashUrl(): string {
    //     return "/note/users/" + User.uid + NoteUtil.UrlNoteTrash
    // }

    private static getNoteTrashUrl(): string {
        return "/note/users/" + User.uid + NoteUtil.UrlNoteTrash
    }

    private static getNoteHistoryTrashUrl(): string {
        return "/note/users/" + User.uid + NoteUtil.UrlNoteHistoryTrash
    }

    static getNote(af: AngularFire, key: string): FirebaseObjectObservable<any> {
        return af.database.object(NoteUtil.getNoteUrl() + "/" + key)
    }

    static listNote(af: AngularFire): FirebaseListObservable<any> {
        return af.database.list(this.getNoteUrl())
    }

    static listNoteHistory(af: AngularFire, noteKey: string): FirebaseListObservable<any> {
        return af.database.list(this.getNoteHistoryUrl() + "/" + noteKey)
    }

    static getNoteTrash(af: AngularFire, key: string): FirebaseObjectObservable<any> {
        return af.database.object(NoteUtil.getNoteTrashUrl() + "/" + key)
    }

    static listNoteTrash(af: AngularFire): FirebaseListObservable<any> {
        return af.database.list(NoteUtil.getNoteTrashUrl())
    }

    static listNoteHistoryTrash(af: AngularFire, noteKey: string): FirebaseListObservable<any> {
        return af.database.list(this.getNoteHistoryTrashUrl() + "/" + noteKey)
    }

    static getNoteHistoryTrash(af: AngularFire, noteKey: string): FirebaseObjectObservable<any> {
        return af.database.object(this.getNoteHistoryTrashUrl() + "/" + noteKey)
    }

    static save(af: AngularFire, value: any): string {
        var key = NoteUtil.listNote(af).push(value).key
        NoteUtil.listNoteHistory(af, key).push(value)
        return key
    }

    static update(af: AngularFire, key: string, value: any) {
        NoteUtil.getNote(af, key).set(value)
        NoteUtil.listNoteHistory(af, key).push(value)
    }

    static remove(af: AngularFire, key: string) {
        NoteUtil.getNote(af, key).$ref.once('value', function(snapshot) {
            NoteUtil.getNoteTrash(af, key).set(snapshot.val())
            NoteUtil.getNote(af, key).remove()
        });
        NoteUtil.listNoteHistory(af, key).$ref.once('value', function(snapshot) {
            NoteUtil.getNoteHistoryTrash(af, key).set(snapshot.val())
            NoteUtil.listNoteHistory(af, key).remove()
        });
        
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