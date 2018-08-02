FROM node:8.11-stretch

RUN apt-get update \
    && apt-get -y install --no-install-recommends libcap2-bin


COPY ./domain.crt /
COPY ./test.js /
ENV NODE_EXTRA_CA_CERTS=/domain.crt

RUN setcap 'cap_net_bind_service=+ep' /usr/local/bin/node

USER node

CMD ["node", "test.js"]
