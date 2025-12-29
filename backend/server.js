const express = require('express');
const morgan = require('morgan');
const personRoutes = require('./routes/person.routes');
const staffRoutes = require('./routes/staff.routes');
const engagementRoutes = require('./routes/engagement.routes');

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());
app.use(morgan('dev'));

app.get('/health', (req, res) => {
  res.json({ status: 'ok' });
});

app.use('/api/person', personRoutes);
app.use('/api/staff', staffRoutes);
app.use('/api/engagement', engagementRoutes);

app.use((error, req, res, next) => {
  const status = error.status || 500;
  res.status(status).json({ message: error.message || 'Server error.' });
});

app.listen(port, () => {
  // eslint-disable-next-line no-console
  console.log(`IAC listening on port ${port}`);
});