# Instalar MongoDB en linux

`mongoinstall.sh` ->

```bash
sudo apt-get install gnupg curl -y
curl -fsSL https://www.mongodb.org/static/pgp/server-8.0.asc | \
   sudo gpg -o /usr/share/keyrings/mongodb-server-8.0.gpg \
   --dearmor
echo "deb [ arch=amd64,arm64 signed-by=/usr/share/keyrings/mongodb-server-8.0.gpg ] https://repo.mongodb.org/apt/ubuntu jammy/mongodb-org/8.0 multiverse" | sudo tee /etc/apt/sources.list.d/mongodb-org-8.0.list
sudo apt-get update
sudo apt-get install -y mongodb-org
```

# Iniciar MongoDB

**Iniciarlo**:
sudo systemctl start mongod.service 
**Ver si el servidor está activo**:
sudo systemctl status mongod.service 
**Para empezar**:
mongosh 

## 
**Ejemplo con libros**:

```mongodb

use libros

db.`+ tab`

-- Crear una collecion, de libros en este caso
db.createCollection("fantasia")

-- Obtener los nombres de las colleciones
db.getCollectionNames()

-- Insertar un objeto 
db.fantasia.insertOne({ 
"autor": "Tolkien",
"titulo": "El señor de los anillos"
})
-- Insertr varios objetos
db.fantasia.insertMany(
{ 
"autor": "Tolkien",
"titulo": "El señor de los anillos"
},
{ 
"autor": "Brandon Sanderson",
"titulo": "El hombre iluminado"
}

)

-- Buscar algo dentro del objeto
db.fantasia.find({ "autor": "Tolkien" } )

-- Actualizar un objeto
db.fantasia.updateOne({"titulo":"EL trono de cristal"},
 {$set: {"titulo":"El trono de cristal"}})

-- Borrar un objeto
db.fantasia.deleteOne({"titulo":"El trono de cristal"})

-- Borrar la base de datos
db.dropDatabase()

```