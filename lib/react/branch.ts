import * as React from "react";

/**
 * Render left (https://hackage.haskell.org/package/base-4.12.0.0/docs/Data-Either.html) component
 * when test is true otherwise render the right component (main component)
 * branch(({someProp}) => someProp === "otherValue", RenderOtherComponent)(MainComponent)
 *
 * This can be used with compose
 * compose(
 *   branch(({someProp}) => someProp === "otherValue", RenderOtherComponent)
 *   branch(({someProp}) => someProp === "value1", RenderComponent1)
 *   )
 *   (MainComponent)
 *
 *   Second branch wont execute if first branch is entered
 */
export const branch = <Props extends {}>(testFn: (props: Props) => boolean, ComponentLeft: any) => (Component: any) => {
  let leftFactory: React.HTMLFactory<any>;
  let defaultFactory: React.HTMLFactory<any>;

  return (props: Props) => {
    if (testFn(props)) {
      leftFactory = leftFactory || React.createFactory(ComponentLeft);
      return leftFactory(props);
    } else {
      defaultFactory = defaultFactory || React.createFactory(Component);
      return defaultFactory(props);
    }
  };
};
