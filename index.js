import express from "express";
import cors from "cors";

import standingRoutes from "./routes/standing.js";

const app = express();

app.use(cors());

app.get("/", (req, res) => {
  return res.send("ဆင်ပျံကြီး always on top");
});
app.use("/standing", standingRoutes);

app.listen(3000, () => {
  console.log("Sever listen at port 3000");
});
