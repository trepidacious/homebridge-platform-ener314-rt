var CommandQueue = function CommandQueue(delay) {
    this.delay = delay;
    this._queue = [];
    this._interval = setInterval(this.process.bind(this), this.delay);
}

CommandQueue.prototype.queue = function queue(func) {
  this._queue.push(func);
}

CommandQueue.prototype.process = function process() {
  var funcArray = this._queue.splice(0, 1);
  if (funcArray[0]) {
    funcArray[0]();
  }
}

module.exports = CommandQueue;
