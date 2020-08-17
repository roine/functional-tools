import * as React from "react";

/**
 * Combines multiple functions and passes the result from one to the next.
 * Useful to extend components with multiple functions. For example:
 *
 * ```ts
 * const ComposedComponent = compose(withRouter, withFormik)(MyComponent);
 * ```
 */
export const compose = (...fns: any[]) => (Component: any) =>
  fns.reduceRight((accComponent: React.ReactElement | null, fn: any) => fn(accComponent), Component);
