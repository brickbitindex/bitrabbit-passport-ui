import BaseComponent from '../BaseComponent';
import BPC from '../BPC';

const textTemplate = '<span class="bpcr-switch-text">@t</span>';

class Switch extends BaseComponent {
  static className = 'bpc-switch'
  wrapperTamplate = `<span class="bpcr-switch-wrapper">
  <div class="bpc-origin"></div>
</span>`

  _updateChecked(checked) {
    let newChecked = checked;
    if (checked !== undefined) {
      this.$template.checked = checked;
      if (checked) {
        this.$template.setAttribute('checked', '');
      } else {
        this.$template.removeAttribute('checked');
      }
    } else {
      newChecked = this.$template.checked;
    }
    if (newChecked) {
      this.$wrapper.classList.add('checked');
    } else {
      this.$wrapper.classList.remove('checked');
    }
  }

  render() {
    super.render();
    const $check = this._str2ele(textTemplate.replace('@t', this.$template.getAttribute('bpc-checked-text') || ''));
    $check.classList.add('checked');
    const $uncheck = this._str2ele(textTemplate.replace('@t', this.$template.getAttribute('bpc-unchecked-text') || ''));
    $uncheck.classList.add('unchecked');
    this.$wrapper.appendChild($check);
    this.$wrapper.appendChild($uncheck);
    this.$wrapper.addEventListener('click', (e) => {
      const checked = e.currentTarget.classList.contains('checked');
      this._updateChecked(!checked);
    }, false);
    this._updateChecked();
  }
}

BPC.addComponent(Switch);
