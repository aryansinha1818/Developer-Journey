# ---------- Build Stage ----------
FROM node:18 AS build

WORKDIR /app

COPY package*.json ./
RUN npm install

COPY . .
RUN npm run build


# ---------- Run Stage ----------
FROM node:18

WORKDIR /app

# Install a simple static server
RUN npm install -g serve

# Copy built files only
COPY --from=build /app/dist ./dist

EXPOSE 5173

CMD ["serve", "-s", "dist", "-l", "5173"]
