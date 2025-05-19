type LocalStorageParams<T_DefaultValue> = {
  key: string;
  defaultValue: T_DefaultValue;
};
class LocalStorageItem<T_DefaultValue> {
  key: string;
  defaultValue: T_DefaultValue;

  constructor(params: LocalStorageParams<T_DefaultValue>) {
    this.key = params.key;
    this.defaultValue = params.defaultValue;
  }

  get = (): T_DefaultValue => {
    const rawValue = localStorage.getItem(this.key);
    if (rawValue === null) {
      return this.defaultValue;
    }

    try {
      const parsedValue = JSON.parse(rawValue);
      return parsedValue;
    } catch {
      return this.defaultValue;
    }
  };

  set = (value: T_DefaultValue) => {
    const stringifiedValue = JSON.stringify(value);
    localStorage.setItem(this.key, stringifiedValue);
  };

  remove = () => {
    localStorage.removeItem(this.key);
  };
}

export default LocalStorageItem;
