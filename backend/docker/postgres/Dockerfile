FROM postgres:14

ARG USER_ID
ARG GROUP_ID

RUN if [ ${USER_ID:-0} -ne 0 ] && [ ${GROUP_ID:-0} -ne 0 ]; then \
    userdel -f postgres &&\
    if getent group postgres ; then groupdel postgres; fi &&\
    groupadd -g ${GROUP_ID} postgres &&\
    useradd -l -u ${USER_ID} -g postgres --home-dir=/var/lib/postgresql postgres &&\
    chown --changes --silent --no-dereference --recursive \
          --from=999:999 ${USER_ID}:${GROUP_ID} \
    /var/lib/postgresql \
    /var/lib/postgresql/data \
    /var/run/postgresql \
;fi
        
USER postgres