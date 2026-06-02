import productModels from "../models/productModels.js";


//Add-products-Admin Only

export const addProducts = async (req, res) => {
    const { title, description, price, category, stock } = req.body
    if (!title || !price || !category) {
        return res.json({ message: "Required filed missing" })
    }
    try {
        const productsCreate = await productModels.create({
            title, description, price, category, stock
        })
        res.json({ message: "product create successfully", productsCreate })
    } catch (error) {
        res.json({ error: error.message })
    }
}

//All products

export const getAllProducts = async (req, res) => {
    try {
        const { title, category, price, sort } = req.query
        let query = {}
        if (title) {
            query.title = { $regex: title, $options: "i" }
        }
        if (category) {
            query.category = { $regex: category, $options: "i" }
        }
        if (price) {
            query.price = { $lte: Number(price) }
        }

        let sortOptions = {}
        if (sort === 'asc') sortOptions = { price: 1 }
        if (sort === 'desc') sortOptions = { price: - 1 }

        const products = await productModels.find(query).sort(sortOptions)
        res.json({ products })
    } catch (error) {
        res.json({ error: error.message });
    }
}



//product-update

export const productUpdate = async (req, res) => {
    try {
        const update = await productModels.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true }
        )
        if (!update) {
            return res.json({ message: "product not found" })
        }
        res.json({ message: "product update sucessfully", update })
    } catch (error) {
        res.json({ error: error.message })
    }
}

//product-delete

export const productDelete = async (req, res) => {
    try {
        await productModels.findByIdAndDelete(req.params.id)
        res.json({ message: "Product delete successfully" })
    } catch (error) {
        res.json({ error: error.message })
    }
}