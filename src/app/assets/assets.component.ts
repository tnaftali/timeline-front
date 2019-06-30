import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { TypeCheckCompiler } from '@angular/compiler/src/view_compiler/type_check_compiler';

@Component({
  selector: 'app-assets',
  templateUrl: './assets.component.html',
  styleUrls: ['./assets.component.css']
})
export class AssetsComponent implements OnInit {

  assets = [
    { symbol: null, percentage: null, isLast: true },
    { symbol: null, percentage: null, isLast: true },
    { symbol: null, percentage: null, isLast: true }
  ];

  percentage: number;
  percentageControl = new FormControl("", [Validators.max(100), Validators.min(1)])
  error: Boolean;
  errorMessage: String;

  constructor() { }

  ngOnInit() {
    this.percentage = 0;
  }

  onValueChange() {
    this.updatePercentage();
  }

  addAsset() {
    this.assets.map(asset => asset.isLast = false);
    this.assets.push({ symbol: null, percentage: null, isLast: true });
  }

  deleteAsset(index: number) {
    this.assets.splice(index, 1);
  }

  updatePercentage() {
    const sum = this.assets.map(asset => asset.percentage != null ? parseInt(asset.percentage) : 0).reduce((a, c) => a + c);
    this.percentage = (sum === null || isNaN(sum)) ? 0 : sum;

    if (this.percentage != 100) {
      this.error = true;
      this.errorMessage = "Error: Total percentage must sum 100"
    } else {
      this.error = false;
    }
  }

}
