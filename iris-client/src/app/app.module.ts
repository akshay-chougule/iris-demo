import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { NgRedux, NgReduxModule } from '@angular-redux/store';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';

import { RoutingModule } from './routing/routing.module';
import { AppComponent } from './app.component';
import { IAppState, store } from './store';
import { UserService } from './services/user.service';
import { CustomHttpInterceptor } from './httpinterceptor';
import { AuthService } from './services/auth.service';

@NgModule({
  declarations: [AppComponent],
  imports: [BrowserModule, NgReduxModule, RoutingModule, HttpClientModule],
  providers: [
    UserService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: CustomHttpInterceptor,
      multi: true
    },
    AuthService
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
  constructor(ngRedux: NgRedux<IAppState>) {
    ngRedux.provideStore(store);
  }
}
