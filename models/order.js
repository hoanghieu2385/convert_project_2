// order.js
const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
    user: { type: mongoose.Schema.Types.ObjectId, required: true, ref: 'User' },
    shipping_address: {
        recipient_name: { type: String, maxlength: 255 },
        recipient_phone: { type: String, maxlength: 20 },
        city: { type: String, maxlength: 100 },
        district: { type: String, maxlength: 100 },
        ward: { type: String, maxlength: 100 },
        address: { type: String, maxlength: 255 }
    },
    order_date: { type: Date, default: Date.now },
    payment_shipment: {
        payment_method: { type: String, maxlength: 100 },
        shipment_method: { type: String, maxlength: 255 },
        fees: { type: Number }
    },
    order_total: { type: mongoose.Types.Decimal128 },
    order_status: { 
        type: String, 
        enum: ["Pending", "In Process", "In Delivery", "Completed", "Canceled", "Refunded"],
        default: "Pending"
    },
    shipment_tracking_id: { type: String, maxlength: 100, default: 'Not yet available' },
    est_delivery_date: { type: Date },
    order_items: [{
        product: { type: mongoose.Schema.Types.ObjectId, required: true, ref: 'Product' },
        qty: { type: Number, required: true },
        price_at_order: { type: mongoose.Types.Decimal128 }
    }]
});

module.exports = mongoose.model('Order', orderSchema);