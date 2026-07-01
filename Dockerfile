FROM ubuntu:latest
LABEL authors="t.ngoupaye"

ENTRYPOINT ["top", "-b"]