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
