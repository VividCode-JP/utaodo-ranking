document.addEventListener("DOMContentLoaded",()=>{function o(t){return t?String(t).replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/"/g,"&quot;").replace(/'/g,"&#39;"):""}const b="ranking_data.json",f={view:"\u518D\u751F",comment:"\u30B3\u30E1",mylist:"\u30DE\u30A4\u30EA\u30B9",like:"\u3044\u3044\u306D",score:"\u7DCF\u5408pt"},k={1:"\u{1F451}",2:"\u{1F948}",3:"\u{1F949}"};let r=null,i="",w="score";const p=document.getElementById("tabs-container"),d=document.getElementById("tracker-list"),L=document.getElementById("sort-select"),$=document.getElementById("last-updated");async function y(){try{const t=await fetch(`${b}?t=${new Date().getTime()}`);if(!t.ok)throw new Error("Network response was not ok");r=await t.json(),$.textContent=`\u6700\u7D42\u66F4\u65B0: ${o(r.metadata.generated_at)}`,E()}catch(t){console.error("Fetch error:",t),d.innerHTML='<div class="error-msg">\u30C7\u30FC\u30BF\u306E\u53D6\u5F97\u306B\u5931\u6557\u3057\u307E\u3057\u305F\u3002\u6642\u9593\u3092\u304A\u3044\u3066\u518D\u8AAD\u307F\u8FBC\u307F\u3057\u3066\u304F\u3060\u3055\u3044\u3002</div>'}}function E(){const t=Object.keys(r.categories);if(t.length===0){d.innerHTML='<div class="loading">\u73FE\u5728\u96C6\u8A08\u30C7\u30FC\u30BF\u304C\u3042\u308A\u307E\u305B\u3093\u3002</div>';return}const n=decodeURIComponent(window.location.hash.substring(1));i=t.includes(n)?n:t[0],S(t),m()}function S(t){p.innerHTML="",t.forEach(s=>{const e=document.createElement("button");e.className=`tab ${s===i?"active":""}`,e.textContent=o(s.replace("\u8E0A\u30B3\u30EC_","")),e.addEventListener("click",()=>{i=s,window.location.hash=encodeURIComponent(s),document.querySelectorAll(".tab").forEach(a=>a.classList.remove("active")),e.classList.add("active"),e.scrollIntoView({behavior:"smooth",inline:"center",block:"nearest"}),m()}),p.appendChild(e)});const n=p.querySelector(".tab.active");n&&setTimeout(()=>{n.scrollIntoView({behavior:"auto",inline:"center",block:"nearest"})},0)}L.addEventListener("change",t=>{w=t.target.value,m()});function T(t){return[...t].sort((n,s)=>{let e,a;switch(w){case"score":e=n.score,a=s.score;break;case"momentum_score":e=n.momentum.score,a=s.momentum.score;break;case"view":e=n.counts.view,a=s.counts.view;break;case"comment":e=n.counts.comment,a=s.counts.comment;break;case"mylist":e=n.counts.mylist,a=s.counts.mylist;break;case"like":e=n.counts.like,a=s.counts.like;break;default:e=n.score,a=s.score;break}return a!==e?a-e:s.score!==n.score?s.score-n.score:s.counts.view-n.counts.view})}function C(t){return!t||t.length===0?"":`<div class="badges-container">${t.map(s=>{const e=s.split("_");let a,l,c;if(e.length===2)a=e[0],l="total",c=e[1];else if(e.length===3)[a,l,c]=e;else return"";const v=f[a]||a,u=a==="score"?"":l==="total"?" \u7D2F\u8A08":" \u52E2\u3044",g=k[c]||"";return`<span class="badge ${l==="momentum"?"badge-momentum":"badge-total"} badge-rank-${c}">${g} ${v}${u} ${c}\u4F4D</span>`}).join("")}</div>`}function m(){const t=r.categories[i]||[];if(t.length===0){d.innerHTML='<div class="loading">\u3053\u306E\u90E8\u9580\u306B\u306F\u30A2\u30AF\u30C6\u30A3\u30D6\u306A\u52D5\u753B\u304C\u3042\u308A\u307E\u305B\u3093\u3002</div>';return}const n=T(t);let s="";n.forEach((e,a)=>{const l=a+1;let c="";e.is_new?c='<span class="momentum" style="color:var(--accent-blue)">\u{1F195} New!</span>':c=`<span class="momentum">+${(e.momentum.score||0).toLocaleString()} pt/20\u5206</span>`;const v=e.thumbnail_url?o(e.thumbnail_url):"https://via.placeholder.com/120x68/cccccc/999999?text=No+Image",u=o(e.title),g=o(e.owner),h=`https://www.nicovideo.jp/watch/${o(e.id)}`;s+=`
            <div class="card">
                <div class="rank">#${l}</div>

                <a href="${h}" target="_blank" rel="noopener noreferrer" class="thumb-wrapper" title="${u}">
                    <img src="${v}" class="thumb" alt="thumbnail" loading="lazy">
                </a>

                <div class="info-col">
                    <div class="title-col">
                        <a href="${h}" target="_blank" rel="noopener noreferrer" class="title-link">
                            <div class="title">${u}</div>
                        </a>
                        <div class="owner">${g}</div>
                    </div>

                    <div class="card-bottom">
                        ${C(e.badges)}

                        <div class="card-stats">
                            <div class="score-box">
                                <span class="score-label">\u7D2F\u8A08\u5FDC\u63F4pt</span>
                                <div>
                                    <span class="score-val">${e.score.toLocaleString()}</span>
                                    ${c}
                                </div>
                            </div>

                            <div class="raw-data">
                                <div class="raw-item">\u518D\u751F: <span>${e.counts.view.toLocaleString()}</span></div>
                                <div class="raw-item">\u30B3\u30E1: <span>${e.counts.comment.toLocaleString()}</span></div>
                                <div class="raw-item">\u3044\u3044\u306D: <span>${e.counts.like.toLocaleString()}</span></div>
                                <div class="raw-item">\u30DE\u30A4\u30EA\u30B9: <span>${e.counts.mylist.toLocaleString()}</span></div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            `}),d.innerHTML=s}window.addEventListener("hashchange",()=>{if(!r)return;const t=decodeURIComponent(window.location.hash.substring(1));r.categories[t]&&t!==i&&(i=t,document.querySelectorAll(".tab").forEach(n=>{const s=n.textContent===t.replace("\u8E0A\u30B3\u30EC_","");n.classList.toggle("active",s),s&&n.scrollIntoView({behavior:"smooth",inline:"center",block:"nearest"})}),m())}),y()});
