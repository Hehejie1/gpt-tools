export const triggerEvent = (element: any, type: string) => {
  element.dispatchEvent(
    new Event(type, {
      bubbles: true,
      cancelable: true,
    })
  );
};
