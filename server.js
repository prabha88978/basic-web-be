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

app.post('/signup', async (req, res) => {
    console.log("Coming here?")
    const { fullname, username, email, password } = req.body;
    console.log(fullname, username, email, password);
    try {
        const insertQuery = 'INSERT INTO users (fullname,username,email,password) VALUES($1,$2,$3,$4)';
        const values = [fullname, username, email, password];
        const result = await pool.query(insertQuery, values);
        if (result.rows.length > 0)
            res.status(201).json({ status_code: 201, message: 'Data stored successfully', data: result.rows[0] });
    }
    catch (error) {
        res.status(500).json({ message: 'Unable to save user info to database' });
    }
    // res.status(200).json({ status_code: 201, message: "Success" })
});

app.post('/login', async (req, res) => {
    const { username, password } = req.body;
    console.log(username, password);
    try {
        const selectQuery = 'SELECT * FROM users WHERE username=$1 and password = $2';
        const values = [username, password];
        const response = await pool.query(selectQuery, values);
        if (response.rows.length > 0) {
            res.status(201).json({ status_code: 201, message: 'Data stored successfully', data: response.rows[0] });
        }
        else {
            res.status(401).json({ status_code: 401, error: 'Invalid credentials' });
        }
    } catch (error) {
        console.error('Error executing query:', error);
        res.status(500).json({ status_code: 500, error: 'Internal server error' });
    }
});

// Start the server
app.listen(port, () => {
    console.log(`Server is running at http://localhost:${port}`);
});
