import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import { PortfolioComponent } from './portfolio/portfolio.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatInputModule, MatNativeDateModule, MAT_DATE_LOCALE, MAT_DATE_FORMATS, DateAdapter, MatButtonModule, MatIconModule, MatCardModule, MatDatepickerModule, MatProgressSpinnerModule, MatDividerModule, MatListModule } from '@angular/material';
import { MomentDateAdapter } from '@angular/material-moment-adapter';
import { CurrencyMaskModule } from "ng2-currency-mask";
import { CurrencyMaskConfig, CURRENCY_MASK_CONFIG } from 'ng2-currency-mask/src/currency-mask.config';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AssetsComponent } from './assets/assets.component';
import { OnlyNumberDirective } from './directive/only-number.directive';
// import { PortfolioMapperService } from './services/portfolio-mapper.service';
import { PortfolioService } from './services/portfolio.service';
import { HttpClientModule } from '@angular/common/http';


export const CustomCurrencyMaskConfig: CurrencyMaskConfig = {
    align: "left",
    allowNegative: false,
    decimal: ".",
    precision: 2,
    prefix: "$ ",
    suffix: "",
    thousands: ","
};

export const MY_FORMATS = {
    parse: {
        dateInput: 'LL',
    },
    display: {
        dateInput: 'YYYY-MM-DD',
        monthYearLabel: 'YYYY',
        dateA11yLabel: 'LL',
        monthYearA11yLabel: 'YYYY',
    },
};

@NgModule({
    declarations: [
        AppComponent,
        PortfolioComponent,
        AssetsComponent,
        OnlyNumberDirective,
    ],
    imports: [
        BrowserModule,
        BrowserAnimationsModule,
        MatInputModule,
        FormsModule,
        MatProgressSpinnerModule,
        HttpClientModule,
        MatListModule,
        MatIconModule,
        MatCardModule,
        MatDividerModule,
        ReactiveFormsModule,
        CurrencyMaskModule,
        MatDatepickerModule,
        MatButtonModule,
        MatNativeDateModule
    ],
    providers: [
        { provide: CURRENCY_MASK_CONFIG, useValue: CustomCurrencyMaskConfig },
        { provide: DateAdapter, useClass: MomentDateAdapter, deps: [MAT_DATE_LOCALE] },
        { provide: MAT_DATE_FORMATS, useValue: MY_FORMATS },
    ],
    bootstrap: [AppComponent]
})
export class AppModule { }
