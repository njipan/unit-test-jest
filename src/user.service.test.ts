import { UserService } from "./user.service";

describe('User Service', () => {
  let userService: UserService;
  beforeAll(() => {
    userService = new UserService();
  });

  describe('UserService.get', () => {
    it('should be defined', () => {
      expect(userService.get).toBeDefined();
    });
  });
});