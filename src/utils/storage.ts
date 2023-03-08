
// 本地存储类型
export const STORAGE_TYPE = {
  TOKEN: 'TOKEN',
  CURRENT_USER: 'CURRENT_USER',
  TENANT: 'TENANT',
  TENANTS: 'TENANTS',
  ROLES: 'ROLES',
};

export const getFromStorage = (storageType: any) => {
  if (!localStorage) {
    return undefined;
  }

  return localStorage.getItem(storageType);
}

export const putStorage = (storageType: any, value: any) => {
  localStorage.setItem(storageType, value);
}

export const putTenants = (value: any) => {
  if (!value || value?.length < 1) {
    return;
  }

  putStorage(STORAGE_TYPE.TENANTS, JSON.stringify(value));
}

export const getTenants = () => {
  const tenants = getFromStorage(STORAGE_TYPE.TENANTS);
  if (!tenants) {
    return undefined;
  }
  return JSON.parse(tenants);
}

export const getTenant = () => {
  return getFromStorage(STORAGE_TYPE.TENANT);
}

export const putRoles = (value: any) => {
  if (!value || value?.length < 1) {
    return;
  }

  putStorage(STORAGE_TYPE.ROLES, JSON.stringify(value));
}

export const getRoles = () => {
  const roles = getFromStorage(STORAGE_TYPE.ROLES);
  if (!roles) {
    return undefined;
  }
  return JSON.parse(roles);
}

export const putCurrentUser = (value: any) => {
  if (!value) {
    return;
  }

  putStorage(STORAGE_TYPE.CURRENT_USER, JSON.stringify(value));
}

export const getCurrentUser = () => {
  const currentUser = getFromStorage(STORAGE_TYPE.CURRENT_USER);
  if (!currentUser) {
    return undefined;
  }
  return JSON.parse(currentUser);
}

export const updateCurrentUser = (currentUser: any) => {
  if (!currentUser) {
    return;
  }

  const { token, tenants, roles } = currentUser || {};
  putCurrentUser(currentUser);
  putStorage(STORAGE_TYPE.TOKEN, token);
  putTenants(tenants);
  putRoles(roles);
}