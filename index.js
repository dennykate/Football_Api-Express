import express from "express";
import cors from "cors";

import standingRoutes from "./routes/standing.js";

const app = express();

app.use(cors());

app.use("/standing", standingRoutes);

app.listen(3000, () => {
  console.log("Sever listen at port 3000");
});
