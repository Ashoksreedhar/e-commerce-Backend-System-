import { Router } from "express"
import { addProducts, getAllProducts, productDelete, productUpdate } from "../controller/productController.js"
import { protect } from "../middleware/authMiddleware.js"
import { authorizeRoles } from "../middleware/roleMiddleware.js"

const router = Router()

router.post('/', protect, authorizeRoles("admin"), addProducts)
router.get('/', getAllProducts)
router.put('/:id', protect, authorizeRoles("admin"), productUpdate)
router.delete('/:id', protect, authorizeRoles('admin'), productDelete)

export default router;
