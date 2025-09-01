#!/bin/bash

# Define the remote server and path
REMOTE_SERVER="joaquin@irazu.com.ar"
REMOTE_PATH="/www/irazu"

ssh $REMOTE_SERVER "cd $REMOTE_PATH && git fetch && git pull"
