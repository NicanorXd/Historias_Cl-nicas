import { isNumberString, isPhoneNumber, length } from 'class-validator';
import { countryData } from '../data/country.data';

export function isPhoneValidUtil(phoneCode: string, phoneNumber: string) {
  const value = `${phoneCode}${phoneNumber}`;
  const country = countryData.find(
    (item) => `+${item.countryCode}` == phoneCode,
  );
  if (!country) throw new Error('errors.countryPhoneInvalid');
  // validar que sea un numero
  if (!isNumberString(phoneNumber)) {
    throw new Error('errors.countryPhoneInvalid');
  }
  // validar longitud
  if (!length(phoneNumber, country.phoneLength)) {
    throw new Error('errors.countryPhoneInvalid');
  }
  // validar numero de telefono
  if (!isPhoneNumber(value, country.code as any)) {
    throw new Error('errors.countryPhoneInvalid');
  }
  // response
  return phoneNumber;
}
