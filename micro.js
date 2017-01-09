(function(ext) {

    ext._shutdown = function() {
        console.log("shutdown");
    };

    ext._getStatus = function() {

        console.log("Calling from getStatus");
        console.log(device);
        console.log("-----------------------");

        if (!device) return { status: 1, msg: 'Device not connected' };
        return { status: 2, msg: 'Device connected' };

    };

    ext.my_first_block = function() {
        // Code that gets executed when the block is run
        // currently unused
    };

    var device;
    var poller = null;
    var flag = 0;

    function deviceOpened(dev) {

        console.log("Calling from deviceOpened");
        console.log(device);
        console.log("-----------------------");

        if (flag == 0) {

            /*var pingCmd = new Uint8Array(1);
            pingCmd[0] = 1;
            poller = setInterval(function() {
                console.log("poller called");
                //console.log(pingCmd.buffer);
                device.send(pingCmd.buffer);
                // not sent
            }, 1000);*/

            // not executed
            device.set_receive_handler(cb);
            flag++;
        }
    };

    /*ext._deviceConnected = function(dev) {

        console.log("Calling from deviceConnected");

        if (device) return;

        console.log("connected2");

        device = dev;
        console.log("+++ " + device);

        device.open({ stopBits: 1, bitRate: 115200, ctsFlowControl: 0 }, deviceOpened);
};*/

    var c = 0;
    ext._deviceConnected = function(dev) {

        //console.log("Calling from deviceConnected");
        //console.log("-----------------------");

        if (dev) {
            if (c == 0) {
                console.log("..............");
                console.log(dev);
                console.log("..............");
                console.log(c);
                c++;
                device = dev;
                device.open({ stopBits: 1, bitRate: 115200, ctsFlowControl: 0 }, deviceOpened);
                console.log("OPENED");
            }

        } else {
            console.log("no device");
        }
    };

    function cb(data) {
        console.log(data);
        console.log("test");
    }

    ext._deviceRemoved = function(dev) {
        console.log("removed");
        if (device != dev) return;
        if (poller) poller = clearInterval(poller);
        device = null;
    };


    var descriptor = {
        blocks: [
            // Block type, block name, function name
            [' ', 'my first block', 'my_first_block'],
        ]
    };

    // Register the extension
    //var hid_info = { type: 'hid', vendor: 0x0d28, product: 0x0204 };
    //ScratchExtensions.register('SoloTest', descriptor, ext, hid_info);
    var serial_info = { type: 'serial' };
    ScratchExtensions.register('Example', descriptor, ext, serial_info);
})({});