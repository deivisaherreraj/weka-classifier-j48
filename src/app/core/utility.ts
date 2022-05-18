abstract class UtilityObject<T>{ 
  abstract equals(obj: T): boolean; 
}

export class Utility extends UtilityObject<Utility> {
  private value: Object;

  public constructor(value: Object) { 
    super();   
    this.value = value;
  }

  public equals(obj: Utility): boolean {
    return this.value === obj.value;
  }
}
