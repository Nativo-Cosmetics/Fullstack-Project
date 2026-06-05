## 1. Inicialización del proyecto.
 `npm init`
## 2. Instalación de Dependencias
```
  npm insta express --save
  npm insta mongoose --save
  npm insta multer --save
  npm insta validator --save
  npm insta cors --save
  npm insta nodemon --save-dev
```
### 3. Agregar tu endpoint en package.json
```
  "scripts": {
                "dev": "nodemon [NAME_OF_YOUR_ENDPOINT_FILE.EXTENSION]",
                "test": ...
            }
            ...
        }
```
