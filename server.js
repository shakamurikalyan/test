var WebSocket = require('rpc-websockets').Client
var ws = new WebSocket('ws://localhost:9090', {
    autoconnect: true,
    reconnect: true,
    reconnect_interval:1000,
    max_reconnects:5
})
module.exports=class name{
    constructor()
    {
       

        const installUrl = `https://keus-resources.s3.ap-south-1.amazonaws.com/keus-iot-releases/2.0.0-main/bundles/install-update.mjs?response-content-disposition=inline&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEJX%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCmFwLXNvdXRoLTEiRzBFAiEAzdsKPlgWVvRVQeYe6ONsBRLR5p%2BhoHFNU5k8y1%2B3brUCIB1RqC2F3RcyVKW3wh35W3ji%2F4yq72MuQUDLvctHgnjLKrACCJ7%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEQAhoMNTMxNjU2NjAxMTQ1IgxoC68WTIOrxS5vK3YqhAJaCViK6jbhgqf71ZIcViAuiSGAF0Rbr%2FF2RjA4jRxOZl%2BnZBVQqim7q7SCKIi43rZoymbKB2%2FbmYzefb%2FTzwi0UGUBVqBeBKGtYtzN%2BPDSvFZ%2BgaCZwNvEenvs%2BWL5Gy6FiV34SkXqyPi1RdgDsCEqriHPIQqU50GK26aXRu7BTPaPm4UaLYRH8Wq6SInuJ6SWz8anujf1BzddpAjvBOuMdXV5rAG8ntXV%2Bv7cRySOALw4uRQsjxUmq8Fp1J3ppChsuTjaHeHSumFtBK%2FfsWDcH8srzrKfnVVYBqGlZGGl%2FgvdqNm6s60YFx41gKxKR5TR20exEgAGMIWMOhFn9hwSCL5zmjDK7dmOBjrfAa5FjfuytRHH%2BHqHkgKQGUtjiNSwOWq%2FKL%2BiYuEcVo1bpIsUMoASye9RKn2xcZ6KJqOlxixfRjQh1qZudsAvoFQaYOGtLcge8h6hXTu0ZDNY4QYCDapaXk9SAcWHxuk3mf2bSTlUl%2BQsnmZq%2FGxBPG0obPjCbC9MknOma9XU5GswynSjkx9wWr2A%2FGQZ3pTzsP75lZ5O0rQrsQ0wy7enGmh6lwm%2FiHmox5%2FDu368%2F9SgSM1eXe3a8AjRJGKauLiv3doekz%2FfGYL%2B3jWQU%2FwjODlvVSwRxGp9pZNjYXlCi6o%3D&X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Date=20220106T110959Z&X-Amz-SignedHeaders=host&X-Amz-Expires=3600&X-Amz-Credential=ASIAXXSJT5Y4WK3V3QP5%2F20220106%2Fap-south-1%2Fs3%2Faws4_request&X-Amz-Signature=3225875c4b0ce16d1b6b48ce2141ffbd278866bb23ce7a2ea1d420754060cdb3`;

        ws.on('error', function (error) {
           // console.log('ERROR', error);
        });

        ws.on('open', async function () {

            console.log('server connected');
            
        })
        ws.connect();
    
    }
    getClient(){
        return ws;
    }
}
