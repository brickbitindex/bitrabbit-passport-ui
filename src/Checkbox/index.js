/* eslint no-param-reassign: 0 */
import BaseComponent from '../BaseComponent';
import BPC from '../BPC';

const checkboxTemplate = '<label class="bpcr-checkbox-wrapper" bpc-value="@v"><span class="bpcr-checkbox"></span><span class="bpcr-checkbox-label">@l</span></label>';

class CheckboxGroup extends BaseComponent {
  static className = 'bpc-checkbox-group'
  wrapperTamplate = `<span class="bpcr-checkbox-group-wrapper">
  <div class="bpc-origin"></div>
</span>`

  _updateChecked(value, checked) {
    this.$template.querySelectorAll('input[type="checkbox"]').forEach(($item) => {
      const itemValue = $item.getAttribute('value');
      if (itemValue === value) {
        $item.checked = checked;
        if (checked) {
          $item.setAttribute('checked', '');
        } else {
          $item.removeAttribute('checked');
        }
      }
      const itemChecked = $item.checked;
      const $checked = this.$wrapper.querySelector(`.bpcr-checkbox-wrapper[bpc-value="${itemValue}"]`);
      if ($checked) {
        if (itemChecked) {
          $checked.classList.add('checked');
        } else {
          $checked.classList.remove('checked');
        }
      }
    });
  }

  render() {
    super.render();
    const $inputs = this.$template.querySelectorAll('input[type="checkbox"]');
    $inputs.forEach(($input) => {
      const html = checkboxTemplate.replace('@l', $input.getAttribute('bpc-text')).replace('@v', $input.getAttribute('value'));
      const $r = this._str2ele(html);
      $r.addEventListener('click', (e) => {
        const $t = e.currentTarget;
        const v = $t.getAttribute('bpc-value');
        const checked = $t.classList.contains('checked');
        this._updateChecked(v, !checked);
      }, false);
      this.$wrapper.appendChild($r);
    });
    this._updateChecked();
  }
}

BPC.addComponent(CheckboxGroup);
