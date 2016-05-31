'use strict';
const assert = require('power-assert');
const fs = require('fs');
const _ = require('lodash');

const Router = require('../lib/LambdaRouter');

describe('Router testing', () => {
  let router;
  beforeEach(() => {
    try {
      const routes = JSON.parse(fs.readFileSync('./test/routes.json'));
      router = new Router({
        baseDir: 'sample',
        routes
      });
    } catch (e) {
      throw e;
    }
  });

  it('construct with no routes option', () => {
    const noRoutesRouter = new Router({
      baseDir: 'sample'
    });
    assert(Object.keys(noRoutesRouter.routes).length === 0);
    assert(_.isUndefined(noRoutesRouter.getRoute('echo:handler')));
  });

  it('construct with eventResolver', (done) => {
    const routes = JSON.parse(fs.readFileSync('./test/routes.json'));
    const eventRouter = new Router({
      baseDir: 'sample',
      routes,
      eventResolver: (event) => {
        return event.handler;
      }
    });
    eventRouter.routes.resolveEvent({handler: 'echo:handler'}, {
      done
    });
  });

  it('resolve modules on current working directory (not in baseDir)', () => {
    assert(_.isFunction(router.getRoute('index:call')));
  });

  it('getRoute with collect routeName', () => {
    assert(_.isFunction(router.getRoute('echo:handler')));
  });

  it('getRoute with incollect routeName', () => {
    assert(_.isUndefined(router.getRoute('echo:hello')));
  });

  it('setRoute with name', () => {
    router.setRoute('setRoute:hello', {
      module: 'echo',
      action: 'handler'
    });
    assert(_.isFunction(router.getRoute('echo:handler')));
  });

  it('setRoute without name', () => {
    router.setRoute({
      module: 'echo',
      action: 'hello'
    });
    assert(_.isFunction(router.getRoute('echo:hello')));
  });

  it('setRoute by handler', () => {
    router.setRoute({
      name: 'directRoute',
      handler: (event, context) => {
        return context.done(null, true);
      }
    });
    assert(_.isFunction(router.getRoute('directRoute')));
  });

  it('setRoute by handler without name', () => {
    try {
      router.setRoute({
        handler: (event, context) => {
          return context.done(null, true);
        }
      });
    } catch (e) {
      assert.ok(true);
      return ;
    }
    assert.fail('expects occurring Error but never thrown');
  });

  it('setRoute by handler with name', () => {
    router.setRoute('directRoute', {
      handler: (event, context) => {
        return context.done(null, true);
      }
    });
    assert(_.isFunction(router.getRoute('directRoute')));
  });

  it('setRoute by invalid handler', () => {
    try {
      router.setRoute('directRoute', {
        handler: 'not a function',
      });
    } catch (e) {
      assert.ok(true);
      return ;
    }
    assert.fail('expects occurring Error but never thrown');
  });


  it('setRoute after changing baseDir', () => {
    router.baseDir = '';
    try {
      router.setRoute({
        module: 'echo',
        action: 'hello'
      });
    } catch (e) {
      assert.ok(true);
      return ;
    }
    assert.fail('expects occurring Error but never thrown');
  });
});
