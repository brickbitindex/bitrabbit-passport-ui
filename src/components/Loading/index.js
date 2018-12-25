import BaseComponent from '../BaseComponent';
import BPC from '../../BPC';
import { str2ele } from '../../utils';

const dotWrapperClassName = `<div class="bpc-loading-wrapper">
  <span>
    <i></i>
    <i></i>
    <i></i>
    <i></i>
  </span>
</div>`;
const circleWrapperClassName = `<div class="bpc-loading-wrapper">
  <span>
    <i></i>
  </span>
</div>`;

class Loading extends BaseComponent {
  static className = 'bpc-loading'
  _updateType(type) {
    if (type === 'circle') {
      this.$template.appendChild(str2ele(circleWrapperClassName));
    } else {
      this.$template.appendChild(str2ele(dotWrapperClassName));
    }
  }
  render() {
    const type = this.$template.getAttribute('bpc-type');
    this._updateType(type);
  }
}

BPC.addComponent(Loading);
