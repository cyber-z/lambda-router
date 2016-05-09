'use strict';

const path = require('path');
const _ = require('lodash');

class LambdaRouter {

  get routes() {
    return this._routes;
  }

  get baseDir() {
    return this._baseDir;
  }
  set baseDir(baseDir) {
    this._baseDir = baseDir;
  }

  constructor(options) {
    this._routes = [];
    this.baseDir = _.get(options, 'baseDir', '');
    const routes = _.get(options, 'routes', []);
    _.forEach(routes, this.setRoute.bind(this));
  }

  /**
   * get a routed function by name
   *
   * @param name
   * @returns {*}
   */
  getRoute(name) {
    return _.get(this.routes, name);
  }

  /**
   * setup routing
   *
   * @param name
   * @param option
   */
  setRoute(name, option) {
    const _opt = ((name, option) => {
      if (!_.isObject(option)) {
        return _(name);
      }
      option.name = _.toString(name);
      return _(option);
    })(name, option);

    const moduleName = _opt.get('module');
    const actionName = _opt.get('action', 'handler');
    const routeName = _opt.get('name', `${ moduleName }:${ actionName }`);
    try {
      const module = [this.baseDir, ''].reduce((result, dir) => {
        if (result !== false) {
          return result;
        }

        try {
          return require(path.resolve(dir, moduleName));
        } catch (e) {
          return false;
        }
      }, false);
      const handler = _.get(module, actionName);
      if (!_.isFunction(handler)) {
        throw new Error(
          `action not found. {module:${ module }, action: ${ action }}`);
      }
      this._routes[routeName] = handler;
    } catch (e) {
      throw e;
    }
  }
}

module.exports = LambdaRouter;
