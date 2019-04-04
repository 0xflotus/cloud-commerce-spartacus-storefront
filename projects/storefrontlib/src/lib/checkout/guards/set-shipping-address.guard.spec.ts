import { TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { Observable, of } from 'rxjs';

import { Order, RoutingService, CheckoutService } from '@spartacus/core';
import { SetShippingAddressGuard } from './set-shipping-address.guard';
import { defaultCheckoutConfig } from '../config/default-checkout-config';

class MockCheckoutService {
  getDeliveryAddress(): Observable<Order> {
    return of(null);
  }
}

describe(`SetShippingAddressGuard`, () => {
  let routingService: RoutingService;
  let guard: SetShippingAddressGuard;
  let mockCheckoutService: MockCheckoutService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        SetShippingAddressGuard,
        {
          provide: RoutingService,
          useValue: { go: jasmine.createSpy() },
        },
        { provide: CheckoutService, useClass: MockCheckoutService },
      ],
      imports: [RouterTestingModule],
    });

    routingService = TestBed.get(RoutingService);
    guard = TestBed.get(SetShippingAddressGuard);
    mockCheckoutService = TestBed.get(CheckoutService);
  });

  describe(`when there is NO shipping address present`, () => {
    it(`should return false and navigate to shipping address step`, done => {
      spyOn(mockCheckoutService, 'getDeliveryAddress').and.returnValue(of({}));

      guard.canActivate().subscribe(result => {
        expect(result).toEqual(false);
        expect(routingService.go).toHaveBeenCalledWith({
          route: [defaultCheckoutConfig.checkout.steps[0]],
        });
        done();
      });
    });
  });

  describe(`when there is shipping address present`, () => {
    it(`should return true`, done => {
      spyOn(mockCheckoutService, 'getDeliveryAddress').and.returnValue(
        of({ id: 'testAddress' })
      );

      guard.canActivate().subscribe(result => {
        expect(result).toEqual(true);
        expect(routingService.go).not.toHaveBeenCalled();
        done();
      });
    });
  });
});
