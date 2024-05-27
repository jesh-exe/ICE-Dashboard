[![Build Status](https://drone.bio.pune.cdac.in/api/badges/sandeep/ice-ui-service/status.svg?ref=refs/heads/development)](https://drone.bio.pune.cdac.in/sandeep/ice-ui-service)

# Development Setup

## Install The Node 16.x version

## Install Angular

```bash
    cd $HOME
    npm install -g @angular/cli
```

## Build the application using

```bash
    cd {project-directory}
    npm install
```

## Run the Application using

```bash
    cd {project-directory}

    ng serve --host 0.0.0.0 --port 4200
    OR
    ng build


```

## Run in the browser

```bash
    http://localhost:4200/
```

<!-- # ice - Angular Admin Template

This project was generated with [Angular CLI](https://github.com/angular/angular-cli). -->

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.

<!-- ## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`. -->

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory. Use the `--prod` flag for a production build.

<!--
## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io). -->

## Running end-to-end tests

<!-- Run `ng e2e` to execute the end-to-end tests via [Protractor](http://www.protractortest.org/). -->

Install OpenJDK 8

Katalon Studio for Linux currently supports OpenJDK 8 only.

To install OpenJDK 8 on your Ubuntu, open your Terminal. On the command line, type:

```bash
sudo apt-get install openjdk-8-jre
```

For more detailed info [Katalon Studio](docs/katalon_doc.md)

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI README](https://github.com/angular/angular-cli/blob/master/README.md).

## Details

# To get more detailed info go check out the [Documentation](docs/README.md)

# ice-ui-service

# Updated by Sandeep

# Themes for Keycloak

```bash
kubectl cp themes/ice keycloak-0:/opt/bitnami/keycloak/themes/ -n ice-apps
```

## Without ssl

```bash
ng serve
npm run start
```

## With SSl run

```bash
ng serve --ssl --configuration ssl
npm run start-ssl
```

## Production build without ssl

```bash
ng build --configuration prod
npm run build:prod

ng serve --configuration prod
npm run build:prod-ssl

```

## Prodcution build with ssl

```bash
ng build --configuration production-ssl --ssl
ng serve --configuration production-ssl --ssl
```

## Installation Steps

# [Steps](docs/Installation_Steps.pdf)

## Full version

```bash
sudo docker run -p 80:80 -d hub.bio.pune.cdac.in/dbt/ice-ui-full
```
