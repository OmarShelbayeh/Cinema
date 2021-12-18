const express = require("express");
const router = express.Router();
const ticketController = require("../controllers").ticketController;
const authentication = require("../config/authentication");

router.post("/buyTicket", ticketController.buyTicket);
router.get("/history", ticketController.history);
router.get("/getTickets", ticketController.getTickets);
router.post("/ticketInfo", ticketController.ticketInfo);
router.delete("/deleteTicket", ticketController.deleteTicket);

module.exports = router;
