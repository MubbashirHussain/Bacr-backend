# **Bacr backen Api**
 

#### let baseUrl = https://bacr-backend.vercel.app
##

>Inventory


| endpoints |  Methods | Data/Key | DataType | response 
|--|--| --|--|--|
| api/invertory | get  | `none` | `none` | `[{ Title , Description , ImageUrl}]`
| api/invertory/:id | get  | `none` | `none` | `{ Title , Description , ImageUrl}`
| api/invertory/:id | post| `{Title , Description , ImageUrl}` | `Form-data` | `{"isSuccessfull": true}`
| api/invertory/:id | patch| `{ Title , Description }` | `none` | `{ Title , Description , ImageUrl}`
| api/invertory/:id | delete| `none` | `none` | `{ "isSuccessfull": true}`
---
> **CV**

| endpoints |  Methods | Data/Key | DataType | response 
|--|--| --|--|--|
| api/cv| get  | `none` | `none` | `[{Team,ApplyingFor ,FullName , CV_Url}]`
| api/cv/:id | get  | `none` | `none` | `{Team,ApplyingFor ,FullName , CV_Url}`
| api/cv/:id | post| `{Team, ApplyingFor , FullName , CV : File}` | `Form-data` | `{"isSuccessfull": true}`
| api/cv/:id | delete| `none` | `none` | `{ "isSuccessfull": true}`
---
> **Certificate**

| endpoints |  Methods | Data/Key | DataType | response 
|--|--| --|--|--|
| api/Certificate| get  | `none` | `none` | `[{ Name , ImageUrl }]`
| api/Certificate/:id | get  | `none` | `none` | `{ Name , ImageUrl }`
| api/Certificate/:id | post| `{ Name ,Image : File}` | `Form-data` | `{"isSuccessfull": true}`
| api/Certificate/:id | patch| `{ Name }` | `none` | `{ "isSuccessfull": true}`
| api/Certificate/:id | delete| `none` | `none` | `{ "isSuccessfull": true}`

---
> **Client**

| endpoints |  Methods | Data/Key | DataType | response 
|--|--| --|--|--|
| api/Client| get  | `none` | `none` | `[{ Name , ImageUrl }]`
| api/Client/:id | get  | `none` | `none` | `{ Name , ImageUrl }`
| api/Client/:id | post| `{ Name ,Image : File}` | `Form-data` | `{"isSuccessfull": true}`
| api/Client/:id | patch| `{ Name }` | `none` | `{ "isSuccessfull": true}`
| api/Client/:id | delete| `none` | `none` | `{ "isSuccessfull": true}`
---
> **User**

| endpoints |  Methods | Data/Key | DataType | response 
|--|--| --|--|--|
| api/Auth/login| post  | `{UserName , Password}` | `json` | `[{ "isSuccessfull": true ,token}]`
| api/auth/Signup| post| `{UserName ,Password }` | `json` | `{ Title , Description , ImageUrl ,Category}`
---
> **SpareParts**

| endpoints |  Methods | Data/Key | DataType | response 
|--|--| --|--|--|
| api/SpareParts| post  | `{ Data : [] }` | `json` | `[{ "isSuccessfull": true }]`
| api/SpareParts| Delete| `none` | `none` | `{ Title , Description , ImageUrl ,Category}`




