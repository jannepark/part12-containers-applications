# FROM node:20

# WORKDIR /usr/src/app

# COPY . .

# # Change npm ci to npm install since we are going to be in development mode
# RUN npm install

# # npm run dev is the command to start the application in development mode
# CMD ["npm", "run", "dev", "--", "--host"]

FROM node:20

WORKDIR /usr/src/app

COPY . .

RUN npm install

ENV VITE_BACKEND_URL=http://localhost:3000/

# npm run dev is the command to start the application in development mode
CMD ["npm", "run", "dev", "--", "--host"]

# FROM nginx:1.25-alpine

# COPY --from=build-stage /usr/src/app/dist /usr/share/nginx/html
