import express from "express";
import cors from "cors";

import standingRoutes from "./routes/standing.js";

const BASE_URL = "https://football-api-express.vercel.app/standing";
const app = express();

app.use(cors());

app.get("/", (req, res) => {
  return res.status(200).json({
    message: "ဆင်ပျံကြီး always on top",
    data: [
      `${BASE_URL}/premier-league`,
      `${BASE_URL}/laliga`,
      `${BASE_URL}/bundesliga`,
      `${BASE_URL}/serie-a`,
      `${BASE_URL}/eredivise`,
      `${BASE_URL}/league-1`,
    ],
  });
});

app.use("/standing", standingRoutes);

app.listen(3000, () => {
  console.log("Sever listen at port 3000");
});
