import { Injectable } from "@angular/core"
import { User } from "../models/user.model"
import { Contact } from "../models/contact.model"
import { BehaviorSubject, Observable, map } from "rxjs"
import { Move } from "../models/move.model"
@Injectable({
    providedIn: 'root'
})
export class UserService {

    private _loggedInUser$ = new BehaviorSubject<User>({
        name: "Omer Kaduri",
        coins: 100,
        moves: []
    })
    public loggedInUser$ = this._loggedInUser$.asObservable()
    
    constructor() {
        const storedUser = localStorage.getItem('user')
        if (storedUser) {
            this._loggedInUser$.next(JSON.parse(storedUser))
        }
        this._loggedInUser$.subscribe(user => {
            localStorage.setItem('user', JSON.stringify(user))
        })
    }

    getUser(): User { // Not in use
        return this._loggedInUser$.value
    }

    signup(name: string) {
        const newUser: User = {
            name,
            coins: 100,
            moves: []
        }

        localStorage.setItem('user', JSON.stringify(newUser))
        this._loggedInUser$.next(newUser)
    }

    addMove(contact: Contact, amount: number) {
        const move: Move = {
            toId: contact._id,
            to: contact.name,
            at:  Date.now(),
            amount
        }

        const currUser = this._loggedInUser$.value
        const updatedMoves = [...currUser.moves, move]
        this._loggedInUser$.next({
            ...currUser,
            moves: updatedMoves
        })
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
}
