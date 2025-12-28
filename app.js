let ctx = new (window.AudioContext || window.webkitAudioContext)();

let deckA = new Audio();
let deckB = new Audio();

let srcA = ctx.createMediaElementSource(deckA);
let srcB = ctx.createMediaElementSource(deckB);

let gainA = ctx.createGain();
let gainB = ctx.createGain();

srcA.connect(gainA).connect(ctx.destination);
srcB.connect(gainB).connect(ctx.destination);

let analyserA = ctx.createAnalyser();
let analyserB = ctx.createAnalyser();

gainA.connect(analyserA);
gainB.connect(analyserB);

analyserA.fftSize = 256;
analyserB.fftSize = 256;

function playDeck(d){
  ctx.resume();
  if(d==="A"){
    deckA.src = URL.createObjectURL(fileA.files[0]);
    deckA.play();
    drawWave(analyserA, waveA);
  }else{
    deckB.src = URL.createObjectURL(fileB.files[0]);
    deckB.play();
    drawWave(analyserB, waveB);
  }
}

function drawWave(analyser, canvas){
  let c = canvas.getContext("2d");
  let data = new Uint8Array(analyser.frequencyBinCount);

  function draw(){
    requestAnimationFrame(draw);
    analyser.getByteFrequencyData(data);
    c.fillStyle="#000";
    c.fillRect(0,0,canvas.width,canvas.height);
    let w = canvas.width/data.length;
    data.forEach((v,i)=>{
      c.fillStyle="#0ff";
      c.fillRect(i*w,canvas.height,v/3,w-1);
    });
  }
  draw();
}

cross.oninput=e=>{
  let v=e.target.value/100;
  gainA.gain.value=1-v;
  gainB.gain.value=v;
};
