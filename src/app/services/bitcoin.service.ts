import { HttpClient } from "@angular/common/http"
import { Injectable } from "@angular/core"
import { switchMap, timer } from "rxjs"

const API_URL = 'https://blockchain.info/tobtc'

@Injectable({
    providedIn: 'root'
})

export class BitcoinService {

    constructor(private http: HttpClient) { }

    getRate(coins: number) {
        return this.http.get<string>(`${API_URL}?currency=USD&value=${coins}`)
    }

    getRateStream(coins: number) {
        return timer(0, 1000 * 60 * 30).pipe(
            switchMap(() => this.getRate(coins))
        )
    }

    getMarketPrice() {

    }

    getConfirmedTransactions() {

    }
}