import { AbstractControl } from "@angular/forms"
import { Observable, map, timer } from "rxjs"

export function isTransferValid(amount: number, limit: number) {
    const isTransferValid = amount - limit > 0
    return !isTransferValid ? { isTransferValid: true } : null
}
