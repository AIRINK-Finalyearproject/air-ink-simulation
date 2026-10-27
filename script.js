const $=id=>document.getElementById(id);
const ids=["flow","pm","cap","pur","sol","time"],def={flow:500,pm:.08,cap:75,pur:85,sol:18,time:60},demo={flow:1000,pm:.12,cap:82,pur:90,sol:20,time:120};
function calc(){
 const Q=+$("flow").value/1000,C=+$("pm").value,t=+$("time").value,cap=+$("cap").value/100,pur=+$("pur").value/100,sol=+$("sol").value/100;
 const input=Q*C*t,captured=input*cap,carbon=captured*pur,ink=carbon/sol,net=cap*pur*100;
 $("vFlow").textContent=$("flow").value;$("vPM").textContent=(+$("pm").value).toFixed(2);$("vCap").textContent=$("cap").value;$("vPur").textContent=$("pur").value;$("vSol").textContent=$("sol").value;$("vTime").textContent=$("time").value;
 $("flowVal").textContent=$("flow").value+" L/min";$("capVal").textContent=$("cap").value+"%";$("purVal").textContent=$("pur").value+"%";$("rawVal").textContent=captured.toFixed(2)+" g";$("inkVal").textContent=ink.toFixed(2)+" g";
 $("pIn").textContent=input.toFixed(2)+" g";$("pCap").textContent=captured.toFixed(2)+" g";$("pCarbon").textContent=carbon.toFixed(2)+" g";$("pInk").textContent=ink.toFixed(2)+" g";
 $("rIn").textContent=input.toFixed(2);$("rCaptured").textContent=captured.toFixed(2);$("rCarbon").textContent=carbon.toFixed(2);$("rInk").textContent=ink.toFixed(2);
 $("heroCap").textContent=$("cap").value+"%";$("heroInk").textContent=ink.toFixed(2)+" g";$("iCarbon").textContent=carbon.toFixed(2)+" g";$("iEff").textContent=net.toFixed(1)+"%";$("iSol").textContent=$("sol").value+"%";$("net").textContent=net.toFixed(1)+"%";$("dialVal").textContent=net.toFixed(1);
 $("dial").style.background=`conic-gradient(#d9ff37 0 ${net}%,#293229 ${net}% 100%)`;
 const vals=[input,captured,carbon,ink],max=Math.max(...vals,.001);vals.forEach((v,i)=>$("bar"+(i+1)).style.height=Math.max(4,v/max*100)+"%");
 $("meter").style.width=Math.min(100,net)+"%";return{input,captured,carbon,ink,net};
}
ids.forEach(id=>$(id).addEventListener("input",calc));
function setVals(o){ids.forEach(id=>$(id).value=o[id]);calc()}
$("demo").onclick=()=>{setVals(demo);$("log").textContent="Demo scenario loaded — ready to run."};
$("reset").onclick=()=>{setVals(def);$("log").textContent="Defaults restored — system ready."};
function runPlant(){
 const r=calc();$("heroStatus").textContent="RUNNING";$("monitorStatus").textContent="SIMULATION ACTIVE";$("plantState").textContent="RUNNING";$("log").textContent="Initializing exhaust stream…";
 document.querySelectorAll(".unit").forEach(x=>x.classList.remove("active"));let i=0;
 const lines=["Exhaust source online","Capture unit collecting particles","Separation complete","Purification recovery active","Carbon ink formulation complete"];
 const timer=setInterval(()=>{if(i<5){$("u"+i).classList.add("active");$("log").textContent=lines[i];i++}else{clearInterval(timer);$("heroStatus").textContent="COMPLETE";$("monitorStatus").textContent="RUN COMPLETE";$("plantState").textContent="COMPLETE";$("log").textContent=`Complete — estimated ${r.ink.toFixed(2)} g ink output.`}},600);
}
$("run").onclick=runPlant;$("plantRun").onclick=()=>{go("control");setTimeout(runPlant,500)};
$("theme").onclick=()=>document.body.classList.toggle("light");
$("export").onclick=()=>{const r=calc();const text=`AIR-INK DIGITAL TWIN — RUN SUMMARY\n\nExhaust flow: ${$("flow").value} L/min\nPM concentration: ${$("pm").value} g/m³\nDuration: ${$("time").value} min\nCapture efficiency: ${$("cap").value}%\nPurification recovery: ${$("pur").value}%\nInk solids: ${$("sol").value}%\n\nParticulate input: ${r.input.toFixed(2)} g\nCaptured: ${r.captured.toFixed(2)} g\nUsable carbon: ${r.carbon.toFixed(2)} g\nEstimated ink: ${r.ink.toFixed(2)} g\nNet recovery: ${r.net.toFixed(1)}%\n\nIllustrative educational model — not laboratory validated.`;const a=document.createElement("a");a.href=URL.createObjectURL(new Blob([text],{type:"text/plain"}));a.download="AIR-INK-Run-Summary.txt";a.click()};
function go(id){document.getElementById(id).scrollIntoView({behavior:"smooth"})}calc();
