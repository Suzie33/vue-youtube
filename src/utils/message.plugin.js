export default {
  install(Vue) {
    // eslint-disable-next-line no-param-reassign
    Vue.prototype.$message = function func(html) {
      window.M.toast({ html });
    };

    // eslint-disable-next-line no-param-reassign
    Vue.prototype.$error = function func(html) {
      window.M.toast({ html: `Ошибка: ${html}` });
    };
  },
};
