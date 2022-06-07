import { Injectable,NgZone } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class TransactionService {

  constructor(private zone: NgZone,private httpClient: HttpClient) { }

  countAllCurrency() {
    return this.httpClient.get<number>("http://localhost:8081/currency/countCurrencies");
  }

  countAllTransactions() {
    return this.httpClient.get<number>("http://localhost:8081/transactions/countAll");
  }

  countAllTransactionsByState(state: string) {
    return this.httpClient.get<number>("http://localhost:8081/transactions/countState/" + state);
  }

  countAllTransactionsByType(type: string) {
    return this.httpClient.get<number>("http://localhost:8081/transactions/countType/" + type);
  }

  countAllTransactionsSource(source: string) {
    return this.httpClient.get<number>("http://localhost:8081/transactions/countSource/" + source);
  }

  countAllTransactionsMerchantCategory(merchantCategory: string) {
    return this.httpClient.get<number>("http://localhost:8081/transactions/countMerchantCategory/" + merchantCategory);
  }

  countAllTransactionsMerchantCountry(merchantCountry: string) {
    return this.httpClient.get<number>("http://localhost:8081/transactions/countMerchantCountry/" + merchantCountry);
  }

  countAllTransactionsEntryMethod(entryMethod: string) {
    return this.httpClient.get<number>("http://localhost:8081/transactions/countEntryMethod/" + entryMethod);
  }

  countAllTransactionsUserId(userId: string) {
    return this.httpClient.get<number>("http://localhost:8081/transactions/countUserId/" + userId);
  }

  countAllTransactionsFlag(flag: boolean) {
    return this.httpClient.get<number>("http://localhost:8081/transactions/countIsFlaged/" + flag);
  }

  countAllTransactionsYear(year: string) {
    return this.httpClient.get<number>("http://localhost:8081/transactions/countAllInYear/" + year);
  }

  getAllTransactionsByUserId(userId: string) {
    return this.httpClient.get<any>("http://localhost:8081/transactions/userId/" + userId);
  }

  flagTransactionsById(transactionsId: string) {
    return this.httpClient.get<any>("http://localhost:8081/transactions/flag/" + transactionsId);
  }

  stateAndNumberStream(): Observable<any> {
    return Observable.create(
      (observer:any) => {
        let source = new EventSource("http://localhost:8081/transactions/stateAndNumberStream");
        source.onmessage = event => {
          this.zone.run(() => {
            observer.next(event.data)
          })
        }
      }
    )
  }

  entryAndNumberStream(): Observable<any> {
    return Observable.create(
      (observer:any) => {
        let source = new EventSource("http://localhost:8081/transactions/entryAndNumberStream");
        source.onmessage = event => {
          this.zone.run(() => {
            observer.next(event.data)
          })
        }
      }
    )
  }

  typeAndNumberStream(): Observable<any> {
    return Observable.create(
      (observer:any) => {
        let source = new EventSource("http://localhost:8081/transactions/typeAndNumberStream");
        source.onmessage = event => {
          this.zone.run(() => {
            observer.next(event.data)
          })
        }
      }
    )
  }

  sourceAndNumberStream(): Observable<any> {
    return Observable.create(
      (observer:any) => {
        let source = new EventSource("http://localhost:8081/transactions/sourceAndNumberStream");
        source.onmessage = event => {
          this.zone.run(() => {
            observer.next(event.data)
          })
        }
      }
    )
  }

}
