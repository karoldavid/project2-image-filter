import express, { Request, Response } from "express";
import bodyParser from "body-parser";
import urlExist from "url-exist";
import { filterImageFromURL, deleteLocalFiles } from "./util/util";

(async () => {
  // Init the Express application
  const app = express();

  // Set the network port
  const port = process.env.PORT || 8082;

  // Use the body parser middleware for post requests
  app.use(bodyParser.json());

  interface RequestWithQuery extends Request {
    query: {
      image_url: string;
    };
  }

  app.get("/filteredImage", async (req: RequestWithQuery, res: Response) => {
    const IMAGE_REG_EXP = /[\/.](jpg|jpeg)$/i;
    const { image_url } = req.query;

    if (!image_url) {
      return res
        .status(422)
        .send({ error: true, message: "Missing query param image_url!" });
    }

    const isJpeg = IMAGE_REG_EXP.test(image_url);

    if (!isJpeg) {
      return res.status(422).send({
        error: true,
        message: "The requested resoure image_url must be of type jpg or jpeg!",
      });
    }

    const exists = await urlExist(image_url);

    if (!exists) {
      return res.status(404).send({
        error: true,
        message: "The image_url does not exist or is not publicly accessible!",
      });
    }

    const filtered_image_url = await filterImageFromURL(image_url);

    res.status(200).sendFile(filtered_image_url, async (err) => {
      if (err) {
        console.log(err);
        res.status(500).send({ error: true, message: err.message });
      }

      try {
        await deleteLocalFiles([filtered_image_url]);
      } catch (err) {
        console.log(err);
      }
    });
  });

  // Root Endpoint
  // Displays a simple message to the user
  app.get("/", async (req, res) => {
    res.send("try GET /filteredimage?image_url={{}}");
  });

  // Start the Server
  app.listen(port, () => {
    console.log(`server running http://localhost:${port}`);
    console.log(`press CTRL+C to stop server`);
  });
})();
