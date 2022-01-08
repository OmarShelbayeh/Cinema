const order = require("../models/order");
const orderRepository = require("../Repository").orderRepository;
const authentication = require("../config/authentication");
const productRepository = require("../Repository").productRepository;
const deliveryRepository = require("../Repository").deliveryRepository;

newOrder = async (req, res) => {
  let payload = req.body;
  if ((payload.product_id, payload.number_of_pieces)) {
    let user = await authentication.getUserObjectFromToken(req);
    let storage_id = await productRepository.productStorageId(
      payload.product_id
    );
    let available_pcs = await productRepository.availableProductById(
      payload.product_id
    );
    if (available_pcs >= payload.number_of_pieces) {
      orderRepository
        .newOrder(user.id, payload.product_id, payload.number_of_pieces, false)
        .then(async (newOrder) => {
          await deliveryRepository.newDelivery(
            newOrder.dataValues.id,
            storage_id,
            null
          );
        })
        .then(() => {
          updateAvailableProductById(
            payload.product_id,
            payload.number_of_pieces
          );
        })
        .then(() => {
          res.status(200).send("Order added");
        })
        .catch((error) => {
          res.status(500).send("Something went wrong");
        });
    } else {
      res.status(500).send("Amount bigger than inventory");
    }
  } else {
    res.status(500).send("Missing data");
  }
};

cancelOrder = async (req, res) => {
  let payload = req.body;

  if (payload.id) {
    let user = await authentication.getUserObjectFromToken(req);
    let owner = await orderRepository.getOrderOwner(payload.id);
    if (!owner) {
      res.status(500).send("Order Not Found");
    } else if (user.id !== owner) {
      res.status(401).send("Unauthorized");
    } else {
      let order = await orderRepository.getOrderById(payload.id);
      if (order.status) {
        res.status(500).send("Order cannot be cancelled");
      } else {
        await orderRepository.deleteOrder(order.id);
        await deliveryRepository.deleteDeliveryByOrderId(order.id);
        await productRepository.returnProduct(
          order.product_id,
          order.number_of_pieces
        );
        res.status(200).send("Order cancelled");
      }
    }
  } else {
    res.status(500).send("Missing data");
  }
};

getAllOrders = async (req, res) => {
  orderRepository
    .getAllOrders()
    .then((allOrders) => {
      res.status(200).send(allOrders);
    })
    .catch(() => {
      res.status(500).send("Something Went Wrong");
    });
};

getAllOrdersForUser = async (req, res) => {
  let user = authentication.getUserObjectFromToken(req);
  orderRepository
    .getAllOrdersForUser(user.id)
    .then((allOrders) => {
      res.status(200).send(allOrders);
    })
    .catch((error) => {
      res.status(500).send("Something went wrong");
    });
};

module.exports = {
  newOrder,
  getAllOrdersForUser,
  cancelOrder,
};
