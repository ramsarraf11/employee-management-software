import { Router } from 'express';
import {
  createOrganization,
  getAllOrganizations,
  getOrganizationById,
  updateOrganization,
  deleteOrganization,
} from '../controllers/organization.controller';
import { authenticate } from '../middlewares/auth.middleware';

const organizationRoutes = Router();

organizationRoutes.post('/', createOrganization);
organizationRoutes.get('/', getAllOrganizations);
organizationRoutes.get('/:id', authenticate, getOrganizationById);
organizationRoutes.put('/:id', authenticate, updateOrganization);
organizationRoutes.delete('/:id', authenticate, deleteOrganization);

export default organizationRoutes;