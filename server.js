const express = require('express')
const bodyParser = require('body-parser');
const cors = require('cors');
const db = require('./src/models/index')
const PORT = process.env.PORT || 3000;

const app = express();

// connect to database
db.mongoose
    .connect(db.url, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => {
        console.log("database connection established")
    })
    .catch((error) => {
        console.log("Could not connect to database", error);
        process.exit();
    })

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// test route

app.get('/', (req, res) => {
    res.json({ message: "works" })
});

app.listen(PORT, () => {
    console.log(`server running on port ${PORT}`)
});