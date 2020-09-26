import React from 'react';

const getScrollPosition = (ref) => {
  if (typeof ref.scrollY === 'number') {
    return ref.innerHeight + ref.scrollY;
  }
  return ref.scrollTop + ref.offsetHeight;
};

export default function makeInfiniteScroll(options = {}) {
  const { offset = 100, disableDefaultTarget = false } = options;

  return function useInfiniteScroll(options = {}) {
    const defaultTarget = typeof window !== 'undefined' ? window : null;
    const isBrowser = typeof document !== 'undefined';
    const defaultScrollHeight = isBrowser ? document.body.scrollHeight : null;
    const {
      target = !disableDefaultTarget ? defaultTarget : undefined,
      scrollHeight = !disableDefaultTarget ? defaultScrollHeight : undefined,
      defaultPage = 0,
      isLoading,
      maxPage,
    } = options;
    const [page, setPage] = React.useState(defaultPage);

    const handleScroll = React.useCallback(() => {
      if (isLoading) return;
      if (getScrollPosition(target) + offset >= scrollHeight) {
        setPage((value) => {
          const nextPage = value + 1;
          if (nextPage > maxPage) return value;
          return nextPage;
        });
      }
    }, [isLoading, maxPage, scrollHeight, target]);

    React.useEffect(() => {
      if (typeof target === 'undefined' || typeof scrollHeight === 'undefined')
        return;
      /**
       * Event listener will resubscribe every time when arguments change.
       * And this can avoid subscribe multiple listeners.
       */
      target.addEventListener('scroll', handleScroll);
      return () => {
        target.removeEventListener('scroll', handleScroll);
      };
    }, [handleScroll, scrollHeight, target]);

    return [page, setPage];
  };
}
