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


    // private _loggedInUser$ = new BehaviorSubject<User>({
    //     name: "Omer Kaduri",
    //     coins: 100,
    //     moves: []
    // })
    // public loggedInUser$ = this._loggedInUser$.asObservable()

    // constructor() {
    //     const storedUser = localStorage.getItem('user')
    //     if (storedUser) {
    //         this._loggedInUser$.next(JSON.parse(storedUser))
    //     }
    //     this._loggedInUser$.subscribe(user => {
    //         localStorage.setItem('user', JSON.stringify(user))
    //     })
    // }
    constructor() {
        const users = JSON.parse(localStorage.getItem(ENTITY) || 'null')
        console.log('users:', users)
        if (!users || users.length === 0) {
            localStorage.setItem(ENTITY, JSON.stringify([]))
        }
    }

    private _loggedInUser$ = new BehaviorSubject<User>(utilService.loadFromSession(ENTITY_LOGGEDIN_USER))
    public loggedInUser$ = this._loggedInUser$.asObservable()

    getUser(): User { // Not in use
        return this._loggedInUser$.value
    }

    // signup(name: string) {
    //     const newUser: User = {
    //         name,
    //         coins: 100,
    //         moves: []
    //     }

    //     localStorage.setItem('user', JSON.stringify(newUser))
    //     this._loggedInUser$.next(newUser)
    // }
    public signup(name: string) {
        return from(storageService.query<User>(ENTITY)).pipe(
            map(users => users.find(_user => _user.name === name)),
            switchMap(user => user
                ? of(user)
                : from(storageService.post(ENTITY, this._createUser(name)))
            ),
            tap(user => this._saveLocalUser(user as User))
        )
    }

    public logout() {
        return of(null).pipe(
            tap(() => this._saveLocalUser(null))
        )
    }

    public addMove(contact: Contact, amount: number) {
        if (!amount) return of(null)
        const newMove = this._createMove(contact, amount)
        const loggedInUser = { ...this.getLoggedInUser() }
        loggedInUser.coins -= amount
        loggedInUser.moves.unshift(newMove)
        return from(storageService.put(ENTITY, loggedInUser)).pipe(
            tap(() => this._saveLocalUser(loggedInUser))
        )
    }

    getUserCoins(): Observable<number> {
        return this._loggedInUser$.pipe(
            map(user => user.coins)
        )
    }

    reduceCoins(amount: number) {
        const currUser = this._loggedInUser$.value
        const updatedCoins = currUser.coins - amount
        this._loggedInUser$.next({
            ...currUser,
            coins: updatedCoins
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

    _saveLocalUser(user: User | null) {
        if (user !== null) {
            this._loggedInUser$.next({ ...user })
        } else { }
        utilService.saveToSession(ENTITY_LOGGEDIN_USER, user)
    }

}
