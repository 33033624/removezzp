var FtpDeploy = require('ftp-deploy')
var ftpDeployHtml = new FtpDeploy()
var ftpDeployStatic = new FtpDeploy()

const server = process.argv[2]

var configStatic, configHtml

if (server == '128') {
  configStatic = {
    host: '192.168.185.128',
    username: 'qatest',
    password: '58ftp@fe',
    port: 21,
    localRoot: __dirname + '/../dist/static',
    remoteRoot: '/static.58.com/youpin/activities/static/',
    exclude: ['']
  }

  configHtml = {
    host: '192.168.185.128',
    username: "qatest",
    password: "58ftp@fe",
    port: 21,
    localRoot: __dirname + '/../dist',
    remoteRoot: "/static.58.com/youpin/activities/",
    exclude: ['static/**', 'static']
  }
} 

else if (server == '203') {
  configStatic = {
    host: '10.9.192.203',
    username: 'static@prepub',
    password: 'sta24tfsaic',
    port: 21,
    localRoot: __dirname + '/../dist/static',
    remoteRoot: '/youpin/activities/static/',
    exclude: ['']
  }

  configHtml = {
    host: '10.9.192.203',
    username: 'static@prepub',
    password: "sta24tfsaic",
    port: 21,
    localRoot: __dirname + '/../dist',
    remoteRoot: "/youpin/activities/",
    exclude: ['static/**', 'static']
  }
}

else {
  console.log('[usage]: npm run ftp -- [server]\n available server: 128\\203')
}

if (configStatic && configHtml) {
  ftpDeployStatic.deploy(configStatic, function (err) {
    if (err) console.log(err) // error authenticating or creating/traversing directory
    else {
      console.log('finished static');
    }
  });
  ftpDeployHtml.deploy(configHtml, function (err) {
    if (err) console.log(err)
    else console.log('finished html')
  });
}


