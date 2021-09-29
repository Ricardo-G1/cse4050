function log(...args){
    //for(let i = 0; i < args.length; ++i){
    //    console.log(args[i]);
    //}
  args.forEach(arg => console.log(arg));  
}

document.title = "hi";

function adjust_canvas(){
//const canvas = document.createElement('canvas');
  g_canvas.style.width = window.innerWidth;
  g_canvas.style.height = window.innerHeight;
//canvas.style.backgroundColor = 'black';
}

adjust_canvas();

window.addEventListener('resize', function(){
  log('resize happened');

})
