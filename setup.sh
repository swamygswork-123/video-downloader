#!/bin/bash
set -e

echo "=== SaveClip Server Setup ==="
echo ""

# Update system
echo "1/7 Updating system..."
sudo apt update -y && sudo apt upgrade -y

# Install Node.js 22
echo "2/7 Installing Node.js 22..."
curl -fsSL https://deb.nodesource.com/setup_22.x | sudo -E bash -
sudo apt install -y nodejs

# Install ffmpeg and python3-pip
echo "3/7 Installing ffmpeg & pip..."
sudo apt install -y ffmpeg python3-pip python3-venv

# Install yt-dlp
echo "4/7 Installing yt-dlp..."
sudo pip3 install yt-dlp --break-system-packages

# Install Nginx
echo "5/7 Installing Nginx..."
sudo apt install -y nginx

# Clone the project
echo "6/7 Cloning project..."
cd /home/ubuntu
if [ -d "video-downloader" ]; then
  cd video-downloader && git pull
else
  git clone https://github.com/swamygswork-123/video-downloader.git
  cd video-downloader
fi

# Install dependencies and build
npm install
npm run build

# Create systemd service
echo "7/7 Setting up services..."
sudo tee /etc/systemd/system/saveclip.service > /dev/null <<EOF
[Unit]
Description=SaveClip Video Downloader
After=network.target

[Service]
Type=simple
User=ubuntu
WorkingDirectory=/home/ubuntu/video-downloader
ExecStart=/usr/bin/npm run start -- -p 3000
Restart=on-failure
RestartSec=5
Environment=NODE_ENV=production
Environment=PORT=3000

[Install]
WantedBy=multi-user.target
EOF

# Configure Nginx
sudo tee /etc/nginx/sites-available/saveclip > /dev/null <<'EOF'
server {
    listen 80;
    server_name _;

    client_max_body_size 500M;

    location / {
        proxy_pass http://127.0.0.1:3000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
        proxy_cache_bypass $http_upgrade;
        proxy_read_timeout 120s;
    }
}
EOF

sudo ln -sf /etc/nginx/sites-available/saveclip /etc/nginx/sites-enabled/
sudo rm -f /etc/nginx/sites-enabled/default
sudo nginx -t && sudo systemctl restart nginx

# Start the app
sudo systemctl daemon-reload
sudo systemctl enable saveclip
sudo systemctl start saveclip

# Create tmp directory for downloads
mkdir -p /home/ubuntu/video-downloader/tmp

echo ""
echo "=== Setup Complete! ==="
echo "Your site is live at: http://$(curl -s ifconfig.me)"
echo ""
echo "Useful commands:"
echo "  sudo systemctl status saveclip    # Check app status"
echo "  sudo systemctl restart saveclip   # Restart app"
echo "  sudo journalctl -u saveclip -f    # View logs"
