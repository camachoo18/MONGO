# Usamos una imagen base oficial de Node.js
FROM node:18

# Establecemos el directorio de trabajo dentro del contenedor
WORKDIR /usr/src/app

# Copiamos el archivo package.json y package-lock.json (si existe) para instalar dependencias
COPY package*.json ./

# Instalamos las dependencias de la aplicación
RUN npm install

# Copiamos el resto del código fuente de la aplicación al contenedor
COPY . .

# Exponemos el puerto en el que la aplicación va a correr
EXPOSE 3003

# Comando para iniciar la aplicación
CMD ["npm", "start"]

# Construye la imagen con docker build -t mi-app .
