## Endpoint

```bash
Title: Get whole list of metadata
Url: https://ice-dev.bio.pune.cdac.in/storage/getfiles
call: file-list.service
Request: GET
```

```bash
Title: Get List of metadata of specific user
Url: https://ice-dev.bio.pune.cdac.in/storage/getMetadataList
call: file-list.service
Request: GET
```

```bash
Title: Get Save metadata to database
Url: https://ice-dev.bio.pune.cdac.in/storage/save
call: file-list.service
Request: POST
```

```bash
Title:  Get metadata by metadataId
Url: https://ice-dev.bio.pune.cdac.in/storage/getMetadata
call: file-list.service
Request: GET
```

```bash
Title: Get Update metadata
Url: https://ice-dev.bio.pune.cdac.in/storage/update
call: file-list.service
Request: PUT
```

```bash
Title: Search metadata by username
Url: https://ice-dev.bio.pune.cdac.in/storage/searchByUsername
call: file-list.service
Request: GET
```

```bash
Title: Delete metadata by fileMetadataId
Url: https://ice-dev.bio.pune.cdac.in/storage/deleteMetadata
call: file-list.service
Request: DELETE
```

```bash
Title:  Get metadata list by file extension
Url: https://ice-dev.bio.pune.cdac.in/storage/getMetadataByExt
call: file-list.service
Request: GET
```

```bash
Title:  Get metadata list by file size range
Url: https://ice-dev.bio.pune.cdac.in/storage/getMetadataBySizeRange
call: file-list.service
Request: GET
```

```bash
Title:  Get metadata list by multiple filters such as "fileSize range", "extension", and "metadatakey"
Url: https://ice-dev.bio.pune.cdac.in/storage/getMetadataByFilters
call: storage/storage-service/file-upload.service.ts
Request: GET
```

```bash
Title:  Get metadata list by metadata value
Url: https://ice-dev.bio.pune.cdac.in/storage/getMetadataByValue/{value}
call: storage/storage-service/normal-upload.service.ts
Request: GET
```
