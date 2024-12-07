/*! For license information please see main.3c953ac9.js.LICENSE.txt */
        query {
          triples(limit: 1000) {
            items {
              id
              subject {
                label
                id
                creatorId
                type
              }
              predicate {
                label
                id
                creatorId
                type
              }
              object {
                label
                id
                creatorId
                type
              }
            }
          }
        }
      `,t=await eL.request(e),t.triples.items};var nL=i(579);const iL=e=>{let{colors:t={}}=e;return(0,nL.jsxs)("div",{style:{position:"absolute",bottom:"20px",right:"10px",zIndex:10,background:"#222",color:"#fff",padding:"10px",borderRadius:"4px",boxShadow:"0px 4px 6px rgba(0, 0, 0, 0.2)",fontSize:"14px"},children:[(0,nL.jsx)("h4",{style:{margin:"0 0 10px 0",fontSize:"16px"},children:"Graph Legend"}),(0,nL.jsx)("ul",{style:{listStyle:"none",padding:0,margin:0},children:Object.entries(t).map((e=>{let[t,n]=e;return(0,nL.jsxs)("li",{style:{display:"flex",alignItems:"center",marginBottom:"5px"},children:[(0,nL.jsx)("span",{style:{width:"15px",height:"15px",backgroundColor:n,borderRadius:"50%",display:"inline-block",marginRight:"10px"}}),t.charAt(0).toUpperCase()+t.slice(1)]},t)}))})]})},rL=t=>{let{graphData:n,onNodeClick:i}=t;const r=(0,e.useRef)();return(0,e.useEffect)((()=>{if(r.current){const e=ue()(r.current);e.graphData(n),e.nodeLabel((e=>e.name||e.id)).nodeAutoColorBy("group"),i&&e.onNodeClick(i)}}),[n,i]),(0,nL.jsx)("div",{ref:r,style:{width:"100vw",height:"100vh",overflow:"hidden"}})},sL=t=>{var n,i;let{triple:r,onClose:s}=t;const[o,a]=(0,e.useState)(null),[l,c]=(0,e.useState)(null),[h,u]=(0,e.useState)(!1),[d,p]=(0,e.useState)(null);(0,e.useEffect)((()=>{if(r){u(!0),p(null);const e=async()=>{try{const e=(await tL()).filter((e=>e.id===r.id||e.subject.id===r.id||e.predicate.id===r.id||e.object.id===r.id));if(a(e),r.id){const e=await(async e=>{let t;t=ZB`
        query GetAtom($atomId: BigInt!) {
          atom(id: $atomId) {
            id
            image
            label
            emoji
            type
            creatorId
            vault {
              totalShares
            }
          }
        }
      `;const n={atomId:e};try{return(await eL.request(t,n)).atom}catch(d){throw console.error("Error fetching atom details:",d),d}})(r.id);c(e)}}catch(e){p("Failed to fetch data")}finally{u(!1)}};e()}}),[r]);return r?(0,nL.jsxs)("div",{className:"node-details-sidebar",children:[(0,nL.jsxs)("h2",{children:[r.label||"No Label"," Details"]}),h&&(0,nL.jsx)("p",{children:"Loading..."}),d&&(0,nL.jsx)("p",{children:d}),l&&(0,nL.jsxs)(nL.Fragment,{children:[(0,nL.jsx)("h4",{children:"Atom Info"}),(0,nL.jsxs)("p",{children:[(0,nL.jsx)("strong",{children:"ID:"})," ",l.id]}),(0,nL.jsxs)("p",{children:[(0,nL.jsx)("strong",{children:"Label:"})," ",l.label]}),(0,nL.jsxs)("p",{children:[(0,nL.jsx)("strong",{children:"Type:"})," ",l.type]}),(0,nL.jsxs)("p",{children:[(0,nL.jsx)("strong",{children:"Emoji:"})," ",l.emoji||"N/A"]}),(0,nL.jsxs)("p",{children:[(0,nL.jsx)("strong",{children:"Creator:"})," ",(null===(n=l.creator)||void 0===n?void 0:n.label)||"Unknown"]}),(0,nL.jsxs)("p",{children:[(0,nL.jsx)("strong",{children:"Vault Shares:"})," ",(f=(null===(i=l.vault)||void 0===i?void 0:i.totalShares)||0,`${(f/1e18).toFixed(4)} ETH`)]})]}),o&&o.length>0?(0,nL.jsxs)("div",{className:"related-triples",children:[(0,nL.jsx)("h4",{children:"Related Data:"}),(0,nL.jsx)("ul",{children:o.map((e=>(0,nL.jsxs)("li",{children:[(0,nL.jsx)("strong",{children:"Subject:"})," ",e.subject.label," |"," ",(0,nL.jsx)("strong",{children:"Predicate:"})," ",e.predicate.label," |"," ",(0,nL.jsx)("strong",{children:"Object:"})," ",e.object.label]},e.id)))})]}):!h&&(0,nL.jsx)("p",{children:"No additional related data found."}),(0,nL.jsx)("button",{onClick:s,children:"Close"})]}):null;var f},oL=()=>{const[t,n]=(0,e.useState)({nodes:[],links:[]}),[i,r]=(0,e.useState)(!0),[s,o]=(0,e.useState)("2D"),[a,l]=(0,e.useState)(null),[c,h]=(0,e.useState)(!1),u=(0,e.useRef)();(0,e.useEffect)((()=>{(async()=>{try{const e=await tL();let t=(e=>{const t=[],n=[],i=new Map,r=e=>"predicate"===e?"#FF9800":"subject"===e?"#4361EE":"object"===e?"#9D4EDD":"#666666";return e.forEach((e=>{let{subject:s,predicate:o,object:a}=e;if(!i.has(s.id)){const e={id:s.id,label:s.label,isTriple:!1,color:r("subject"),role:"subject"};i.set(s.id,e),t.push(e)}if(!i.has(o.id)){const e={id:o.id,label:o.label,isTriple:!1,color:r("predicate"),role:"predicate"};i.set(o.id,e),t.push(e)}if(!i.has(a.id)){const e={id:a.id,label:a.label,isTriple:!1,color:r("object"),role:"object"};i.set(a.id,e),t.push(e)}n.push({source:s.id,target:o.id,type:"subject-to-predicate"}),n.push({source:o.id,target:a.id,type:"predicate-to-object"})})),{nodes:t,links:n}})(e);c&&(t=d(t,e)),n(t)}catch(e){console.error("Error loading graph data:",e)}})()}),[c]);const d=(e,t)=>{const n=[],i=[];return t.forEach((e=>{[e.subject,e.predicate,e.object].forEach((e=>{e.creatorId&&(n.find((t=>t.id===`creator-${e.creatorId}`))||n.push({id:`creator-${e.creatorId}`,label:`${e.creatorId}`,type:"creator",color:"green"}),i.push({source:`creator-${e.creatorId}`,target:e.id,label:"created"}))}))})),{nodes:[...e.nodes,...n],links:[...e.links,...i]}},p=(0,e.useCallback)((async e=>{if("3D"===s&&u.current){const t=1+40/Math.hypot(e.x||1,e.y||1,e.z||1);u.current.cameraPosition({x:e.x*t,y:e.y*t,z:e.z*t},e,500)}l(e)}),[s]),f=(0,e.useCallback)((()=>{i&&u.current&&(u.current.zoomToFit(400,100),r(!1))}),[i]),m={subject:"#4361EE",predicate:"#FF9800",object:"#9D4EDD"};return(0,nL.jsxs)("div",{children:[(0,nL.jsxs)("div",{style:{position:"absolute",top:"10px",left:"10px",zIndex:10,display:"flex",alignItems:"center",gap:"10px",background:"#444",color:"#fff",padding:"10px",borderRadius:"4px"},children:[(0,nL.jsx)("label",{htmlFor:"viewMode",style:{fontSize:"14px"},children:"View Mode:"}),(0,nL.jsxs)("select",{id:"viewMode",value:s,onChange:e=>o(e.target.value),style:{padding:"5px",borderRadius:"4px",border:"none",cursor:"pointer",fontSize:"14px"},children:[(0,nL.jsx)("option",{value:"2D",children:"2D"}),(0,nL.jsx)("option",{value:"3D",children:"3D"}),(0,nL.jsx)("option",{value:"VR",children:"VR"})]}),(0,nL.jsxs)("label",{style:{fontSize:"14px",marginLeft:"10px"},children:["Show Creators",(0,nL.jsx)("input",{type:"checkbox",checked:c,onChange:e=>h(e.target.checked),style:{marginLeft:"8px"}})]})]}),"2D"===s&&(0,nL.jsx)($R,{ref:e=>u.current=e,graphData:t,nodeCanvasObject:(e,t,n)=>{const i=e.label||"",r=12/n;t.font=`${r}px Sans-Serif`,t.fillStyle=e.color||"#000",t.textAlign="center",t.textBaseline="middle",t.fillText(i,e.x,e.y)},linkColor:()=>"#666",linkDirectionalParticles:2,linkDirectionalParticleSpeed:.02,nodeAutoColorBy:"type",onNodeClick:p,onEngineStop:f}),"3D"===s&&(0,nL.jsx)(ZR,{ref:e=>u.current=e,graphData:t,controlType:"fly",nodeLabel:"label",onNodeClick:p,linkColor:()=>"#666",linkDirectionalParticles:2,linkDirectionalParticleSpeed:.005,nodeAutoColorBy:"type",nodeThreeObject:e=>{const t=new uI(e.label||"");return t.color=e.color||m[e.type]||"#666",t.textHeight=2,t},onEngineStop:f}),"VR"===s&&(0,nL.jsx)(rL,{graphData:t,onNodeClick:p}),(0,nL.jsx)(iL,{colors:m}),(0,nL.jsx)(sL,{triple:a,onClose:()=>l(null)})]})};const aL=function(){return(0,nL.jsxs)("div",{className:"App",children:[(0,nL.jsx)("header",{className:"App-header",children:(0,nL.jsx)("h1",{children:"Intuition Knowledge Graph"})}),(0,nL.jsx)("main",{className:"App-main",children:(0,nL.jsx)(oL,{})})]})},lL=e=>{e&&e instanceof Function&&i.e(453).then(i.bind(i,6453)).then((t=>{let{getCLS:n,getFID:i,getFCP:r,getLCP:s,getTTFB:o}=t;n(e),i(e),r(e),s(e),o(e)}))};n.createRoot(document.getElementById("root")).render((0,nL.jsx)(e.StrictMode,{children:(0,nL.jsx)(aL,{})})),lL()})()})();
//# sourceMappingURL=main.3c953ac9.js.map