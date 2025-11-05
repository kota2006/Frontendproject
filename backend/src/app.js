const express = require('express');
const cors = require('cors');
const authRoutes = require('./routes/auth');
const resourceRoutes = require('./routes/resources');
const programRoutes = require('./routes/programs');
const metricsRoutes = require('./routes/metrics');

const app = express();
app.use(cors());
app.use(express.json());

app.use('/api/auth', authRoutes);
app.use('/api/resources', resourceRoutes);
app.use('/api/programs', programRoutes);
app.use('/api/metrics', metricsRoutes);

app.get('/', (req, res) => res.send({ ok: true, message: 'Student Wellness API' }));

module.exports = app;
