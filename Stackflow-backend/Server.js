const express = require("express");
const cors = require("cors");
require("dotenv").config();



const logger = require("./middleware/logger");

const ProductRouter = require("./routes/ProductRouter");
const connectDB = require("./config/DataBase");



const app = express();

const PORT = process.env.Port || 5000;
app.use(cors());
app.use(express.json());
app.use(logger);

app.get("/", (req,res)=>{
    res.send("Hello from Stackflow backend");
});

app.use("/api/products", ProductRouter);

const startServer = async () => {

    try {
        
    console.log("Connecting to MongoDB...");

    await connectDB();

    console.log("MongoDB connection completed.");

    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });

  } catch (error) {
    console.error("Startup error:", error.message);
  }
};

startServer();
