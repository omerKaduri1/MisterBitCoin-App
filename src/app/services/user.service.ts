import { Injectable } from "@angular/core"
import { User } from "../models/user.model"
import { Contact } from "../models/contact.model"
import { BehaviorSubject, Observable, from, map, of, switchMap, tap } from "rxjs"
import { Move } from "../models/move.model"
import { utilService } from "./storage.service"
import { storageService } from "./async-storage.service"

const ENTITY = 'user'
const ENTITY_LOGGEDIN_USER = 'loggedinUser'
@Injectable({
    providedIn: 'root'
})
export class UserService {

    constructor() {
        const users = JSON.parse(localStorage.getItem(ENTITY) || 'null')
        if (!users || users.length === 0) {
            localStorage.setItem(ENTITY, JSON.stringify([]))
        }
    }

    private _loggedInUser$ = new BehaviorSubject<User>(utilService.loadFromSession(ENTITY_LOGGEDIN_USER))
    public loggedInUser$ = this._loggedInUser$.asObservable()

    public signup(name: string) {
        return from(storageService.query<User>(ENTITY)).pipe(
            map(users => users.find(_user => _user.name === name)),
            switchMap(user => user
                ? of(user)
                : from(storageService.post(ENTITY, this._createUser(name)))
            ),
            tap(user =>
                sessionStorage[ENTITY_LOGGEDIN_USER] = JSON.stringify(user)
            )
        )
    }

    public logout() {
        return of(null).pipe(
            tap(() =>
                sessionStorage[ENTITY_LOGGEDIN_USER] = JSON.stringify(null)
            )
        )
    }

    public addMove(contact: Contact, amount: number) {
        if (!amount) return of(null)
        const newMove = this._createMove(contact, amount)
        const loggedInUser = { ...this.getLoggedInUser() }
        loggedInUser.coins -= amount
        loggedInUser.moves.unshift(newMove)
        loggedInUser.moves = [...loggedInUser.moves]
        console.log('loggedInUser:', loggedInUser)
        return from(storageService.put(ENTITY, loggedInUser)).pipe(
            tap(() => {
                sessionStorage[ENTITY_LOGGEDIN_USER] = JSON.stringify(loggedInUser)
            })
        ).subscribe(() => {
            console.log('this.getLoggedInUser():', this.getLoggedInUser())

        })
    }

    getLoggedInUser(): User {
        return this._loggedInUser$.value
    }

    _createMove(contact: Contact, amount: number): Move {
        return {
            toId: contact._id,
            to: contact.name,
            at: Date.now(),
            amount
        }
    }

    _createUser(name: string): Partial<User> {
        return {
            name,
            coins: 100,
            moves: []
        }
    }

    // _saveLocalUser(user: User | null) {
    //     if (user !== null) {
    //         this._loggedInUser$.next({ ...user })
    //     } else { }
    //     utilService.saveToSession(ENTITY_LOGGEDIN_USER, user)
    // }
    // _saveLocalUser(user: User | null) {
    //     this._loggedInUser$.next(user && { ...user })
    //     utilService.saveToSession(ENTITY_LOGGEDIN_USER, user)
    // }
}
