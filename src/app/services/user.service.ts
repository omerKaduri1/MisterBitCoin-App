import { Injectable } from "@angular/core"
import { User } from "../models/user.model"
@Injectable({
    providedIn: 'root'
})
export class UserService {
    
    getUser(): User {
        return {
            name: "Omer Kaduri",
            coins: 100,
            moves: []
        }
    }
}
