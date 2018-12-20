import BasePlugin from '../BasePlugin';
import BPC from '../../BPC';
import { str2ele } from '../../utils';

const tooltipTemplate = '<div class="bpc-tooltip @c" id="bpctooltip_@i"><div class="bpc-tooltip-content">@t</div></div>';

export default class TooltipPlugin extends BasePlugin {
  id = 0

  _createTooltip(text, classnames) {
    this.id += 1;
    let html = tooltipTemplate.replace('@i', this.id).replace('@t', text);
    if (classnames) {
      html = html.replace('@c', classnames);
    }
    const $tooltip = str2ele(html);
    document.body.appendChild($tooltip);
    return this.id;
  }

  _showTooltip($dom) {
    const id = $dom.getAttribute('bpc-tooltip-id') || this._createTooltip($dom.getAttribute('bpc-tooltip'), $dom.getAttribute('bpc-tooltip-class'));
    $dom.setAttribute('bpc-tooltip-id', id);
    const $tooltip = document.getElementById('bpctooltip_' + id);
    const bodyRect = document.body.getBoundingClientRect();
    const domRect = $dom.getBoundingClientRect();
    const domwidth = domRect.width;
    const top = domRect.top - bodyRect.top;
    const left = domRect.left - bodyRect.left + domwidth / 2;
    $tooltip.setAttribute('style', `top:${top}px;left:${left}px;`);
    $tooltip.classList.add('show');
  }

  _hideTooltip($dom) {
    const id = $dom.getAttribute('bpc-tooltip-id');
    if (!id) return;
    const $tooltip = document.getElementById('bpctooltip_' + id);
    $tooltip.classList.remove('show');
  }

  init() {
    document.addEventListener('mouseenter', (e) => {
      if (e.target.hasAttribute && e.target.hasAttribute('bpc-tooltip')) {
        this._showTooltip(e.target);
      } else if (e.target.classList && e.target.classList.contains('bpc-tooltip')) {
        e.target.classList.add('show');
      }
    }, true);
    document.addEventListener('mouseleave', (e) => {
      if (e.target.hasAttribute && e.target.hasAttribute('bpc-tooltip')) {
        this._hideTooltip(e.target);
      } else if (e.target.classList && e.target.classList.contains('bpc-tooltip')) {
        e.target.classList.remove('show');
      }
    }, true);
  }

  componentRendered(component) {
    if (component.$template.parentNode.classList.contains('bpc-origin')) {
      component.$template.removeAttribute('bpc-tooltip');
    }
  }
}

BPC.addPlugin(TooltipPlugin);
