import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class SubscriptionService {
  activeSubscriptionPlanId: string = 'P-7C114269V7715730HMF55ATA';
  monthlyPlanId = environment.paypalMonthlyPlanId;
  halfYearlyPlanId = environment.paypalHalfYearlyPlanId;
  subscriptionID = 'I-YW0WSCVN4UJ9';
  subscriptionData: any;

  constructor(private http: HttpClient) {}

  checkPaypalSubcription() {
    this.http
      .get(`${environment.paypalSubscriptionApi}/${this.subscriptionID}`, {
        headers: new HttpHeaders().set(
          'Authorization',
          environment.paypalBasicAuth
        ),
      })
      .subscribe((response) => {
        alert('OK');
        console.log(response);
        this.subscriptionData = response;
      });
  }
  httpOptions = {
    headers: new HttpHeaders({
      'Authorization': environment.paypalBasicAuth,
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': 'http://localhost:4200',
    }),
  };
  cancelSubscription() {
    //ne radi

    this.http
      .post(
        `${environment.paypalSubscriptionApi}/${this.subscriptionID}/cancel`,
        this.httpOptions
      )
      .subscribe(
        (response) => {
          alert('OK');
          console.log(response);
          this.subscriptionData = response;
        },
        (error) => {
          alert(error.message);
        }
      );
  }

  cancelPaypalSubscription() {
    const self = this;
    const xhttp = new XMLHttpRequest();

    xhttp.onreadystatechange = function () {
      if (this.readyState === XMLHttpRequest.DONE && this.status === 204) {
        self.checkPaypalSubcription();
      }
    };
    xhttp.onerror = function () {
      alert(xhttp.responseText);
    };

    if (this.subscriptionID) {
      xhttp.open(
        'POST',
        `${environment.paypalSubscriptionApi}/${this.subscriptionID}/cancel`,
        true
      );
      xhttp.setRequestHeader('Authorization', environment.paypalBasicAuth);
      xhttp.setRequestHeader('Content-Type', 'application/json');
      xhttp.setRequestHeader(
        'Access-Control-Allow-Origin',
        'http://localhost:4200'
      );
      xhttp.send();
    }
  }
}
