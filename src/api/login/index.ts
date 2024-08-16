import service from '../../utils/axios';
import config from '@/config';

export const login = async (params: any) => {
  try {
    const data = await service.post('/auth/login', params);
    return data;
  } catch (error) {
    console.error('Login failed:', error);
    throw error;
  }
};

export const sendEmail = async (params: any) => {
  try {
    const data = await service.post('/auth/sendEmail', params, {     
      headers: {
      'auth-token': config.emailAuthToken,
    }});
    return data;
  } catch (error) {
    console.error('sendEmail failed:', error);
    throw error;
  }
};

export const register = async (params: any) => {
  try {
    const data = await service.post('/auth/register', params);
    return data;
  } catch (error) {
    console.error('register failed:', error);
    throw error;
  }
};

export const emailLogin = async (params: any) => {
  try {
    const data = await service.post('/auth/emailLogin', params);
    return data;
  } catch (error) {
    console.error('emailLogin failed:', error);
    throw error;
  }
};

export const retrievePassword = async (params: any) => {
  try {
    const data = await service.post('/auth/retrievePassword', params);
    return data;
  } catch (error) {
    console.error('retrievePassword failed:', error);
    throw error;
  }
};

export const logout = async () => {
  try {
    const data = await service.post('/auth/logout');
    return data;
  } catch (error) {
    console.error('logout failed:', error);
    throw error;
  }
};