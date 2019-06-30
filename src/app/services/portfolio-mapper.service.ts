import { Injectable } from '@angular/core';
import { PortfolioResponseDto } from '../models/portfolio-response-dto';

@Injectable({
  providedIn: 'root'
})
export class PortfolioMapperService {

  constructor() { }

    public mapResponse(response: PortfolioResponseDto) {
        console.log(response);

  }
}
