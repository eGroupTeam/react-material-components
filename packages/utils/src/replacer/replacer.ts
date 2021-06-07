export interface Variables {
  [key: string]: string | undefined;
}

/**
 * Convert double curly brackets with variables into text string.
 * For example,
 * Hello, {{personName}}. -> Hello, Jerry.
 */
export default function replacer<V = Variables>(text: string, variables: V) {
  let result = text;
  if (variables) {
    Object.keys(variables).forEach((key) => {
      const replace = `{{${key}}}`;
      const re = new RegExp(replace, 'g');
      const value = variables[key];
      if (value) {
        result = result.replace(re, value);
      }
    });
  }
  return result;
}
