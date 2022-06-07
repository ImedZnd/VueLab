import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class CurrencyService {

  constructor(private httpClient:HttpClient) { }

  countAllTransactions() {
    return this.httpClient.get<any>("http://localhost:8081/currency/all");
  }

  getAllByIsCrypto(isCrypto:string) {
    return this.httpClient.get<any>("http://localhost:8081/currency/isCrypto/"+isCrypto);
  }
}
