module.exports = [
        {
                config: {
                        databaseURI: 'mongodb://<MongoDB Address>',
                        appId: '<AppID>',
                        masterKey: '<MasterKey>', // Keep this key secret!
                        fileKey: 'optionalFileKey',
                        serverURL: 'http://localhost/parse'
                },
                path: "/parse",
                listen: "/var/run/shm/parse.sock" //UNIX socket or Port number
        }
];



