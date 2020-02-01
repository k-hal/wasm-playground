export const wasmBrowserInstantiate = async (wasmModuleUrl, importObject) => {
    let response = undefined;

    if (!importObject) {
        importObject = {
            env: {
                abort: () => console.log("Abort!")
            }
        };
    }

    if (WebAssembly.instantiateStreaming) {
        response = await WebAssembly.instantiateStreaming(
            fetch(wasmModuleUrl),
            importObject
        );
    } else {
        const fetchAndInstantiateTask = async () => {
            const wasmArrayBuffer = await fetch(wasmModuleUrl).then(response =>
                response.arrayBuffer()
            );
            return WebAssembly.instantiate(wasmArrayBuffer, importObject);
        };
        response = await fetchAndInstantiateTask();
    }

    return response;
};

const runWasm = async () => {
    // Instantiate our wasm module
    const wasmModule = await wasmBrowserInstantiate("./exports.wasm");
  
    // Get our exports object, with all of our exported Wasm Properties
    const exports = wasmModule.instance.exports;
  
    console.log(exports.callMeFromJavascript(24, 24)); // Logs 49
  
    // Since our constant is a global we use `.valueOf()`.
    // Though, in some cases this could simply be: exports.GET_THIS_CONSTANT_FROM_JAVASCRIPT
    console.log(exports.GET_THIS_CONSTANT_FROM_JAVASCRIPT.valueOf()); // Logs 2424
  
    // Trying to access a property we did NOT export
    console.log(exports.addIntegerWithConstant); // Logs undefined
  };
  runWasm();
