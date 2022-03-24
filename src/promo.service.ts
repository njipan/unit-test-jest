import { Promo } from './promo';
import { User } from './user';
import { UserService } from './user.service';

export class PromoService {

  constructor(private readonly userService: UserService) { }

  async get(id: number): Promise<Promo> {
    // retrieve data from external resource ( table Promo )
    return null;
  }

  async claimPromo(userId: number, promoId: number): Promise<void> {
    // user and promo must be exists
    // promo have quota by claimLimit and actualClaim
    // user points must be sufficient

    const user = await this.userService.get(userId);
    if (!user) throw new Error('USER_NOT_FOUND');
    const promo = await this.get(promoId);
    if (!promo) throw new Error('PROMO_NOT_FOUND');

    if (!this.canBeClaim(promo)) throw new Error('PROMO_QUOTA_RUN_OUT');
    if (this.insufficientBalance(user, promo)) throw new Error('USER_POINTS_INSUFFICIENT');

    await this.claim(user, promo);
  }

  private claim(user: User, promo: Promo): { promoLogId: number, pointHistoryId: number } {
    // assume this function would deduct point;
    // assume this function would create promoLog;

    // assume this function would return { promoLogId: number, pointHistoryId: number };
    return null;
  }

  private canBeClaim(promo: Promo) {
    return promo.claimLimit > promo.actualClaim;
  }

  private insufficientBalance(user: User, promo: Promo) {
    return promo.point > user.point;
  }

}