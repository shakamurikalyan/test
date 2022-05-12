const {
    parentPort,
    workerData
} = require('worker_threads');
const axios=require('axios');


const AsyncDelay = (timeout) => {
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve();
        }, timeout)
    });
}
var wes=require('./server');

var ws=new wes().getClient();
async function x(id) {
    await AsyncDelay(20);
    try {
            let resp = await ws.login({
                gatewayId: id
            });
            //console.log('rep',resp)
            if (resp) {
                return ("online");
            } else {
                console.log('offine')
                return ('offline');
            }
        
    } catch (e) {
       if(e.message=='authentication failed')
       return('offline')
       if(e.message=='socket not ready')
       return('Error: socket not ready')

        return (e);
    }

}
parentPort.on('message', async (param) => {
    
    const result = await x(param['id']);
    await logdata(result,param['name']);
    parentPort.postMessage(result);
});
function logdata(p,name){
    return new Promise(resolve=>{
        let x= axios({method:'post',
    url:'https://log-api.newrelic.com/log/v1?Api-Key=14c78db3ac66379a78e2e1e2812978d0FFFFNRAL',
    headers:{'Api-Key':'03c0092c8c41d9cae6a47e9cc617e61ff73fNRAL'},
    timestamp:Date.now(),
    data:{
        "message":p,
        "name":name
      }
 },
  ).then((response)=>{
  resolve('done');
  })
    })

}
