import Equipment from './equipment';

test('hasNameLongerThan should return true when name longer than input', () => {
  const equipment = new Equipment('name');

  const result = equipment.hasNameLongerThan(1);

  expect(result).toBe(true);
});

test('hasNameLongerThan should return false when name shorter than input', () => {
  const equipment = new Equipment('name');

  const result = equipment.hasNameLongerThan(10);

  expect(result).toBe(false);
});

test('hasNameLongerThan should return false when name same length as input', () => {
  const equipment = new Equipment('name');

  const result = equipment.hasNameLongerThan(4);

  expect(result).toBe(false);
});
