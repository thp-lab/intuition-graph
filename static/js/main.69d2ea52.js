/*! For license information please see main.69d2ea52.js.LICENSE.txt */
        query {
          triples(limit: 1000) {
            items {
              id
              subject {
                label
                id
              }
              predicate {
                label
                id
              }
              object {
                label
                id
              }
            }
          }
        }
      `,t=await tL.request(e),t.triples.items})(),t=(e=>{const t=[],n=[],i=new Map,r=e=>"predicate"===e?"#FF9800":"subject"===e?"#4361EE":"object"===e?"#9D4EDD":"#666666";return e.forEach((e=>{let{subject:s,predicate:o,object:a}=e;if(!i.has(s.id)){const e={id:s.id,label:s.label,isTriple:!1,color:r("subject"),role:"subject"};i.set(s.id,e),t.push(e)}if(!i.has(o.id)){const e={id:o.id,label:o.label,isTriple:!1,color:r("predicate"),role:"predicate"};i.set(o.id,e),t.push(e)}if(!i.has(a.id)){const e={id:a.id,label:a.label,isTriple:!1,color:r("object"),role:"object"};i.set(a.id,e),t.push(e)}n.push({source:s.id,target:o.id,type:"subject-to-predicate"}),n.push({source:o.id,target:a.id,type:"predicate-to-object"})})),{nodes:t,links:n}})(e);n(t)}catch(e){console.error("Error loading graph data:",e)}})()}),[]);const l=(0,e.useCallback)((e=>{if("3D"===s&&a.current){const t=1+40/Math.hypot(e.x||1,e.y||1,e.z||1);a.current.cameraPosition({x:e.x*t,y:e.y*t,z:e.z*t},e,500)}}),[s]),c=(0,e.useCallback)((()=>{i&&a.current&&(a.current.zoomToFit(400,100),r(!1))}),[i]);(0,e.useEffect)((()=>{const e=()=>{a.current&&(a.current.width=window.innerWidth,a.current.height=window.innerHeight)};return window.addEventListener("resize",e),()=>{window.removeEventListener("resize",e)}}),[]);return(0,nL.jsxs)("div",{style:{width:"100%",height:"100vh",position:"relative"},children:[(0,nL.jsxs)("div",{style:{position:"absolute",top:"10px",left:"10px",zIndex:10,display:"flex",alignItems:"center",gap:"10px",background:"#444",color:"#fff",padding:"10px",borderRadius:"4px"},children:[(0,nL.jsx)("label",{htmlFor:"viewMode",style:{fontSize:"14px"},children:"View Mode:"}),(0,nL.jsxs)("select",{id:"viewMode",value:s,onChange:e=>o(e.target.value),style:{padding:"5px",borderRadius:"4px",border:"none",cursor:"pointer",fontSize:"14px"},children:[(0,nL.jsx)("option",{value:"2D",children:"2D"}),(0,nL.jsx)("option",{value:"3D",children:"3D"}),(0,nL.jsx)("option",{value:"VR",children:"VR"})]})]}),"2D"===s&&(0,nL.jsx)($R,{ref:e=>a.current=e,graphData:t,nodeCanvasObject:(e,t,n)=>{const i=e.label||"",r=12/n;t.font=`${r}px Sans-Serif`,t.fillStyle=e.color||"#000",t.textAlign="center",t.textBaseline="middle",t.fillText(i,e.x,e.y)},linkColor:()=>"#666",linkDirectionalParticles:2,linkDirectionalParticleSpeed:.02,nodeAutoColorBy:"group",onEngineStop:c}),"3D"===s&&(0,nL.jsx)(ZR,{ref:e=>a.current=e,graphData:t,controlType:"fly",nodeLabel:"label",onNodeClick:l,linkColor:()=>"#666",linkDirectionalParticles:2,linkDirectionalParticleSpeed:.005,nodeAutoColorBy:"group",nodeThreeObject:e=>{const t=new uI(e.label||"");return t.color=e.color||"#000",t.textHeight=2,t},onEngineStop:c}),"VR"===s&&(0,nL.jsx)(rL,{graphData:t,onNodeClick:l}),(0,nL.jsx)(iL,{colors:{subject:"#4361EE",predicate:"#FF9800",object:"#9D4EDD"}})]})};const oL=function(){return(0,nL.jsxs)("div",{className:"App",children:[(0,nL.jsx)("header",{className:"App-header",children:(0,nL.jsx)("h1",{children:"Intuition Knowledge Graph"})}),(0,nL.jsx)("main",{className:"App-main",children:(0,nL.jsx)(sL,{})})]})},aL=e=>{e&&e instanceof Function&&i.e(453).then(i.bind(i,6453)).then((t=>{let{getCLS:n,getFID:i,getFCP:r,getLCP:s,getTTFB:o}=t;n(e),i(e),r(e),s(e),o(e)}))};n.createRoot(document.getElementById("root")).render((0,nL.jsx)(e.StrictMode,{children:(0,nL.jsx)(oL,{})})),aL()})()})();
//# sourceMappingURL=main.69d2ea52.js.map