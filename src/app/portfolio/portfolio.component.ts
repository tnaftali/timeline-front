import { Component, OnInit } from '@angular/core';
import { FormControl, Validators, FormGroup } from '@angular/forms';
import * as moment from 'moment';
import { NullTemplateVisitor } from '@angular/compiler';

@Component({
    selector: 'app-portfolio',
    templateUrl: './portfolio.component.html',
    styleUrls: ['./portfolio.component.css']
})
export class PortfolioComponent implements OnInit {
    investment: number;
    minDate = new Date(1960, 0, 1);
    maxDate = new Date();
    date: Date;
    error: Boolean = false;
    errorMessage: string;

    constructor() { }

    ngOnInit() {

    }

    clear() {
        this.investment = null;
        this.date = null;
    }

    calculate() {

    }

    validate() {
        if (this.investment === null || this.investment <= 0) {
            this.error = true;
            this.errorMessage = "Investment is required and must be greater than 0";
        } else {
            this.error = false;
        }

        if (!moment(this.date, "DD-MM-YYYY").isValid()) {
            this.error = true;
            this.errorMessage = "Investment is required and must be greater than 0";
        } else {
            this.error = false;
        }
    }

}
