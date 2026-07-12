import Order from '../models/Order.js'

// @desc    Create new order
// @route   POST /api/orders
// @access  Private
export const addOrderItems = async (req, res) => {
  try {
    const { orderItems, totalPrice, address } = req.body

    if (orderItems && orderItems.length === 0) {
      return res.status(400).json({ success: false, error: 'No order items' })
    }

    const order = new Order({
      orderItems,
      user: req.user._id,
      totalPrice,
      status: 'Preparing',
      deliveryAddress: address
    })

    const createdOrder = await order.save()

    res.status(201).json({ success: true, data: createdOrder })
  } catch (err) {
    console.error(err)
    res.status(500).json({ success: false, error: 'Server error' })
  }
}

// @desc    Get logged in user orders
// @route   GET /api/orders/myorders
// @access  Private
export const getMyOrders = async (req, res) => {
  try {
    const orders = await Order.find({ user: req.user._id }).sort({ createdAt: -1 })
    res.json({ success: true, data: orders })
  } catch (err) {
    console.error(err)
    res.status(500).json({ success: false, error: 'Server error' })
  }
}

// @desc    Get order by ID
// @route   GET /api/orders/:id
// @access  Private
export const getOrderById = async (req, res) => {
  try {
    const order = await Order.findById(req.params.id).populate('orderItems.meal', 'name image price')

    if (order) {
      // Make sure the order belongs to the user
      if (order.user.toString() !== req.user._id.toString()) {
        return res.status(401).json({ success: false, error: 'Not authorized' })
      }
      res.json({ success: true, data: order })
    } else {
      res.status(404).json({ success: false, error: 'Order not found' })
    }
  } catch (err) {
    console.error(err)
    res.status(500).json({ success: false, error: 'Server error' })
  }
}
