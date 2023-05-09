
class ConfigStore {
  private static instance: ConfigStore;
  getDepartmentID: boolean;

  private constructor() {
    this.getDepartmentID = false;
  }

  public static getInstance(): ConfigStore {
    if (!ConfigStore.instance) {
      ConfigStore.instance = new ConfigStore();
    }
    return ConfigStore.instance;
  }

  public setGetDepartmentID(value: boolean) {
    this.getDepartmentID = value;
  }
}

export default ConfigStore;
