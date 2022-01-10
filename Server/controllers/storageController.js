const storageRepository = require("../Repository").storageRepository;
const authentication = require("../config/authentication");

newStorage = (req, res) => {
  let payload = req.body;
  if (payload.capacity) {
    storageRepository
      .newStorage(payload.capacity)
      .then(() => {
        res.status(200).send("Storage facility added");
      })
      .catch((error) => {
        res.status(500).send("Something went wrong");
      });
  } else {
    res.status(500).send("Missing data");
  }
};

getAllStorage = (req, res) => {
  storageRepository
    .getAllStorage()
    .then((all) => {
      res.status(200).send(all);
    })
    .catch(() => {
      res.status(500).send("Something went wrong");
    });
};

module.exports = {
  newStorage,
  getAllStorage,
};
