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

describe('find', () => {
  it('should return all documents that match query when multiple exist', async () => {
    const equipment1 = new EquipmentModel(equipmentData);
    const equipment2 = new EquipmentModel(equipmentData);
    await Promise.all([equipment1.save(), equipment2.save()]);

    const foundEquipment = await EquipmentModel.find({});

    expect(foundEquipment.length).toBe(2);
  });

  it('should return empty when no documents match query', async () => {
    const foundEquipment = await EquipmentModel.find({});

    expect(foundEquipment).toStrictEqual([]);
  });
});

describe('findByIdAndUpdate', () => {
  it('should return updated equipment when an existing id is passed', async () => {
    const equipment = new EquipmentModel(equipmentData);
    const savedEquipment = await equipment.save();
    const updatedCriticalSlots = 2;

    const updatedEquipment = await EquipmentModel.findByIdAndUpdate(
      savedEquipment.id,
      {
        criticalSlots: updatedCriticalSlots
      },
      { returnDocument: 'after' }
    );

    expect(updatedEquipment?.criticalSlots).toBe(updatedCriticalSlots);
  });

  it('should not change fields that are not provided in the update object', async () => {
    const equipment = new EquipmentModel(equipmentData);
    const savedEquipment = await equipment.save();
    const updatedCriticalSlots = 2;

    const updatedEquipment = await EquipmentModel.findByIdAndUpdate(
      savedEquipment.id,
      {
        criticalSlots: updatedCriticalSlots
      },
      { returnDocument: 'after' }
    );

    expect(updatedEquipment?.name).toBe(equipmentData.name);
  });
});

describe('deleteOne', () => {
  it('should delete an equipment entry when provided a valid Id', async () => {
    const equipment = new EquipmentModel(equipmentData);
    const savedEquipment = await equipment.save();

    const deletedEquipment = await EquipmentModel.deleteOne({ _id: savedEquipment.id });

    expect(deletedEquipment.deletedCount).toBe(1);
  });

  it("should fail when trying to delete equipment by Id that doesn't exist", async () => {
    const deletedEquipment = await EquipmentModel.deleteOne({ _id: '62f57df82a9e88018ddb63f9' });

    expect(deletedEquipment.deletedCount).toBe(0);
  });
});
