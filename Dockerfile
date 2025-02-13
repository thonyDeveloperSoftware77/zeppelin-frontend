# Usa la imagen base de Bun
FROM oven/bun:1.1.20-alpine

# Establece el directorio de trabajo
WORKDIR /app

# Copia los archivos necesarios
COPY package.json .
COPY bun.lock .

# Instala las dependencias de producción
RUN bun install --production

# Copia el build generado localmente
COPY build/ ./build/

# Instala un servidor estático (serve)
RUN bun add -g serve

# Expone el puerto 3002
EXPOSE 3002

# Comando para servir la aplicación
CMD ["serve", "-s", "build", "-l", "3002"]