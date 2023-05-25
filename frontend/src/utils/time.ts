export const useTimeout = (fn: Function, timeout?: number) => {
  const timer = setTimeout(() => {
    clearTimeout(timer);
    fn();
  }, timeout || 0);
};
