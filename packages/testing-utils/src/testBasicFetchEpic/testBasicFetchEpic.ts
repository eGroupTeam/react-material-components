import { TestScheduler } from 'rxjs/testing';

/**
 * A testing util for marble test.
 */
function testBasicFetchEpic({ api, epic, expect: _expect, dependencies }) {
  const testScheduler = new TestScheduler((actual, expected) => {
    expect(actual).toEqual(expected);
  });
  testScheduler.run((args) => {
    const { hot } = args;
    const action$ = hot('-a', {
      a: api(),
    });
    const state$ = null;
    const output$ = epic(action$, state$, dependencies(args));

    _expect({ output$, ...args });
  });
}

export default testBasicFetchEpic;
