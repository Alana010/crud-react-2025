const express = require('express');
const cors = require('cors');
const orderRoutes = require('./routes/orderRoutes');

const app = express();

app.use(cors());
app.use(express.json());

app.use('/orders', orderRoutes);

const PORT = 5000;
app.listen(PORT, () => console.log('Server running on port ${PORT}'));