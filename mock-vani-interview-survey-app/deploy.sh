# deploy.sh
#!/bin/bash
cd /home/site/wwwroot
if [ -f package.json ]; then
    npm install
else
    echo "Error: package.json not found in $(pwd)"
    exit 1
fi
