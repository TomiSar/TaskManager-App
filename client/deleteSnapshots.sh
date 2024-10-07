#!/bin/bash
echo "Deleting all local test snapshots"
find . -type d -name "__snapshots__" -exec rm -rf {} +