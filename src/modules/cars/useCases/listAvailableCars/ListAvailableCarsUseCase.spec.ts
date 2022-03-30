import { CarsRepositoryInMemory } from '@modules/cars/repositories/in-memory/CarsRepositoryInMemory';

import { ListAvailableCarsUseCase } from './ListAvailableCarsUseCase';

let listAvailableCarsUseCase: ListAvailableCarsUseCase;
let carsRepositoryInMemory: CarsRepositoryInMemory;

describe('List Cars', () => {
  beforeEach(() => {
    carsRepositoryInMemory = new CarsRepositoryInMemory();
    listAvailableCarsUseCase = new ListAvailableCarsUseCase(
      carsRepositoryInMemory
    );
  });

  it('Should be able to list all available cars', async () => {
    const car = await carsRepositoryInMemory.create({
      name: 'Car CRV',
      description: 'Desc Honda CRV',
      daily_rate: 119.9,
      license_plate: 'IRD-9D95',
      fine_amount: 59.9,
      brand: 'Honda',
      category_id: 'category id'
    });

    const cars = await listAvailableCarsUseCase.execute({});

    expect(cars).toEqual([car]);
  });

  it('Should be able to list all available cars by name', async () => {
    const createCar = await carsRepositoryInMemory.create({
      name: 'Car Test',
      description: 'Desc car test',
      daily_rate: 129.9,
      license_plate: 'IAA-1234',
      fine_amount: 69.9,
      brand: 'Test brand',
      category_id: 'category id 1'
    });

    const car = await listAvailableCarsUseCase.execute({
      name: createCar.name
    });

    expect(car).toEqual([createCar]);
  });

  it('Should be able to list all available cars by brand', async () => {
    const createCar = await carsRepositoryInMemory.create({
      name: 'Car Test 3',
      description: 'Desc car test 3',
      daily_rate: 159.9,
      license_plate: 'ABC-1234',
      fine_amount: 89.9,
      brand: 'Test brand 3',
      category_id: 'category id 3'
    });

    const car = await listAvailableCarsUseCase.execute({
      brand: createCar.brand
    });

    expect(car).toEqual([createCar]);
  });

  it('Should be able to list all available cars by category', async () => {
    const createCar = await carsRepositoryInMemory.create({
      name: 'Car Test 3',
      description: 'Desc car test 3',
      daily_rate: 159.9,
      license_plate: 'ABC-1234',
      fine_amount: 89.9,
      brand: 'Test brand 3',
      category_id: '159159'
    });

    const car = await listAvailableCarsUseCase.execute({
      category_id: '159159'
    });

    expect(car).toEqual([createCar]);
  });
});
