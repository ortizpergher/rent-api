/* eslint-disable prettier/prettier */
/* eslint-disable implicit-arrow-linebreak */
import { Router } from 'express';

import { CreateSpecificationController } from '@modules/cars/useCases/createSpecification/CreateSpecificationController';
import { ensureAdmin } from '@shared/infra/http/middlewares/ensureAdmin';
import { ensureAuthenticated } from '@shared/infra/http/middlewares/ensureAuthenticated';

const specificationsRoutes = Router();

const createSpecificationController = new CreateSpecificationController();

specificationsRoutes.use(ensureAuthenticated, ensureAdmin);
specificationsRoutes.post('/', createSpecificationController.handle);

export { specificationsRoutes };
