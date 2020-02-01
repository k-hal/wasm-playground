// Set up our memory
// By growing our Wasm Memory by 1 page (64KB)
// https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/WebAssembly/Memory#Examples
memory.grow(1);

// インデックスの0番目に24を設定
const index = 0;
const value = 24;
store<u8>(index, value);

// インデックスの1番目を取得する関数
// ※今回、jsファイルの方からインデックスの1番目を設定するコードを書きます
export function readWasmMemoryAndReturnIndexOne(): i32 {
    let valueAtIndexOne = load<u8>(1);
    return valueAtIndexOne;
}
