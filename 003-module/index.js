// console.log('global.console', global.console);
// console.log('global.process', global.process);

process.nextTick(function() {
    console.log('nextTick callback!');
})

console.log('nextTick was set!');

// process.exit(function() {
//     console.log('呵呵~');
// })