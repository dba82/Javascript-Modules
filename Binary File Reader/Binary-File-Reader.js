/*
  http://stevehanov.ca/blog/index.php?id=143
*/

function BinaryReader(arrayBuffer){
    this.pos = 0;
    this.data = new Uint8Array(arrayBuffer);
}

BinaryReader.prototype = {
    seek: function(pos) {
        if (pos >=0 && pos <= this.data.length){
          var oldPos = this.pos;//wieso wird die überhaupt gespeichert bzw. zurückgegeben?
          this.pos = pos;
          return oldPos; //wieso? Das kommt überhaupt nicht raus aus dem Namen der Methode und spart minimalst Code, man kann einfach vorher tell() aufrufen, wenn man den Wert braucht, ich änder das im FOnt File Reader und schmeiss das raus
        }
    },

    tell: function() {
        return this.pos;
    },

    getUint8: function() {
        if (this.pos < this.data.length) return this.data[this.pos++]; //WICHTIG! ok hier wird der Positionszeiger gleich automatisch eins weitergesetzt, gefällt mir nicht

    },

    getUint16: function() {
        return ((this.getUint8() << 8) | this.getUint8()) >>> 0;//AAAAAHHHHH hier wird rumgeshiftet und bitweise geodert!!
/*
http://stevehanov.ca/blog/index.php?id=143
Javascript has a wishy-washy "number" type. It is usually a 32-bit integer.
It switches from signed to unsigned whenever it feels like it,
and when you least expect it, it will switch to a 64-bit double precision number.

But you can force it to be signed using the "unsigned shift right" operator (>>>).
 By shifting it by 0, it converts the internal type to unsigned.
*/
    },

    getUint32: function() {
       return this.getInt32() >>> 0;
    },

    getInt16: function() {
        var result = this.getUint16();
        if (result & 0x8000) {
            result -= (1 << 16);
        }
        return result;
    },

    getInt32: function() {
        return ((this.getUint8() << 24) |
                (this.getUint8() << 16) |
                (this.getUint8() <<  8) |
                (this.getUint8()      ));
    },

    getFword: function() {
        return this.getInt16();
    },

    get2Dot14: function() {
        return this.getInt16() / (1 << 14);
    },

    getFixed: function() {
        return this.getInt32() / (1 << 16);
    },

    getString: function(length) {
        var result = "";
        for(var i = 0; i < length; i++) {
            result += String.fromCharCode(this.getUint8());
        }
        return result;
    },

    getDate: function() {
        var macTime = this.getUint32() * 0x100000000 + this.getUint32();
        var utcTime = macTime * 1000 + Date.UTC(1904, 1, 1);
        return new Date(utcTime);
    }
};
