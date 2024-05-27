# File Drive Module

## Endpoints

```bash
Title: Get list of files
Url: https://ice-dev.bio.pune.cdac.in/storage/list/
Call: storage/storage-service/file-list.service.ts
Request: GET
```

```bash
Title: list of files inside folders
Url: passing fileDownloadUrl
Call: storage/storage-service/file-list.service.ts
Request: GET
```

```bash
Title: Creating a new folder in file drive
Url: https://ice-dev.bio.pune.cdac.in/storage/create/ + folder,{headers: httpheader}
Call: storage/storage-service/normal-upload.service.ts
Request: PUT
```

```bash
Title: list of people with owner has shared files
Url: https://ice-dev.bio.pune.cdac.in/share/sharedbymegetlist
Call: storage/storage-service/normal-upload.service.ts
Request: GET
```

```bash
Title: All files list shared by owner
Url: https://ice-dev.bio.pune.cdac.in/storage/sharedbyme
Call: storage/storage-service/normal-upload.service.ts
Request: GET
```

```bash
List of files shared (user name wise)
Url: https://ice-dev.bio.pune.cdac.in/storage/sharedbyme + /user
Call: storage/storage-service/normal-upload.service.ts
Request: GET
```

## File Item

```bash
Title: To fetch the shared file details
Url: https://ice-dev.bio.pune.cdac.in/share/fileById + fileId
Call: storage/storage-service/file-share.service.ts
Request: GET
```

```bash
To upload file share details
Url: https://ice-dev.bio.pune.cdac.in/share/files + details
Call: storage/storage-service/file-share.service.ts
Request: POST
```

```bash
Delete file
Url: https://ice-dev.bio.pune.cdac.in/storage/delete/ + fileName
Call: storage/storage-service/file-list.service.ts
Request: DELETE
```

```bash
TO get the metadata properties(Properties Bar)
Url: https://ice-dev.bio.pune.cdac.in/storage/metadata/ + key
Call: storage/storage-service/normal-upload.service.ts
Request: GET
```

```bash
Extension that are allowed to upload
Url: https://ice-dev.bio.pune.cdac.in/storage/accepted-extensions
Call: storage/storage-service/normal-upload.service.ts
Request: GET
```

## Material Icon

```bash
Usage
ng add @angular/material
import { MatIconModule } from '@angular/material/icon';
```

### Properties

Service to register and display icons used by the <mat-icon> component.

## Cdk Overlay

```bash
Usage
npm i @angular/cdk
import { OverlayModule } from '@angular/cdk/overlay';
```

### Properties

Service to create Overlays. Overlays are dynamically added pieces of floating UI, meant to be used as a low-level building block for other components.Menu's is built using overlay.

## Sweet Alert

```bash
Usage
npm i sweetalert2
import Swal from 'sweetalert2/dist/sweetalert2.js';
```

### Properties

A beautiful, responsive, customizable, accessible (WAI-ARIA) replacement for JavaScript's popup boxes.

[Back](README.md)
