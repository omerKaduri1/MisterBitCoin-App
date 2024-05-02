import { Injectable } from "@angular/core"

const ENTITY = 'user'

@Injectable({
    providedIn: 'root'
})

export class UserService {

    public getUser() {
        return {
            name: "Omer Kaduri",
            coins: 100,
            moves: []
        }
    }
}
