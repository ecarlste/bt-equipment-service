import express from 'express';

const router = express.Router();

router.get('/', (req, res) => {
  res.send('This endpoint lists all equipment');
});

router.get('/:id', (req, res) => {
  res.send(`This endpoint will get an equipment entry by id: '${req.params.id}'`);
});

router.post('/', (req, res) => {
  res.send(`This endpoint will create a new equipment entry using this data: ${JSON.stringify(req.body)}`);
});

router.put('/:id', (req, res) => {
  res.send(
    `This endpoint will updated the equipment entry with id: '${req.params.id}' with data: ${JSON.stringify(req.body)}`
  );
});

router.delete('/:id', (req, res) => {
  res.send(`This endpoint will delete the equipment entry with id: '${req.params.id}'`);
});

export default router;
