const express = require('express');
const axios = require('axios');
const cors = require('cors');
require('dotenv').config();

const app = express();
app.use(cors());
app.use(express.json());

const GROQ_API_URL = 'https://your-groq-api-endpoint';
const GROQ_API_KEY = process.env.VITE_GROQ_API_KEY;

app.post('/api/query', async (req, res) => {
  try {
    const { query } = req.body;

    const response = await axios.post(
      GROQ_API_URL,
      { query },
      { headers: { Authorization: `Bearer ${GROQ_API_KEY}` } }
    );

    res.json(response.data);
  } catch (error) {
    console.error('Groq API Proxy Error:', error.message);
    res.status(500).json({ error: 'Failed to fetch data from Groq API' });
  }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Proxy server running on port ${PORT}`));
