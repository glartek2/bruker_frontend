FROM node:24-slim@sha256:f403f3b5054f8f35ebe8dd167e0c608945a8fd992f3d278d2a8652b58b80dc92

WORKDIR /app

COPY . .

COPY .docker/entrypoint.sh /entrypoint.sh
RUN chmod +x /entrypoint.sh

ENTRYPOINT ["/entrypoint.sh"]

EXPOSE 5173
