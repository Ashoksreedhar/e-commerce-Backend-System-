import { Router } from "express"
import { cancelOrder, getMyOrder, placeOrder, updateOrderStatus } from "../controller/orderController.js"
import { protect } from "../middleware/authMiddleware.js";
import { authorizeRoles } from "../middleware/roleMiddleware.js";

const router = Router()

router.post('/product-order', protect, authorizeRoles('user'), placeOrder);
router.get('/get-order', protect, authorizeRoles("user"), getMyOrder);
router.put('/status/:id', protect, authorizeRoles("admin"), updateOrderStatus)
router.put('/cancel/:id', protect, authorizeRoles("admin", "user"), cancelOrder)

export default router;