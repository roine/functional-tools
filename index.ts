// FNS

export { curry } from "./lib/curry";
export { uncurry } from "./lib/uncurry";
export { compose } from "./lib/compose";
import * as debug from "./lib/debug";
export { debug };

// TYPES

import * as RemoteData from "./lib/containers/remoteData";
import * as Maybe from "./lib/containers/maybe";
import * as Result from "./lib/containers/result";
export { RemoteData, Maybe, Result };

// REACT

export { branch as ReactBranch } from "./lib/react/branch";
export { compose as ReactCompose } from "./lib/react/compose";
