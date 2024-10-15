const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const cors = require('cors');
const { Pool } = require('pg');

app.use(bodyParser.json());
app.use(cors());

const pool = new Pool({
  user: 'postgres',
  host: 'localhost',
  database: 'appstix_db',
  password: 'root',
  port: 5432
});

// Get properties and occupancy data
app.get('/api/properties', async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM properties');
    res.json(result.rows);
  } catch (error) {
    res.status(500).send(error);
  }
});

// Get financial data
app.get('/api/financials', async (req, res) => {
  try {
    const result = await pool.query("SELECT * FROM financial_records LEFT JOIN properties ON properties.id = financial_records.property_id");
    res.json(result.rows);
  } catch (error) {
    res.status(500).send(error);
  }
});

app.listen(3000, () => {
  console.log('Server is running on port 3000');
});
