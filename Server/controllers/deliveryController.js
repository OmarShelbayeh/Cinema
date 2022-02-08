const deliveryRepository = require("../Repository").deliveryRepository;
const authentication = require("../config/authentication");

newDelivery = (req, res) => {
  let payload = req.body;
  if (payload.storage_id && payload.driver_id) {
    deliveryRepository
      .newDelivery(payload.storage_id, payload.driver_id)
      .then(() => {
        res.status(200).send("Delivery created");
      })
      .catch((error) => {
        res.status(500).send("Something went wrong");
      });
  } else {
    res.status(500).send("Missing data");
  }
};

const getAllDeliveries = (req, res) => {
  let payload = req.body;
  deliveryRepository
    .getAllDeliveries(payload.order)
    .then((deliveries) => {
      res.status(200).send(deliveries);
    })
    .catch((e) => {
      res.status(500).send("Something went wrong");
    });
};

module.exports = {
  newDelivery,
  getAllDeliveries,
};
