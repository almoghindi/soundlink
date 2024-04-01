import CryptoJS from "crypto-js";
const secretkey = process.env.REACT_APP_S3_API_SECRET;
export const encryptArray = (array) => {
  const encryptedItems = array.map((item) => {
    const encryptedItem = CryptoJS.AES.encrypt(
      JSON.stringify(item),
      secretkey
    ).toString();
    return encryptedItem;
  });

  return encryptedItems;
};

export const decryptArray = (encryptedArray) => {
  const parsedArr = JSON.parse(encryptedArray);
  const decryptedItems = parsedArr.map((encryptedItem) => {
    const bytes = CryptoJS.AES.decrypt(encryptedItem, secretkey);
    const decryptedItem = JSON.parse(bytes.toString(CryptoJS.enc.Utf8));
    return decryptedItem;
  });

  return decryptedItems;
};

export const encryptObject = (object) => {
  try {
    const encryptedObject = CryptoJS.AES.encrypt(
      JSON.stringify(object),
      secretkey
    ).toString();
    return encryptedObject;
  } catch (error) {
    console.error("Encryption error:", error);
    return null;
  }
};

export const decryptObject = (encryptedObject) => {
  try {
    const bytes = CryptoJS.AES.decrypt(encryptedObject, secretkey);
    const decryptedObject = JSON.parse(bytes.toString(CryptoJS.enc.Utf8));
    return decryptedObject;
  } catch (error) {
    console.error("Decryption error:", error);
    return null;
  }
};
