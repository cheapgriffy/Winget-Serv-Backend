

# Winget-Serv [WIP]

## Introduction

### A custom script link creation tool.

#### Features
- Create and manage your scripts from **Graphical Interface** *[coming soon]*,
- Execute your script directly from a **link**
- Automatisate your workspace setup's or quicly share configuration scripts

#### How does it work ?
User choses wich app, wich custom commands to add to his script

User receives a link that bundle everything and can be executed from any terminal for quick installation script acces.

``irm http://localhost/script/Jkdèzl || iex``

The whole purpose of this API is to adapt script's to be safely executed on multiple OS and terminal emulators.

WIth the posibility of the user to check the script, and have explaination on what's being executed

---------------
## API Usage

### **User management**<br>
Under the ``http://{localhost}:{port}/user`` subpage

#### **Create user** ``/user/create`` *POST*
```json
{
    "username": "string",
    "email": "string",
    "password" : "string"
}
```
#### **Remove user** ``/user/remove`` *DELETE*<br>
*note, user role can only delete themselves, only the admin role need id*
```json
{
    "id": number
}
```

#### **Login** ``/user/login`` *POST*<br>
*by default a token last for 24h*
```json
{
    "username": "string", OR "email": "string",
    "password" : "string"
}
```


#### **Get user info***GET*
``/user/:id`` 
#### **Get current loggend in user info***GET*
``/user/me`` 
<br>
<br>
<br>

### **Script Management**<br>
### Under the ``http://{localhost}:{port}/script`` subpage

#### **Create script** ``/script/create`` *POST*
```json
{
    "name": "string",
    "description": "string, can be null",       //require authentification
    "content": JSON
}
```
#### **Remove script** ``/script/remove`` *DELETE*<br>
```json
{
    "id": number        //require authentification
}
```

#### **Execute / View script** *(on browser)* *GET*
``/script/:public_id`` 

#### **Get all script from user** *GET*
``/script/list`` *Require authentification*


---------

## Launch Parameters and Environement Variable

###### **Launch parameters** are prioritized over **Environement Variables**

*This list can be viewed form the --help flag*

#### ``--port=``
Change port that will be used by the server

#### ``--init=true``
Create all necesary database tables and columns

#### ``--token-expires-in=``
Control time of validity period of user tokens

#### ``--db-host=``
Domain or IP to database 

#### ``--db-port=``
Change **port** used for database connection

#### ``--db-login=``
Change **login** used for database connection

#### ``--db-passwd=``
Change **password** used for database** connection

#### ``--db-name=``

Change database name used for database connection and creation

