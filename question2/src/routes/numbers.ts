
import express from 'express';
import { getNumbersById } from '../controllers/numbersController';

const router = express.Router();

// GET /numbers/:numberid endpoint
router.get('/:numberid', getNumbersById);

export { router as numbersRouter };
