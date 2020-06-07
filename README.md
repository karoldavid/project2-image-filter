# Image Filtering Microservice

A plublicly hosted image can be sent to the Image Filtering Microservice and the processed image will be returned. The Image Filtering Microservice is the second project of the [Udacity AWS Cloud Developer Nanodegree](https://www.udacity.com/course/cloud-developer-nanodegree--nd9990).

### Prerequisites

Make sure you have installed all of the following prerequisites on your development machine:

1. Node.js and the npm package manager. It is recommended to use the [Node Version Manager](https://github.com/nvm-sh/nvm/blob/master/README.md).
2. [Postman](https://www.postman.com/) API client.

### How to run 

You'll need to create a new node server. Open a new terminal within the project directory and run:

1. Initialize a new project: `npm i`
2. run the development server with `npm run dev`

### How to test

1. Open Postman Api client.
2. Upload the Postman collection [image-filtering-microservice.json](https://github.com/karoldavid/image-filtering-microservice/blob/master/image-filtering-microservice.json).
3. Choose the first request and hit the send button.
4. The request should return a 200 status code and the proessed image file.

### How to deploy

To deploy the Node.js application to AWS Elastic Beanstalk follow the instructions [here](https://docs.aws.amazon.com/elasticbeanstalk/latest/dg/create_deploy_nodejs.html).