{
  "version": "0.1.0",
  "license": "MIT",
  "main": "dist/index.js",
  "typings": "dist/index.d.ts",
  "files": [
    "dist",
    "src"
  ],
  "engines": {
    "node": ">=10"
  },
  "scripts": {
    "start": "tsdx watch",
    "build": "tsdx build",
    "test": "tsdx test",
    "lint": "tsdx lint",
    "prepare": "tsdx build",
    "size": "size-limit",
    "analyze": "size-limit --why"
  },
  "peerDependencies": {},
  "husky": {
    "hooks": {
      "pre-commit": "tsdx lint"
    }
  },
  "prettier": {
    "printWidth": 80,
    "semi": true,
    "singleQuote": true,
    "trailingComma": "es5"
  },
  "name": "shyft-js",
  "author": "impin2rex",
  "module": "dist/shyft-js.esm.js",
  "size-limit": [
    {
      "path": "dist/shyft-js.cjs.production.min.js",
      "limit": "10 KB"
    },
    {
      "path": "dist/shyft-js.esm.js",
      "limit": "10 KB"
    }
  ],
  "devDependencies": {
    "@size-limit/preset-small-lib": "^8.0.0",
    "husky": "^8.0.1",
    "size-limit": "^8.0.0",
    "tsdx": "^0.14.1",
    "tslib": "^2.4.0",
    "typescript": "^4.7.4"
  }
}
