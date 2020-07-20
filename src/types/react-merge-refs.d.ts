declare module 'react-merge-refs' {
  type AnyRef<T> = ((instance: T | null) => void) | MutableRefObject<T | null>;
  function mergeRefs<T extends AnyRef<T>>(refs: T[]): RefObject<T>;

  export = mergeRefs;
}
