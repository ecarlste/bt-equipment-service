export type WeaponDto = {
  id: string;
  name: string;
  heat: string;
  damage: string;
  range: string;
  ammoPerTon: number | null;
  weight: number;
  criticalSlots: number;
  techRating: string;
};

export type CreateWeaponDto = Omit<WeaponDto, "id">;

export interface WeaponResponse {
  success?: boolean;
  message?: string;
  result?: WeaponDto | WeaponDto[];
}
