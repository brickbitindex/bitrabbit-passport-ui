import BaseComponent from '../BaseComponent';
import BPC from '../BPC';

const valueTemplate = '<span class="bpcr-select-value"><span></span><i class="iconfont icon-down"></i></span>';
const dropTemplate = '<div class="bpcr-select-drop"></div>';
const optionTemplate = '<div class="bpcr-select-option" bpc-value="@v">@t</div>';

class Select extends BaseComponent {
  static className = 'bpc-select'
  wrapperTamplate = `<span class="bpcr-select-wrapper">
  <div class="bpc-origin"></div>
</span>`

  show = false;

  _updateSelected(value) {
    let newValue = value;
    if (!value) {
      newValue = this.$template.value;
    }
    let $resetOption = this.$template.querySelector('option[selected]');
    if ($resetOption) {
      $resetOption.removeAttribute('selected');
      $resetOption.selected = false;
    }
    $resetOption = this.$wrapper.querySelector('.bpcr-select-option.selected');
    if ($resetOption) {
      $resetOption.classList.remove('selected');
    }
    // 根据新值来更新template和wrapper
    let $willSelect = this.$template.querySelector(`option[value="${newValue}"]`);
    let newText = newValue;
    if ($willSelect) {
      $willSelect.setAttribute('selected', '');
      $willSelect.selected = true;
      newText = $willSelect.innerText;
    }
    $willSelect = this.$wrapper.querySelector(`.bpcr-select-option[bpc-value="${newValue}"]`);
    if ($willSelect) {
      $willSelect.classList.add('selected');
    }
    $willSelect = this.$wrapper.querySelector('.bpcr-select-value span');
    if ($willSelect) {
      $willSelect.innerText = newText;
    }
  }

  render() {
    super.render();
    this.$value = this._str2ele(valueTemplate);
    this.$wrapper.appendChild(this.$value);
    this.$drop = this._str2ele(dropTemplate);
    this.$wrapper.appendChild(this.$drop);
    this.$wrapper.addEventListener('click', () => {
      if (this.show) {
        this.$wrapper.classList.remove('show');
      } else {
        this.$wrapper.classList.add('show');
      }
      this.show = !this.show;
    }, false);

    this.$template.querySelectorAll('option').forEach(($option) => {
      const html = optionTemplate.replace('@t', $option.innerText).replace('@v', $option.value);
      const $o = this._str2ele(html);
      if ($option.disabled) {
        $o.setAttribute('disabled', '');
      }
      $o.addEventListener('click', (e) => {
        const $e = e.currentTarget;
        if ($e.getAttribute('disabled') === null) {
          const v = $e.getAttribute('bpc-value');
          this._updateSelected(v);
        }
      }, false);
      this.$drop.appendChild($o);
    });
    this._updateSelected();
  }
}

BPC.addComponent(Select);
