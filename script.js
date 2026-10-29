const $ = (selector, root=document) => root.querySelector(selector);
const $$ = (selector, root=document) => [...root.querySelectorAll(selector)];
const STORAGE_KEY = "ai-work-compass-v1";

const phases = [
  {number:"01",title:"Set up the foundation",weeks:"Week 1",hours:"12 hours",tasks:[
    ["domain","Choose a short, broad domain name"],
    ["hosting","Set up hosting, WordPress, and SSL"],
    ["theme","Install a lightweight theme and essential plugins"],
    ["trustpages","Publish About, Contact, Privacy, and Affiliate Disclosure pages"],
    ["tracking","Connect Google Search Console and analytics"]
  ]},
  {number:"02",title:"Publish the first money pages",weeks:"Weeks 2–3",hours:"10 hrs/week",tasks:[
    ["article1","Publish articles 1–4: reviews and comparisons"],
    ["email","Create an email signup form and free 7-day checklist"],
    ["social1","Publish your first social posts"]
  ]},
  {number:"03",title:"Build core guides",weeks:"Weeks 4–5",hours:"10 hrs/week",tasks:[
    ["article2","Publish articles 5–8: beginner guides"],
    ["affiliate","Apply to two relevant affiliate programs"],
    ["disclosure","Add clear affiliate disclosures where needed"]
  ]},
  {number:"04",title:"Build out your content base",weeks:"Weeks 6–7",hours:"10 hrs/week",tasks:[
    ["article3","Publish articles 9–12"],
    ["videos","Create one short video per article"],
    ["internal","Add internal links between related articles"]
  ]},
  {number:"05",title:"Expand and learn from data",weeks:"Weeks 8–9",hours:"10 hrs/week",tasks:[
    ["article4","Publish articles 13–16"],
    ["newsletter","Send your first weekly email"],
    ["searchcheck","Check Search Console for impressions"]
  ]},
  {number:"06",title:"Finish the first content batch",weeks:"Weeks 10–11",hours:"10 hrs/week",tasks:[
    ["article5","Publish articles 17–20"],
    ["refresh","Refresh the top three articles with current details"]
  ]},
  {number:"07",title:"Review, monetize, and plan next",weeks:"Week 12",hours:"10 hrs/week",tasks:[
    ["ads","Consider applying to AdSense when ready"],
    ["review","Review traffic, clicks, and signups"],
    ["nexttopics","Choose the next ten article topics"]
  ]}
];
const articles = [
  ["Is Outlier legit? My honest experience","Review","High"],
  ["Is Remotasks legit? What to expect","Review","High"],
  ["OneForma review: pay, tasks and payouts","Review","High"],
  ["Outlier vs Remotasks vs OneForma","Comparison","High"],
  ["How to get started in data annotation (step by step)","Guide","High"],
  ["Best data annotation companies hiring remotely","List","High"],
  ["How to pass the Outlier onboarding assessments","Guide","High"],
  ["How to get paid from AI training platforms in Kenya","Guide","High"],
  ["Best ways to receive international payments in Africa","Guide","Medium"],
  ["What does a data annotator do all day?","Explainer","Medium"],
  ["How much can you earn in data annotation?","Explainer","Medium"],
  ["Data annotation skills that raise your pay","Guide","Medium"],
  ["Best laptop and setup for remote annotation work","Product","Medium"],
  ["Best free tools to learn Python for data work","List","Medium"],
  ["How to start freelancing on Upwork with data skills","Guide","Medium"],
  ["OCR and PDF-to-Excel: how to offer it as a service","Guide","Medium"],
  ["Remote data jobs that do not need a degree","List","Medium"],
  ["Common reasons annotators get removed from projects","Guide","Low"],
  ["How to avoid remote work and AI training scams","Guide","Low"],
  ["Data annotation glossary for beginners","Reference","Low"]
];
const defaultState = {
  tasks:{}, published:{}, setup:{},
  metrics:{articles:0,impressions:0,signups:0,clicks:0}
};
let state = loadState();
function loadState(){
  try { return {...structuredClone(defaultState), ...JSON.parse(localStorage.getItem(STORAGE_KEY)||"{}")}; }
  catch { return structuredClone(defaultState); }
}
function saveState(){
  localStorage.setItem(STORAGE_KEY,JSON.stringify(state));
  $("#saveStatus").textContent="Saved locally";
  updateProgress();
}
function toast(message){
  const el=$("#toast");el.textContent=message;el.classList.add("show");
  clearTimeout(toast.timer);toast.timer=setTimeout(()=>el.classList.remove("show"),2400);
}
function renderTimeline(){
  $("#timeline").innerHTML=phases.map(phase=>{
    const done=phase.tasks.filter(task=>state.tasks[task[0]]).length;
    return `<article class="phase-card">
      <div class="phase-head"><div class="phase-title"><span class="phase-number">${phase.number}</span><div><h3>${phase.title}</h3><p>${phase.weeks}</p></div></div><span class="phase-hours">${phase.hours}</span></div>
      <div class="task-list">${phase.tasks.map(task=>`<label class="task-row"><input type="checkbox" data-task="${task[0]}" ${state.tasks[task[0]]?"checked":""}><span>${task[1]}</span></label>`).join("")}</div>
      <div class="phase-progress"><span>${done}/${phase.tasks.length} complete</span><div class="progress-track"><span style="width:${done/phase.tasks.length*100}%"></span></div></div>
    </article>`;
  }).join("");
  $$("[data-task]").forEach(input=>input.addEventListener("change",()=>{
    state.tasks[input.dataset.task]=input.checked;saveState();renderTimeline();
  }));
}
function updateProgress(){
  const taskTotal=phases.reduce((n,p)=>n+p.tasks.length,0);
  const taskDone=phases.reduce((n,p)=>n+p.tasks.filter(t=>state.tasks[t[0]]).length,0);
  const setupTotal=$$("[data-setup]").length;
  const setupDone=$$("[data-setup]").filter(el=>state.setup[el.dataset.setup]).length;
  const publishedDone=articles.filter((_,i)=>state.published[i]).length;
  const total=taskTotal+setupTotal+articles.length;
  const done=taskDone+setupDone+publishedDone;
  const pct=Math.round(done/total*100);
  $("#progressText").textContent=`${pct}%`;
  $("#progressBar").style.width=`${pct}%`;
  $("#progressDetail").textContent=`${done} of ${total} milestones complete`;
  $("#articleCount").textContent=`${publishedDone}/20`;
}
function renderArticles(filter="all",query=""){
  const matched=articles.map((item,i)=>({item,i})).filter(({item,i})=>{
    const categoryOk=filter==="all"||item[2]===filter;
    const queryOk=item[0].toLowerCase().includes(query.toLowerCase())||item[1].toLowerCase().includes(query.toLowerCase());
    return categoryOk&&queryOk;
  });
  $("#articleGrid").innerHTML=matched.length?matched.map(({item,i})=>`
    <article class="article-card ${state.published[i]?"is-published":""}">
      <div class="article-top"><span class="article-index">ARTICLE ${String(i+1).padStart(2,"0")}</span><span class="priority ${item[2]}">${item[2]}</span></div>
      <h3>${escapeHtml(item[0])}</h3>
      <div class="article-meta"><span class="intent-label">${item[1]}</span><button class="publish-toggle" data-publish="${i}" aria-pressed="${!!state.published[i]}"><span class="tiny-check">${state.published[i]?"✓":""}</span>${state.published[i]?"Published":"Mark published"}</button></div>
    </article>`).join(""):`<div class="empty-state">No topics match your search. Try another keyword or filter.</div>`;
  $$("[data-publish]").forEach(button=>button.addEventListener("click",()=>{
    const index=button.dataset.publish;state.published[index]=!state.published[index];
    saveState();renderArticles($(".filter-tab.active").dataset.filter,$("#articleSearch").value);
    toast(state.published[index]?"Article marked as published":"Publication mark removed");
  }));
  updateProgress();
}
function escapeHtml(value){return value.replace(/[&<>"']/g,c=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"}[c]));}
function loadMetrics(){
  $("#metricArticles").value=state.metrics.articles??0;
  $("#metricImpressions").value=state.metrics.impressions??0;
  $("#metricSignups").value=state.metrics.signups??0;
  $("#metricClicks").value=state.metrics.clicks??0;
}
function saveMetrics(){
  state.metrics={
    articles:Math.max(0,Number($("#metricArticles").value)||0),
    impressions:Math.max(0,Number($("#metricImpressions").value)||0),
    signups:Math.max(0,Number($("#metricSignups").value)||0),
    clicks:Math.max(0,Number($("#metricClicks").value)||0)
  };
  saveState();
}
function downloadFile(filename,content,type){
  const blob=new Blob([content],{type}),url=URL.createObjectURL(blob),a=document.createElement("a");
  a.href=url;a.download=filename;document.body.appendChild(a);a.click();a.remove();URL.revokeObjectURL(url);
}
function exportProgress(){
  const data={exportedAt:new Date().toISOString(),tasks:state.tasks,published:state.published,setup:state.setup,metrics:state.metrics};
  downloadFile("ai-work-compass-progress.json",JSON.stringify(data,null,2),"application/json");
  toast("Progress export downloaded");
}
function downloadCsv(){
  const rows=[["Metric","Value"],["Articles published",state.metrics.articles],["Search impressions",state.metrics.impressions],["Email signups",state.metrics.signups],["Affiliate clicks",state.metrics.clicks]];
  const csv=rows.map(row=>row.map(v=>`"${String(v).replace(/"/g,'""')}"`).join(",")).join("\r\n");
  downloadFile("ai-work-compass-metrics.csv",csv,"text/csv;charset=utf-8");
  toast("Metrics CSV downloaded");
}
function init(){
  renderTimeline();
  renderArticles();
  loadMetrics();
  $$("[data-setup]").forEach(input=>{
    input.checked=!!state.setup[input.dataset.setup];
    input.addEventListener("change",()=>{state.setup[input.dataset.setup]=input.checked;saveState();});
  });
  ["metricArticles","metricImpressions","metricSignups","metricClicks"].forEach(id=>$("#"+id).addEventListener("change",saveMetrics));
  $$(".filter-tab").forEach(tab=>tab.addEventListener("click",()=>{
    $$(".filter-tab").forEach(t=>t.classList.toggle("active",t===tab));
    renderArticles(tab.dataset.filter,$("#articleSearch").value);
  }));
  $("#articleSearch").addEventListener("input",()=>renderArticles($(".filter-tab.active").dataset.filter,$("#articleSearch").value));
  $("#exportBtn").addEventListener("click",exportProgress);
  $("#downloadCsv").addEventListener("click",downloadCsv);
  $("#resetMetrics").addEventListener("click",()=>{
    if(confirm("Reset all four metric values to zero? Your other progress will remain saved.")){
      state.metrics={articles:0,impressions:0,signups:0,clicks:0};loadMetrics();saveState();toast("Metrics reset");
    }
  });
  $("#menuToggle").addEventListener("click",()=>{
    const nav=$("#mainNav"),open=nav.classList.toggle("open");
    $("#menuToggle").setAttribute("aria-expanded",String(open));
  });
  $$("#mainNav a").forEach(a=>a.addEventListener("click",()=>{$("#mainNav").classList.remove("open");$("#menuToggle").setAttribute("aria-expanded","false");}));
  updateProgress();
}
init();
