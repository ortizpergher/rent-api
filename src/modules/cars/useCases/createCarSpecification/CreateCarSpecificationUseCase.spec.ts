import { CarsRepositoryInMemory } from '@modules/cars/repositories/in-memory/CarsRepositoryInMemory';
import { SpecificationRepositoryInMemory } from '@modules/cars/repositories/in-memory/SpecificationRepositoryInMemory';
import { AppError } from '@shared/errors/AppError';

import { CreateCarSpecificationUseCase } from './CreateCarSpecificationUseCase';

let createCarSpecificationUseCase: CreateCarSpecificationUseCase;
let carsRepositoryInMemory: CarsRepositoryInMemory;
let specificationRepositoryInMemory: SpecificationRepositoryInMemory;

describe('Create Car Specification', () => {
  beforeEach(() => {
    carsRepositoryInMemory = new CarsRepositoryInMemory();
    specificationRepositoryInMemory = new SpecificationRepositoryInMemory();
    createCarSpecificationUseCase = new CreateCarSpecificationUseCase(
      carsRepositoryInMemory,
      specificationRepositoryInMemory
    );
  });

  it('Should be able to add a new specification to the car', async () => {
    const car = await carsRepositoryInMemory.create({
      name: 'Car name',
      description: 'Description car',
      daily_rate: 100,
      license_plate: 'IRB-1A58',
      fine_amount: 25,
      brand: 'GM',
      category_id: 'Category'
    });

    const specification = await specificationRepositoryInMemory.create({
      name: 'Test specification',
      description: 'Test'
    });

    const especificationsCar = await createCarSpecificationUseCase.execute({
      car_id: car.id,
      specifications_id: [specification.id]
    });

    expect(especificationsCar).toHaveProperty('specifications');
    expect(especificationsCar.specifications.length).toBe(1);
  });

  it('Should not be able to add a new specification to a non-existing car', async () => {
    expect(async () => {
      const car_id = '1234';
      const specifications_id = ['1564864'];

      await createCarSpecificationUseCase.execute({
        car_id,
        specifications_id
      });
    }).rejects.toBeInstanceOf(AppError);
  });
});
