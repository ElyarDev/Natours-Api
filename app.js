const express = require("express");
const morgan = require("morgan");

const tourRouter = require("./routes/tourRoutes");
const userRouter = require("./routes/userRoutes");

const app = express();

// 3RD PARTY MIDDLEWARES
app.use(morgan('dev'));

app.use(express.json());

// CREATING MIDDLEWARE
app.use((req, res, next) => {
    console.log('Hello from the middleware');
    next();
})

app.use((req, res, next) => {
    req.requestTime = new Date().toISOString();
    next();
})



// FUNCTIONS




// HANDLING GET AND POST REQUEST IN BETTER WAY


app.use('/api/v1/tours', tourRouter);
app.use('/api/v1/users', userRouter);

module.exports = app;