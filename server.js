import express from 'express'
import pool from './db.js'

const app = express();
const port = 3020;

// Middleware to parse JSON bodies
app.use(express.json());

// Route to test the server
app.get('/', (req, res) => {
    res.send('Hello World!');
});

app.get('/db-setup', async (req, res) => {
    try {
        await pool.query('CREATE TABLE IF NOT EXISTS users(id SERIAL PRIMARY KEY, fullname varchar(255), email varchar(255),\
            username varchar(255), password varchar(255))');
        res.status(200).json({ status_code: 200, message: 'Created table successfully' });
    }
    catch (err) {
        console.log(err)
        res.status(500).json({ message: 'Unable to create table in the database' });
    }
})

app.post('/signup', (req, res) => {
    console.log("Coming here?")
    const { fullname, username, email, password } = req.body;
    console.log(fullname, username, email, password);
    res.status(200).json({ status_code: 201, message: "Success" })
});

// Start the server
app.listen(port, () => {
    console.log(`Server is running at http://localhost:${port}`);
});
