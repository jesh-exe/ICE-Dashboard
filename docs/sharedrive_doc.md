# Shared Drive Module

## Endpoint

```bash
Title : Listing Files shared by users to owner
URL :https://ice-dev.bio.pune.cdac.in/storage/sharedwithme
Service : storage/storage-service/file-share.service.ts
Request : GET 
```
```bash
Title : Sharing the files with user
URL: https://ice-dev.bio.pune.cdac.in/share/files
Service : storage/storage-service/file-share.service.ts
Request : GET
```

```bash
Title : Get file by fileId
URL: https://ice-dev.bio.pune.cdac.in/share/fileById
Service : storage/storage-service/file-share.service.ts
Request : GET
```

```bash
Title : Get list of all username who have shared their files with owner
URL: https://ice-dev.bio.pune.cdac.in/share/sharedwithmegetlist
Service : storage/storage-service/file-share.service.ts
Request : GET
```

```bash
Title : Get list of all files inside directory who have shared their files with owner
URL: https://ice-dev.bio.pune.cdac.in/storage/sharedwithme/list/
Service : storage/storage-service/file-share.service.ts
Request : GET
```