A comprehensive REST API for managing school operations including students, courses, departments, instructors, and enrollments with JWT-based authentication and role-based access control.

Prerequisites
* .NET 10.0 SDK or later
* SQL Server (or compatible database)
* Visual Studio Code or Visual Studio


Setup Instructions
* Run dotnet ef database update to apply migrations
* Run dotnet run to start the application


Technologies Used
ASP.NET Core 10.0 - A modern, high-performance web framework for building cloud-based applications with built-in dependency injection, middleware support, and security features.

C# (.NET) - A statically-typed, modern programming language with strong type safety, async/await support, and LINQ for data queries.

Entity Framework Core - An Object-Relational Mapping (ORM) framework that simplifies database operations by allowing developers to work with data using C# objects instead of raw SQL queries.

SQL Server - A robust relational database management system providing ACID compliance, transaction support, and scalability for enterprise applications.

JWT (JSON Web Tokens) - A stateless authentication mechanism that securely transmits claims between client and server using digitally signed tokens.

Role-Based Access Control (RBAC) - An authorization pattern that restricts API endpoint access based on user roles (Admin, Instructor, Student).

RESTful API - An architectural style using HTTP methods (GET, POST, PUT, DELETE) and standard status codes to perform operations on resources.


Why HTTP-Only Cookies Are an Industry Standard for Authentication

# Key Security Advantages

* Protection Against XSS (Cross-Site Scripting)

HTTP-only cookies cannot be accessed by JavaScript, preventing malicious scripts from stealing tokens
JWT tokens in localStorage are vulnerable to XSS attacks since JavaScript can read them

* Automatic Transmission

HTTP-only cookies are automatically sent with every HTTP request to the same domain
Developers don't need to manually attach tokens to headers
Reduces accidental authentication failures

* CSRF Protection

Works with CSRF tokens for protection against Cross-Site Request Forgery
The SameSite attribute prevents cookies from being sent in cross-site requests

* Reduced Token Exposure

Since cookies are handled by the browser automatically, the token is never exposed to JavaScript
Decreases attack surface compared to storing sensitive data in memory or localStorage

* Better Session Management

Servers can invalidate sessions immediately by removing cookies
More control over the authentication lifecycle
