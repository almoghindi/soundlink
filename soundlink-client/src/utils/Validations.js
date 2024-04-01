export function isValidEmail(email) {
  // Regular expression for basic email validation
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  // Test the email against the regex
  return emailRegex.test(email);
}

export function isValidPassword(password) {
  // Check if password has minimum 8 characters
  if (password.length < 8) {
    return false;
  }

  // Check if password contains at least one lowercase letter, one uppercase letter, and one number
  const lowercaseRegex = /[a-z]/;
  const uppercaseRegex = /[A-Z]/;
  const numberRegex = /[0-9]/;

  return (
    lowercaseRegex.test(password) &&
    uppercaseRegex.test(password) &&
    numberRegex.test(password)
  );
}

export function isValidIsraeliPhoneNumber(phoneNumber) {
  // Remove any non-digit characters
  const cleanedPhoneNumber = phoneNumber.replace(/\D/g, "");

  // Check if the cleaned number starts with +972
  if (/^\+972/.test(phoneNumber)) {
    // Check the length of the remaining digits (should be 12)
    return cleanedPhoneNumber.length === 12;
  }

  // Check if the cleaned number starts with 05
  if (/^05/.test(phoneNumber)) {
    // Check the length of the remaining digits (should be 10)
    return cleanedPhoneNumber.length === 10;
  }

  return false;
}

export function isValidUrl(str) {
  // Regular expression for a more lenient URL pattern
  const urlRegex = /^(ftp|http|https):\/\/[^ "]+$/;

  // If the string doesn't start with a protocol, try adding 'http://' to it
  if (!urlRegex.test(str)) {
    str = 'http://' + str;
  }

  return urlRegex.test(str);
}