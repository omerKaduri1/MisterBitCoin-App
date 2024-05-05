import { HttpClient } from "@angular/common/http"
import { Injectable } from "@angular/core"
import axios from 'axios'

const API_URL = 'https://blockchain.info/tobtc'

@Injectable({
    providedIn: 'root'
})

export class BitcoinService {

    TRADE_VOLUME_KEY = 'tradeVolume'

    constructor(private http: HttpClient) { }

    getRate(coins: number) {
        return this.http.get<string>(`${API_URL}?currency=USD&value=${coins}`)
    }

    getMarketPrice() {

    }

    getConfirmedTransactions() {

    }
}