import { Router } from "express";
import ApiControllers from "../controllers/ApiControllers";

const router = Router();
const api = new ApiControllers;

router.get('/',api.home);
router.post('/api/user-add',api.userAdd);
router.put('/api/user-update/:userId',api.userUpdate);
router.delete('/api/user-delete/:userId',api.userDelete);
router.use(api.error404);

export default router;
