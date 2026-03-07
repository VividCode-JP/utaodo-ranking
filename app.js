document.addEventListener("DOMContentLoaded",()=>{function u(t){return t?String(t).replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/"/g,"&quot;").replace(/'/g,"&#39;"):""}const w="ranking_data.json",b={view:"\u518D\u751F",comment:"\u30B3\u30E1",mylist:"\u30DE\u30A4\u30EA\u30B9",like:"\u3044\u3044\u306D",score:"\u7DCF\u5408pt"},E={1:"\u{1F451}",2:"\u{1F948}",3:"\u{1F949}"};let s=null,r="",p="score";const v=document.getElementById("tabs-container"),l=document.getElementById("tracker-list"),k=document.getElementById("sort-select"),$=document.getElementById("last-updated");async function F(){try{const t=await fetch(`${w}?t=${new Date().getTime()}`);if(!t.ok)throw new Error("Network response was not ok");s=await t.json(),$.textContent=`\u6700\u7D42\u66F4\u65B0: ${u(s.metadata.generated_at)}`,f()}catch(t){console.error("Fetch error:",t),l.innerHTML='<div class="error-msg">\u30C7\u30FC\u30BF\u306E\u53D6\u5F97\u306B\u5931\u6557\u3057\u307E\u3057\u305F\u3002\u6642\u9593\u3092\u304A\u3044\u3066\u518D\u8AAD\u307F\u8FBC\u307F\u3057\u3066\u304F\u3060\u3055\u3044\u3002</div>'}}function f(){const t=Object.keys(s.categories);if(t.length===0){l.innerHTML='<div class="loading">\u73FE\u5728\u96C6\u8A08\u30C7\u30FC\u30BF\u304C\u3042\u308A\u307E\u305B\u3093\u3002</div>';return}const o=decodeURIComponent(window.location.hash.substring(1));r=t.includes(o)?o:t[0],C(t),d()}function C(t){v.innerHTML="",t.forEach(n=>{const e=document.createElement("button");e.className=`tab ${n===r?"active":""}`,e.textContent=u(n.replace("\u8E0A\u30B3\u30EC_","")),e.addEventListener("click",()=>{r=n,window.location.hash=encodeURIComponent(n),document.querySelectorAll(".tab").forEach(a=>a.classList.remove("active")),e.classList.add("active"),e.scrollIntoView({behavior:"smooth",inline:"center",block:"nearest"}),d()}),v.appendChild(e)});const o=v.querySelector(".tab.active");o&&setTimeout(()=>{o.scrollIntoView({behavior:"auto",inline:"center",block:"nearest"})},0)}k.addEventListener("change",t=>{p=t.target.value,d()});function A(t){return[...t].sort((o,n)=>{let e,a;switch(p){case"score":e=o.score,a=n.score;break;case"momentum_score":e=o.momentum.score,a=n.momentum.score;break;case"view":e=o.counts.view,a=n.counts.view;break;case"comment":e=o.counts.comment,a=n.counts.comment;break;case"mylist":e=o.counts.mylist,a=n.counts.mylist;break;case"like":e=o.counts.like,a=n.counts.like;break;default:e=o.score,a=n.score;break}return a!==e?a-e:n.score!==o.score?n.score-o.score:n.counts.view-o.counts.view})}function L(t){return!t||t.length===0?"":`<div class="badges-container">${t.map(o=>{const n=o.split("_");let e,a,c;if(n.length===2)e=n[0],a="total",c=n[1];else if(n.length===3)[e,a,c]=n;else return"";const i=b[e]||e,g=e==="score"?"":a==="total"?" \u7D2F\u8A08":" \u52E2\u3044",m=E[c]||"";return`<span class="badge ${a==="momentum"?"badge-momentum":"badge-total"} badge-rank-${c}">${m} ${i}${g} ${c}\u4F4D</span>`}).join("")}</div>`}function d(){const t=s.categories[r]||[];if(t.length===0){l.innerHTML='<div class="loading">\u3053\u306E\u90E8\u9580\u306B\u306F\u30A2\u30AF\u30C6\u30A3\u30D6\u306A\u52D5\u753B\u304C\u3042\u308A\u307E\u305B\u3093\u3002</div>';return}const o=A(t);let n="";o.forEach((e,a)=>{const c=a+1;let i="";e.is_new?i='<span class="momentum" style="color:var(--accent-blue)">\u{1F195} New!</span>':i=`<span class="momentum">+${(e.momentum.score||0).toLocaleString()} pt/20\u5206</span>`;const g=e.thumbnail_url?u(e.thumbnail_url):"https://via.placeholder.com/120x68/cccccc/999999?text=No+Image",m=u(e.title),B=u(e.owner),h=`https://www.nicovideo.jp/watch/${u(e.id)}`;n+=`
            <div class="card">
                <div class="rank">#${c}</div>

                <a href="${h}" target="_blank" rel="noopener noreferrer" class="thumb-wrapper" title="${m}">
                    <img src="${g}" class="thumb" alt="thumbnail" loading="lazy">
                </a>

                <div class="info-col">
                    <div class="title-col">
                        <a href="${h}" target="_blank" rel="noopener noreferrer" class="title-link">
                            <div class="title">${m}</div>
                        </a>
                        <div class="owner">${B}</div>
                    </div>

                    <div class="card-bottom">
                        ${L(e.badges)}

                        <div class="card-stats">
                            <div class="score-box">
                                <span class="score-label">\u7D2F\u8A08\u5FDC\u63F4pt</span>
                                <div>
                                    <span class="score-val">${e.score.toLocaleString()}</span>
                                    ${i}
                                </div>
                            </div>

                            <div class="raw-data">
                                <div class="raw-item">\u518D\u751F: <span>${e.counts.view.toLocaleString()}</span></div>
                                <div class="raw-item">\u30B3\u30E1: <span>${e.counts.comment.toLocaleString()}</span></div>
                                <div class="raw-item">\u30DE\u30A4\u30EA\u30B9: <span>${e.counts.mylist.toLocaleString()}</span></div>
                                <div class="raw-item">\u3044\u3044\u306D: <span>${e.counts.like.toLocaleString()}</span></div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            `}),l.innerHTML=n}window.addEventListener("hashchange",()=>{if(!s)return;const t=decodeURIComponent(window.location.hash.substring(1));s.categories[t]&&t!==r&&(r=t,document.querySelectorAll(".tab").forEach(o=>{const n=o.textContent===t.replace("\u8E0A\u30B3\u30EC_","");o.classList.toggle("active",n),n&&o.scrollIntoView({behavior:"smooth",inline:"center",block:"nearest"})}),d())}),F()});
