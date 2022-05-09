const {
    StaticPool
} = require("node-worker-threads-pool")
const data = require('./data.json');
var count = require('./count');
count = count['count'];
const pool = new StaticPool({
    size: count,
    task: './worker.js',
    workerData: 'workerData!'
});
const abc = async () => {
    //let status=await thread.spawn(new thread.Worker('./server.js'));
    for (let i = 0; i < data.length; i++) {
        try {
            let p = await pool.exec(data[i]['gatewayId']);
            if (p == 'online') {
                console.log('---------------------------------------online');
            } else if (p == 'offline') {
                console.log('offline', 'trying to reconnect');
                let c=0;
                let tries=setInterval(async () => {
                    let res = await pool.exec(data[i]['gatewayId']);
                    if (res == 'online') {
                        console.log(data[i]['contactName'], 'changed to online');
                        clearInterval(tries);
                    } else {
                        if (c == 2) {
                            console.log('maximum tries reached for ', data[i]['contactName'], 'still offline');
                            clearInterval(tries)
                        } else {
                            c = c + 1;
                            console.log('try', c);
                        }
                    }
                },2000);
            } else {
                console.log(p);
            }
        } catch (e) {
            console.log('this is error', e);
        }
    }
}

abc();
