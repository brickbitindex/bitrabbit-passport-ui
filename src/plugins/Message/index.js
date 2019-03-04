import BasePlugin from '../BasePlugin';
import BPC from '../../BPC';
import { str2ele } from '../../utils';

const initTemplate = '<div class="bpc-message"></div>';
const template = '<div class="bpc-message-wrapper move-up"><div class="bpc-message-content @s"><i class="iconfont @i"></i><span>@m</span></div>';

export default class MessagePlugin extends BasePlugin {
  init() {
    BPC.message = {};
    BPC.message.success = this.handleSuccess;
    BPC.message.error = this.handleError;
    BPC.message.warning = this.handleWarning;
  }

  handleSuccess = (message) => {
    this.handleClick(message, 'bpc-message-success', 'icon-check-circle-fill');
  }

  handleError = (message) => {
    this.handleClick(message, 'bpc-message-error', 'icon-close-circle-fill');
  }

  handleWarning = (message) => {
    this.handleClick(message, 'bpc-message-warning', 'icon-info-circle-fill');
  }

  handleClick(msg, state, icon) {
    const hasMessage = document.querySelector('.bpc-message');
    const initDom = str2ele(initTemplate);
    const dom = str2ele(template.replace('@m', msg).replace('@s', state).replace('@i', icon));
    if (!hasMessage) {
      document.body.appendChild(initDom);
      initDom.appendChild(dom);
      setTimeout(() => {
        const parent = dom.parentNode;
        parent.removeChild(dom);
      }, 3000);
    } else {
      hasMessage.appendChild(dom);
      setTimeout(() => {
        const parent = dom.parentNode;
        parent.removeChild(dom);
      }, 3000);
    }
  }
}

BPC.addPlugin(MessagePlugin);
