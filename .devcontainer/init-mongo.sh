# at the time it is not currently possible for a js init script
# file to be run and use the environment variables. For the time
# being I am forced to use the shell script with less inline
# documentation available

# alternatively if password were stored in a secret file
# you can use:
#   var rootPassword = '$(cat "$MONGO_INITDB_ROOT_PASSWORD_FILE")';

# it is EXTREMELY important that this script be authorized with the
# admin credentials, or alternatively the mongodb server can be setup
# with no credentials which would just be unsafe
# https://gist.github.com/x-yuri/22eace6d6d047cbe090e1412eaabc97b
# https://gist.github.com/x-yuri/32cd42ebd78d73f6d8f03de44b495210

printf "=============================================\n" 
printf "==============                 ==============\n"
printf "========     Initializing New User    =======\n"
printf "==============                 ==============\n"
printf "=============================================\n"

echo "Creating User: $MONGO_INITDB_USERNAME"

mongo -- "$MONGO_INITDB_DATABASE" << EOF

    var rootUser = '$MONGO_INITDB_ROOT_USERNAME';
    var rootPassword = '$MONGO_INITDB_ROOT_PASSWORD';
    var dbName = '$MONGO_INITDB_DATABASE';

    var adminDB = db.getSiblingDB('admin');
    adminDB.auth(rootUser, rootPassword);

    var user = '$MONGO_INITDB_USERNAME';
    var password = '$MONGO_INITDB_PASSWORD';

    db.createUser({user: user, pwd: password, roles: [{role: "readWrite", db: dbName}]});
EOF