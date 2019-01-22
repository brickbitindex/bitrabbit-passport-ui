export function str2ele(template) {
  const $el = document.createElement('div');
  $el.insertAdjacentHTML('beforeend', template);
  return $el.firstChild;
}

export function fireEvent(element, event) {
  if (document.createEventObject) {
    // dispatch for IE
    const e = document.createEventObject();
    return element.fireEvent('on' + event, e);
  }
  // dispatch for firefox + others
  const e = document.createEvent('HTMLEvents');
  e.initEvent(event, true, true); // event type,bubbling,cancelable
  return !element.dispatchEvent(e);
}
