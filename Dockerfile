# Stage 1: Build
FROM node:18-alpine AS build

WORKDIR /app

# Install pnpm globally
RUN npm install -g pnpm

# Copy package.json and pnpm-lock.yaml for caching
COPY package.json pnpm-lock.yaml* ./

RUN pnpm install

COPY . .

# Define build args to accept env vars during docker build
ARG VITE_SUPABASE_URL
ARG VITE_SUPABASE_KEY

# Set env vars for build stage
ENV VITE_SUPABASE_URL=$VITE_SUPABASE_URL
ENV VITE_SUPABASE_KEY=$VITE_SUPABASE_KEY

RUN pnpm run build

# Stage 2: Serve with Nginx
FROM nginx:alpine

COPY --from=build /app/dist /usr/share/nginx/html

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
