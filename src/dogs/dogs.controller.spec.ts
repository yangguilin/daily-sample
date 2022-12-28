import { Test } from '@nestjs/testing';
import { DogsController } from './dogs.controller';
import { DogsService } from './dogs.service';

describe('DogsController', () => {
  let dogsController: DogsController;
  let dogsService: DogsService;

  beforeEach(async () => {
    const moduleRef = await Test.createTestingModule({
      controllers: [DogsController],
      providers: [DogsService],
    }).compile();

    dogsService = moduleRef.get<DogsService>(DogsService);
    dogsController = moduleRef.get<DogsController>(DogsController);
  });

  describe('findAll', () => {
    it('should return an array of Dogs', async () => {
      const result = ['Cola', 'Bob'] as any;
      jest.spyOn(dogsService, 'findAllDogs').mockImplementation(() => result);

      expect(await dogsController.findAllDogs()).toBe(result);
    });
  });
});
