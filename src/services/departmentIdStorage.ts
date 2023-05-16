import AsyncStorage from '@react-native-async-storage/async-storage';

const DEPARTMENT_ID_KEY = 'departmentId';

export const getDepartmentId = async () => {
  try {
    const departmentId = await AsyncStorage.getItem(DEPARTMENT_ID_KEY);
    return departmentId || '0';
  } catch (error) {
    console.error('Error getting departmentId:', error);
    return '0';
  }
};

export const setDepartmentId = async (newDepartmentId: string) => {
  try {
    await AsyncStorage.setItem(DEPARTMENT_ID_KEY, newDepartmentId);
  } catch (error) {
    console.error('Error setting departmentId:', error);
  }
};
