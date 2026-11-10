#!/bin/bash
set -e

echo "=== Step 3: Clone and build ==="
cd /home/ubuntu
if [ -d "video-downloader" ]; then
  cd video-downloader && git pull
else
  git clone https://github.com/swamygswork-123/video-downloader.git
  cd video-downloader
fi
npm install
npm run build
mkdir -p tmp

echo "=== Step 4: Create app service ==="
sudo bash -c 'cat > /etc/systemd/system/saveclip.service << SVCEOF
[Unit]
Description=SaveClip
After=network.target
[Service]
Type=simple
User=ubuntu
WorkingDirectory=/home/ubuntu/video-downloader
ExecStart=/usr/bin/npm run start -- -p 3000
Restart=on-failure
Environment=NODE_ENV=production
[Install]
WantedBy=multi-user.target
SVCEOF'

echo "=== Step 5: Configure Nginx ==="
sudo bash -c 'cat > /etc/nginx/sites-available/saveclip << NGXEOF
server {
    listen 80;
    server_name _;
    client_max_body_size 500M;

    location / {
        proxy_pass http://127.0.0.1:3000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade \$http_upgrade;
        proxy_set_header Connection "upgrade";
        proxy_set_header Host \$host;
        proxy_set_header X-Real-IP \$remote_addr;
        proxy_set_header X-Forwarded-For \$proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto \$scheme;
        proxy_read_timeout 120s;
    }
}
NGXEOF'

sudo ln -sf /etc/nginx/sites-available/saveclip /etc/nginx/sites-enabled/
sudo rm -f /etc/nginx/sites-enabled/default
sudo nginx -t
sudo systemctl restart nginx

echo "=== Step 6: Start app ==="
sudo systemctl daemon-reload
sudo systemctl enable saveclip
sudo systemctl start saveclip

echo ""
echo "========================================="
echo "  DONE! Site is live at:"
echo "  http://$(curl -s ifconfig.me)"
echo "========================================="
