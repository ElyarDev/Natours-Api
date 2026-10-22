const fs = require("fs");
const express = require("express");
const app = express();

app.use(express.json());

// GETTING TOURS
const tours = JSON.parse(fs.readFileSync(`${__dirname}/dev-data/data/tours-simple.json`));

// FUNCTIONS
const getAllTours = (req, res) => {
    res.status(200).json({
        status: 'success',
        results: tours.length,
        data: {
            tours: tours,
        }
    })
}

const getTour = (req, res) => {
    console.log(req.params);
    const id = req.params.id * 1;
    const tour = tours.find(el => el.id === id);

    if (!tour) {
        return res.status(404).json({
            status: 'fail',
            message: 'invalid ID',
        })
    }

    res.status(200).json({
        status: 'success',
        data: {
            tour,
        }
    })
}

const createTour = (req, res) => {
    const newId = tours[tours.length - 1].id + 1;
    const newTour = Object.assign({ id: newId }, req.body);

    tours.push(newTour);

    fs.writeFile(`${__dirname}/dev-data/data/tours-simple.json`, JSON.stringify(tours), err => {
        res.status(201).json({
            status: 'success',
            data: {
                tour: newTour,
            }
        })
    });
}

const updateTour = (req, res) => {
    if (req.params.id * 1 > tours.length) {
        return res.status(404).json({
            status: 'fail',
            message: 'invalid ID',
        })
    }

    res.status(200).json({
        status: 'success',
        data: {
            tour: '<Updated tour here...>'
        }
    })
}

const deleteTour = (req, res) => {
    if (req.params.id * 1 > tours.length) {
        return res.status(404).json({
            status: 'fail',
            message: 'invalid ID',
        })
    }

    res.status(204).json({
        status: 'success',
        data: null
    })
}

// HANDLING GET REQUEST
// app.get('/api/v1/tours', getAllTours);

// RESPONDING TO URL
// app.get('/api/v1/tours/:id', getTour);

// HANDLING POST REQUEST
// app.post('/api/v1/tours', createTour);

// HANDLING PATCH REQUEST
// app.patch('/api/v1/tours/:id', updateTour);

// HANDLING DELETE REQUEST
// app.delete('/api/v1/tours/:id', deleteTour);


// HANDLING GET AND POST REQUEST IN BETTER WAY
app
    .route('/api/v1/tours')
    .get(getAllTours)
    .post(createTour);

// HANDLING GET AND PATCH AND DELETE REQUEST IN BETTER WAY
app
    .route('/api/v1/tours/:id')
    .get(getTour)
    .patch(updateTour)
    .delete(deleteTour);

// STARTING SERVER WITH EXPRESS
const port = 3000;
app.listen(port, () => {
    console.log(`App running on port ${port}...`);
})