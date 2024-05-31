import Cart from "../models/cart.js";

const getCart = async (req, h) => {
    try {
        const user_id = req.params.user_id;
        const cart = await Cart.findAll({ where: { user_id: user_id } });
        if (!cart || cart.length === 0) {
            return h.response({ error: "Product not found" }).code(404);
        }
        return h.response(cart).code(200);
    } catch (err) {
        console.error(err);
        return h.response({ error: "Internal Server Error" }).code(500);
    }
};

const addCart = async (req, h) => {
    try {
        const { user_id, product_id, quantity, created_at } = req.payload;
        const cartItem = await Cart.create({
            user_id: user_id,
            product_id: product_id,
            quantity: quantity,
            created_at: created_at,
        });

        return h.response({ success: true, data: cartItem }).code(201);
      } catch (error) {
        console.error(error);
        return h.response({ success: false, error: "Internal Server Error" }).code(500); 
      }
}

const updateCart = async (req, h) => {
    try {
        const { cart_id } = req.params;
        const { quantity } = req.payload;

        const cart = await Cart.findByPk(cart_id);
        if (!cart) {
            return h.response({ error: "Cart not found" }).code(404);
        }

        cart.quantity = quantity;
        await cart.save();

        return h.response({ success: true, data: cart }).code(200);
    } catch (err) {
        console.error(err);
        return h.response({ error: "Internal Server Error" }).code(500);
    }
}

const deleteCart = async (req, h) => {
    try {
        const { cart_id } = req.params;

        const cart = await Cart.findByPk(cart_id);
        if (!cart) {
            return h.response({ error: "Cart not found" }).code(404);
        }

        await cart.destroy();

        return h.response({ success: true, message: "Cart deleted successfully" }).code(200);
    } catch (err) {
        console.error(err);
        return h.response({ error: "Internal Server Error" }).code(500);
    }
};

export {getCart, addCart, updateCart, deleteCart}