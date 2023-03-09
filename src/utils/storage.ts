// 本地存储类型
export const STORAGE_TYPE = {
  TOKEN: 'TOKEN',
  CURRENT_USER: 'CURRENT_USER',
  TENANT: 'TENANT',
  TENANTS: 'TENANTS',
  ROLES: 'ROLES',
  CURRENT_TENANT_ROLES: 'CURRENT_TENANT_ROLES',
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

export const getCurrentTenantRoles = () => {
  const roles = getFromStorage(STORAGE_TYPE.CURRENT_TENANT_ROLES);
  if (!roles) {
    return undefined;
  }
  return JSON.parse(roles);
}

export const putCurrentTenantRoles = (value: any) => {
  if (!value || value?.length < 1) {
    return;
  }

  putStorage(STORAGE_TYPE.CURRENT_TENANT_ROLES, JSON.stringify(value));
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

export const updateCurrentTenantRoles = (currentTenant) => {
  const roles = getRoles();
  if (!roles || roles?.length < 1) {
    return;
  }

  if (!currentTenant) {
    putCurrentTenantRoles(null);
  } else {
    if (!roles || roles?.length < 1) {
      putCurrentTenantRoles(null);
    } else {
      var tenantRoles = [];
      for (var i = 0; i < roles.length; i++) {
        var role = roles[i];
        if (currentTenant === role['tenant']) {
          tenantRoles.push(role['roleCode']);
        }
      }
      putCurrentTenantRoles(tenantRoles);
    }
  }
}

export const updateCurrentTenant = (tenant) => {
  if (!tenant) {
    return;
  }

  putStorage(STORAGE_TYPE.TENANT, tenant);
  // 设置currentTenant的roles
  console.log('updateCurrentTenant:', tenant);
  updateCurrentTenantRoles(tenant);
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

  // 更新tenant，
  // 1. 如果tenants为空则设置为null
  // 2. 如果原来在缓存中有tenant且tenants中仍然包含tenant，则设置为该tenant，否则设置为tenants.get(0)
  var currentTenant = null;
  if (!tenants || tenants?.length < 1) {
    putStorage(STORAGE_TYPE.TENANT, currentTenant);
  } else {
    const tenantByStorage = getTenant();
    currentTenant = tenantByStorage;
    if (!tenantByStorage) {
      currentTenant = tenants[0];
      putStorage(STORAGE_TYPE.TENANT, currentTenant);
    } else {
      if (tenants.indexOf(tenantByStorage) == -1) {
        currentTenant = tenants[0];
        putStorage(STORAGE_TYPE.TENANT, currentTenant);
      }
    }
  }
  // 设置currentTenant的roles
  console.log('currentTenant:', currentTenant);
  updateCurrentTenantRoles(currentTenant);
}