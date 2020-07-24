export function filterEventHandlers(props: Record<string, any>): Record<string, any> {
  const filteredProps: Record<string, any> = {};

  for (const key in props) {
    // Chain events
    if (/^on[A-Z]/.test(key) && typeof props[key] === 'function') {
      filteredProps[key] = props[key];
    }
  }

  return filteredProps;
}
