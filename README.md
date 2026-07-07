# Angular Components

A basic Angular application that fetches a list of items from a service and displays them.

## Features

- **ItemService** simulates an async fetch (with artificial network delay) and returns
  an `Observable<Item[]>`, mirroring how a real `HttpClient` call would behave.
- **ItemListComponent** subscribes to the service and handles three states: loading,
  error, and success (plus an empty-list state), with a Retry button on error.
- Error handling: set `itemService.simulateError = true` to see the error UI, or use
  it as a hook for wiring up a real failing API call.
- Unit tests included (`item-list.component.spec.ts`) covering success and error paths.

## Getting started

```bash
npm install
npm start
```

Then open http://localhost:4200.

## Running tests

```bash
npm test
```
