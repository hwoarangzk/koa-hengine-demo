let queue = {};

const render = () => {
 let p = new Promise((r, j) => {
  p.resolve = r;
 });
 let id = Math.random();
 queue[id] = p;
 startWorker(id); 
 return p;
};

process.on('message', data => {
 queue[data.id].resolve(data.content);
});

//
this.body = yield render();
