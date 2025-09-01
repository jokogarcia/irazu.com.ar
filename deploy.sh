#!/bin/bash

# Define the remote server and path
REMOTE_SERVER="joaquin@irazu.com.ar"
REMOTE_PATH="/www/irazu"

# Define the local path
LOCAL_PATH="."

TIMESTAMP=$(date +%Y%m%d%H%M%S)
#compress the local directory
tar -czf archives/irazu_$TIMESTAMP.tar.gz --exclude='./archives/*' $LOCAL_PATH
echo "Compressed local directory into archives/irazu_$TIMESTAMP.tar.gz"
echo "Begin upload"
scp archives/irazu_$TIMESTAMP.tar.gz $REMOTE_SERVER:.
echo "Upload complete. Uncompressing in remote server"
ssh $REMOTE_SERVER "rm -rf $REMOTE_PATH/* && mkdir -p $REMOTE_PATH && tar -xzf irazu_$TIMESTAMP.tar.gz -C $REMOTE_PATH"