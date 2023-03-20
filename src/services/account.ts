import request from '@/utils/request';
import { STORAGE_TYPE, getFromStorage } from '@/utils/storage';

export async function listMyAdminAccounts(values: any) {
  const token = getFromStorage(STORAGE_TYPE.TOKEN);
  const tenant = getFromStorage(STORAGE_TYPE.TENANT);
  const url = `/gateway/account/listMyAdminAccounts.json?token=${token}`;
  const response = await request.post(url, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json; charset=utf-8', 'tenant-header': tenant },
    data: values,
  });

  return response;
}