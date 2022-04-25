import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';
import { Observable } from 'rxjs';
import { AxiosResponse } from 'axios';

@Injectable()
export class AppService {
  constructor(
    private httpClient: HttpService,
  ) {}
  getShippingPrice({params}): Observable<AxiosResponse<string>> {
    const url = 'http://ws.correios.com.br/calculador/CalcPrecoPrazo.asmx/CalcPreco'
    return this.httpClient.get<string>(url, {params});
  }
}
