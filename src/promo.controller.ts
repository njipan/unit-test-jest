import { PromoService } from "./promo.service";

export class PromoController {

  constructor(private readonly promoService: PromoService) { }

  //POST
  async webClaimPromo(userId: number, promoId: number): Promise<any> {
    await this.promoService.claimPromo(userId, promoId);
    return {
      status: true,
      statusCode: 200,
      message: 'Promo has been successfully claimed',
    };
  }
}