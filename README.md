# nfllook-tools-schedule
Download, clean and export NFL schedule

## Prerequisites:
1. AWS account
2. node.js
3. Serverless Framework
4. https://serverless.com/framework/docs/providers/aws/guide/credentials/

## Deploy AWS lambda functions
npm install

sls deploy

## Invoke download function
sls invoke local --function download
