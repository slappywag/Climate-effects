users=(); hosts=(); dests=();
users['eu-tq']="www-file"
hosts['eu-tq']="eu-iomad-tq.learnsci.com"
dests['eu-tq']="/var/www/moodlefile"

# build command
git clean -xdf
yarn install
yarn run build

# site path
site="./dist"

# meta path
#meta="./meta"
