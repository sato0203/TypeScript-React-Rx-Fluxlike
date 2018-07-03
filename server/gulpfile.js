var gulp = require('gulp');
var sp = require('child_process').spawn;
var minimist = require("minimist");
var projectName = minimist(process.argv.slice(2)).p;
var fs = require("fs");

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
  if(projectName == undefined){
      throw new Error("\"gulp -p [プロジェクト名]の形式で、対象となるSPAプロジェクトを選択してください\"")
  }
  
  if(fs.readdirSync("./js").filter(x => x == `${projectName}.bundle.js`).length == 0){
      throw new Error(`プロジェクト:${projectName}は存在しません`)
  }
  
  server = sp("node",["server.js",projectName]);
  server.stdout.on('data',(data) => {
      console.log("server:"+data.toString())
  })
  server.stderr.on('data',(data) => {
    console.error("server:"+data.toString())
})
})

gulp.task('default',['watch','frontend_watch','up'])