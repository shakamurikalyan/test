const {
    StaticPool
} = require("node-worker-threads-pool")
const data = require('./data.json');
var count = require('./count');
const newrelic=require('newrelic')
var reconnect=0;
const axios=require('axios');
count = count['count'];
const pool = new StaticPool({
    size: count,
    task: './worker.js',
    workerData: 'workerData!'
});
// const log=new StaticPool({
//     size:100,
//     task:'./log.js'
// })
const AsyncDelay = (timeout) => {
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve();
        }, timeout)
    });
}
const abc = async () => {
    var transaction = newrelic.getTransaction()
    //let status=await thread.spawn(new thread.Worker('./server.js'));
    for (let i = 0; i < data.length; i++) {
        try {
           
            let p = await pool.exec({id:data[i]['gatewayId'],name:data[i]['contactName']});
            
            if (p == 'online') {
               // let x=await log.exec(p,data[i]['contactName']);
               console.log('online',data[i]['contactName']);
              // console.log(newrelic.addCustomAttribute('output', true));
               
                //console.log('---------------------------------------online',data[i]['contactName']);
            } else if (p == 'offline') {
               // let x=await log.exec(p,data[i]['contactName']);
                console.log(data[i]['contactName'],'offline', 'trying to reconnect');
                let c=0;
                let tries=setInterval(async () => {
                    let res = await pool.exec({id:data[i]['gatewayId'],name:data[i]['contactName']});
                   // let x=await log.exec(res);
                    if (res == 'online') {
                        console.log(data[i]['contactName'], 'changed to online');
                        clearInterval(tries);
                    } else {
                        if (c == 2) {
                            console.log('maximum tries reached for ', data[i]['contactName'], 'still offline');
                            clearInterval(tries)
                        } else {
                            c = c + 1;
                            console.log(data[i]['contactName'],'try', c);
                        }
                    }
                },2000);
            }else if(p=='Error: socket not ready'){
                console.log('unable to connect to server ');
                await AsyncDelay(5000);
                newrelic.noticeError(p);
                reconnect=reconnect+1;
                if(reconnect==5){
                    break;
                }
                //break;
            }
             else {
                throw p;
            }
        } catch (e) {
            console.log('this is error', e);
            newrelic.noticeError(e);

            break;
        }
    }
    transaction.end();
}

abc();
