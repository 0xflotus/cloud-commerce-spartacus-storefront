import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CartPageComponent } from './cart-page.component';
import { CartPageLayoutComponent } from '../../layout/cart-page-layout/cart-page-layout.component';
import {
  DynamicSlotComponent,
  ComponentWrapperComponent
} from '../../../cms/components';
import { CartDetailsComponent } from '../../../cart/components/cart-details/cart-details.component';
import { StoreModule, combineReducers } from '@ngrx/store';
import * as fromRoot from '../../../routing/store';
import * as fromCmsReducer from '../../../cms/store';
import * as fromCart from '../../../cart/store';

import { CartService } from '../../../cart/services';

describe('CartPageComponent', () => {
  let component: CartPageComponent;
  let fixture: ComponentFixture<CartPageComponent>;

  beforeEach(
    async(() => {
      TestBed.configureTestingModule({
        imports: [
          StoreModule.forRoot({
            ...fromRoot.reducers,
            cms: combineReducers(fromCmsReducer.reducers),
            cart: combineReducers(fromCart.reducers)
          })
        ],
        declarations: [
          CartPageComponent,
          CartPageLayoutComponent,
          DynamicSlotComponent,
          ComponentWrapperComponent,
          CartDetailsComponent
        ],
        providers: [{ provide: CartService }]
      }).compileComponents();
    })
  );

  beforeEach(() => {
    fixture = TestBed.createComponent(CartPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});