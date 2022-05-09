const {
    parentPort,
    workerData
} = require('worker_threads');
var ws;
async function y() {

    ws = await require('./server').init()
}
async function x(id) {
    await y();
    try {
        if (ws) {
            let resp = await ws.login({
                gatewayId: id
            });
            if (resp) {
                return ("online");
            } else {
                return ('offline');
            }
        } else {
            return ('not connected', ws);
        }
    } catch (e) {
        return ('you are not authenticated');
    }

}
parentPort.on('message', async (param) => {
    console.log(param);
    const result = await x(param);
    parentPort.postMessage(result);
});
