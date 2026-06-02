import { Router } from "express"
import { getRecommendations } from "../controller/analyticsController.js"
import { protect } from "../middleware/authMiddleware.js";

const router = Router()
router.get('/recommendation',protect, getRecommendations)

export default router;