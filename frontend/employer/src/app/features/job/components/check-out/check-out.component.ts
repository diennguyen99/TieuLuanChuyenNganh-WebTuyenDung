import { AfterViewInit, ChangeDetectorRef, Component, ElementRef, Input, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { CdkStepper } from '@angular/cdk/stepper';

import { PackageService } from '../../../package/package.service';
import { Pkage } from '../../../package/package.model';
import { PaymentService } from '../../../../shared/services/payment.service';
import { JobService } from '../../job.service';

declare var stripe;
declare var elements;

@Component({
  selector: 'app-check-out',
  templateUrl: './check-out.component.html',
  styleUrls: ['./check-out.component.scss']
})
export class CheckOutComponent implements OnInit, AfterViewInit, OnDestroy {

  @Input() appStepper: CdkStepper;
  @Input() form: FormGroup;

  packages: Pkage[] = [];
  pkChoose: Pkage = null;
  loading = false;

  @ViewChild('cardInfo') cardInfo: ElementRef;
  card: any;
  cardHandler = this.onChange.bind(this);
  cardError: string;

  constructor(
    private readonly cd: ChangeDetectorRef,
    private readonly fb: FormBuilder,
    private readonly packageService: PackageService,
    private readonly jobService: JobService,
    private readonly paymentService: PaymentService
  ) {}

  ngOnDestroy(): void {
    if (this.card) {
      this.card.removeEventListener('change', this.cardHandler);
      this.card.destroy();
    }
  }

  ngOnInit(): void {
    this.packageService.getPackages().subscribe(({ data }) => {
      if (data.packages.ok) {
        this.packages = data.packages.results.filter(p => p.packageType.toString() === 'Post');
      } else {
        console.log('Load packages error!');
      }
    });
  }

  ngAfterViewInit(): void {
    this.initiateCardElement();
  }
  initiateCardElement(): void {
    this.card = elements.create('card', { hidePostalCode: true });
    this.card.mount(this.cardInfo.nativeElement);
    this.card.addEventListener('change', this.cardHandler);
  }

  onChange({error}): void {
    if (error) {
      this.cardError = error.message;
    } else {
      this.cardError = null;
    }
    this.cd.detectChanges();
  }

  async createStripeToken(): Promise<void> {
    this.loading = true;
    const {token, error} = await stripe.createToken(this.card);
    if (token) {
      this.onSubmit(token);
    } else {
      this.onError(error);
    }
  }

  private onSubmit(token): void {
    this.paymentService.createPayment(
      this.form.get('name').value,
      this.form.get('email').value,
      this.form.get('phone').value,
      this.jobService.newJobId.value,
      this.pkChoose.id,
      token.id,
      this.pkChoose.price * 100
    ).subscribe(response => {
      const data = response.data.createCharge;
      if (data.ok) {
        console.log('Ok');
      }
      this.loading = false;
      this.appStepper.next();
    });
  }

  onError(error): void {
    if (error.message) {
      this.cardError = error.message;
    }
  }

  onChoosePackage(pk: Pkage): void {
    this.pkChoose = pk;
    this.form.get('amount').patchValue(this.pkChoose.price);
  }
}
