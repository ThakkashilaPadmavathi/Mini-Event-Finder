import express from 'express';
import cors from 'cors';
// import type { Event } from './types/event.ts';
import router from './routes/events';

const app = express();
app.use(cors());
app.use(express.json());

app.use('/api/events', router);

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
  console.log(`Backend listening on port ${PORT}`);
});