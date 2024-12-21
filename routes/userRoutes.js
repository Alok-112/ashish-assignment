import express from 'express';
import { createUser, changeUserStatus, getDistance, getUserListing } from '../controllers/userController.js';

const router = express.Router();

router.post('/create', createUser);
router.patch('/status', changeUserStatus);
router.get('/distance', getDistance);
router.post('/list', getUserListing);

export default router;
