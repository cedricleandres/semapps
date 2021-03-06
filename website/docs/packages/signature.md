---
title: HTTP & LD Signature
---

This service implements the [HTTP Signature](https://tools.ietf.org/html/draft-cavage-http-signatures-12) and [Linked Data Signature](https://ldapwiki.com/wiki/Linked%20Data%20Signatures) protocols, which allow to send messages in a secure way between servers. It is used in particular with the [ActivityPub](activitypub.md) federation mechanism.

## Features

- Generate actors key pair
- Sign and verify HTTP signature
- Build and verify HTTP digest
- Sign and verify LD signature (not implemented yet)

## Dependencies

- None

## Install

```bash
$ npm install @semapps/signature --save
```

## Usage

```js
const { SignatureService } = require('@semapps/signature');
const path = require('path');

module.exports = {
  mixins: [SignatureService],
  settings: {
    actorsKeyPairsDir: path.resolve(__dirname, '../actors')
  }
}
```

Optionally, you can configure the API routes with moleculer-web:

```js
const { ApiGatewayService } = require('moleculer-web');

module.exports = {
  mixins: [ApiGatewayService],
  dependencies: ['signature'],
  async started() {
    [
      ...(await this.broker.call('signature.getApiRoutes')),
      // Other routes here...
    ].forEach(route => this.addRoute(route));
  }
}
```

## Settings

| Property | Type | Default | Description |
| -------- | ---- | ------- | ----------- |
| `actorsKeyPairsDir` | `String` | **required** | Path to where the actor's key pair will be stored. |


### `generateActorKeyPair`

##### Parameters
| Property | Type | Default | Description |
| -------- | ---- | ------- | ----------- |
| `actorUri` | `String` | **required** | URI of the actor for which will generate the key pairs |

##### Return
`String` - The generated public key.


### `generateSignatureHeaders`

##### Parameters
| Property | Type | Default | Description |
| -------- | ---- | ------- | ----------- |
| `url` | `String` | **required** | URL where the data will be sent |
| `body` | `String` | **required** | Data to be sent. This is used to build the Digest string. If it is JSON, it must be stringified |
| `actorUri` | `String` | **required** | URI of the actor for which will generate the signature |

##### Return
`Object` - HTTP headers with `Date`, `Digest` and `Signature` properties.


### `verifyDigest`

##### Parameters
| Property | Type | Default | Description |
| -------- | ---- | ------- | ----------- |
| `headers` | `Object` | **required** | Headers of the message (with or without a `Digest` property) |
| `body` | `String` | **required** | Data to the message. If it is JSON, it must be stringified |

##### Return
`String` - The generated public key.


### `verifyHttpSignature`

Fetch remote actor's public key and verify that the signature in the headers has been generated by this actor.

##### Parameters
| Property | Type | Default | Description |
| -------- | ---- | ------- | ----------- |
| `url` | `String` | **required** | URL where the message has been received |
| `headers` | `Object` | **required** | Headers of the message received |

##### Return
`Boolean` - True if HTTP signature is verified.
