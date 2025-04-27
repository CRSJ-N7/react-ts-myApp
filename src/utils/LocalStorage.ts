type LocalStorageParams<T_DefaultValue> = {
  key: string
  devaultValue: T_DefaultValue
}
class LocalStorage<T_DefaultValue> {
  key: string
  devaultValue: T_DefaultValue

  constructor(params: LocalStorageParams<T_DefaultValue>) {
    this.key = params.key
    this.devaultValue = params.devaultValue
  }

  get = (): T_DefaultValue => {
    const rawValue = localStorage.getItem(this.key)

    if (rawValue === null) {
      return this.devaultValue
    }

    try {
      const parsedValue = JSON.parse(rawValue)
      return parsedValue
    } catch {
      return this.devaultValue
    }
  }

  set = (value: T_DefaultValue) => {
    const stringifiedValue = JSON.stringify(value)
    localStorage.setItem(this.key, stringifiedValue)
  }

  remove = () => {
    localStorage.removeItem(this.key)
  }
}

export default LocalStorage
