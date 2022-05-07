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
                console.log(p, data[i]['gatewayId']);
            } else {
                console.log('ppp',p);
            }
        } catch (e) {
            console.log('this is error', e);
        }
    }
}

abc();