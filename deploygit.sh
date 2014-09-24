#!/bin/bash
BASEPATH="${1}"
USER="${2}"
PASSWORD="${3}"
REPOSITORY="${4}"

WORKINGCOPY="${BASEPATH}${REPOSITORY}"
URL="https://github.com/${USER}/${REPOSITORY}.git"
URLWITHCREDENTIALS="https://${USER}:${PASSWORD}@github.com/${USER}/${REPOSITORY}.git"

if [ -d "$WORKINGCOPY" ]; then
cd $WORKINGCOPY
git pull
else
cd $BASEPATH
git clone $URLWITHCREDENTIALS
fi

echo 'Deployment Complete'