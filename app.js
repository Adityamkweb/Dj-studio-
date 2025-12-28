let A = new Audio(), B = new Audio();

function play(id){
  let file = document.getElementById(id).files[0];
  if(id=="a"){ A.src=URL.createObjectURL(file); A.play(); }
  else{ B.src=URL.createObjectURL(file); B.play(); }
}

document.getElementById("mix").oninput=e=>{
  let v=e.target.value/100;
  A.volume=1-v;
  B.volume=v;
}
