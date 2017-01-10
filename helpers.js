Object.prototype.forEach = function (cb) {
    for (let key in this) {
        if (this.hasOwnProperty(key)) {
            cb(this[key]);
        }
    }
}
