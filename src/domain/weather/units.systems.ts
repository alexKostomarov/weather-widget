export const UnitsSystems = ['standard', 'metric', 'imperial'] as const;
export type UnitSystem = typeof UnitsSystems[number];
export function isUnitSystem(value: string): value is UnitSystem {
    return UnitsSystems.includes(value as UnitSystem);
}