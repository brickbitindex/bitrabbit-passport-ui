class BPCcls {
  _components = [];
  _plugins = [];
  ready = false;

  addComponent(Component) {
    this._components.push(Component);
  }

  addPlugin(Plugin) {
    this._plugins.push(new Plugin());
  }

  _renderTarget($target, Component) {
    if (!$target.hasAttribute('bpc-rendered')) {
      const $c = new Component($target);
      $c.render();
      this._plugins.forEach((plugin) => {
        plugin.componentRendered($c);
      });
    }
  }

  render($target) {
    if ($target) {
      for (let i = 0; i < this._components.length; i += 1) {
        const Component = this._components[i];
        if ($target.classList.contains(Component.className)) {
          this._renderTarget($target, Component);
          break;
        }
      }
    } else {
      for (let i = 0; i < this._components.length; i += 1) {
        const Component = this._components[i];
        const $doms = document.querySelectorAll('.' + Component.className);
        $doms.forEach(($dom) => {
          this._renderTarget($dom, Component);
        });
      }
    }
  }

  message(type, msg, time = 3000) {
    let icon;
    if (type === 'success') {
      icon = 'icon-check-circle-fill';
    } else if (type === 'error') {
      icon = 'icon-close-circle-fill';
    } else if (type === 'warning') {
      icon = 'icon-warning-circle-fill';
    }
    const container = `
          <div class="message-container">
            <div class="message-content ${type}">
              <i class="iconfont ${icon}"></i>${msg}
            </div>
          </div>
        `;
    document.body.insertAdjacentHTML('beforeend', container);
    setTimeout(() => {
      const $container = document.querySelector('.message-container');
      document.body.removeChild($container);
    }, time);
  }

  init() {
    const firstRender = () => {
      if (this.ready) return;
      this.ready = true;
      this._plugins.forEach((plugin) => {
        plugin.init();
      });
      this.render();
    };

    if (document.readyState === 'complete' || (document.readyState !== 'loading' && !document.documentElement.doScroll)) {
      window.setTimeout(firstRender);
    } else {
      document.addEventListener('DOMContentLoaded', firstRender);
      window.addEventListener('load', firstRender);
    }
  }
}

const BPC = new BPCcls();
window.BPC = BPC;
export default BPC;
