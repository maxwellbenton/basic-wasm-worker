self.onmessage = async function(event: MessageEvent) {
  const response = await fetch('assembledScript.wasm');
  const bytes = await response.arrayBuffer();
  const { instance }: any = await WebAssembly.instantiate(bytes);

  // call a function exported by the wasm module
  const result = instance.exports.echo(event.data);

  // send result back to main thread
  self.postMessage(result);
};
