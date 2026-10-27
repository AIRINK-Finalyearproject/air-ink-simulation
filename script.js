const $=id=>document.getElementById(id);
const ids=["flow","pm","cap","pur","sol","time"];
const defaults={flow:500,pm:.08,cap:75,pur:85,sol:18,time:60};
const demo={flow:1000,pm:.12,cap:82,pur:90,sol:20,time:120};

function model(){
 const Q=+$("flow").value/1000,C=+$("pm").value,t=+$("time").value;
 const cap=+$("cap").value/100,pur=+$("pur").value/100,sol=+$("sol").value/100;
 const input=Q*C*t,captured=input*cap,carbon=captured*pur,ink=carbon/sol,net=cap*pur*100;
 $("vFlow").value; $("vFlow").textContent=$("flow").value;$("vPM").textContent=(+$("pm").value).toFixed(2);
 $("vCap").textContent=$("cap").value;$("vPur").textContent=$("pur").value;$("vSol").textContent=$("sol").value;$("vTime").textContent=$("time").value;
 $("pFlow").textContent=$("flow").value+" L/min";$("pCap").textContent=$("cap").value+"%";$("pPur").textContent=$("pur").value+"%";
 $("pRaw").textContent=captured.toFixed(2)+" g";$("pInk").textContent=ink.toFixed(2)+" g";
 $("pIn").textContent=input.toFixed(2)+" g";$("pCaptured").textContent=captured.toFixed(2)+" g";$("pCarbon").textContent=carbon.toFixed(2)+" g";$("pInk2").textContent=ink.toFixed(2)+" g";
 $("rIn").textContent=input.toFixed(2);$("rCaptured").textContent=captured.toFixed(2);$("rCarbon").textContent=carbon.toFixed(2);$("rInk").textContent=ink.toFixed(2);
 $("heroInk").textContent=ink.toFixed(2)+" g";$("nCap").textContent=$("cap").value+"%";$("nPur").textContent=$("pur").value+"%";
 $("nCarbon").textContent=carbon.toFixed(2)+" g";$("nInk").textContent=ink.toFixed(2)+" g";
 $("impactCarbon").textContent=carbon.toFixed(2)+" g";$("impactEff").textContent=net.toFixed(1)+"%";$("impactSolids").textContent=$("sol").value+"%";
 $("netText").textContent=net.toFixed(1)+"%";$("gaugeValue").textContent=net.toFixed(1);
 $("gauge").style.background=`conic-gradient(#d9ff37 0 ${net}%,#293228 ${net}% 100%)`;
 const vals=[input,captured,carbon,ink],max=Math.max(...vals,.001);
 vals.forEach((v,i)=>$("b"+(i+1)).style.height=Math.max(4,v/max*100)+"%");
 return {input,captured,carbon,ink,net};
}
ids.forEach(id=>$(id).addEventListener("input",model));
function setVals(o){ids.forEach(id=>$(id).value=o[id]);model()}
$("demo").onclick=()=>{setVals(demo);$("log").textContent="Demo scenario loaded. Press RUN SIMULATION."};
$("reset").onclick=()=>{setVals(defaults);$("log").textContent="Defaults restored. Waiting for simulation."};
$("run").onclick=()=>{
 const r=model(); $("heroStatus").textContent="RUNNING";$("plantStatus").textContent="● RUNNING";
 $("log").textContent="Initializing exhaust stream…";$("progress").style.width="0%";
 const stages=["Exhaust stream online","Particle capture active","Carbon-rich solids separated","Purification recovery active","Ink formulation complete"];
 let i=0;document.querySelectorAll(".machine").forEach(x=>x.classList.remove("active"));
 const timer=setInterval(()=>{
   if(i<5){$("progress").style.width=((i+1)*20)+"%";$("m"+i).classList.add("active");$("log").textContent=stages[i];i++}
   else{clearInterval(timer);$("heroStatus").textContent="COMPLETE";$("plantStatus").textContent="● COMPLETE";$("log").textContent=`Simulation complete — ${r.ink.toFixed(2)} g estimated ink output.`}
 },650);
};
$("mode").onclick=()=>document.body.classList.toggle("light");
$("report").onclick=()=>{
 const r=model();
 const text=`AIR-INK DIGITAL TWIN — SIMULATION SUMMARY\n\nExhaust flow: ${$("flow").value} L/min\nParticulate concentration: ${$("pm").value} g/m³\nDuration: ${$("time").value} min\nCapture efficiency: ${$("cap").value}%\nPurification recovery: ${$("pur").value}%\nInk solids fraction: ${$("sol").value}%\n\nParticulate input: ${r.input.toFixed(2)} g\nCaptured mass: ${r.captured.toFixed(2)} g\nUsable carbon: ${r.carbon.toFixed(2)} g\nEstimated ink output: ${r.ink.toFixed(2)} g\nNet recovery: ${r.net.toFixed(1)}%\n\nNOTE: Illustrative educational mass-balance model; not laboratory validated.`;
 const blob=new Blob([text],{type:"text/plain"}),a=document.createElement("a");a.href=URL.createObjectURL(blob);a.download="AIR-INK-Simulation-Summary.txt";a.click();URL.revokeObjectURL(a.href);
};
function scrollToId(id){document.getElementById(id).scrollIntoView({behavior:"smooth"})}
model();
