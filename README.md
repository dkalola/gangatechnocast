# gangatechnocast

## Install Dependencies

`npm install`

This will install dependencies that is required for this project..

## Start Project

`node app.js`

This is the basic command to run the application.

NOTE: If you make any changes while the application is running. You will have to Ctrl+C and re-run the application by the command mentioned above.

You can also run the application using nodemon runner.

To install nodemon you can `npm i nodemon`

To run the project using nodemon `nodemon app.js`

## Start Project using Docker

First make sure you have Docker Desktop installed. If not follow this [Link](https://www.docker.com/products/docker-desktop/).

#### Build the Docker Container First

`docker build -t gangatechnocast .`

#### Check the Docker Images

`docker images`

You should see similar output form this command

```
REPOSITORY        TAG       IMAGE ID       CREATED         SIZE
gangatechnocast   latest    796959880cb1   7 seconds ago   2.02GB
```

#### Running the Docker Container

You can also start the container by checking the Docker Desktop. Got to images in Docker Desktop and you would be able to see the GangaTechnocast.

`docker run -p 3000:3000 gangatechnocast`
