# Imagen base ligera de Node.js
FROM node:18-alpine

# Crear directorio de trabajo
WORKDIR /app

# Copiar dependencias e instalarlas
COPY package*.json ./
RUN npm install --production

# Copiar el resto del código
COPY . .

# Exponer el puerto del backend (ajústalo si tu app usa otro)
EXPOSE 3007

# Comando de inicio
CMD ["npm", "start"]
