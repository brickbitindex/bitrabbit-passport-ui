import BasePlugin from '../BasePlugin';
import BPC from '../../BPC';
import { str2ele } from '../../utils';
import './style.scss';

const template = '<div>@m</div>';

export default class MessagePlugin extends BasePlugin {
  init() {
    BPC.message = {};
    BPC.message.success = this.handleSuccess;
    BPC.message.error = this.handleError;
  }

  handleSuccess(message) {
    const dom = str2ele(template.replace('@m', message));
    document.body.appendChild(dom);
    console.log(message);
  }

  handleError(message) {
    console.log(message);
  }
}

BPC.addPlugin(MessagePlugin);
