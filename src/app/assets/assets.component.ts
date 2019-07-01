import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { Subject } from 'rxjs';
import { IAssetAllocationRequestDto, AssetAllocationRequestDto } from '../models/asset-allocation-request-dto';

@Component({
    selector: 'app-assets',
    templateUrl: './assets.component.html',
    styleUrls: ['./assets.component.css']
})
export class AssetsComponent implements OnInit {
    @Output() errorEmitter: EventEmitter<boolean> = new EventEmitter();
    @Output() assetsEmitter: EventEmitter<IAssetAllocationRequestDto[]> = new EventEmitter();
    @Input() clearParentSubject: Subject<any>;

    assets: IAssetAllocationRequestDto[] = [
        new AssetAllocationRequestDto(null, null),
        new AssetAllocationRequestDto(null, null),
        new AssetAllocationRequestDto(null, null)
    ];
    percentage: number;
    percentageControl = new FormControl("", [Validators.max(100), Validators.min(1)])
    error: boolean;
    errorMessage: String;

    constructor() { }

    validate() {
        this.updatePercentage();

        this.error = false;
        if (this.percentage !== 100) {
            this.error = true;
            this.errorMessage = "Error: Total percentage must sum 100";
        } else if (this.assets.some(asset =>
            (asset.symbol === null || asset.symbol === undefined || asset.symbol === "")
            && (asset.percentage !== null && asset.percentage !== undefined && asset.percentage > 0))) {
            this.error = true;
            this.errorMessage = "Error: Symbol is required";
        }

        this.errorEmitter.emit(this.error);
        this.assetsEmitter.emit(this.assets);
    }

    ngOnInit() {
        this.initValues();

        this.clearParentSubject.subscribe(event => {
            this.initValues();
        });
    }

    initValues() {
        this.percentage = 0;

        this.assets.forEach(asset => {
            asset.symbol = null;
            asset.percentage = null;
        });
    }

    addAsset() {
        this.assets.push(new AssetAllocationRequestDto(null, null));
    }

    deleteAsset(index: number) {
        this.assets.splice(index, 1);
        this.validate();
    }

    updatePercentage() {
        const sum = this.assets.map(asset => asset.percentage !== null ? parseInt(asset.percentage.toString()) : 0).reduce((a, c) => a + c);
        this.percentage = (sum === null || isNaN(sum)) ? 0 : sum;
    }

}
