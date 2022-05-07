const { parentPort, workerData } = require('worker_threads');

var ws;
async function y(){
    
  ws=await require('./server').init()
}


async function x(id){
   await  y();
   try{
    if(ws){
    await ws.login({
        gatewayId: id
    });
    return("online");
}
    else{
        return('not connected',ws);
    }}
    catch(e){
        return('offline');
    }
    
}
parentPort.on('message',async  (param) => {
    const result = await x(param);
  
    // Access the workerData.
  
  
    // return the result to main thread.
    parentPort.postMessage(result);
  });