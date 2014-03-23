Node.js S3 Upload 
=================

## Introduction

Example application built using node.js and express to upload files
directly to S3.

## To Run

```term
$ npm install
$ foreman start
```

The config vars are set using foreman so you need to create a .env file within the project directory. The structure of the .env file is as follows:

```
AWS_ACCESS_KEY=<my access key>
AWS_SECRET_KEY=<my secret key>
S3_BUCKET=<s3 bucket name>

```