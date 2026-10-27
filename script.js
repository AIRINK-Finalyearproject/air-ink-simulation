const $ = id => document.getElementById(id);
const controls = ["flow","pm","capture","purify","solid","time"];

const defaults = {flow:500, pm:0.08, capture:75, purify:85, solid:18, time:60};
const demo = {flow:1000, pm:0.12, capture:82, purify:90, solid:20, time:120};

function syncLabels(){
  $("flowVal").textContent=$("flow").value;
  $("pmVal").textContent=Number($("pm").value).toFixed(2);
  $("captureVal").textContent=$("capture").value;
  $("purifyVal").textContent=$("purify").value;
  $("solidVal").textContent=$("solid").value;
  $("timeVal").textContent=$("time").value;
  calculate(false);
}
controls.forEach(id => $(id).addEventListener("input", syncLabels));

function calculate(updateHero=true){
  // Q: L/min -> m3/min
  const Q = Number($("flow").value)/1000;
  const C = Number($("pm").value); // g/m3
  const t = Number($("time").value);
  const cap = Number($("capture").value)/100;
  const pur = Number($("purify").value)/100;
  const solids = Number($("solid").value)/100;

  const pmIn = Q*C*t;
  const captured = pmIn*cap;
  const carbon = captured*pur;
  const ink = carbon/solids;

  $("mInput").textContent = pmIn.toFixed(2)+" g";
  $("mCaptured").textContent = captured.toFixed(2)+" g";
  $("mCarbon").textContent = carbon.toFixed(2)+" g";
  $("mInk").textContent = ink.toFixed(2)+" g";
  if(updateHero) $("heroInk").textContent = ink.toFixed(2)+" g";
  return {pmIn,captured,carbon,ink};
}

function setValues(v){
  controls.forEach(id => $(id).value=v[id]);
  syncLabels();
}

$("runBtn").addEventListener("click", ()=>{
  const result=calculate(true);
  $("status").textContent="RUNNING";
  $("status").className="status running";
  document.querySelectorAll(".stage").forEach(s=>s.classList.remove("active"));
  const particle=$("movingParticle");
  particle.style.opacity=1;
  particle.style.transition="none";
  particle.style.left="0%";
  let i=0;
  const stages=document.querySelectorAll(".stage");
  const tick=setInterval(()=>{
    if(i>4){
      clearInterval(tick);
      $("status").textContent="COMPLETE";
      $("status").className="status done";
      return;
    }
    stages.forEach(s=>s.classList.remove("active"));
    stages[i].classList.add("active");
    particle.style.transition="left .65s ease";
    particle.style.left=(i*25)+"%";
    i++;
  },700);
});

$("resetBtn").addEventListener("click",()=>setValues(defaults));
$("demoBtn").addEventListener("click",()=>setValues(demo));

$("themeBtn").addEventListener("click",()=>{
  document.body.classList.toggle("night");
  $("themeBtn").textContent=document.body.classList.contains("night")?"☀":"☾";
});

syncLabels();
