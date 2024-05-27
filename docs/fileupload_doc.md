# File Uploading Module

## Endpoint

```bash
Title : Upload Files to File Drive
URL :https://ice-dev.bio.pune.cdac.in/storage/upload/ + {folderpath}
Service : storage/storage-service/normal-upload.service.ts
Request : POST 
```

## Normal file upload accompanied by Multipart uploads using pre-signed URLs

### Normal upload looks like this:

#### With pre-signed URLs, we should add one more stage: generating pre-signed URLs for each part. The final process looks like this:

1. Initiate a upload

2. Create pre-signed URLs for each object

3. Upload the object

4. Complete upload

### Multipart upload looks like this:

1. Initiate a multipart upload

2. Create pre-signed URLs for each part

3. Upload the object’s parts

4. Complete multipart upload

Stages 1,2, and 4 are server-side stages, which require an AWS access key id & secret, where stage number 3 is client-side.

## ng2-file-upload

```bash
Usage
npm i ng2-file-upload
import { FileUploadModule } from 'ng2-file-upload';
```

## is-online

```bash
Check if the internet connection is up
```

Works in Node.js and the browser (with a bundler).

In the browser, there is already navigator.onLine, but it's useless as it only tells you if there's a local connection, and not whether the internet is accessible.

#### Install

```bash
npm install is-online
```

#### Usage

```bash
import isOnline from 'is-online';

console.log(await isOnline());
```

## File Select API and File Drop API

### Properties

uploader - (FileUploader)-uploader object.

### Events

1. ng2FileSelect - fires when files are selected and added to the uploader queue
2. ng2FileDrop -fires when files are drag and drop to the uploader queue.

### Testing

Testing of file upload on

1. Disconnecting the internet
2. Removing LAN

[Back](README.md)
