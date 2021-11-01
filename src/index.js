import "core-js/stable";
import "regenerator-runtime/runtime";
import "dotenv/config";
import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import helmet from "helmet";
import rotas from "./routes";
import { AppError } from "./errors";

const formData = require("express-form-data");
const app = express();

const corsOptions = {
  exposedHeaders: "Content-disposition",
};

app.use(helmet());
app.use(cors(corsOptions));
app.use(bodyParser.json());

app.use(formData.format());
app.use(formData.stream());
app.use(formData.union());

app.use(`/`, rotas.cadastro);

app.use((err, req, res, next) => {
  if (err instanceof AppError) {
    const { httpCode, code, message } = err;

    res.status(httpCode).send({
      error: {
        code,
        message,
      },
    });
  } else {
    console.log(err);
    res.status(500).send({
      error: err,
    });
  }
});

const server = app.listen(process.env.PORT || 6660, async () => {
  console.log("Server started on port " + server.address().port);
});
