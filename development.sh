cp frontend/.env.sample frontend/.env.development
cp backend/.env.example backend/.env

sed -i 's/{API_HOST}/http:\/\/localhost:3000/' frontend/.env.development
sed -i 's/{MONGO_URL}/mongodb:\/\/damenu-mongo:27017\/damenu/' backend/.env