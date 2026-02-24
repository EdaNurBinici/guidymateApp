# Design Document: JobTrackr

## Overview

JobTrackr is a full-stack web application built with React, Express.js, and PostgreSQL that enables users to track their job applications through a complete lifecycle. The system follows a three-tier architecture with a React frontend, RESTful API backend, and PostgreSQL database. Authentication is handled via JWT tokens, and the application supports role-based access control for users and administrators.

The design emphasizes separation of concerns, with clear boundaries between the presentation layer (React), business logic layer (Express controllers and services), and data layer (PostgreSQL with proper schema design). The system is containerized using Docker for consistent deployment across environments.

## Architecture

### High-Level Architecture

```
┌─────────────────────────────────────────────────────────────┐
│                     Frontend (React + Vite)                  │
│  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐     │
│  │   Kanban     │  │    Table     │  │  Dashboard   │     │
│  │     View     │  │     View     │  │     View     │     │
│  └──────────────┘  └──────────────┘  └──────────────┘     │
│  ┌────────────────────────────────────────────────────┐    │
│  │         Context API (Auth + App State)             │    │
│  └────────────────────────────────────────────────────┘    │
└─────────────────────────────────────────────────────────────┘
                            │ HTTP/REST
                            ▼
┌─────────────────────────────────────────────────────────────┐
│                Backend (Express.js + Node.js)                │
│  ┌──────────────────────────────────────────────────────┐  │
│  │              Middleware Layer                         │  │
│  │  ┌──────────────┐  ┌──────────────┐                 │  │
│  │  │     Auth     │  │    Error     │                 │  │
│  │  │  Middleware  │  │   Handler    │                 │  │
│  │  └──────────────┘  └──────────────┘                 │  │
│  └──────────────────────────────────────────────────────┘  │
│  ┌──────────────────────────────────────────────────────┐  │
│  │              Controller Layer                         │  │
│  │  ┌──────┐ ┌──────┐ ┌──────┐ ┌──────┐ ┌──────┐      │  │
│  │  │ Auth │ │ App  │ │ Doc  │ │Admin │ │Audit │      │  │
│  │  └──────┘ └──────┘ └──────┘ └──────┘ └──────┘      │  │
│  └──────────────────────────────────────────────────────┘  │
│  ┌──────────────────────────────────────────────────────┐  │
│  │              Service Layer                            │  │
│  │  ┌──────┐ ┌──────┐ ┌──────┐ ┌──────┐ ┌──────┐      │  │
│  │  │ Auth │ │ App  │ │ Doc  │ │Admin │ │Audit │      │  │
│  │  └──────┘ └──────┘ └──────┘ └──────┘ └──────┘      │  │
│  └──────────────────────────────────────────────────────┘  │
│  ┌──────────────────────────────────────────────────────┐  │
│  │              Data Access Layer                        │  │
│  │  ┌──────────────────────────────────────────────┐    │  │
│  │  │         PostgreSQL Client (pg)               │    │  │
│  │  └──────────────────────────────────────────────┘    │  │
│  └──────────────────────────────────────────────────────┘  │
└─────────────────────────────────────────────────────────────┘
                            │
                            ▼
┌─────────────────────────────────────────────────────────────┐
│                  PostgreSQL Database                         │
│  ┌──────┐ ┌──────────────┐ ┌──────────┐ ┌──────────┐      │
│  │Users │ │ Applications │ │Documents │ │AuditLogs │      │
│  └──────┘ └──────────────┘ └──────────┘ └──────────┘      │
└─────────────────────────────────────────────────────────────┘
```

### Technology Stack

**Frontend:**
- React 18 with Vite for fast development and optimized builds
- CSS Modules for component-scoped styling
- Context API for state management
- Fetch API for HTTP requests

**Backend:**
- Node.js runtime environment
- Express.js web framework
- pg (node-postgres) for PostgreSQL connectivity
- jsonwebtoken for JWT token generation and verification
- bcrypt for password hashing
- multer for file upload handling

**Database:**
- PostgreSQL 15+ for relational data storage
- Connection pooling for efficient database access

**Deployment:**
- Docker containers for frontend and backend
- Docker Compose for orchestration
- Volume mounts for database persistence and file storage

## Components and Interfaces

### Frontend Components

#### 1. Authentication Components

**LoginForm**
- Renders email and password input fields
- Validates input before submission
- Calls `/api/auth/login` endpoint
- Stores JWT token in Context and localStorage
- Redirects to dashboard on success

**RegisterForm**
- Renders name, email, and password input fields
- Validates password strength (minimum 8 characters)
- Calls `/api/auth/register` endpoint
- Automatically logs in user after successful registration

**ProtectedRoute**
- Wrapper component that checks authentication state
- Redirects to login if user is not authenticated
- Renders child components if authenticated

#### 2. Application Management Components

**ApplicationForm**
- Renders form for creating/editing applications
- Fields: company name, position, status, application date, notes
- Validates required fields before submission
- Calls POST `/api/applications` or PUT `/api/applications/:id`

**KanbanBoard**
- Displays applications grouped by status in columns
- Implements drag-and-drop using HTML5 drag API
- Updates application status on drop
- Calls PUT `/api/applications/:id` to persist status changes

**ApplicationTable**
- Displays applications in tabular format
- Implements sorting by clicking column headers
- Implements filtering by status, date range, and search term
- Implements pagination with configurable items per page
- Calls GET `/api/applications` with query parameters

**ApplicationCard**
- Displays single application summary
- Shows company, position, status, date
- Provides edit and delete actions
- Used in both Kanban and table views

#### 3. Dashboard Components

**Dashboard**
- Displays statistics: total applications, status breakdown, success rate
- Renders charts using HTML5 Canvas or SVG
- Displays recent activity timeline
- Calls GET `/api/applications/stats` endpoint

**StatCard**
- Reusable component for displaying a single statistic
- Props: title, value, icon, color

**ActivityTimeline**
- Displays chronological list of recent application updates
- Shows date, company, position, and action (created, updated, status changed)

#### 4. Document Management Components

**DocumentUpload**
- Renders file input for document upload
- Validates file type (PDF, DOC, DOCX) and size (max 5MB)
- Calls POST `/api/applications/:id/documents` with multipart/form-data
- Displays upload progress

**DocumentList**
- Displays list of documents for an application
- Provides download and delete actions
- Calls GET `/api/applications/:id/documents` and DELETE `/api/documents/:id`

#### 5. Admin Components

**UserList**
- Displays all users with email, name, registration date, role
- Shows application count per user
- Calls GET `/api/admin/users`

**SystemStats**
- Displays system-wide statistics
- Shows total users, total applications, status distribution, averages
- Calls GET `/api/admin/stats`

**AuditLog**
- Displays audit log entries in table format
- Implements filtering by user and date range
- Calls GET `/api/admin/audit-log`

#### 6. Context Providers

**AuthContext**
- Stores authentication state: user object, token, role
- Provides login, logout, and register functions
- Persists token to localStorage
- Automatically loads token on app initialization

**ApplicationContext**
- Stores application list and loading state
- Provides CRUD functions for applications
- Handles optimistic updates for better UX
- Refreshes data after mutations

### Backend Components

#### 1. Middleware

**authMiddleware**
```javascript
function authMiddleware(req, res, next)
```
- Extracts JWT token from Authorization header
- Verifies token using jsonwebtoken
- Decodes user ID and role from token payload
- Attaches user object to req.user
- Returns 401 if token is missing or invalid

**roleMiddleware**
```javascript
function roleMiddleware(allowedRoles)
```
- Higher-order function that returns middleware
- Checks if req.user.role is in allowedRoles array
- Returns 403 if user role is not authorized
- Calls next() if authorized

**errorHandler**
```javascript
function errorHandler(err, req, res, next)
```
- Catches all errors thrown in route handlers
- Logs error details to console
- Returns appropriate HTTP status and error message
- Sanitizes error messages for production

**validateRequest**
```javascript
function validateRequest(schema)
```
- Higher-order function that returns middleware
- Validates req.body against provided schema
- Returns 400 with validation errors if invalid
- Calls next() if valid

#### 2. Controllers

**AuthController**
- `register(req, res)`: Creates new user with hashed password
- `login(req, res)`: Validates credentials and returns JWT token
- `getProfile(req, res)`: Returns current user profile

**ApplicationController**
- `createApplication(req, res)`: Creates new application for authenticated user
- `getApplications(req, res)`: Returns paginated, filtered, sorted applications for user
- `getApplicationById(req, res)`: Returns single application if user owns it
- `updateApplication(req, res)`: Updates application if user owns it
- `deleteApplication(req, res)`: Deletes application if user owns it
- `getStats(req, res)`: Returns statistics for user's applications

**DocumentController**
- `uploadDocument(req, res)`: Handles file upload using multer
- `getDocuments(req, res)`: Returns documents for an application
- `downloadDocument(req, res)`: Streams document file to client
- `deleteDocument(req, res)`: Deletes document file and database record

**AdminController**
- `getUsers(req, res)`: Returns all users with application counts
- `getSystemStats(req, res)`: Returns system-wide statistics
- `getAuditLog(req, res)`: Returns filtered audit log entries

#### 3. Services

**AuthService**
- `hashPassword(password)`: Hashes password using bcrypt with 10 salt rounds
- `comparePassword(password, hash)`: Compares plain password with hash
- `generateToken(userId, role)`: Generates JWT token with 24-hour expiration
- `verifyToken(token)`: Verifies and decodes JWT token

**ApplicationService**
- `createApplication(userId, data)`: Inserts application into database
- `getApplicationsByUser(userId, filters, pagination, sorting)`: Queries applications with filters
- `getApplicationById(id, userId)`: Retrieves single application with ownership check
- `updateApplication(id, userId, data)`: Updates application with ownership check
- `deleteApplication(id, userId)`: Deletes application with ownership check
- `getStatsByUser(userId)`: Calculates statistics for user's applications

**DocumentService**
- `saveDocument(applicationId, file, userId)`: Saves file to disk and creates database record
- `getDocumentsByApplication(applicationId, userId)`: Retrieves documents with ownership check
- `getDocumentById(id, userId)`: Retrieves single document with ownership check
- `deleteDocument(id, userId)`: Deletes file and database record with ownership check

**AdminService**
- `getAllUsers()`: Retrieves all users with application counts
- `getSystemStats()`: Calculates system-wide statistics
- `getAuditLog(filters)`: Retrieves filtered audit log entries

**AuditService**
- `logAction(userId, action, resourceType, resourceId, changes)`: Creates audit log entry
- `getAuditLog(filters)`: Retrieves filtered audit log entries

#### 4. Data Access Layer

**Database Connection**
```javascript
const pool = new Pool({
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  database: process.env.DB_NAME,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  max: 20, // maximum pool size
  idleTimeoutMillis: 30000,
  connectionTimeoutMillis: 2000,
})
```

**Query Functions**
- `query(text, params)`: Executes parameterized query
- `transaction(callback)`: Executes multiple queries in a transaction
- `getClient()`: Gets a client from the pool for manual transaction management

### API Endpoints

#### Authentication Endpoints

**POST /api/auth/register**
- Request body: `{ name, email, password }`
- Response: `{ success: true, data: { user, token } }`
- Creates new user account

**POST /api/auth/login**
- Request body: `{ email, password }`
- Response: `{ success: true, data: { user, token } }`
- Authenticates user and returns JWT token

**GET /api/auth/profile**
- Headers: `Authorization: Bearer <token>`
- Response: `{ success: true, data: { user } }`
- Returns current user profile

#### Application Endpoints

**POST /api/applications**
- Headers: `Authorization: Bearer <token>`
- Request body: `{ companyName, position, status, applicationDate, notes }`
- Response: `{ success: true, data: { application } }`
- Creates new application

**GET /api/applications**
- Headers: `Authorization: Bearer <token>`
- Query params: `status, dateFrom, dateTo, search, page, limit, sortBy, sortOrder`
- Response: `{ success: true, data: { applications, pagination } }`
- Returns paginated, filtered, sorted applications

**GET /api/applications/:id**
- Headers: `Authorization: Bearer <token>`
- Response: `{ success: true, data: { application } }`
- Returns single application

**PUT /api/applications/:id**
- Headers: `Authorization: Bearer <token>`
- Request body: `{ companyName, position, status, applicationDate, notes }`
- Response: `{ success: true, data: { application } }`
- Updates application

**DELETE /api/applications/:id**
- Headers: `Authorization: Bearer <token>`
- Response: `{ success: true, message: "Application deleted" }`
- Deletes application

**GET /api/applications/stats**
- Headers: `Authorization: Bearer <token>`
- Response: `{ success: true, data: { stats } }`
- Returns user's application statistics

#### Document Endpoints

**POST /api/applications/:id/documents**
- Headers: `Authorization: Bearer <token>`, `Content-Type: multipart/form-data`
- Request body: FormData with file field
- Response: `{ success: true, data: { document } }`
- Uploads document for application

**GET /api/applications/:id/documents**
- Headers: `Authorization: Bearer <token>`
- Response: `{ success: true, data: { documents } }`
- Returns documents for application

**GET /api/documents/:id/download**
- Headers: `Authorization: Bearer <token>`
- Response: File stream with appropriate Content-Type
- Downloads document file

**DELETE /api/documents/:id**
- Headers: `Authorization: Bearer <token>`
- Response: `{ success: true, message: "Document deleted" }`
- Deletes document

#### Admin Endpoints

**GET /api/admin/users**
- Headers: `Authorization: Bearer <token>`
- Requires: Admin role
- Response: `{ success: true, data: { users } }`
- Returns all users with application counts

**GET /api/admin/stats**
- Headers: `Authorization: Bearer <token>`
- Requires: Admin role
- Response: `{ success: true, data: { stats } }`
- Returns system-wide statistics

**GET /api/admin/audit-log**
- Headers: `Authorization: Bearer <token>`
- Requires: Admin role
- Query params: `userId, dateFrom, dateTo, page, limit`
- Response: `{ success: true, data: { logs, pagination } }`
- Returns filtered audit log entries

## Data Models

### Database Schema

#### Users Table
```sql
CREATE TABLE users (
  id SERIAL PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  email VARCHAR(255) UNIQUE NOT NULL,
  password_hash VARCHAR(255) NOT NULL,
  role VARCHAR(50) DEFAULT 'user' NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX idx_users_email ON users(email);
CREATE INDEX idx_users_role ON users(role);
```

#### Applications Table
```sql
CREATE TABLE applications (
  id SERIAL PRIMARY KEY,
  user_id INTEGER NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  company_name VARCHAR(255) NOT NULL,
  position VARCHAR(255) NOT NULL,
  status VARCHAR(50) NOT NULL CHECK (status IN ('Applied', 'Interview', 'Offer', 'Rejected')),
  application_date DATE NOT NULL,
  notes TEXT,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX idx_applications_user_id ON applications(user_id);
CREATE INDEX idx_applications_status ON applications(status);
CREATE INDEX idx_applications_application_date ON applications(application_date);
CREATE INDEX idx_applications_company_name ON applications(company_name);
```

#### Documents Table
```sql
CREATE TABLE documents (
  id SERIAL PRIMARY KEY,
  application_id INTEGER NOT NULL REFERENCES applications(id) ON DELETE CASCADE,
  original_filename VARCHAR(255) NOT NULL,
  stored_filename VARCHAR(255) UNIQUE NOT NULL,
  file_size INTEGER NOT NULL,
  mime_type VARCHAR(100) NOT NULL,
  uploaded_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX idx_documents_application_id ON documents(application_id);
```

#### Audit Logs Table
```sql
CREATE TABLE audit_logs (
  id SERIAL PRIMARY KEY,
  user_id INTEGER NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  action VARCHAR(50) NOT NULL,
  resource_type VARCHAR(50) NOT NULL,
  resource_id INTEGER NOT NULL,
  changes JSONB,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX idx_audit_logs_user_id ON audit_logs(user_id);
CREATE INDEX idx_audit_logs_created_at ON audit_logs(created_at);
CREATE INDEX idx_audit_logs_resource ON audit_logs(resource_type, resource_id);
```

### Data Transfer Objects (DTOs)

#### User DTO
```javascript
{
  id: number,
  name: string,
  email: string,
  role: 'user' | 'admin',
  createdAt: string (ISO 8601),
  updatedAt: string (ISO 8601)
}
```

#### Application DTO
```javascript
{
  id: number,
  userId: number,
  companyName: string,
  position: string,
  status: 'Applied' | 'Interview' | 'Offer' | 'Rejected',
  applicationDate: string (ISO 8601 date),
  notes: string | null,
  createdAt: string (ISO 8601),
  updatedAt: string (ISO 8601)
}
```

#### Document DTO
```javascript
{
  id: number,
  applicationId: number,
  originalFilename: string,
  fileSize: number,
  mimeType: string,
  uploadedAt: string (ISO 8601)
}
```

#### Audit Log DTO
```javascript
{
  id: number,
  userId: number,
  userName: string,
  action: string,
  resourceType: string,
  resourceId: number,
  changes: object | null,
  createdAt: string (ISO 8601)
}
```

#### Statistics DTO
```javascript
{
  totalApplications: number,
  statusBreakdown: {
    Applied: { count: number, percentage: number },
    Interview: { count: number, percentage: number },
    Offer: { count: number, percentage: number },
    Rejected: { count: number, percentage: number }
  },
  successRate: number,
  recentActivity: Array<{
    id: number,
    companyName: string,
    position: string,
    action: string,
    date: string (ISO 8601)
  }>
}
```

#### Pagination Metadata DTO
```javascript
{
  currentPage: number,
  totalPages: number,
  totalItems: number,
  itemsPerPage: number,
  hasNextPage: boolean,
  hasPreviousPage: boolean
}
```

### Validation Rules

#### User Registration
- `name`: Required, 1-255 characters
- `email`: Required, valid email format, unique
- `password`: Required, minimum 8 characters

#### Application Creation/Update
- `companyName`: Required, 1-255 characters, non-empty after trim
- `position`: Required, 1-255 characters, non-empty after trim
- `status`: Required, one of: 'Applied', 'Interview', 'Offer', 'Rejected'
- `applicationDate`: Required, valid date, not in the future
- `notes`: Optional, maximum 5000 characters

#### Document Upload
- File type: Must be PDF, DOC, or DOCX (checked via MIME type)
- File size: Maximum 5MB (5,242,880 bytes)
- Original filename: Required, preserved in database

## Correctness Properties


*A property is a characteristic or behavior that should hold true across all valid executions of a system—essentially, a formal statement about what the system should do. Properties serve as the bridge between human-readable specifications and machine-verifiable correctness guarantees.*

### Authentication and Authorization Properties

**Property 1: User registration creates accounts with hashed passwords**
*For any* valid registration data (name, email, password), creating a user account should result in a stored user with a bcrypt-hashed password (minimum 10 salt rounds) and the password should never be stored in plain text.
**Validates: Requirements 1.1, 1.5**

**Property 2: Valid login returns valid JWT token**
*For any* valid user credentials, successful login should return a JWT token that is valid for 24 hours and contains the user ID and role in its payload.
**Validates: Requirements 1.2**

**Property 3: Invalid credentials produce secure error messages**
*For any* invalid login credentials (wrong email or wrong password), the error message should not reveal whether the email or password was incorrect.
**Validates: Requirements 1.3**

**Property 4: New users receive default User role**
*For any* newly created user account, the assigned role should be 'user' unless explicitly set otherwise.
**Validates: Requirements 2.1**

**Property 5: Admin role grants access to admin endpoints**
*For any* user with Admin role, requests to admin endpoints with valid authentication should be permitted.
**Validates: Requirements 2.2**

**Property 6: Non-admin users cannot access admin endpoints**
*For any* user with User role, requests to admin endpoints should be rejected with 403 Forbidden status.
**Validates: Requirements 2.3**

**Property 7: Users can access their own application data**
*For any* user and their own application, requests to view or modify that application should be permitted.
**Validates: Requirements 2.4**

**Property 8: Users cannot access other users' application data**
*For any* user attempting to access another user's application, the request should be rejected with 403 Forbidden status.
**Validates: Requirements 2.5**

### Application Management Properties

**Property 9: Valid application creation stores and associates with user**
*For any* valid application data (non-empty company name and position, valid status, non-future date), creating an application should store it in the database associated with the authenticated user and with initial status 'Applied'.
**Validates: Requirements 3.1, 5.1**

**Property 10: Application queries return only owned applications**
*For any* user requesting their applications, the returned list should contain only applications where the user_id matches the authenticated user's ID.
**Validates: Requirements 3.2**

**Property 11: Application updates modify data and timestamp**
*For any* application owned by a user, updating the application should save the changes and set the updated_at timestamp to the current time.
**Validates: Requirements 3.3, 5.3**

**Property 12: Application deletion cascades to documents**
*For any* application with associated documents, deleting the application should also delete all associated document records and files from storage.
**Validates: Requirements 3.4, 4.5**

**Property 13: Users cannot modify applications they don't own**
*For any* application not owned by a user, attempts to update or delete that application should be rejected.
**Validates: Requirements 3.5**

**Property 14: Empty company name or position is rejected**
*For any* application data where company name or position is empty or contains only whitespace, the creation or update should be rejected with a validation error.
**Validates: Requirements 3.6**

**Property 15: Invalid status values are rejected**
*For any* application data where status is not one of 'Applied', 'Interview', 'Offer', or 'Rejected', the creation or update should be rejected with a validation error.
**Validates: Requirements 3.7**

**Property 16: Future application dates are rejected**
*For any* application data where the application date is in the future, the creation or update should be rejected with a validation error.
**Validates: Requirements 3.8**

**Property 17: Status transitions are unrestricted**
*For any* application and any valid status value, updating the application to that status should succeed regardless of the current status (no workflow enforcement).
**Validates: Requirements 5.4**

### Document Management Properties

**Property 18: Document upload stores and associates with application**
*For any* valid document file (PDF, DOC, or DOCX under 5MB) uploaded for an application, the file should be stored with a unique filename and a database record should be created linking it to the application.
**Validates: Requirements 4.1, 17.1**

**Property 19: Invalid file types are rejected**
*For any* uploaded file with MIME type other than PDF, DOC, or DOCX, the upload should be rejected with a validation error.
**Validates: Requirements 4.2**

**Property 20: Document queries return all application documents**
*For any* application, requesting its documents should return all document records associated with that application ID.
**Validates: Requirements 4.4**

**Property 21: Document deletion removes file and record**
*For any* document, deleting it should remove both the file from storage and the database record.
**Validates: Requirements 4.6**

**Property 22: Document files are organized by user and application**
*For any* uploaded document, the file should be stored in a directory path that includes the user ID and application ID.
**Validates: Requirements 17.2**

**Property 23: Document access requires application ownership**
*For any* document request, the system should verify that the requesting user owns the application associated with the document before granting access.
**Validates: Requirements 17.3**

**Property 24: Document metadata is stored completely**
*For any* uploaded document, the database record should include original filename, file size, upload date, and MIME type.
**Validates: Requirements 17.4**

### View and Filtering Properties

**Property 25: Kanban board groups applications by status**
*For any* set of applications, the Kanban board view should display them grouped into four columns (Applied, Interview, Offer, Rejected) based on their status field.
**Validates: Requirements 6.1**

**Property 26: Application cards display required information**
*For any* application displayed in a card, the rendered output should contain the company name, position, and application date.
**Validates: Requirements 6.5**

**Property 27: Table view displays all applications**
*For any* user's applications, the table view should display all of them in tabular format.
**Validates: Requirements 7.1**

**Property 28: Column sorting orders applications correctly**
*For any* sortable column, clicking to sort should order applications by that column's values in ascending or descending order.
**Validates: Requirements 7.2**

**Property 29: Status filter shows only matching applications**
*For any* selected status filter, the displayed applications should include only those with that status value.
**Validates: Requirements 7.4**

**Property 30: Date range filter shows only applications in range**
*For any* date range filter, the displayed applications should include only those with application dates within the specified range (inclusive).
**Validates: Requirements 7.5**

**Property 31: Search filters by company name or position**
*For any* search query, the displayed applications should include only those where the company name or position contains the query string (case-insensitive, OR logic).
**Validates: Requirements 7.6, 10.1, 10.2, 10.3**

**Property 32: Multiple filters combine with AND logic**
*For any* combination of active filters (status, date range, search), the displayed applications should match all filter criteria simultaneously.
**Validates: Requirements 7.7**

**Property 33: Search results are ordered by date descending**
*For any* search query, the returned results should be ordered by application date in descending order (most recent first).
**Validates: Requirements 10.5**

### Pagination Properties

**Property 34: Page size controls displayed items**
*For any* selected page size (10, 20, or 50), the number of applications displayed should not exceed that limit.
**Validates: Requirements 8.1**

**Property 35: Page navigation shows correct subset**
*For any* page number, the displayed applications should be the correct subset based on page size and page number (e.g., page 2 with size 10 shows items 11-20).
**Validates: Requirements 8.3**

**Property 36: Pagination controls display accurate metadata**
*For any* paginated view, the pagination controls should display current page, total pages, and navigation buttons that accurately reflect the total number of items and page size.
**Validates: Requirements 8.4**

**Property 37: Pagination adjusts to data changes**
*For any* change in the total number of applications, the pagination controls should update to reflect the new total pages and adjust the current page if necessary.
**Validates: Requirements 8.5**

### Dashboard and Analytics Properties

**Property 38: Dashboard statistics are accurate**
*For any* user's applications, the dashboard should display accurate total count, status breakdown with counts and percentages, and success rate calculated as (Offers / Total) × 100.
**Validates: Requirements 9.1, 9.2, 9.3, 9.4**

**Property 39: Recent activity shows latest updates**
*For any* user's applications, the recent activity timeline should display the 10 most recent application updates ordered by timestamp descending.
**Validates: Requirements 9.5**

### Admin Properties

**Property 40: Admin user list shows all users with complete information**
*For any* admin request for user list, the response should include all registered users with email, name, registration date, role, and application count, but should not include passwords or password hashes.
**Validates: Requirements 11.1, 11.2, 11.3, 11.4**

**Property 41: System statistics are accurate and comprehensive**
*For any* admin request for system statistics, the response should include accurate counts for total users, total applications, status distribution across all users, average applications per user, and new users in the last 30 days.
**Validates: Requirements 12.1, 12.2, 12.3, 12.4, 12.5**

### Audit Logging Properties

**Property 42: CRUD operations are logged with complete information**
*For any* application create, update, or delete operation, an audit log entry should be created containing user ID, timestamp, action type, application ID, and for updates, the changed fields.
**Validates: Requirements 13.1, 13.2, 13.3**

**Property 43: Audit log is ordered chronologically descending**
*For any* audit log query, the returned entries should be ordered by timestamp in descending order (most recent first).
**Validates: Requirements 13.4**

**Property 44: Audit log filters work correctly**
*For any* audit log query with user filter or date range filter, the returned entries should include only those matching the filter criteria.
**Validates: Requirements 13.5, 13.6**

### Error Handling Properties

**Property 45: Invalid data returns 400 with descriptive message**
*For any* API request with invalid data, the response should have status 400 and include a descriptive error message explaining the validation failure.
**Validates: Requirements 14.1**

**Property 46: Unauthorized actions return 403**
*For any* API request attempting an unauthorized action, the response should have status 403 with an appropriate message.
**Validates: Requirements 14.2**

**Property 47: Non-existent resources return 404**
*For any* API request for a resource that doesn't exist, the response should have status 404.
**Validates: Requirements 14.3**

**Property 48: Multiple validation errors are returned together**
*For any* API request with multiple validation failures, the response should include all validation errors in a single response.
**Validates: Requirements 14.6**

### Database Integrity Properties

**Property 49: Email uniqueness is enforced**
*For any* attempt to create a user with an email that already exists, the operation should be rejected by the database.
**Validates: Requirements 15.1**

**Property 50: Foreign key constraints are enforced**
*For any* attempt to create an application with a non-existent user ID or a document with a non-existent application ID, the operation should be rejected by the database.
**Validates: Requirements 15.2, 15.3**

**Property 51: NOT NULL constraints are enforced**
*For any* attempt to create a record with NULL values in required fields (user email, application company name, application position), the operation should be rejected by the database.
**Validates: Requirements 15.4**

**Property 52: User deletion cascades to applications and documents**
*For any* user with applications and documents, deleting the user should also delete all associated applications and their documents.
**Validates: Requirements 15.5**

**Property 53: Timestamps are stored in UTC**
*For any* timestamp stored in the database, it should be in UTC format.
**Validates: Requirements 15.6**

### API Response Format Properties

**Property 54: Successful responses have consistent structure**
*For any* successful API request, the response should be JSON with a success indicator and data payload.
**Validates: Requirements 16.1**

**Property 55: Error responses have consistent structure**
*For any* failed API request, the response should be JSON with an error indicator and error message.
**Validates: Requirements 16.2**

**Property 56: List responses include pagination metadata**
*For any* API response returning a list of items, the response should include pagination metadata (current page, total pages, total items, items per page).
**Validates: Requirements 16.3**

**Property 57: API responses use camelCase naming**
*For any* API response, all JSON field names should use camelCase convention.
**Validates: Requirements 16.4**

### Frontend State Management Properties

**Property 58: Authentication state changes update dependent components**
*For any* change to authentication state (login, logout), all components that depend on authentication state should re-render with the updated state.
**Validates: Requirements 18.4**

**Property 59: Application data changes update all views**
*For any* change to application data (create, update, delete), all views displaying that data should update to reflect the changes.
**Validates: Requirements 18.5**

### Responsive Design Properties

**Property 60: Touch targets meet minimum size on mobile**
*For any* interactive element on mobile devices, the touch target size should be at least 44px × 44px.
**Validates: Requirements 19.4**

## Error Handling

### Authentication Errors

**Invalid Credentials**
- Return 401 Unauthorized with message: "Invalid email or password"
- Do not reveal which field was incorrect
- Log failed login attempts for security monitoring

**Expired Token**
- Return 401 Unauthorized with message: "Token expired, please log in again"
- Clear client-side token storage
- Redirect to login page

**Missing Token**
- Return 401 Unauthorized with message: "Authentication required"
- Redirect to login page

**Invalid Token**
- Return 401 Unauthorized with message: "Invalid authentication token"
- Clear client-side token storage
- Redirect to login page

### Authorization Errors

**Insufficient Permissions**
- Return 403 Forbidden with message: "You do not have permission to perform this action"
- Log unauthorized access attempts

**Resource Ownership Violation**
- Return 403 Forbidden with message: "You do not have access to this resource"
- Do not reveal whether the resource exists

### Validation Errors

**Missing Required Fields**
- Return 400 Bad Request with message listing missing fields
- Example: "Missing required fields: companyName, position"

**Invalid Field Values**
- Return 400 Bad Request with message describing the validation failure
- Example: "Status must be one of: Applied, Interview, Offer, Rejected"

**Invalid Date**
- Return 400 Bad Request with message: "Application date cannot be in the future"

**File Upload Errors**
- Invalid file type: 400 Bad Request with message: "File type must be PDF, DOC, or DOCX"
- File too large: 400 Bad Request with message: "File size must not exceed 5MB"

### Resource Errors

**Not Found**
- Return 404 Not Found with message: "Resource not found"
- Do not reveal whether the resource exists but user lacks access

**Duplicate Resource**
- Return 409 Conflict with message describing the conflict
- Example: "User with this email already exists"

### Server Errors

**Database Connection Error**
- Return 500 Internal Server Error with message: "Database connection failed"
- Log full error details server-side
- Retry connection with exponential backoff

**File System Error**
- Return 500 Internal Server Error with message: "File operation failed"
- Log full error details server-side
- Ensure partial uploads are cleaned up

**Unexpected Errors**
- Return 500 Internal Server Error with message: "An unexpected error occurred"
- Log full error stack trace server-side
- Include error ID in response for support reference

### Frontend Error Handling

**Network Errors**
- Display user-friendly message: "Unable to connect to server. Please check your internet connection."
- Provide retry button
- Cache failed requests for retry when connection restored

**API Errors**
- Display error message from API response
- For validation errors, highlight affected form fields
- For authorization errors, redirect to appropriate page

**State Errors**
- If state becomes inconsistent, refresh data from server
- Display loading indicator during refresh
- Log state errors for debugging

## Testing Strategy

### Dual Testing Approach

JobTrackr will use both unit testing and property-based testing to ensure comprehensive coverage:

**Unit Tests**: Verify specific examples, edge cases, and error conditions
- Specific user registration scenarios
- Specific login scenarios with known credentials
- Edge cases like empty strings, boundary dates
- Error conditions like missing fields, invalid tokens
- Integration points between components

**Property Tests**: Verify universal properties across all inputs
- Run minimum 100 iterations per property test
- Generate random valid and invalid inputs
- Verify properties hold for all generated inputs
- Each property test references its design document property
- Tag format: **Feature: job-trackr, Property {number}: {property_text}**

### Testing Tools

**Backend Testing**
- Framework: Jest or Mocha
- Property-based testing: fast-check (JavaScript property-based testing library)
- Database testing: In-memory PostgreSQL or test database
- API testing: supertest for HTTP assertions

**Frontend Testing**
- Framework: Vitest (Vite-native testing)
- Property-based testing: fast-check
- Component testing: React Testing Library
- UI interaction testing: Testing Library user-event

### Property-Based Test Configuration

Each property test must:
1. Run minimum 100 iterations (configured in fast-check)
2. Include a comment tag referencing the design property
3. Generate appropriate random inputs using fast-check arbitraries
4. Verify the property holds for all generated inputs

Example property test structure:
```javascript
// Feature: job-trackr, Property 9: Valid application creation stores and associates with user
test('application creation property', () => {
  fc.assert(
    fc.property(
      fc.record({
        companyName: fc.string({ minLength: 1 }),
        position: fc.string({ minLength: 1 }),
        status: fc.constantFrom('Applied', 'Interview', 'Offer', 'Rejected'),
        applicationDate: fc.date({ max: new Date() })
      }),
      async (appData) => {
        const result = await createApplication(userId, appData);
        expect(result.userId).toBe(userId);
        expect(result.status).toBe('Applied');
        expect(result.companyName).toBe(appData.companyName);
      }
    ),
    { numRuns: 100 }
  );
});
```

### Test Coverage Goals

- Unit test coverage: Minimum 80% code coverage
- Property test coverage: All 60 correctness properties implemented
- Integration test coverage: All API endpoints tested
- E2E test coverage: Critical user flows (registration, login, create application, view dashboard)

### Testing Priorities

**High Priority** (Must test before MVP):
1. Authentication and authorization (Properties 1-8)
2. Application CRUD operations (Properties 9-17)
3. Data validation (Properties 14-16, 45-48)
4. Database integrity (Properties 49-53)

**Medium Priority** (Test before full release):
1. Document management (Properties 18-24)
2. Filtering and search (Properties 25-33)
3. Dashboard statistics (Properties 38-39)
4. API response formats (Properties 54-57)

**Lower Priority** (Can defer to post-MVP):
1. Admin features (Properties 40-44)
2. Pagination (Properties 34-37)
3. Frontend state management (Properties 58-59)
4. Responsive design (Property 60)
