// FNS

export { default as curry } from "./lib/curry";
export { default as uncurry } from "./lib/uncurry";
export { default as compose } from "./lib/compose";

// TYPES

import * as RemoteData from "./lib/types/remoteData";
import * as Maybe from "./lib/types/maybe";
export { RemoteData, Maybe };

// REACT

export { default as ReactBranch } from "./lib/react/branch";
export { default as ReactCompose } from "./lib/react/compose";
