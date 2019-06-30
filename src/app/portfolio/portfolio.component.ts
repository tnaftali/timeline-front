import { Component, OnInit } from '@angular/core';
import { FormControl, Validators, FormGroup } from '@angular/forms';
import * as moment from 'moment';
import { NullTemplateVisitor } from '@angular/compiler';
import { Subject } from 'rxjs';
import { PortfolioService } from '../services/portfolio.service';
import { PortfolioRequestDto } from '../models/portfolio-request-dto';
import { IAssetAllocationRequestDto } from '../models/asset-allocation-request-dto';

@Component({
    selector: 'app-portfolio',
    templateUrl: './portfolio.component.html',
    styleUrls: ['./portfolio.component.css']
})
export class PortfolioComponent implements OnInit {

    constructor(
        private portfolioService: PortfolioService
    ) { }

    investment: number;
    minDate = new Date(1960, 0, 1);
    maxDate = new Date();
    date: Date;
    error: boolean = true;
    errorMessage: string;
    errorAssets = true;
    assets: IAssetAllocationRequestDto[] = [];

    clearParentSubject: Subject<boolean> = new Subject();

    ngOnInit() { }

    clear() {
        this.investment = null;
        this.date = null;
        this.clearParentSubject.next(true);
        this.errorAssets = true;
        this.validate();
        this.errorMessage = "";
    }

    getAssets(assets: IAssetAllocationRequestDto[]) {
        this.assets = assets;
    }

    calculate() {
        this.assets = this.assets.filter(asset => asset.percentage !== null && asset.symbol !== null);
        this.assets.forEach(asset => asset.percentage = parseInt(asset.percentage.toString()));
        let request = new PortfolioRequestDto(this.date, this.investment, this.assets);

        this.portfolioService.getPortfolioValue(request)
            .subscribe(res => console.log(res));
    }

    validateAssets(error: boolean) {
        this.errorAssets = error;
        this.validate();
    }

    validate() {
        this.error = false;
        this.errorMessage = "";
        if (this.investment === null || this.investment === undefined || this.investment <= 0) {
            this.error = true;
            this.errorMessage = "Error: Investment is required and must be greater than 0";
        } else if (!moment(this.date, "DD-MM-YYYY").isValid()) {
            this.error = true;
            this.errorMessage = "\n Error: Date is required and must be valid (DD-MM-YYYY)";
        } else if (this.errorAssets) {
            this.error = true;
        }
    }

}
