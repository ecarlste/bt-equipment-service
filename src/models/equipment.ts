export default class Equipment {
  constructor(public name: string) {}

  hasNameLongerThan(length: number) {
    return this.name.length > length;
  }
}
