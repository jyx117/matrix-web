import request from '@/utils/request';

export type LoginParamsType = {
  userName: string;
  password: string;
  mobile: string;
  captcha: string;
};

export async function fakeAccountLogin(params: LoginParamsType) {
  return request('/api/login/account', {
    method: 'POST',
    data: params,
  });
}

export async function getFakeCaptcha(mobile: string) {
  return request(`/api/login/captcha?mobile=${mobile}`);
}

export async function login(values: any) {
  const url = `/gateway/access/login.json`;
  const response = await request.post(url, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json; charset=utf-8' },
    data: values,
  });

  return response;
}