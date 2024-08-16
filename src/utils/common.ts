import CryptoJS from 'crypto-js';
import config from '@/config';
/**
 * 加密password用于http请求
 * @param password 
 * @returns 
 */
export const encryptPassword = (password: string | CryptoJS.lib.WordArray) => {
  const encryptedPassword = CryptoJS.AES.encrypt(password, config.secretKey).toString();
  return encryptedPassword;
}