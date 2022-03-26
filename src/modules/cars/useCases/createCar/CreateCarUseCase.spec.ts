import { CarsRepositoryInMemory } from '@modules/cars/repositories/in-memory/CarsRepositoryInMemory';
import { AppError } from '@shared/errors/AppError';

import { CreateCarUseCase } from './CreateCarUseCase';

let createCarUseCase: CreateCarUseCase;
let carsRepositoryInMemory: CarsRepositoryInMemory;

describe('Create Car', () => {
  beforeEach(() => {
    carsRepositoryInMemory = new CarsRepositoryInMemory();
    createCarUseCase = new CreateCarUseCase(carsRepositoryInMemory);
  });

  it('Shouldbe able to create a car', async () => {
    const car = await createCarUseCase.execute({
      name: 'Car name',
      description: 'Description car',
      daily_rate: 100,
      license_plate: 'IRB-1A58',
      fine_amount: 25,
      brand: 'GM',
      category_id: 'Category'
    });

    expect(car).toHaveProperty('id');
  });

  it('Shouldbe not able to create a car if exists license plate', async () => {
    expect(async () => {
      await createCarUseCase.execute({
        name: 'Car 1',
        description: 'Description car',
        daily_rate: 100,
        license_plate: 'IRB-1A58',
        fine_amount: 25,
        brand: 'GM',
        category_id: 'Category1'
      });

      await createCarUseCase.execute({
        name: 'Car 2',
        description: 'Description car 2',
        daily_rate: 110,
        license_plate: 'IRB-1A58',
        fine_amount: 50,
        brand: 'Honda',
        category_id: 'Category2'
      });
    }).rejects.toBeInstanceOf(Error);
  });

  it('Shouldbe not able to create a car if with available true by default', async () => {
    const car = await createCarUseCase.execute({
      name: 'Car 1',
      description: 'Description car',
      daily_rate: 100,
      license_plate: 'IRB-1A58',
      fine_amount: 25,
      brand: 'GM',
      category_id: 'Category1'
    });

    expect(car.available).toBe(true);
  });
});
