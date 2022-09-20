# BaseApiService

BaseApiService is designed to simplify API calls for you. It stores the api base url for you, authenticates silently, and adds tracking.

# Getting started

For each resource you want to use, you need to create a new BaseApiService instance.

```tsx
import { BaseApiService } from 'mad-expo-core';

const commonResource = envConfig.Resources.common as Resource;
const payslipResource = envConfig.Resources.payslip as Resource;

const commonApi = new BaseApiService(commonResource);
const payslipApi = new BaseApiService(payslipResource);
```

resources are expected to contain `apiBaseUrl` and `scopes`. `subscriptionKey` is optional, but will automatically be added to the header if it exists. The expected type is found below:

```tsx
type BaseResource = {
  scopes: string[];
  apiBaseUrl: string;
  subscriptionKey?: string;
};
```

## Usage

**Get**

```tsx
const api = new BaseApiService(resource);

function getDataFromEndpoint() {
  return api.get('/endpoint').then((res) => res.data);
}

// You can also disable authentication, and add extra headers
function getDataFromEndpoint2() {
  return api
    .get('/endpoint', {
      authenticate: false,
      headers: {
        /*insert headers*/
      },
    })
    .then((res) => res.data);
}
```

**Post**

```tsx
const api = new BaseApiService(resource);

function postDataToEndpoint(payload) {
  return api.post('/endpoint', payload).then((res) => res.data);
}

// You can also disable authentication, and add extra headers
function postDataToEndpoint2(payload) {
  return api
    .post('/endpoint', payload, {
      authenticate: false,
      headers: {
        /*insert headers*/
      },
    })
    .then((res) => res.data);
}
```

**Put**

```tsx
const api = new BaseApiService(resource);

function putDataToEndpoint(payload) {
  return api.put('/endpoint', payload).then((res) => res.data);
}

// You can also disable authentication, and add extra headers
function putDataToEndpoint2(payload) {
  return api
    .put('/endpoint', payload, {
      authenticate: false,
      headers: {
        /*insert headers*/
      },
    })
    .then((res) => res.data);
}
```

**Patch**

```tsx
const api = new BaseApiService(resource);

function patchDataToEndpoint(payload) {
  return api.patch('/endpoint', payload).then((res) => res.data);
}

// You can also disable authentication, and add extra headers
function patchDataToEndpoint2(payload) {
  return api
    .patch('/endpoint', payload, {
      authenticate: false,
      headers: {
        /*insert headers*/
      },
    })
    .then((res) => res.data);
}
```

**Delete**

```tsx
const api = new BaseApiService(resource);

function deleteData(payload?: unknown) {
  return api.delete('/endpoint', payload).then((res) => res.data);
}

// You can also disable authentication, and add extra headers
function deleteData2(payload?: unknown) {
  return api
    .delete('/endpoint', payload, {
      authenticate: false,
      headers: {
        /*insert headers*/
      },
    })
    .then((res) => res.data);
}
```

**Upload file**

_This method has not been tested properly and might not work as expected. If you find any issues with it, please create a new issue in the mad-expo-core repo!_

This method might not be useful on native devices, but should work on web.

```tsx
const api = new BaseApiService(resource);

function uploadFile(payload: unknown) {
  return api.uploadFile('/endpoint', payload).then((res) => res.data);
}

// You can also disable authentication, and add extra headers
function uploadFile2(payload: unknown) {
  return api
    .uploadFile('/endpoint', payload, {
      authenticate: false,
      headers: {
        /*insert headers*/
      },
    })
    .then((res) => res.data);
}
```

**Upload file from file system (expo-file-system implementation)**

_If you find any issues with it, please create a new issue in the mad-expo-core repo!_

```tsx
const api = new BaseApiService(resource);

function uploadFileFromFileSystem(fileUri: string, contentType: string) {
  return api
    .uploadFromFileSystem('/endpoint', fileUri, contentType)
    .then((res) => res.data);
}

// You can also disable authentication, and add extra headers
function uploadFileFromFileSystem2(fileUri: string, contentType: string) {
  return api
    .uploadFromFileSystem('/endpoint', fileUri, contentType, {
      authenticate: false,
      headers: {
        /*insert headers*/
      },
    })
    .then((res) => res.data);
}
```

**Download file to file system (expo-file-system implementation)**

_If you find any issues with it, please create a new issue in the mad-expo-core repo!_

This will return, among other things, a uri pointing to where the file was download to in the file system.

```tsx
const api = new BaseApiService(resource);

function downloadToFileSystem(fileName: string) {
  return api.downloadToFileSystem('/endpoint', fileName).then((res) => res.uri);
}

// You can also disable authentication, and add extra headers
function downloadToFileSystem2(fileName: string) {
  return api
    .uploadFromFileSystem('/endpoint', fileName, {
      authenticate: false,
      headers: {
        /*insert headers*/
      },
    })
    .then((res) => res.uri);
}
```
