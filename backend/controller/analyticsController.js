import orderModel from "../models/orderModel.js";
import productModels from "../models/productModels.js";


export const getRecommendations = async (req, res) => {
    try {
        const userId = req.user._id

        const orders = await orderModel.find({ userId })
            .populate("products.productId", "title category price")

        const categories = orders.flatMap(order => 
            order.products.map(p => p.productId.category)
        )

        const recommendations = await productModels.find({
            category: { $in: categories }
        }).limit(5)
        console.log("categories:", categories)
        res.json({ recommendations })
    } catch (error) {
        res.json({ error: error.message })
    }
}