import express from "express";
import { getLeagueStanding } from "../controllers/standing.js";

const router = express.Router();

router.get("/:league", getLeagueStanding);

export default router;
