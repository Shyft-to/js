import { transform, isArray, isObject, camelCase } from 'lodash';

export const Formatter = {
  camelCase: (obj: any): any =>
    transform(obj, (acc, value: any, key: string, target) => {
      const camelKey = isArray(target) ? key : camelCase(key);
      acc[camelKey] = isObject(value) ? Formatter.camelCase(value) : value;
    }),
};
