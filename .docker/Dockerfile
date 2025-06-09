FROM node:24-slim@sha256:5ae787590295f944e7dc200bf54861bac09bf21b5fdb4c9b97aee7781b6d95a2

WORKDIR /app

COPY . .

COPY .docker/entrypoint.sh /entrypoint.sh
RUN chmod +x /entrypoint.sh

ENTRYPOINT ["/entrypoint.sh"]

EXPOSE 5173
