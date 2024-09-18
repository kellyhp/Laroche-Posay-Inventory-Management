import express from "express";
import dotenv from "dotenv";
import bodyParser from "body-parser";
import cors from "cors";
import helmet from "helmet";
import morgan from "morgan";

import dashboardRoutes from "./routes/dashboardRoutes";
import productRoutes from "./routes/productRoutes";
import expenseRoutes from "./routes/expenseRoutes";
import userRoutes from "./routes/userRoutes";

dotenv.config();
const app = express();
app.use(express.json());
app.use(helmet());
app.use(helmet.crossOriginResourcePolicy({policy: "cross-origin"}));
app.use(morgan("common"));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:false}));
app.use(cors());

const corsOptions = {
  origin: 'https://main.d2lwhl65ebhqdq.amplifyapp.com',
  methods: 'GET,POST,PUT,DELETE,OPTIONS',
  allowedHeaders: 'Content-Type',
};
app.use(cors(corsOptions));

app.use("/dashboard", dashboardRoutes);
app.use("/products", productRoutes);
app.use("/expenses", expenseRoutes);
app.use("/users", userRoutes);

const port = Number(process.env.PORT) || 3001;
app.listen(port, "0.0.0.0", () => {
  console.log(`Server running on port ${port}`);
});