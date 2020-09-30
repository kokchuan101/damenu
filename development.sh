cp frontend/.env.sample frontend/.env.development

sed -i 's/{API_HOST}/http:\/\/localhost:3000/' frontend/.env.development