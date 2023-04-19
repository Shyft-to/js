import { isArray, isObject, forEach, snakeCase, camelCase } from 'lodash';

export class CaseConverter {
  public convertToSnakeCaseObject(obj: any): any {
    if (isArray(obj)) {
      return obj.map((value) => this.convertToSnakeCaseObject(value));
    } else if (isObject(obj)) {
      const snakeCaseObj = {};
      forEach(obj, (value, key) => {
        snakeCaseObj[snakeCase(key)] = this.convertToSnakeCaseObject(value);
      });
      return snakeCaseObj;
    } else {
      return obj;
    }
  }

  public convertToCamelCaseObject(obj: any): any {
    if (isArray(obj)) {
      return obj.map((value) => this.convertToCamelCaseObject(value));
    } else if (isObject(obj)) {
      const camelCaseObj = {};
      forEach(obj, (value, key) => {
        camelCaseObj[camelCase(key)] = this.convertToCamelCaseObject(value);
      });
      return camelCaseObj;
    } else {
      return obj;
    }
  }
}
