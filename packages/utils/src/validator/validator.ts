import { isValid, isBefore } from 'date-fns';
import isLength from 'validator/lib/isLength';
import isEmail from 'validator/lib/isEmail';
import isMobilePhone, { MobilePhoneLocale } from 'validator/lib/isMobilePhone';

export type ValidatorValue = string | Date | undefined | null;
class Validator {
  errors: object;
  name: string;
  value: ValidatorValue;

  constructor(errors: object, name: string, value: ValidatorValue) {
    this.errors = errors;
    this.name = name;
    this.value = value;
  }

  isRequired(message: string) {
    if (!this.value) {
      this.errors[this.name] = message;
    }
    return this;
  }

  isMobilePhone(message: string, locale: MobilePhoneLocale) {
    if (
      this.value &&
      typeof this.value === 'string' &&
      !isMobilePhone(this.value, locale)
    ) {
      this.errors[this.name] = message;
    }
    return this;
  }

  isEmail(message: string) {
    if (this.value && typeof this.value === 'string' && !isEmail(this.value)) {
      this.errors[this.name] = message;
    }
    return this;
  }

  lengthLimit(max: number, message: string) {
    if (
      this.value &&
      !isLength(String(this.value), {
        min: 0,
        max,
      })
    ) {
      this.errors[this.name] = message;
    }
    return this;
  }

  isDateBefore(date: Date, message: string) {
    if (
      this.value &&
      typeof this.value !== 'string' &&
      isValid(this.value) &&
      isBefore(this.value, date)
    ) {
      this.errors[this.name] = message;
    }
    return this;
  }
}

export default function factory(
  errors: object,
  name: string,
  value: ValidatorValue
) {
  const validator = new Validator(errors, name, value);
  return validator;
}
