# 🚀 Designli Nest Challenge

> **A powerful, feature-rich API built with NestJS for data mapping and email parsing.**

This project serves as a robust backend application leveraging the **NestJS** framework to provide distinct functionalities for data transformation and email content extraction.

---

## ✨ Key Features

This API is built on the foundation of **NestJS**, a progressive Node.js framework for building efficient, reliable, and scalable server-side applications. It combines elements of **OOP (Object Oriented Programming)**, **FP (Functional Programming)**, and **FRP (Functional Reactive Programming)**.

Key features of this project include:

* **NestJS Architecture:** Structured, modular, and enterprise-grade architecture using **TypeScript**.
* **Two Specialized Modules:** Dedicated modules for `Mapper` and `MailParser` functionalities.
* **Comprehensive Testing:** Integrated with **Jest** for unit and entity testing.
* **API Documentation:** Self-documented with **Swagger** for interactive exploration.
* **Easy Integration:** Includes a **Postman Collection** for quick setup and testing.

---

## 📦 Modules & Endpoints

### 1. Mapper Module

This module provides a core service for transforming JSON data from one source structure into a final, desired structure based on predefined mapping rules.

| Method | Endpoint | Description |
| :--- | :--- | :--- |
| **POST** | `/mapper` | Transforms a source JSON payload into a target JSON structure via mapping logic. |

### 2. MailParser Module

This module is designed to read and parse the content of an email file (`.eml`), specifically extracting any embedded JSON data found within the email body.

| Method | Endpoint | Description |
| :--- | :--- | :--- |
| **GET** | `/mail-parser` | Reads and parses an email file (local or remote URL) to extract a list of JSON objects found within the content. |

| Parameter | Type | Required | Description |
| :--- | :--- | :--- | :--- |
| **path** | `Query Parameter` | Yes | The URL pointing to an `.eml` file or a simple HTTP URL to read the email content from online. |

**Example Request:**
`GET {{BaseURL}}/mail-parser?path=https://example.com/some-email.eml`

---

## 🛠️ Developer Tools and Documentation

### 🧪 Testing with Jest

The project is configured with **Jest** for writing and running test suites, including:

* **Unit Tests** for individual classes, services, and logic.
* **Entity Tests** for core data models and business rules.

Run all tests using the following command:

# Execute all test suites
$ npm run test

### 📋 Postman Collection

A Postman Collection is provided to allow developers and QA professionals to easily test and validate all API endpoints.

### 📖 API Documentation (Swagger)

The API is fully documented using Swagger (OpenAPI), which provides an interactive UI for exploring endpoints, data models, request bodies, and responses.

Access the documentation by navigating to: {{BaseURL}}/api

Note: Replace $\text{\{BaseURL\}}$ with the host and port of your running NestJS application (e.g., http://localhost:3000).