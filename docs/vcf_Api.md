# Vcf Module API

## VCF-ANALYSIS

Service : vcf/vcf-service/vcf.service.ts

### 1. Collections

```bash
GET:--/vcf-analysis/
```

#### Description

Get all collection name i.e User file that are uploaded in mongoDB Database using upload functionally.

### 2. Sample List

```bash
GET:--/vcf-analysis/{selectedCollection}
```

#### Description

Get all sample && list of Chromosomes present in vcf file uploaded in mongoDB Database.

### 3. SNP Analysis

```bash
POST:--/vcf-analysis/snp
```

#### Description

VCF SNP Service is called through resquest body:
{"from":1,"to":5000000,"collection":"gih_ABCB1.vcf","set1":["NA20845","NA20847","NA20849"],"set2":["NA20850","NA20851"],"chromosome":"chr7"}

### 4. Variant Prioritization

```bash
1. GET:--/vcf-analysis/info/{selectedCollection}
2. POST:--/vcf-analysis/info/TAGByCondition
```

#### Description

1. To get info tags
2. Filter By Condition is called through resquest body:
   {"description":"describe","analysisName":"PallaviTestingForAPI","collection":"gih_ABCB1.vcf","parameters":[{"key":"AF","operator":"gte","value":"54"}],"outputfileformat":"vcf"}

### 5. Filter By Info Tags

```bash
1. GET:--/vcf-analysis/info/{selectedCollection}
2. POST:--/vcf-analysis/info/TAG
```

#### Description

1. To get info tags
2. Get VCF FilterByInfoTags is called through resquest body:{"analysisName":"pallavitestingFilterbyInfotags","collection":"gih_ABCB1.vcf","infotags":["ANN","AFR_AF","AMR_AF","SAS_AF","EAS_AF"],"outputExtension":"vcf","calculatetags":[],"description":"Describe"}

### 6. Custom Population

```bash
1. GET:--/vcf-analysis/checkGT/{selectedCollection}
2. GET:--/vcf-analysis/checkDP/{selectedCollection}
3. POST:--/vcf-analysis/process/CustomePopTAG
```

#### Description

1. To check if the file conatins GT Value For calcuation
2. To check if the file conatins DP Value For calcuation
3. Get VCF CustomPopulation is called through resquest body:{"description":"describe","analysisName":"pallaviCustomAnalysis","collection":"gih_ABCB1.vcf","calculatetags":["AC","DP"],"popcode":{ "pop1": [ "NA20845", "NA20903", "NA20849" ], "pop2": [ "NA20906", "NA21113" ] },"outputExtension":"vcf"}

### 7. Functional Annotation Filter

```bash

1. POST:--/vcf-analysis/ann
```

#### Description

1. Get Functional Annotation is called through resquest body: {"analysisName":"PallaviFunctionalAnnotation","collection":"gih_ABCB1.vcf","faValue":"intragenic_variant","outputfileformat":"vcf","description":"Describe"}

### 8. Set Analysis On Population

```bash
1. GET:--/vcf-analysis/checkGT/{selectedCollection}
2. POST:--/vcf-analysis/common
```

#### Description

1. To check if the file conatins GT Value For calcuation
2. Get SetAnalysisOnPopulation is called through resquest body: {"description":"Describe","analysisName":"SetAnalysis","collection":"gih_ABCB1.vcf","popcode":{ "pop1": [ "NA20845", "NA20903", "NA20849" ], "pop2": [ "NA20906", "NA21113" ] },"outputExtension":"vcf"}

## VCF_UPLOAD

Service : vcf/vcf-service/vcf.service.ts

### 1. Submit File for Loading into mongoDB

```bash
POST:--/vcf-upoad/process/{selectedCollection}
```

#### Description

Get submitLoadingData is called through resquest body: { vcfFile:string; gtfFile:string;}

## STORAGE

Service : vcf/vcf-service/vcf.service.ts

### 1. Submit File for Loading into mongoDB

```bash
GET:--/storage/getMetadataByExt/{ext}
```

#### Description

Get File list Through Metadata Via Storage is called

[Back](README.md)
