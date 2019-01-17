import BaseComponent from '../BaseComponent';
import BPC from '../../BPC';
import { str2ele, fireEvent } from '../../utils';

const blockTemplate = '<input class="bpc-input bpcr-limited-input-block" />';

class LimitedInput extends BaseComponent {
  static className = 'bpc-limited-input'
  wrapperTamplate = `<span class="bpcr-limited-input-wrapper">
  <div class="bpc-origin"></div>
</span>`

  handleDelete(e) {
    if (e.keyCode === 8) {
      const value = this.$template.value;
      if (!value) return;
      const newValue = value.substr(0, Math.max(value.length - 1, 0));
      this.updateValue(newValue);
      const activeIndex = Math.max(Math.min(newValue.length, this.length - 1), 0);
      this.$inputs[activeIndex].focus();
    }
  }

  handleInput() {
    let allValue = this.$inputs.map($input => $input.value).reduce((a, b) => a + b, '');
    allValue = this.updateValue(allValue);
    const activeIndex = Math.max(Math.min(allValue.length, this.length - 1), 0);
    this.$inputs[activeIndex].focus();
  }

  updateValue(value) {
    const allValue = value.substr(0, this.length);
    const oldValue = this.$template.value;
    this.$template.value = allValue;
    const chars = allValue.split('');
    for (let i = 0; i < this.length; i += 1) {
      this.$inputs[i].value = chars[i] || '';
    }
    if (oldValue !== allValue) {
      fireEvent(this.$template, 'change');
    }
    return allValue;
  }

  render() {
    super.render();
    let length = this.$template.getAttribute('bpc-length') || 6;
    length = parseInt(length, 10);
    this.length = length;
    for (let i = 0; i < length; i += 1) {
      this.$wrapper.append(str2ele(blockTemplate));
    }
    this.$inputs = this.$wrapper.querySelectorAll('.bpcr-limited-input-block');
    this.$inputs = Array.prototype.slice.call(this.$inputs, 0);
    const size = this.$template.getAttribute('bpc-size');
    this.updateValue(this.$template.value);
    this.$inputs.forEach(($input) => {
      $input.setAttribute('bpc-size', size);
      $input.addEventListener('focus', this.handleInput.bind(this), false);
      $input.addEventListener('input', this.handleInput.bind(this), false);
      $input.addEventListener('keydown', this.handleDelete.bind(this), false);
    });
  }
}

BPC.addComponent(LimitedInput);
