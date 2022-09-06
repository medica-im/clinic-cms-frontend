FROM python:3.10-bullseye AS prod

ENV PYTHONUNBUFFERED 1
ENV DOCKER_CONTAINER 1

ARG DEBIAN_FRONTEND=noninteractive
RUN apt-get clean && apt-get update --allow-insecure-repositories && apt-get install --no-install-recommends -y \
    locales \
    build-essential \
    python3-yaml \
    binutils \
 && rm -rf /var/lib/apt/lists/*
 
RUN echo "Europe/Paris" > /etc/timezone && \
    dpkg-reconfigure -f noninteractive tzdata && \
#    sed -i -e 's/# en_US.UTF-8 UTF-8/en_US.UTF-8 UTF-8/' /etc/locale.gen && \
    sed -i -e 's/# fr_FR.UTF-8 UTF-8/fr_FR.UTF-8 UTF-8/' /etc/locale.gen && \
    echo 'LANG="fr_FR.UTF-8"'>/etc/default/locale && \
    dpkg-reconfigure --frontend=noninteractive locales && \
    update-locale LANG=fr_FR.UTF-8

RUN locale -a
ENV LANG fr_FR.UTF-8
ENV LANGUAGE fr_FR
ENV LC_ALL fr_FR.UTF-8

ADD ./requirements /backend/requirements
RUN pip install pip --upgrade
RUN pip install -r /backend/requirements/common.txt

RUN mkdir /var/log/celery && touch /var/log/celery/celery.log
RUN mkdir /var/log/gunicorn && touch /var/log/gunicorn/gunicorn.log
RUN mkdir /backend/src
WORKDIR /backend/src

ENV PYTHONPATH "$PYTHONPATH:/backend/src/backend:/backend/src"
ENV DJANGO_SETTINGS_MODULE backend.settings

FROM prod AS dev

RUN apt-get clean && apt-get update --allow-insecure-repositories && apt-get install -y \
    postgresql-client \
    gettext \
 && rm -rf /var/lib/apt/lists/*

RUN pip install --upgrade -r /backend/requirements/development.txt