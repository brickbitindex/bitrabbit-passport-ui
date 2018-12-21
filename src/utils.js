export function str2ele(template) {
  const $el = document.createElement('div');
  $el.insertAdjacentHTML('beforeend', template);
  return $el.firstChild;
}
