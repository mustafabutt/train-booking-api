import { TrainMiddleware } from './train.middleware';

describe('UserMiddleware', () => {
  it('should be defined', () => {
    expect(new TrainMiddleware()).toBeDefined();
  });
});
