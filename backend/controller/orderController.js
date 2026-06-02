import orderModel from "../models/orderModel.js";
import productModels from "../models/productModels.js";


// ---------Place-order-userOnly------------//
export const placeOrder = async (req, res) => {
    try {
        const { products } = req.body
        const userId = req.user._id;

        let totalPrice = 0;
        for (const item of products) {
            const product = await productModels.findById(item.productId)
            if (!product) {
                return res.json({ error: "product not found" })
            }
            totalPrice += product.price * item.quantity
        }

        const order = await orderModel.create({
            userId,
            products,
            totalPrice
        })
        res.json({ message: "Order placed sucessfully", order })
    } catch (error) {
        res.json({ error: error.message });
    }
}

// -------Get all orders-------------//
export const getMyOrder = async (req, res) => {
    try {
        const userId = req.user._id;
        const orders = await orderModel.find({ userId })
            .populate("products.productId", "title price")
        if (orders.length === 0) {
            return res.json({ error: "No orders found" })
        }
        res.json({ orders })
    } catch (error) {
        res.json({ error: error.message })
    }
}


//----------------order updated-------------//
export const updateOrderStatus = async (req, res) => {
    const { status } = req.body
    try {
        const order = await orderModel.findByIdAndUpdate(
            req.params.id,
            { status },
            { new: true }
        )
        if (!order) {
            return res.json({ error: "Order not found" })
        }
        res.json({ message: "Order status updates sucessfully" })
    } catch (error) {
        res.json({ error: error.message })
    }
}


//---------------cancel order User & Admin---------------//
export const cancelOrder = async (req, res) => {
    try {
        const order = await orderModel.findById(req.params.id)
        if (!order) {
            return res.json({ error: "Order not found" })
        }
        if (order.status === "delivered") {
            return res.json({ message: "Delivered order cannot be cancelled" })
        }
        if (order.status === "pending" || order.status === "shipped") {
            order.status ="cancelled"
            await order.save()
            return res.json({ message: "Order is cancelled successfully", order })
        }
    } catch (error) {
        res.json({ error: error.message })
    }
}