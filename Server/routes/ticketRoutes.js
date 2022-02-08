const express = require("express");
const router = express.Router();
const ticketController = require("../controllers").ticketController;
const authentication = require("../config/authentication");

router.post("/buyTicket", ticketController.buyTicket);
router.post("/history", ticketController.history);
router.post("/getTickets", ticketController.getTickets);
router.post("/ticketInfo", ticketController.ticketInfo);
router.delete("/deleteTicket", ticketController.deleteTicket);
router.post("/availableSeats", ticketController.getAvailableSeats);

module.exports = router;
