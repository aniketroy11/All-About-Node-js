import express from 'express';

import { getusers , createUsers , getUserById,deleteUser, updateUser } from '../controllers/users.js';

const router = express.Router();

// all routes in here are staring with /user
// in this router section is bulky and bit confusing what router is doing
// so to make clean we seperate logic of each routes controllers section
// this is mcv => model view controller


router.get('/',getusers);

router.post('/',createUsers)

router.get('/:id',getUserById)

 router.delete('/:id',deleteUser)

router.patch('/:id',updateUser)

export default router;