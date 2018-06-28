var gulp = require('gulp');
var sp = require('child_process').spawn;

var server = null;

gulp.task('watch',function(){
    return gulp.watch(["./server.js","./configure.json","./configure-local.json"], ['up'])
})

gulp.task('frontend_watch',function(){
    const frontend_compile = sp("npx",["gulp","production","--gulpfile","../frontend/gulpfile.js"])
    frontend_compile.stdout.on('data',(data) => {
        console.log("frontend_compile:" + data.toString());
    })
})

gulp.task('up',function(){
  if(server != null){
      server.kill();
  }
  server = sp("node",["server.js"]);
  server.stdout.on('data',(data) => {
      console.log("server:"+data.toString())
  })
  server.stderr.on('data',(data) => {
    console.error("server:"+data.toString())
})
})

gulp.task('default',['watch','frontend_watch','up'])