import * as CryptoJS from "crypto-js";

const secretKey = process.env.URL_ENCRYPT_KEY as string;

export function encryptImageUrl(imageUrl: string) {
  console.log("imageUrl", imageUrl);
  console.log("secretKey", secretKey);

  const encrypted = CryptoJS.AES.encrypt(imageUrl, secretKey);
  console.log("encrypted", encrypted.toString());

  return encrypted.toString();
}

export function decryptImageUrl(encryptedImageUrl: string) {
  console.log("encryptedImageUrl", encryptedImageUrl);
  const decrypted = CryptoJS.AES.decrypt(encryptedImageUrl, secretKey);
  return decrypted.toString(CryptoJS.enc.Utf8);
}
