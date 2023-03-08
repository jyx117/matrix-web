import request from '@/utils/request';
import {STORAGE_TYPE, getFromStorage} from '../utils/storage';

export async function query(): Promise<any> {
  return request('/api/users');
}

export async function queryCurrent(): Promise<any> {
  return request('/api/currentUser');
}

export async function queryNotices(): Promise<any> {
  return request('/api/notices');
}

export async function queryUser() {
  const token = getFromStorage(STORAGE_TYPE.TOKEN);
  const tenant = getFromStorage(STORAGE_TYPE.TENANT);
  const url = `/gateway/access/getUser.json?token=${token}`;
  const response = await request.post(url, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json; charset=utf-8', 'tenant-header': tenant },
  });

  return response;
}