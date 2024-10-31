import { Router } from 'express';
import { getJobList, getJobDetail } from '../controllers/jobController';
import { authMiddleware } from '../middlewares/authMiddleware';

const router = Router();
router.get('/jobs', authMiddleware, getJobList);
router.get('/jobs/:id', authMiddleware, getJobDetail);

export default router;
