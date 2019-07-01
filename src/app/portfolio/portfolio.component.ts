import { Component, OnInit } from '@angular/core';
import { FormControl, Validators, FormGroup } from '@angular/forms';
import * as moment from 'moment';
import { NullTemplateVisitor } from '@angular/compiler';
import { Subject } from 'rxjs';
import { PortfolioService } from '../services/portfolio.service';
import { PortfolioRequestDto } from '../models/portfolio-request-dto';
import { IAssetAllocationRequestDto } from '../models/asset-allocation-request-dto';
import { IPortfolioResponseDto } from '../models/portfolio-response-dto';

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
    response: IPortfolioResponseDto;
    showResponse: boolean = false;
    showSpinner: boolean = false;
    showResponseError: boolean = false;
    responseError: string;

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

        this.showSpinner = true;

        this.portfolioService.getPortfolioValue(request)
            .subscribe(
                response => this.handleResponse(response),
                error => this.showError(error)
            );
    }

    showError(error: any) {
        this.responseError = "There was an error trying to get the values, please check your input and try again."
        this.showResponseError = true;
        this.showResponse = true;
    }

    again() {
        this.showResponse = false;
        this.showResponseError = false;
        this.showSpinner = false;

        this.clear()
    }

    handleResponse(response: IPortfolioResponseDto) {
        this.response = response;
        this.showResponse = true;
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
        } else if (!moment(this.date, "YYYY-MM-DD").isValid()) {
            this.error = true;
            this.errorMessage = "\n Error: Date is required and must be valid (YYYY-MM-YYYY)";
        } else if (this.errorAssets) {
            this.error = true;
        }
    }

}
