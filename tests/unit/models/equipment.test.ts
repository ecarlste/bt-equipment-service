// import Equipment from '../../../src/models/equipment';

import mongoose from 'mongoose';
import { db } from '../../../src/config/db';
import { EquipmentModel } from '../../../src/models/equipment';

const equipmentData = {
  name: 'Autocannon/2',
  heat: 1,
  damage: 2,
  minimumRange: 4,
  shortRange: 8,
  mediumRange: 16,
  longRange: 24,
  weight: 6,
  criticalSlots: 1
};

beforeAll(async () => {
  await db.setUp();
});

afterEach(async () => {
  await db.dropCollections();
});

afterAll(async () => {
  await db.dropDatabase();
});

describe('create', () => {
  it('should successfully create an equipment object in the DB', async () => {
    const equipment = new EquipmentModel(equipmentData);

    const savedEquipment = await equipment.save();

    expect(savedEquipment._id).toBeDefined();
  });

  it('should fail when creating equipment without required fields', async () => {
    const equipmentWithoutRequiredField = new EquipmentModel({ name: 'Autocannon/20' });

    let err;
    try {
      await equipmentWithoutRequiredField.save();
    } catch (error) {
      err = error;
    }

    expect(err).toBeInstanceOf(mongoose.Error.ValidationError);
  });
});

describe('findById', () => {
  it('should successfully find an item by id when it exists', async () => {
    const equipment = new EquipmentModel(equipmentData);
    const savedEquipment = await equipment.save();

    const foundEquipment = await EquipmentModel.findById(savedEquipment._id);

    expect(foundEquipment?.name).toBe(equipmentData.name);
  });

  it("should find nothing when using an id that doesn't exist", async () => {
    const foundEquipment = await EquipmentModel.findById('62f57df82a9e88018ddb63f9');

    expect(foundEquipment).toBeNull();
  });
});
