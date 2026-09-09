import { cloneElement, isValidElement, type ReactElement, type ReactNode, type Ref } from 'react';

type UnknownProps = Record<string, unknown>;

/**
 * Compose two refs into one, so a subcomponent can attach its own ref to a
 * child that already carries the consumer's.
 */
export function mergeRefs<T>(...refs: Array<Ref<T> | undefined>): Ref<T> {
  return (value: T | null) => {
    for (const ref of refs) {
      if (typeof ref === 'function') {
        ref(value);
      } else if (ref && typeof ref === 'object') {
        (ref as { current: T | null }).current = value;
      }
    }
  };
}

/**
 * Shared implementation of the `asChild` pattern.
 *
 * Renders `children` in place of the component's own element, merging our props
 * into it rather than replacing them:
 *
 * - `className` is concatenated, the child's first.
 * - Every `on*` handler is composed: the child's runs first, and ours is skipped
 *   if the child called `preventDefault()`. Passing an `onClick` to the child
 *   therefore augments the behaviour instead of silently replacing it.
 * - Refs are merged, so a component that needs its own ref (ModalContent's focus
 *   trap, for instance) does not clobber one the consumer supplied.
 *
 * @param displayName Used in the error message, e.g. 'Modal.Body'.
 */
export function renderAsChild(
  displayName: string,
  children: ReactNode,
  props: UnknownProps,
  ref?: Ref<unknown>,
): ReactElement {
  if (!isValidElement(children)) {
    throw new Error(`${displayName}: asChild requires a single valid React element as children`);
  }

  const child = children as ReactElement<UnknownProps & { ref?: Ref<unknown> }>;
  const childProps = child.props;
  const merged: UnknownProps = { ...props };

  if (typeof props.className === 'string' || typeof childProps.className === 'string') {
    merged.className = [childProps.className, props.className].filter(Boolean).join(' ');
  }

  for (const [key, ours] of Object.entries(props)) {
    if (!key.startsWith('on') || typeof ours !== 'function') continue;
    const theirs = childProps[key];
    if (typeof theirs !== 'function') continue;

    merged[key] = (event: unknown, ...rest: unknown[]) => {
      (theirs as (...args: unknown[]) => void)(event, ...rest);
      const prevented = (event as { defaultPrevented?: boolean } | null)?.defaultPrevented;
      if (!prevented) {
        (ours as (...args: unknown[]) => void)(event, ...rest);
      }
    };
  }

  if (ref) {
    merged.ref = mergeRefs(ref, childProps.ref);
  }

  return cloneElement(child, merged);
}
