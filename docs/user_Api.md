# User Module API

## USERS

Service : admin/user/user-services/users.service.ts

### 1. getAllUsers

```bash
GET:--/users/
```

#### Description

Get All Users Service is called

### 2. getUserById

```bash
GET:--/users/{id}
```

#### Description

Get User By Id Service is called for editing a particular user

### 3. getUserByIdPreview

```bash
GET:--/users/preview/{id}
```

#### Description

Get User By Id Service is called for previewing a particular user

### 4. deleteUser

```bash
DELETE:--/users/{id}
```

#### Description

Delete Service Called

### 5. enable

```bash
GET:--/users/activate/{id}

```

#### Description

Activate User service is called

### 6. disenable

```bash
GET:--/users/deactivate/{id}

```

#### Description

Deactivate User service is called

### 7. sendMail

```bash

POST:--/users/sendmail/
```

#### Description

Send Mail to User is called through data :{to:string; cc:string; bcc:string; subject:string; message:string}

### 8. regUser

```bash
POST:--/users/
```

#### Description

Registering User is called through resquest body: { userName: string; name: Name; email: string; password: string; gender: string; dateOfBirth: date; address: address; contactNumber: number; role: Role;}

### 9. editUser

```bash
POST:--/users/{id}
```

#### Description

Edit Particular User is called through resquest body: { id: string; userName:string; name:Name; email: string; dateOfBirth:date; gender:string; contactNumber:number; address:address;}

### 10. phoneNumberExists

```bash
GET:--/users/existingContactNumber/{no}
```

#### Description

Check if the Contact Number exists

### 11. userNameExists

```bash
GET:--/users/existingUser/{name}
```

#### Description

Check if the username already exists

### 12. emailexists

```bash
GET:--/users/existingEmail/{email}
```

#### Description

Check if the Email already exists

### 13. getAllRoles

```bash
GET:--/users/roles/
```

#### Description

Get All roles in user list

### 14. assignRole

```bash
POST:--/users/addRole/
```

#### Description

Assign Role service is called through request body: { id: id, permission: permission, }

[Back](README.md)
