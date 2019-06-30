import { IAssetAllocationRequestDto } from './asset-allocation-request-dto';

export interface IPortfolioRequestDto {
    startDate: Date;
    initialInvestment: number;
    assets: IAssetAllocationRequestDto[];
}

export class PortfolioRequestDto {
    startDate: Date;
    initialInvestment: number;
    assets: IAssetAllocationRequestDto[];

    constructor(startDate: Date, initialInvestment: number, assets: IAssetAllocationRequestDto[]) {
        this.startDate = startDate;
        this.initialInvestment = initialInvestment;
        this.assets = assets;
    }
}
