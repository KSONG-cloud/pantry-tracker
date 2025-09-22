# Base image
FROM mcr.microsoft.com/devcontainers/base:ubuntu

# Install PostgreSQL
RUN apt-get update && export DEBIAN_FRONTEND=noninteractive \
    && apt-get -y install postgresql postgresql-contrib

# Default to bash
CMD ["/bin/bash"]
