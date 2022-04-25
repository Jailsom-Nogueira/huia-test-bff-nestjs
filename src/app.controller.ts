import { Controller, Get, Query } from '@nestjs/common';
import { AppService } from './app.service';
import { map, Observable } from 'rxjs';

@Controller('shipping')
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get('/price')
  getShippingPrice(
    @Query('nCdEmpresa') nCdEmpresa: string,
    @Query('sDsSenha') sDsSenha: string,
    @Query('nCdServico') nCdServico: string,
    @Query('sCepOrigem') sCepOrigem: string,
    @Query('nCdFormato') nCdFormato: string,
    @Query('sCdMaoPropria') sCdMaoPropria: string,
    @Query('sCepDestino') sCepDestino: string,
    @Query('nVlPeso') nVlPeso: string,
    @Query('nVlComprimento') nVlComprimento: string,
    @Query('nVlAltura') nVlAltura: string,
    @Query('nVlLargura') nVlLargura: string,
    @Query('nVlDiametro') nVlDiametro: string,
    @Query('nVlValorDeclarado') nVlValorDeclarado: string,
    @Query('sCdAvisoRecebimento') sCdAvisoRecebimento: string,
  ): Observable<any> {
    const xml2js = require('xml2js');

    const params = {
      'nCdEmpresa': nCdEmpresa,
      'sDsSenha': sDsSenha,
      'nCdServico': nCdServico,
      'sCepOrigem': sCepOrigem,
      'nCdFormato': nCdFormato,
      'sCdMaoPropria': sCdMaoPropria,
      'sCepDestino': sCepDestino,
      'nVlPeso': nVlPeso,
      'nVlComprimento': nVlComprimento,
      'nVlAltura': nVlAltura,
      'nVlLargura': nVlLargura,
      'nVlDiametro': nVlDiametro,
      'nVlValorDeclarado': nVlValorDeclarado,
      'sCdAvisoRecebimento': sCdAvisoRecebimento
    }
    
    return this.appService.getShippingPrice({params}).pipe(map((response) => {
      const amount = xml2js.parseStringPromise(response.data, { mergeAttrs: true })
        .then((result: any) => {
            // convert it to a JSON string
            const json = JSON.stringify(result, null, 4);
            const parsedJson = JSON.parse(json)
            const amount = parsedJson.cResultado.Servicos[0].cServico[0].Valor[0]
            
            return amount
        }).catch((err: any) => console.log(err));
      return amount
    }));
  }
}
