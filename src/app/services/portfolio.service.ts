import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { PortfolioResponseDto, IPortfolioResponseDto } from '../models/portfolio-response-dto';
import { IPortfolioRequestDto } from '../models/portfolio-request-dto';
import * as moment from "moment";
import { BASE_URL, PORTFOLIO_ENDPOINT } from '../constants';

@Injectable({
    providedIn: 'root'
})
export class PortfolioService {

    constructor(private http: HttpClient) { };

    getPortfolioValue(request: IPortfolioRequestDto): Observable<IPortfolioResponseDto> {
        let allocation = "";
        for (let i = 0; i < request.assets.length; i++) {
            allocation += `${request.assets[i].symbol}:${request.assets[i].percentage}${i < request.assets.length - 1 ? ';' : ''}`;
        }

        let query = `start_date=${moment(request.startDate).format("YYYY-MM-DD")}&allocation=${allocation}&initial_balance=${request.initialInvestment}`;
        let queryUrl = `${BASE_URL}${PORTFOLIO_ENDPOINT}?${query}`;

        return this.http.get<PortfolioResponseDto>(queryUrl);
    }
}
