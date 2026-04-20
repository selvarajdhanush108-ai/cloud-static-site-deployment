# React Website Deployment on AWS using Terraform

## Overview

This project demonstrates how to deploy a React-based frontend application on AWS using Terraform as Infrastructure as Code (IaC). The application is hosted using Amazon S3 static website hosting, while Terraform is used to provision and manage all required cloud resources.

The goal of this project is to showcase practical knowledge of cloud deployment, infrastructure automation, and frontend hosting on AWS.

---

## Technologies Used

- React
- Terraform
- AWS S3
- AWS CLI
- GitHub

---

## Architecture

React Application → Production Build Files → Amazon S3 Static Website Hosting

Terraform provisions and manages:

- S3 Bucket
- Static Website Hosting Configuration
- Public Access Settings
- Bucket Policy for Public Read Access

---

## Features

- Infrastructure provisioned using Terraform
- Low-cost static website hosting on AWS
- Reproducible and version-controlled infrastructure
- Simple and scalable frontend deployment
- Clean project structure for collaboration and maintenance

---
### Live URL

- http://coduxdotfun-bucket-20-04-2026.s3-website.ap-south-1.amazonaws.com/

---

## Project Structure

```text
react-website-aws-terraform/
├── app/
│   ├── src/
│   ├── public/
│   ├── package.json
│   └── ...
├── terraform/
│   ├── main.tf
│   ├── variables.tf
│   ├── outputs.tf
│   └── .terraform.lock.hcl
├── README.md
└── .gitignore
