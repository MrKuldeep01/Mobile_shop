import { Router } from "express";
const router = Router();


router.route('/profile/owner').get(controller)
router.route('/profile/owner/edit').get(controller)
export default router;