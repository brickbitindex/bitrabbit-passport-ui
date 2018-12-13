export default class BaseComponent {
  static className = ''
  wrapperTamplate = `<div>
  <div class="bpc-origin"></div>
</div>`

  constructor(template) {
    this.$template = template;
    this.$wrapper = null;
  }

  _str2ele(template) {
    const $el = document.createElement('div');
    $el.insertAdjacentHTML('beforeend', template);
    return $el.firstChild;
  }

  render() {
    const $wrapper = this._str2ele(this.wrapperTamplate);
    const $origin = $wrapper.querySelector('.bpc-origin');
    const $template = this.$template;
    $template.parentNode.insertBefore($wrapper, $template);
    $origin.appendChild($template);
    // 若template本身有参数，则将参数传递给wrapper
    for (let i = 0; i < $template.attributes.length; i += 1) {
      const name = $template.attributes[i].name;
      if (name.indexOf('bpc-') === 0) {
        $wrapper.setAttribute(name, $template.getAttribute(name) || '');
      }
    }
    $template.setAttribute('bpc-rendered', '');
    this.$wrapper = $wrapper;
  }
}
