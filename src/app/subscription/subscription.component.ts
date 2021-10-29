import { AfterViewInit, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { SubscriptionService } from './subscription.service';
declare var paypal;

@Component({
  selector: 'app-subscription',
  templateUrl: './subscription.component.html',
  styleUrls: ['./subscription.component.scss']
})
export class SubscriptionComponent implements OnInit, AfterViewInit {
  @ViewChild('paypal', { static: true }) paypalElement: ElementRef;

  constructor(public subscriptionService: SubscriptionService) { }

  ngOnInit() {
  }

  ngAfterViewInit(){
    const self = this;
    paypal.Buttons({
      style: {
          shape: 'rect',
          color: 'gold',
          layout: 'vertical',
          label: 'subscribe'
      },
      createSubscription: function(data, actions) {
        return actions.subscription.create({
          /* Creates the subscription */
          plan_id: self.subscriptionService.activeSubscriptionPlanId
        });
      },
      onApprove: function(data, actions) {
        self.subscriptionService.subscriptionID = data.subscriptionID;
        alert(data.subscriptionID); // You can add optional success message for the subscriber here
      },
      onError: (err) => {
        alert(err.message);
      }
  }).render(this.paypalElement.nativeElement); // Renders the PayPal button
  }

  checkPaypalSubscription(){
    this.subscriptionService.checkPaypalSubcription();
  }

  cancelPaypalSubscription(){
    this.subscriptionService.cancelPaypalSubscription();
  }

}
