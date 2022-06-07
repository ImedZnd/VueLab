import {Injectable, NgZone} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable, Subscription} from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class UserService {
  sub!: Subscription;

  constructor(private zone: NgZone, private httpClient: HttpClient) {
  }

  getAllPerson() {
    return this.httpClient.get<any[]>("http://localhost:8082/person/all");
  }

  kycAndNumber() {
    return this.httpClient.get<any[]>("http://localhost:8082/person/kycAndNumber");
  }

  kycAndNumberStream(): Observable<any> {
    return Observable.create(
      (observer: any) => {
        let source = new EventSource("http://localhost:8082/person/kycAndNumberStream");
        source.onmessage = event => {
          this.zone.run(() => {
            observer.next(event.data)
          })
        }
      }
    )
  }

  stateAndCount() {
    this.httpClient.get<any[]>("http://localhost:8082/person/stateAndNumber")
  }

  stateAndCountStream(): Observable<any> {
    return Observable.create(
      (observer: any) => {
        let source = new EventSource("http://localhost:8082/person/stateAndNumberStream");
        source.onmessage = event => {
          this.zone.run(() => {
            observer.next(event.data)
          })
        }
      }
    )
  }

  countAllPerson() {
    return this.httpClient.get<number>("http://localhost:8082/person/countAllPerson");
  }

  countAllPersonByState(state: string) {
    return this.httpClient.get<number>("http://localhost:8082/person/countAllByState/" + state);
  }

  countAllUsersByIsFraud(isFraud: boolean) {
    return this.httpClient.get<number>("http://localhost:8082/person/countAllUsersByIsFraud/" + isFraud);
  }

  countAllUsersByIsFraudStream(isFraud: boolean): Observable<any> {
    return Observable.create(
      (observer: any) => {
        let source = new EventSource("http://localhost:8082/person/countAllUsersByIsFraudSteam/" + isFraud);
        source.onmessage = event => {
          this.zone.run(() => {
            observer.next(event.data)
          })
        }
      }
    )
  }

  countAllUsersByCountry(countryCode: string) {
    return this.httpClient.get<number>("http://localhost:8082/person/countAllUsersByCountry/" + countryCode);
  }

  countAllUsersByKYC(KYC: string) {
    return this.httpClient.get<number>("http://localhost:8082/person/countAllByKyc/" + KYC);
  }

  countAllFlags() {
    return this.httpClient.get<number>("http://localhost:8082/person/countAllFlags");
  }

  countAllByHasEmail(b: boolean) {
    return this.httpClient.get<number>("http://localhost:8082/person/countAllByHasEmail/" + b);
  }

  countAllUsersByYear(number: number) {
    return this.httpClient.get<number>("http://localhost:8082/person/countAllPersonByBirthYear/" + number);
  }

  getUsersById(number: string) {
    return this.httpClient.get<any>("http://localhost:8082/person/id/" + number);
  }

  countAllNonFlagged() {
    return this.httpClient.get<number>("http://localhost:8082/person/countAllNonFlaged");
  }

  countStateOfUser(userId: number) {
    return this.httpClient.get<any>("http://localhost:8081/transactions/countStateAndNumberByUserId/" + userId);
  }

  countEntryOfUser(userId: number) {
    return this.httpClient.get<any>("http://localhost:8081/transactions/countEntryMethodAndNumberByUserId/" + userId);
  }

  countCurrencyOfUser(userId: number) {
    return this.httpClient.get<any>("http://localhost:8081/transactions/countCurrencyAndNumberByUserId/" + userId);
  }

  countTypeOfUser(userId: number) {
    return this.httpClient.get<any>("http://localhost:8081/transactions/countTypeAndNumberByUserId/" + userId);
  }

  countSourceOfUser(userId: number) {
    return this.httpClient.get<any>("http://localhost:8081/transactions/countSourceAndNumberByUserId/" + userId);
  }

  countTransactionsOfUser(userId: string) {
    return this.httpClient.get<any>("http://localhost:8081/transactions/countUserId/" + userId);
  }

  countMerchantCatOfUser(merchantCat: string, userId: number) {
    return this.httpClient.post<any>("http://localhost:8081/transactions/countMerchantCategoryLikeAndUserId/",
      {
        "string": merchantCat,
        "userId": userId
      });
  }

  countNumberOfFlagsOfUser(flag: boolean, userId: number) {
    return this.httpClient.post<any>("http://localhost:8081/transactions/countIsFlagedAndUserId/",
      {
        "flag": flag,
        "userId": userId
      });
  }


  getUserByIdStream(id: string): Observable<any> {
    return Observable.create(
      (observer: any) => {
        let source = new EventSource("http://localhost:8082/person/idStream/" + id);
        source.onmessage = event => {
          this.zone.run(() => {
            observer.next(event.data)
          })
        }
      }
    )
  }

  countEntryMethodAndNumberByUserId(id: string): Observable<any> {
    return Observable.create(
      (observer: any) => {
        let source = new EventSource("http://localhost:8081/transactions/countEntryMethodAndNumberByUserId/" + id);
        source.onmessage = event => {
          this.zone.run(() => {
            observer.next(event.data)
          })
        }
      }
    )
  }

  countCurrencyAndNumberByUserId(id: string): Observable<any> {
    return Observable.create(
      (observer: any) => {
        let source = new EventSource("http://localhost:8081/transactions/countCurrencyAndNumberByUserId/" + id);
        source.onmessage = event => {
          this.zone.run(() => {
            observer.next(event.data)
          })
        }
      }
    )
  }

  countStateAndNumberByUserId(id: string): Observable<any> {
    return Observable.create(
      (observer: any) => {
        let source = new EventSource("http://localhost:8081/transactions/countStateAndNumberByUserId/" + id);
        source.onmessage = event => {
          this.zone.run(() => {
            observer.next(event.data)
          })
        }
      }
    )
  }

  countTypeAndNumberByUserId(id: string): Observable<any> {
    return Observable.create(
      (observer: any) => {
        let source = new EventSource("http://localhost:8081/transactions/countTypeAndNumberByUserId/" + id);
        source.onmessage = event => {
          this.zone.run(() => {
            observer.next(event.data)
          })
        }
      }
    )
  }

  countSourceAndNumberByUserId(id: string): Observable<any> {
    return Observable.create(
      (observer: any) => {
        let source = new EventSource("http://localhost:8081/transactions/countSourceAndNumberByUserId/" + id);
        source.onmessage = event => {
          this.zone.run(() => {
            observer.next(event.data)
          })
        }
      }
    )
  }



  flagUserById(userId: string) {
    return this.httpClient.get<any>("http://localhost:8082/person/flag/" + userId);
  }

  fraudUserById(userId: string) {
    return this.httpClient.get<any>("http://localhost:8082/person/fraud/" + userId);
  }

  unFraudUserById(userId: string) {
    return this.httpClient.get<any>("http://localhost:8082/person/unfraud/" + userId);
  }

}
