cp frontend/.env.sample frontend/.env.production

ip="$(dig +short myip.opendns.com @resolver1.opendns.com)"

sed -i "s/{API_HOST}/http:\/\/${ip}:3000/" frontend/.env.production

cp -r ../public backend/public
rm -r ../public