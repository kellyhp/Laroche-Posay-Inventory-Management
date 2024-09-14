import { Router } from "express";
import { getUsers, createUser, updateUser, deleteUser } from "../controllers/userController";

const router = Router();

router.get("/", getUsers);
router.post('/users', createUser);
router.put('/users/:userId', updateUser);
router.delete('/users/:userId', deleteUser);

export default router;