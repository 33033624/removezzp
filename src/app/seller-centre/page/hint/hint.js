/* eslint-disable */
import Vue from 'vue';

const HintConstructor = Vue.extend(require('./hint.vue'));

let getAnInstance = () => {
  return new HintConstructor({
    el: document.createElement('div')
  });
};

let removeDom = target => {
  if (target.parentNode) {
    target.parentNode.removeChild(target);
  }
};

HintConstructor.prototype.close = function() {
  this.visible = false;
  removeDom(this.$el)
  this.closed = true;
};

let Hint = (options = {}) => {
  let instance = getAnInstance();
  instance.closed = false;
  instance.message = typeof options === 'string' ? options : options.message;
  instance.clientX = options.clientX;
  instance.clientY = options.clientY;

  document.body.appendChild(instance.$el);
  Vue.nextTick(function() {
    instance.visible = true;
    let hint = instance.$el
    let text = instance.$el.children[0]
    setTimeout(function () {
      window.addEventListener('click', function (e) {
        let target = e.target;
        if (!(target === hint || target === text)) {
          if (instance.closed) return;
          instance.close();
        }
      })
      window.addEventListener('touchstart', function (e) {
        if (instance.closed) return;
        instance.close();
      })
    }, 300)
  });
  return instance;
};

export default Hint;
