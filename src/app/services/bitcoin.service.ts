import { Injectable } from "@angular/core"
import axios from 'axios'

const API_URL = 'https://blockchain.info/tobtc'

@Injectable({
    providedIn: 'root'
})

export class BitcoinService {

    constructor() { }

   async getRate(coins: number): Promise<number> {
        try {
            const response = await axios.get(`${API_URL}?currency=USD&value=${coins}`)
            return response.data
        } catch (error) {
            // Handle errors
            throw new Error('Error getting Bitcoin rate');
        }
    }

    getMarketPrice() {

    }

    getConfirmedTransactions() {

    }
}