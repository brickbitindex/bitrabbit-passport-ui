import BaseComponent from '../BaseComponent';
import BPC from '../../BPC';
import { str2ele } from '../../utils';

const wrapperTamplate = '<span class="bpc-pagination-wrapper"></span>';
const buttonTemplate = '<button class="bpc-btn" bpc-icon>@t</button>';

class Pagination extends BaseComponent {
  static className = 'bpc-pagination'

  current = 1
  total = 1
  template = ''
  openTarget = undefined
  size = undefined;

  _addBtn(index, target) {
    const $btn = str2ele(buttonTemplate.replace('@t', index));
    if (this.size) {
      $btn.setAttribute('bpc-size', this.size);
    }
    let $add = $btn;
    if (index === this.current) {
      $btn.classList.add('bpc-pagination-current');
    } else if ((target === '-1' && this.current === 1) || (target === '+1' && this.current === this.total)) {
      $btn.setAttribute('disabled', '');
    } else {
      const $a = document.createElement('a');
      let urlIndex = index;
      if (target) {
        urlIndex = this.current + parseInt(target, 10);
      }
      $a.appendChild($btn);
      $a.setAttribute('href', this.template.replace('{index}', urlIndex));
      if (this.openTarget) {
        $a.setAttribute('target', this.openTarget);
      }
      $add = $a;
    }
    this.$wrapper.appendChild($add);
    return $btn;
  }

  _addEllipsis() {
    this.$wrapper.appendChild(str2ele('<i class="iconfont icon-ellipsis"></i>'));
  }

  _updatePage() {
    this.total = this.$template.getAttribute('bpc-total-page') || '0';
    this.total = parseInt(this.total, 10);
    this.current = this.$template.getAttribute('bpc-current-page') || '1';
    this.current = parseInt(this.current, 10);

    if (this.total === 0 || this.current > this.total) return;

    this._addBtn('<i class="iconfont icon-left"></i>', '-1');
    if (this.total <= 7) {
      for (let i = 0; i < this.total; i += 1) {
        this._addBtn(i + 1);
      }
    } else {
      this._addBtn(1);
      if (this.current <= 3) {
        this._addBtn(2);
        this._addBtn(3);
        this._addBtn(4);
        this._addBtn(5);
        this._addEllipsis();
        this._addBtn(this.total);
      } else if (this.current <= 4 && this.current < this.total - 3) {
        this._addBtn(2);
        this._addBtn(3);
        this._addBtn(4);
        this._addBtn(5);
        this._addBtn(6);
        this._addEllipsis();
        this._addBtn(this.total);
      } else if (this.current <= 4 && this.current >= this.total - 3) {
        this._addBtn(2);
        this._addBtn(3);
        this._addBtn(4);
        this._addBtn(5);
        this._addBtn(6);
        this._addBtn(this.total);
      } else if (this.current > 4 && this.current < this.total - 3) {
        this._addEllipsis();
        this._addBtn(this.current - 2);
        this._addBtn(this.current - 1);
        this._addBtn(this.current);
        this._addBtn(this.current + 1);
        this._addBtn(this.current + 2);
        this._addEllipsis();
        this._addBtn(this.total);
      } else if (this.current === this.total - 3) {
        this._addEllipsis();
        this._addBtn(this.current - 2);
        this._addBtn(this.current - 1);
        this._addBtn(this.current);
        this._addBtn(this.current + 1);
        this._addBtn(this.current + 2);
        this._addBtn(this.total);
      } else if (this.current > this.total - 3) {
        this._addEllipsis();
        this._addBtn(this.total - 4);
        this._addBtn(this.total - 3);
        this._addBtn(this.total - 2);
        this._addBtn(this.total - 1);
        this._addBtn(this.total);
      }
    }
    this._addBtn('<i class="iconfont icon-right"></i>', '+1');
  }

  render() {
    const $wrapper = str2ele(wrapperTamplate);
    this.$template.appendChild($wrapper);
    this.$wrapper = $wrapper;
    this.template = unescape(this.$template.getAttribute('bpc-url-template'));
    this.openTarget = this.$template.getAttribute('bpc-target');
    this.size = this.$template.getAttribute('bpc-size');
    this._updatePage();
  }
}

BPC.addComponent(Pagination);
