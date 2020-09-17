/**
 * To replace markdown text with variable syntax.
 * eg, - [訓練]({{trainDocPath}}):建立人臉模型。
 * @param {String} text
 * @param {Object} variables
 */
export default function mdReplacer(text, variables) {
  let result = text;
  Object.keys(variables).forEach((key) => {
    const replace = `{{${key}}}`;
    const re = new RegExp(replace, 'g');
    result = result.replace(re, variables[key]);
  });
  return result;
}
