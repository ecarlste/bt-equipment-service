import { Document, Schema, model } from 'mongoose';

export interface IEquipment extends Document {
  name: string;
  heat: number;
  damage: number;
  minimumRange?: number;
  shortRange: number;
  mediumRange: number;
  longRange: number;
  weight: number;
  criticalSlots: number;
}

const EquipmentSchema = new Schema<IEquipment>({
  name: {
    type: String,
    required: true
  },
  heat: {
    type: Number,
    required: true
  },
  damage: {
    type: Number,
    required: true
  },
  minimumRange: Number,
  shortRange: {
    type: Number,
    required: true
  },
  mediumRange: {
    type: Number,
    required: true
  },
  longRange: {
    type: Number,
    required: true
  },
  weight: {
    type: Number,
    required: true
  },
  criticalSlots: {
    type: Number,
    required: true
  }
});

export const EquipmentModel = model<IEquipment>('Equipment', EquipmentSchema);
