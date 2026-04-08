# One Stop File Service
Welcome to the Basic API File Service!. This service allows you to upload and manage files without use authentication.
## How to Run the app
To run the API File Service on your local machine, follow these steps:
1. **Clone the Repository:**
```bash
git clone git@gitlab.camcyber.com:pos/v2/file-v3.git
```
2. **Navigate to the Project Directory:**
```bash
cd file-v3
```
3. **Install Dependencies:**
```bash
$ npm install
```
4. **Start the Server:**
```bash
# development watch mode
npm run start:dev
# production deployment
npm run start
```
## Database Connection Options
This file service allowed you to connect three database:
### MySQL Connection:
1. Create the `.env` file in the root directory
```bash
DB_CONNECTION   = 'mysql'
DB_PORT         = 'your_db_port'
DB_HOST         = 'your_db_localhost'
DB_DATABASE     = 'your_db_name'
DB_USERNAME     = 'your_db_root'
DB_PASSWORD     = 'your_db_password'
```
### Postgres Connection:
1. Create the `.env` file in the root directory
```bash
DB_CONNECTION   = 'postgres'
DB_PORT         = 'your_db_port'
DB_HOST         = 'your_db_localhost'
DB_DATABASE     = 'your_db_name'
DB_USERNAME     = 'your_db_root'
DB_PASSWORD     = 'your_db_password'
```

## Migrate && Seeds
### Migrate
**Drop all tables && recreate table again**
```bash
npm run migrate
```
### Seeds
**Drop all tables && recreate table again && insert data to the database**
```bash
npm run seeder
```

## All Routes For File Update 

In addition to the basic functionality, the One Stop File Service API provides several routes for specific file operations. Here are some of the key routes:

### Read a File

- **URL**: `/upload/file/:filename`
- **HTTP Method**: GET
- **Description**: Retrieve the contents of a specific file.
- **Authentication**: None required

### Upload a Single File

- **URL**: `/api/file/upload-single`
- **HTTP Method**: POST
- **Description**: Upload a single file to the server.
- **Authentication**: Basic Auth (Username and Password required)

**Request Fields (form-data):**

- `file` (file): The file to be uploaded.
- `folder` (string): The destination folder where the file should be stored.

### Upload an Image (Base64)

- **URL**: `/api/file/upload-base64`
- **HTTP Method**: POST
- **Description**: Upload an image in base64 format.
- **Authentication**: Basic Auth (Username and Password required)

**Request Fields (form-data):**

- `image` (strng): The image must be base64 image strign to be uploaded.
- `folder` (string): The destination folder where the file should be stored.

## License

ExpressJS with [YIM KLOK](https://t.me/yim_klok).
