import React from 'react';

function getScrollPosition(element) {
  const target = Boolean(element && element.current)
    ? element.current
    : document.body;
  const position = target.getBoundingClientRect();

  return { x: position.left, y: position.top };
}

/**
 * https://dev.to/n8tb1t/tracking-scroll-position-with-react-hooks-3bbj?signin=true
 * @param {*} effect
 * @param {*} deps
 * @param {*} element
 * @param {*} wait
 */
export default function useScrollPosition(effect, deps, element, wait) {
  const position = React.useRef(getScrollPosition(element));
  const { current: store } = React.useRef({
    prevPos: position.current,
    throttleTimeout: null,
  });

  const callBack = () => {
    const currPos = getScrollPosition(element);
    effect({ prevPos: store.prevPos, currPos, element });
    store.prevPos = currPos;
    store.throttleTimeout = null;
  };

  React.useLayoutEffect(() => {
    const handleScroll = () => {
      if (wait) {
        if (store.throttleTimeout === null) {
          store.throttleTimeout = setTimeout(callBack, wait);
        }
      } else {
        callBack();
      }
    };

    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
      if (store.throttleTimeout) {
        clearTimeout(store.throttleTimeout);
      }
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, deps);

  // excute callBack first when layout done
  React.useLayoutEffect(() => {
    callBack();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
}
