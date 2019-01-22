/* eslint no-param-reassign: 0 */
// import BaseCalendar from './base';
import BaseCalendar from '@kuchain/pbc-calendar';
import BaseComponent from '../BaseComponent';
import BPC from '../../BPC';
import { str2ele } from '../../utils';

class Calendar extends BaseComponent {
  static className = 'bpc-calendar'

  handleSelect(date) {
    this.$template.setAttribute('data-value', date.toString());
    const event = document.createEvent('Event');
    event.initEvent('change', true, true);
    this.$template.dispatchEvent(event);
  }

  render() {
    const opt = {
      disablePastDays: this.$template.hasAttribute('bpc-disable-past-days'),
      onSelect: this.handleSelect.bind(this),
    };
    if (this.$template.hasAttribute('bpc-month-names')) {
      opt.monthNames = this.$template.getAttribute('bpc-month-names').split(',');
    }
    if (this.$template.hasAttribute('bpc-day-names')) {
      opt.dayNames = this.$template.getAttribute('bpc-day-names').split(',');
    }
    this.base = new BaseCalendar(this.$template, opt);
    console.log(this.$template);
  }
}

BPC.addComponent(Calendar);
