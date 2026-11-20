![@tsdotnet/lazy: Create it when it’s needed. Then keep it: Lazy&lt;T&gt;, like .NET’s.](https://cdn.jsdelivr.net/gh/tsdotnet/lazy@master/assets/banner.svg)

[![npm version](https://img.shields.io/npm/v/@tsdotnet/lazy.svg?style=flat-square)](https://www.npmjs.com/package/@tsdotnet/lazy)
[![GitHub license](https://img.shields.io/badge/license-MIT-blue.svg?style=flat-square)](https://github.com/tsdotnet/lazy/blob/master/LICENSE)

`Lazy<T>` creates a value on first use and keeps it, like .NET's `Lazy<T>`.

## Install

```sh
npm install @tsdotnet/lazy
```

## Usage

```ts
import { Lazy } from '@tsdotnet/lazy';

const config = new Lazy(() => loadConfig()); // nothing runs yet
config.value; // loadConfig() runs here, once
config.value; // same value, no second call
```

Need to recreate it later? Use `ResettableLazy`; its `tryReset()` clears the value.

## Use it from

ESM (`import { Lazy } from '@tsdotnet/lazy';`) or CommonJS (`const { Lazy } = require('@tsdotnet/lazy');`).

<details><summary>In a browser, without a bundler</summary>

```html
<script src="https://cdn.jsdelivr.net/npm/@tsdotnet/disposable@2/dist/umd/disposable.min.js"></script>
<script src="https://cdn.jsdelivr.net/npm/@tsdotnet/lazy@2/dist/umd/lazy.min.js"></script>
<script>
  const { Lazy } = tsdotnet.lazy;
</script>
```

</details>

## Docs

[tsdotnet.github.io/lazy](https://tsdotnet.github.io/lazy/)
