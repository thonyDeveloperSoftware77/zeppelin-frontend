# Usa la imagen base de Bun
FROM oven/bun:1.1.20-alpine

# Establece el directorio de trabajo
WORKDIR /app

# Copia los archivos necesarios
COPY package.json bun.lock ./

# Instala solo dependencias de producción (más ligero)
RUN bun install --production

# Copia la carpeta de build generada previamente en GitHub Actions
COPY build/ ./build/

# Expone el puerto 3002
EXPOSE 3002

# Usa Bun para servir archivos estáticos sin `serve`
CMD ["bun", "run", "--allow-net", "static-server.js"]
