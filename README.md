

### API Documentation

**Base URL**: `http://localhost:5000/api/users`

### 1. **Create User (POST)**

**Endpoint**: `/create`  
**Method**: `POST`

**Request Body** (raw JSON):
```json
{
    "name": "John Doe",
    "email": "john.doe@example.com",
    "password": "password123",
    "address": "123 Main Street",
    "latitude": "37.7749",
    "longitude": "-122.4194"
}
```

**Description**:  
This endpoint is used to create a new user with the provided details.

---

### 2. **Update User Status (PATCH)**

**Endpoint**: `/status`  
**Method**: `PATCH`

**Request Headers**:
```plaintext
Content-Type: application/json
Authorization: Bearer <JWT_Token>
```

**Request Body** (raw text):
```plaintext
<Status Update Information Here>
```

**Description**:  
This endpoint is used to update the status of a user. An authorization token is required to access this endpoint.

---

### 3. **Calculate Distance (GET)**

**Endpoint**: `/distance`  
**Method**: `GET`

**Request Headers**:
```plaintext
Authorization: Bearer <JWT_Token>
```

**Query Parameters**:
```plaintext
destination_latitude: 35.0522
destination_longitude: -108.2437
```

**Request Body** (raw JSON):
```json
{
    "destination_latitude": "35.0522",
    "destination_longitude": "-108.2437"
}
```

**Description**:  
This endpoint calculates the distance between the user’s location and the specified destination coordinates.

---

### 4. **Get User List (POST)**

**Endpoint**: `/list`  
**Method**: `POST`

**Request Headers**:
```plaintext
Content-Type: application/json
Authorization: Bearer <JWT_Token>
```

**Request Body** (raw JSON):
```json
{
    "week_number": [1, 6]
}
```

**Description**:  
This endpoint retrieves a list of users for specific days of the week. In this case, it's for Monday and Thursday (week numbers 1 and 6).

---

### General Information

- All requests require a **JWT Token** for authentication. The `Authorization` header should contain the token in the format:
  ```plaintext
  Authorization: Bearer <JWT_Token>
  ```
- You can use **Postman**, **cURL**, or any API testing tool to test these requests.

