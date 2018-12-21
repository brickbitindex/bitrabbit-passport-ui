import BaseComponent from '../BaseComponent';
import BPC from '../../BPC';
import { str2ele } from '../../utils';

const radioTemplate = '<label class="bpcr-radio-wrapper" bpc-value="@v"><span class="bpcr-radio"></span><span class="bpcr-radio-label">@l</span></label>';

class RadioGroup extends BaseComponent {
  static className = 'bpc-radio-group'
  wrapperTamplate = `<span class="bpcr-radio-group-wrapper">
  <div class="bpc-origin"></div>
</span>`

  _updateChecked(value) {
    let newValue = value;
    if (!value) {
      const $tempChecked = this.$template.querySelector('input[type="radio"][checked]');
      if ($tempChecked) {
        newValue = $tempChecked.getAttribute('value');
      }
    }
    let $checked = this.$wrapper.querySelector('.bpcr-radio-wrapper.checked');
    if ($checked) {
      $checked.classList.remove('checked');
    }
    $checked = this.$wrapper.querySelector(`.bpcr-radio-wrapper[bpc-value="${newValue}"]`);
    if ($checked) {
      $checked.classList.add('checked');
    }

    // 更新template
    if (value) {
      let $tempChecked = this.$template.querySelector('input[type="radio"][checked]');
      $tempChecked.checked = false;
      $tempChecked.removeAttribute('checked');
      $tempChecked = this.$template.querySelector(`input[type="radio"][value="${newValue}"]`);
      if ($tempChecked) {
        $tempChecked.checked = true;
        $tempChecked.setAttribute('checked', '');
      }
    }
  }

  _updateDisabled() {
    let newValue;
    const $tempDisabled = this.$template.querySelectorAll('input[type="radio"][disabled]');
    if ($tempDisabled) {
      $tempDisabled.forEach((item) => {
        newValue = item.getAttribute('value');
        const $disabled = this.$wrapper.querySelector(`.bpcr-radio-wrapper[bpc-value="${newValue}"]`);
        if ($disabled) {
          $disabled.setAttribute('disabled', '');
        }
      });
    }
  }

  render() {
    super.render();
    const $inputs = this.$template.querySelectorAll('input[type="radio"]');
    $inputs.forEach(($input) => {
      const html = radioTemplate.replace('@l', $input.getAttribute('bpc-text')).replace('@v', $input.getAttribute('value'));
      const $r = str2ele(html);
      $r.addEventListener('click', (e) => {
        const disabledFilter = e.currentTarget.hasAttribute('disabled');
        if (disabledFilter === false) {
          const v = e.currentTarget.getAttribute('bpc-value');
          this._updateChecked(v);
        }
      }, false);
      this.$wrapper.appendChild($r);
    });
    this._updateChecked();
    this._updateDisabled();
  }
}

BPC.addComponent(RadioGroup);
