import { Router } from "express"
import { allUser,  userUpdate } from "../controller/userProfile.js"
import { protect } from "../middleware/authMiddleware.js";
import { authorizeRoles } from "../middleware/roleMiddleware.js";

const router = Router()

router.get('/users', protect, authorizeRoles("admin"), allUser)
router.put("/update/:id", protect, authorizeRoles('user'), userUpdate)

export default router