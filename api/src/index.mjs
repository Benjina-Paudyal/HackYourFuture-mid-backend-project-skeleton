import "dotenv/config";           
import express from "express";    
import cors from "cors";         
import bodyParser from "body-parser"; 
import rootRouter from "#routers";    
import swaggerSetup from "#configs/swagger.js"; 
import {
  globalMiddlewares,
  terminalMiddlewares,
} from "#middlewares"; 


const app = express();

app.use(cors());

app.use(bodyParser.json());

for (const middleware of globalMiddlewares) {
  app.use(middleware);
}

app.use("/", rootRouter);

swaggerSetup(app);


// These run after route handlers and documentation routes.
for (const middleware of terminalMiddlewares) {
  app.use(middleware);
}

const port = process.env.PORT ?? 3000;

app.listen(port, () => {
  console.info(
      `${process.env.APP_NAME || "Backend-Mid-Specialism"} app started on port ${port}`
  );
});
