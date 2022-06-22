import dayjs from 'dayjs';

import { CarsRepositoryInMemory } from '@modules/cars/repositories/in-memory/CarsRepositoryInMemory';
import { RentalsRepositoryInMemory } from '@modules/rentals/repositories/in-memory/RentalsRepositoryInMemory';
import { DayjsDateProvider } from '@shared/container/providers/DateProvider/implementations/DayjsDateProvider';
import { AppError } from '@shared/errors/AppError';

import { CreateRentalUseCase } from './CreateRentalUseCase';

let createRentalUseCase: CreateRentalUseCase;
let rentalsRepositoryInMemory: RentalsRepositoryInMemory;
let carsRepositoryInMemory: CarsRepositoryInMemory;
let dayjsDateProvider: DayjsDateProvider;

describe('Create Rental', () => {
  const dayAdd24Hours = dayjs().add(24, 'hours').toDate();
  beforeEach(() => {
    rentalsRepositoryInMemory = new RentalsRepositoryInMemory();
    carsRepositoryInMemory = new CarsRepositoryInMemory();
    dayjsDateProvider = new DayjsDateProvider();
    createRentalUseCase = new CreateRentalUseCase(
      rentalsRepositoryInMemory,
      dayjsDateProvider,
      carsRepositoryInMemory
    );
  });

  it('should be able to create a rental', async () => {
    const rental = await createRentalUseCase.execute({
      user_id: 'user_id-123',
      car_id: 'car_id-123',
      expect_return_date: dayAdd24Hours
    });

    expect(rental).toHaveProperty('id');
    expect(rental).toHaveProperty('start_date');
  });

  it('should not be able to create a rental if user has rent open', async () => {
    expect(async () => {
      await createRentalUseCase.execute({
        user_id: 'user_id-148',
        car_id: 'car_id-158',
        expect_return_date: dayAdd24Hours
      });

      await createRentalUseCase.execute({
        user_id: 'user_id-148',
        car_id: 'car_id-159',
        expect_return_date: dayAdd24Hours
      });
    }).rejects.toBeInstanceOf(AppError);
  });

  it('should not be able to create a rental if car has a rent open', async () => {
    expect(async () => {
      await createRentalUseCase.execute({
        user_id: 'user_id-148',
        car_id: 'car_id-15845',
        expect_return_date: dayAdd24Hours
      });

      await createRentalUseCase.execute({
        user_id: 'user_id-149',
        car_id: 'car_id-15845',
        expect_return_date: dayAdd24Hours
      });
    }).rejects.toBeInstanceOf(AppError);
  });

  it('should not be able to create a rental with invalid return time', async () => {
    expect(async () => {
      await createRentalUseCase.execute({
        user_id: 'user_id-741',
        car_id: 'car_id-742',
        expect_return_date: dayjs().toDate()
      });
    }).rejects.toBeInstanceOf(AppError);
  });
});
