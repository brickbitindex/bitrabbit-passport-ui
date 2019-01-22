/* eslint no-param-reassign: 0 */

import BaseComponent from '../BaseComponent';
import BPC from '../../BPC';
import { str2ele, fireEvent } from '../../utils';

const reg = /^\d{4}-\d{2}-\d{2}$/ig;

function checkDate(str) {
  if (str === '') return true;
  if (!str.match(reg)) return false;

  const d = new Date(str);
  if (Object.prototype.toString.call(d) === '[object Date]') {
    // it is a date
    if (isNaN(d.getTime())) {  // d.valueOf() could also work
      return false;
    }
    return true;
  }
  return false;
}

class DatePicker extends BaseComponent {
  static className = 'bpc-date-picker'
  divider = '-'
  date = null
  value = ''

  updateDate(dateStr) {
    if (checkDate(dateStr)) {
      this.value = dateStr;
    }
    this.$template.value = this.value;
  }

  handleInput() {
    this.updateDate(this.$template.value);
  }

  render() {
    // console.log(this.$template);
    // this.$template.addEventListener('input', this.handleInput.bind(this), false);
  }
}

BPC.addComponent(DatePicker);
