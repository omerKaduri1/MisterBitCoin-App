import { HttpClient } from "@angular/common/http"
import { Injectable } from "@angular/core"

const API_URL = 'https://blockchain.info/tobtc'

@Injectable({
    providedIn: 'root'
})

export class BitcoinService {

    constructor(private http: HttpClient) { }

    getRate(coins: number) {
        return this.http.get<string>(`${API_URL}?currency=USD&value=${coins}`)
    }

    getMarketPrice() {

    }

    getConfirmedTransactions() {

    }
}