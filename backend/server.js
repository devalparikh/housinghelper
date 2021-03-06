// server.js
// Running backend on port 5000
// 
// Node requirements
const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const path = require('path');

// Configure env vars in env file
require('dotenv').config();

const app = express();
const port = process.env.PORT || 5000;

// Cors middleware 
app.use(cors());
app.use(express.json({ limit: '10kb' })); // Parse JSON

// Mongoose mongodb atlas connection
const uri = process.env.ATLAS_URI;
// Flags parses mongodb connection string
mongoose.connect(process.env.MONGODB_URI || uri, { useNewUrlParser: true, useCreateIndex: true, useUnifiedTopology: true });
const connection = mongoose.connection;
connection.once('open', () => {
    console.log("MongoDB database connection established successfully")
})
.catch(err => {
    console.log("server not connecting")
})

// Require and use model route files
// const postRouter = require('./routes/posts');
const usersRouter = require('./routes/users');
const authRouter = require('./routes/auth');
const postRouter = require('./routes/posts');
const companyRouter = require('./routes/companies');


app.use('/posts', postRouter);
app.use('/users', usersRouter);
app.use('/auth', authRouter);
app.use('/companies', companyRouter);


// app.get('/', (req, res) => res.send('hello'));

const root = require('path').join(__dirname, './../build')
    app.use(express.static(root));
    app.get("*", (req, res) => {
        res.sendFile('index.html', { root });
    })

if(process.env.NODE_ENV === 'production') {
    // Serve React Application
    const root = require('path').join(__dirname, 'build')
    app.use(express.static(root));
    app.get("*", (req, res) => {
        res.sendFile('index.html', { root });
    })
}

app.listen(port, () => {
    // Console log the server port
    console.log(`Server is running on port: ${port}`);
});