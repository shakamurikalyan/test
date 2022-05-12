var WebSocketServer = require('rpc-websockets').Server
var data = require('./unauthorized.json');
const AsyncDelay = (timeout) => {
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve();
        }, timeout)
    });
}

// instantiate Server and start listening for requests
var server = new WebSocketServer({
    port: 9090,
    host: '0.0.0.0'
})

server.setAuth((params) => {
    for (i = 0; i < data.length; i++) {
        if (params['gatewayId'] == data[i]['gatewayId']) {

            console.log(data[i]['gatewayId'] ,'is offline');
            return false;
        }

    }
    console.log('true'); return true;
})

// register an RPC method
server.register('reboot', async function (params) {
    console.log('called', params);
    await AsyncDelay(2000);
    return { success: true };
});
server.register('login', async function (params) {
    await AsyncDelay(2000);
    console.log(params);
});
