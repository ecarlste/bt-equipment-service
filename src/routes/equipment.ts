import express from 'express';
import EquipmentService from '../services/equipment';

const router = express.Router();
const equipmentService = new EquipmentService();

router.get('/', async (req, res) => {
  const equipmentList = await equipmentService.getEquipment();

  res.send(equipmentList);
});

router.get('/:id', async (req, res) => {
  const equipment = await equipmentService.getEquipmentById(req.params.id);

  res.send(equipment);
});

router.post('/', async (req, res) => {
  const equipment = await equipmentService.createEquipment(req.body);

  res.send(equipment);
});

router.put('/:id', async (req, res) => {
  const equipment = await equipmentService.updateEquipmentById(req.params.id, req.body);

  res.send(equipment);
});

router.delete('/:id', async (req, res) => {
  const equipment = await equipmentService.deleteEquipmentById(req.params.id);

  res.send(equipment);
});

export default router;
