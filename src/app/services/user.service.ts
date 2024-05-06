import { Injectable } from "@angular/core"
import { User } from "../models/user.model"
import { Contact } from "../models/contact.model"
import { BehaviorSubject } from "rxjs"
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

    getUser(): User {
        return this._loggedInUser$.value
    }

    signup(name: string) {

    }

    addMove(contact: Contact, amount: number) {

    }
}
