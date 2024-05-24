#!/bin/bash

# Function to kill existing process by name
kill_process() {
  local process_name=$1
  echo "Checking for process: $process_name"
  pkill -f "$process_name"
  if [ $? -eq 0 ]; then
    echo "Successfully terminated process: $process_name"
  else
    echo "No process found with name: $process_name"
  fi
}

echo "Starting process termination script"

# Kill existing processes for front_node and back_node
kill_process "frontend"
kill_process "backend"

echo "Process termination script completed"
