# Etapa 1: Compilar Angular
FROM node:18-alpine AS build

WORKDIR /app
COPY package*.json ./
RUN npm ci
COPY . .
RUN npm run build 

# Etapa 2: Servir con Nginx
FROM nginx:alpine

# Copiar archivos de build al servidor de Nginx
COPY --from=build /app/dist/frond-cc /usr/share/nginx/html

# Configuración personalizada de Nginx (opcional)
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Exponer el puerto interno del contenedor (Nginx usa 80)
EXPOSE 82

CMD ["nginx", "-g", "daemon off;"]
