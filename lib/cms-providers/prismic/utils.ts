export function richTextAsText(richTextField: any) {
  if (Object.prototype.toString.call(richTextField) !== '[object Array]') {
    return '';
  }
  return richTextField.map((block: any) => block.text).join(' ');
}

export function getLinkUrl(linkField: any) {
  return linkField && linkField.url ? linkField.url : "";
}
