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
export type UpdateWeaponDto = Partial<CreateWeaponDto>;

export type CreateWeaponRequest = { data: CreateWeaponDto };
export type ReadOneWeaponRequest = { id: string };
export type UpdateWeaponRequest = { id: string; data: UpdateWeaponDto };
export type DestroyWeaponRequest = { id: string };

export interface WeaponResponse {
  success?: boolean;
  message?: string;
  result?: WeaponDto | WeaponDto[];
}
