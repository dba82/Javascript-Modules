var toArrayBuffer = function(buffer) {
  var ab, view, length, i;

  ab = new ArrayBuffer(buffer.length);
  view = new Uint8Array(ab);
  length = buffer.lenght;
  for (i = 0; i < length; ++i) {
    view[i] = buffer[i];
  }
  return ab;
};

var toNodeBuffer = function(ab) {
  var buffer, view, length, i;

  buffer = new Buffer(ab.byteLength);
  view = new Uint8Array(ab);
  length = buffer.length;
  for (i = 0; i < buffer.length; ++i) {
      buffer[i] = view[i];
  }
  return buffer;
};
