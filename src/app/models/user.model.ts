import { Move } from "./move.model"

export interface User {
    name: string
    coins: number
    moves: Move[]
}