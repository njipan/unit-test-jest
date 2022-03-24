import { Promo } from "./promo";
import { PromoService } from "./promo.service";
import { User } from "./user";
import { UserService } from "./user.service";

describe('User Service', () => {
  let userService: UserService;
  let promoService: PromoService;

  let userInsufficientBalance: User, userSufficientBalance: User;
  let availablePromo: Promo, notAvailablePromo: Promo;

  beforeAll(() => {
    userService = new UserService();
    promoService = new PromoService(userService);

    userInsufficientBalance = {
      id: 1,
      name: 'DUMMY User Insufficient Points',
      point: 2,
    };

    userSufficientBalance = {
      id: 1,
      name: 'DUMMY User Insufficient Points',
      point: 20,
    };

    availablePromo = {
      id: 1,
      actualClaim: 12,
      claimLimit: 15,
      code: 'DUMMY',
      name: 'DUMMY',
      point: 10,
    };

    notAvailablePromo = {
      id: 1,
      actualClaim: 15,
      claimLimit: 15,
      code: 'DUMMY',
      name: 'DUMMY',
      point: 10,
    };
  });

  describe('Promo.get', () => {
    it('should be defined', () => {
      expect(promoService.get).toBeDefined();
    });
  });

  describe('Promo.canBeClaim', () => {
    it('should be defined', () => {
      // @ts-ignore
      expect(promoService.canBeClaim).toBeDefined();
    });

    it('should be falsy because actualClaim is greater or equal than claimLimit', async () => {
      // @ts-ignore
      expect(await promoService.canBeClaim(notAvailablePromo)).toBe(false);
    });

    it('should be truthy because actualClaim is less than claimLimit', async () => {
      // @ts-ignore
      expect(await promoService.canBeClaim(availablePromo)).toBe(true);
    });
  });

  describe('Promo.insufficientBalance', () => {
    it('should be defined', () => {
      // @ts-ignore
      expect(promoService.insufficientBalance).toBeDefined();
    });

    it('should be truthy because user balance is insufficient', async () => {
      // @ts-ignore
      expect(await promoService.insufficientBalance(userInsufficientBalance, availablePromo)).toBe(true);
    });

    it('should be falsy because user balance is sufficient', async () => {
      // @ts-ignore
      expect(await promoService.insufficientBalance(userSufficientBalance, availablePromo)).toBe(false);
    });
  });

  describe('Promo.claimPromo', () => {
    it('should be defined', () => {
      // @ts-ignore
      expect(promoService.claimPromo).toBeDefined();
    });

    it('should be error USER_NOT_FOUND', async () => {
      // @ts-ignore
      const userId = 1, promoId = 20;
      let errorMessage = '';
      try {
        await promoService.claimPromo(userId, promoId);
      } catch (error) {
        errorMessage = error.message;
      }
      expect(errorMessage).toBe('USER_NOT_FOUND');
    });

    it('should be error PROMO_NOT_FOUND', async () => {
      // @ts-ignore
      jest.spyOn(userService, 'get').mockResolvedValueOnce(userInsufficientBalance);
      const userId = 1, promoId = 20;
      let errorMessage = '';
      try {
        await promoService.claimPromo(userId, promoId);
      } catch (error) {
        errorMessage = error.message;
      }
      expect(errorMessage).toBe('PROMO_NOT_FOUND');
    });

    it('should be error PROMO_QUOTA_RUN_OUT', async () => {
      jest.spyOn(promoService, 'get').mockResolvedValueOnce(notAvailablePromo);
      jest.spyOn(userService, 'get').mockResolvedValueOnce(userSufficientBalance);
      const userId = 1, promoId = 20;
      let errorMessage = '';
      try {
        await promoService.claimPromo(userId, promoId);
      } catch (error) {
        errorMessage = error.message;
      }
      expect(errorMessage).toBe('PROMO_QUOTA_RUN_OUT');
    });

    it('should be error USER_POINTS_INSUFFICIENT', async () => {
      jest.spyOn(promoService, 'get').mockResolvedValueOnce(availablePromo);
      jest.spyOn(userService, 'get').mockResolvedValueOnce(userInsufficientBalance);
      const userId = 1, promoId = 20;
      let errorMessage = '';
      try {
        await promoService.claimPromo(userId, promoId);
      } catch (error) {
        errorMessage = error.message;
      }
      expect(errorMessage).toBe('USER_POINTS_INSUFFICIENT');
    });

    it('should be claim', async () => {
      jest.spyOn(promoService, 'get').mockResolvedValueOnce(availablePromo);
      jest.spyOn(userService, 'get').mockResolvedValueOnce(userSufficientBalance);
      const userId = 1, promoId = 20;
      let noError = true;
      try {
        await promoService.claimPromo(userId, promoId);
      } catch (error) {
        noError = false;
      }

      expect(noError).toBe(true);
    });
  });
});