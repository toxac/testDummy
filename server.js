const express = require('express')
const bodyParser = require('body-parser');
const cors = require('cors');
const PORT = process.env.PORT || 3000;

const app = express();

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