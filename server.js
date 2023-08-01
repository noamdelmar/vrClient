require('dotenv').config();
const express = require('express');
const path = require('path');
const app = express();
const port = process.env.PORT || 8000;
const bodyParser = require('body-parser');

app.use(express.static(path.join(__dirname, 'build')));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

console.log(process.env.ADMIN_USERS)


app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});

app.get('*', function (req, res) {
    res.sendFile(path.join(__dirname, 'build', 'index.html'))
})