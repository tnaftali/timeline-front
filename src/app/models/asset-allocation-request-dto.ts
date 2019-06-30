export interface IAssetAllocationRequestDto {
    symbol: string;
    percentage: number;
}

export class AssetAllocationRequestDto {
    symbol: string;
    percentage: number;

    constructor(symbol: string, percentage: number) {
        this.symbol = symbol;
        this.percentage = percentage;
    }
}
