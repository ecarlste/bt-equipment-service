import { UpdateQuery } from 'mongoose';
import { EquipmentModel, IEquipment } from '../models/equipment';

export default class EquipmentService {
  async createEquipment(equipment: IEquipment): Promise<IEquipment> {
    const equipmentRecord = await EquipmentModel.create(equipment);

    return equipmentRecord;
  }

  async getEquipment() {
    const equipmentRecords = await EquipmentModel.find({});

    return equipmentRecords;
  }

  async getEquipmentById(id: string) {
    const equipmentRecord = await EquipmentModel.findById(id);

    return equipmentRecord;
  }

  async updateEquipmentById(id: string, update: UpdateQuery<IEquipment> | undefined) {
    const equipmentRecord = await EquipmentModel.findByIdAndUpdate(id, update, { returnDocument: 'after' });

    return equipmentRecord;
  }

  async deleteEquipmentById(id: string) {
    const equipmentRecord = await EquipmentModel.findByIdAndDelete(id);

    return equipmentRecord;
  }
}
