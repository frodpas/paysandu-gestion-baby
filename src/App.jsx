import { useState, useEffect, useRef, useCallback } from "react";

/* ══ CONFIG ═══════════════════════════════════════════════════════════ */
const SB_URL = "https://ipgvsrmlgavsmickwrst.supabase.co";
const SB_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImlwZ3Zzcm1sZ2F2c21pY2t3cnN0Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzUyNzEzMTgsImV4cCI6MjA5MDg0NzMxOH0.pqamuY9uhqQSuXlife5J5XYRpt_x31Z75gRBRoeol2Q";

const ESCUDO = "data:image/webp;base64,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";

/* ══ COLORES ═══════════════════════════════════════════════════════════ */
const C = {
  navy:"#1e2a6e", navyDark:"#141c4e", navyLight:"#2d3d9a",
  red:"#c0272d", white:"#ffffff", offWhite:"#f5f5f0",
  lilac:"#c9a8d4", lilacDark:"#9c6fae", gold:"#e8b84b",
  gray:"#e2e2da", grayMid:"#9a9a90", green:"#16a34a",
  greenLight:"#dcfce7", amber:"#d97706",
};

const MESES = ["Enero","Febrero","Marzo","Abril","Mayo","Junio",
               "Julio","Agosto","Septiembre","Octubre","Noviembre","Diciembre"];

const PAY_METHODS = [
  {id:"debito",  label:"Débito",   icon:"💳", color:"#2563eb"},
  {id:"credito", label:"Crédito",  icon:"💳", color:"#7c3aed"},
  {id:"mp",      label:"MP / QR",  icon:"📱", color:"#009ee3"},
];

const TIPOS_CUOTA_DEFAULT = [
  {id:"base",     nombre:"Cuota Base",     porcentaje:100},
  {id:"hermano",  nombre:"Cuota Hermano",  porcentaje:70},
  {id:"50",       nombre:"50%",            porcentaje:50},
  {id:"0",        nombre:"Becado",         porcentaje:0},
];

/* ══ HELPERS ═══════════════════════════════════════════════════════════ */
const uid = () => Math.random().toString(36).slice(2,8).toUpperCase();
const fmt = n => "$"+(n||0).toLocaleString("es-UY");
const fdate = () => new Date().toLocaleDateString("es-UY");

async function sbFetch(path, method="GET", body=null) {
  try {
    // Limpiar undefined del body (Supabase los rechaza)
    const cleanBody = body ? JSON.parse(JSON.stringify(body, (_key,_val)=>_val===undefined?null:_val)) : null;
    const res = await fetch(`${SB_URL}/rest/v1/${path}`, {
      method,
      headers: {
        "apikey": SB_KEY,
        "Authorization": `Bearer ${SB_KEY}`,
        "Content-Type": "application/json",
        "Prefer": method==="POST"?"return=representation":"",
      },
      body: cleanBody ? JSON.stringify(cleanBody) : undefined,
    });
    if (!res.ok) {
      const err = await res.text().catch(()=>"");
      console.error("sbFetch error", method, path, res.status, err.slice(0,300));
      // Guardar el último error para mostrarlo
      window._lastSbError = `HTTP ${res.status}: ${err.slice(0,200)}`;
      return null;
    }
    if (method==="DELETE"||res.status===204) return true;
    const txt = await res.text();
    return txt ? JSON.parse(txt) : true;
  } catch(e) { console.error("sbFetch catch", e); return null; }
}

/* ══ COMPRIMIR IMAGEN ════════════════════════════════════════════════ */
// Redimensiona y comprime una imagen base64 a máx 400px y calidad 0.6
// Resultado: base64 de ~30-60KB, guardable en Supabase sin problemas
function comprimirImagen(dataUrl, maxPx=400, quality=0.6) {
  return new Promise((resolve) => {
    const img = new Image();
    img.onload = () => {
      const canvas = document.createElement("canvas");
      let w = img.width, h = img.height;
      if (w > h && w > maxPx) { h = Math.round(h * maxPx / w); w = maxPx; }
      else if (h > maxPx)      { w = Math.round(w * maxPx / h); h = maxPx; }
      canvas.width = w; canvas.height = h;
      const ctx = canvas.getContext("2d");
      ctx.drawImage(img, 0, 0, w, h);
      resolve(canvas.toDataURL("image/jpeg", quality));
    };
    img.onerror = () => resolve(dataUrl); // si falla, devolver original
    img.src = dataUrl;
  });
}

/* ══ ESCUDO COMPONENTE ════════════════════════════════════════════════ */
function ClubLogo({ size=40 }) {
  return <img src={ESCUDO} alt="Escudo" style={{width:size,height:size,objectFit:"contain",borderRadius:"50%"}}/>;
}

/* ══ CSS GLOBAL ═══════════════════════════════════════════════════════ */
function GlobalStyle() {
  return (
    <style>{`
      @import url('https://fonts.googleapis.com/css2?family=Barlow+Condensed:wght@400;600;700;800;900&family=Barlow:wght@400;500;600&display=swap');
      *{box-sizing:border-box;margin:0;padding:0;}
      body{font-family:'Barlow',sans-serif;background:${C.offWhite};color:${C.navyDark};}
      button{transition:all .15s;cursor:pointer;}
      button:hover{filter:brightness(1.07);}
      input,select,textarea{font-family:'Barlow',sans-serif;}
      ::-webkit-scrollbar{width:5px;height:5px;}
      ::-webkit-scrollbar-thumb{background:${C.navyLight};border-radius:4px;}
      .app-header{padding-top:max(12px,env(safe-area-inset-top));}
      @keyframes fi{from{opacity:0;transform:translateY(8px)}to{opacity:1;transform:none}}
      .fi{animation:fi .2s ease;}
      @keyframes pop{0%{transform:scale(.92)}100%{transform:scale(1)}}
      .pop{animation:pop .18s ease;}

      /* ── ROTATE OVERLAY ── */
      #rotate-overlay{
        display:none;position:fixed;inset:0;z-index:9999;
        background:linear-gradient(160deg,#141c4e,#1e2a6e);
        flex-direction:column;align-items:center;justify-content:center;
        gap:20px;color:white;text-align:center;padding:30px;
      }
      @keyframes tilt{0%{transform:rotate(-10deg);}100%{transform:rotate(10deg);}}
      #rotate-overlay .ri{font-size:72px;animation:tilt 1.2s ease-in-out infinite alternate;}
      #rotate-overlay .rm{font-family:'Barlow Condensed',sans-serif;font-weight:900;
        font-size:24px;text-transform:uppercase;letter-spacing:.04em;margin-top:8px;}
      #rotate-overlay .rs{font-size:15px;color:rgba(255,255,255,.65);margin-top:6px;}

      /* Mostrar overlay en portrait en pantallas chicas — SOLO para admin/delegado */
      @media (orientation:portrait) and (max-width:1024px){
        body.needs-landscape #rotate-overlay{display:flex !important;}
        body.needs-landscape #app-root{display:none !important;}
      }

      /* ── MOBILE LANDSCAPE: sidebar horizontal en la parte inferior ── */
      @media (max-width:1024px) and (orientation:landscape){
        /* Ocultar sidebar lateral */
        .admin-sidebar{display:none !important;}
        /* El layout pasa a columna: contenido arriba, nav abajo */
        .admin-layout{flex-direction:column !important;}
        /* Nav bar horizontal pegada abajo */
        .mobile-bottom-nav{
          display:flex !important;
          position:fixed;bottom:0;left:0;right:0;z-index:200;
          background:white;border-top:2px solid #e2e2da;
          padding:6px 8px env(safe-area-inset-bottom,6px);
          gap:4px;justify-content:space-around;
          box-shadow:0 -4px 16px rgba(20,28,78,.1);
        }
        .mobile-bottom-nav button{
          flex:1;display:flex;flex-direction:column;align-items:center;
          justify-content:center;gap:3px;padding:6px 4px;
          background:none;border:none;border-radius:10px;
          font-family:'Barlow Condensed',sans-serif;font-weight:800;
          font-size:9px;text-transform:uppercase;color:#1e2a6e;
          cursor:pointer;min-width:0;position:relative;
        }
        .mobile-bottom-nav button.active{
          background:linear-gradient(135deg,#1e2a6e,#2d3d9a);
          color:white;
        }
        .mobile-bottom-nav button .mnav-icon{font-size:18px;line-height:1;}
        .mobile-bottom-nav button .mnav-badge{
          position:absolute;top:3px;right:10px;
          background:#c0272d;color:white;border-radius:50%;
          width:14px;height:14px;font-size:8px;font-weight:900;
          display:flex;align-items:center;justify-content:center;
        }
        /* Contenido tiene padding bottom para no quedar tapado por la nav */
        .admin-content{padding-bottom:70px !important;}
        /* Tablas con scroll horizontal en mobile */
        .tw-scroll{overflow-x:auto !important;}
        /* Botones toolbar más chicos */
        .toolbar-bq{width:80px !important;height:60px !important;font-size:10px !important;}
        /* Botones de acción en tabla — más chicos para caber */
        .acts-row{gap:3px !important;}
        .acts-row button{width:26px !important;height:26px !important;font-size:12px !important;}
        /* Ocultar columnas menos importantes en mobile landscape */
        .col-hide-mobile{display:none !important;}
      }
    `}</style>
  );
}

/* ══ MODAL OVERLAY ════════════════════════════════════════════════════ */
function Modal({ children, onClose, maxWidth=480 }) {
  return (
    <div onClick={onClose} style={{position:"fixed",inset:0,background:"rgba(20,28,78,.75)",zIndex:300,
      display:"flex",alignItems:"flex-start",justifyContent:"center",padding:16,overflowY:"auto"}}>
      <div onClick={e=>e.stopPropagation()} className="fi"
        style={{background:C.white,borderRadius:20,maxWidth,width:"100%",margin:"auto",
          boxShadow:"0 24px 64px rgba(20,28,78,.4)",overflow:"hidden"}}>
        {children}
      </div>
    </div>
  );
}

/* ══ LOGIN SCREEN ═════════════════════════════════════════════════════ */
function LoginScreen({ onLogin }) {
  const [mode,        setMode]       = useState("home"); // home | admin | delegado | cats | jugadores | pin
  const [user,        setUser]       = useState("");
  const [pass,        setPass]       = useState("");
  const [pin,         setPin]        = useState("");
  const [jugId,       setJugId]      = useState("");
  const [err,         setErr]        = useState("");
  const [loading,     setLoading]    = useState(false);
  const [delegados,   setDelegados]  = useState([]);
  const [selDelegado, setSelDelegado]= useState(null);
  // Acceso jugadores
  const [categorias,  setCategorias] = useState([]);
  const [filtCatPub,  setFiltCatPub] = useState(null);
  const [jugadoresCat,setJugadoresCat]=useState([]);
  const [selJugPub,   setSelJugPub]  = useState(null); // jugador seleccionado para pagar
  const [pinJug,      setPinJug]     = useState("");

  const handleAdmin = async () => {
    onLogin({role:"admin", name:"Administrador"});
  };

  // Cargar delegados activos cuando se abre el panel
  const abrirDelegado = async () => {
    if (mode === "delegado") { setMode("publico"); return; }
    setMode("delegado"); setErr(""); setPin(""); setSelDelegado(null);
    const data = await sbFetch("baby_delegados?activo=eq.true&select=id,nombre,categorias,foto_url&order=nombre.asc");
    setDelegados(data||[]);
  };

  const handleDelegado = async (delegado) => {
    onLogin({role:"delegado", ...delegado});
  };

  const handlePublico = async () => {
    setLoading(true);
    const data = await sbFetch(`baby_jugadores?id=eq.${jugId.toUpperCase()}&select=*`);
    setLoading(false);
    if (data && data.length > 0) {
      onLogin({role:"publico", jugador:data[0]});
    } else {
      setErr("ID de jugador no encontrado");
    }
  };

  const abrirAccesoJugadores = async () => {
    setLoading(true);
    const cats = await sbFetch("baby_categorias?select=*&order=nombre.asc");
    setLoading(false);
    setCategorias(cats||[]);
    setMode("cats");
    setFiltCatPub(null);
    setJugadoresCat([]);
    setErr("");
  };

  const elegirCategoria = async (catId) => {
    setFiltCatPub(catId);
    setLoading(true);
    const data = await sbFetch(
      `baby_jugadores?categoria_id=eq.${catId}&estado=eq.activo&select=id,nombre,ci,foto_url,pin_familia&order=nombre.asc`
    );
    setLoading(false);
    setJugadoresCat(data||[]);
    setMode("jugadores");
  };

  const abrirPagoJugador = (jug) => {
    setSelJugPub(jug);
    setPinJug("");
    setErr("");
    // Si no tiene pin_familia configurado, entrar directo
    if (!jug.pin_familia) {
      onLogin({role:"publico", jugador:jug});
    } else {
      setMode("pin");
    }
  };

  const confirmarPinJugador = async () => {
    if (pinJug === selJugPub.pin_familia) {
      onLogin({role:"publico", jugador:selJugPub});
    } else {
      setErr("PIN incorrecto");
    }
  };

  const BtnBack = ({onClick})=>(
    <button onClick={onClick} style={{background:"rgba(255,255,255,.1)",border:"none",
      borderRadius:10,padding:"8px 14px",color:C.white,fontFamily:"'Barlow Condensed',sans-serif",
      fontWeight:700,fontSize:13,cursor:"pointer",marginBottom:16,display:"flex",
      alignItems:"center",gap:6}}>← Volver</button>
  );

  return (
    <div style={{minHeight:"100dvh",background:`linear-gradient(160deg,${C.navyDark} 0%,${C.navy} 50%,${C.navyLight} 100%)`,
      display:"flex",alignItems:"center",justifyContent:"center",padding:20,position:"relative"}}>

      <div className="fi" style={{maxWidth:440,width:"100%"}}>
        {/* Header con logo grande */}
        <div style={{textAlign:"center",marginBottom:24}}>
          <ClubLogo size={120}/>
          <h1 style={{fontFamily:"'Barlow Condensed',sans-serif",fontSize:36,fontWeight:900,
            color:C.white,textTransform:"uppercase",letterSpacing:".05em",marginTop:18,lineHeight:1}}>
            Paysandú FC
          </h1>
          <div style={{color:C.lilac,fontFamily:"'Barlow Condensed',sans-serif",fontSize:20,fontWeight:700,
            textTransform:"uppercase",letterSpacing:".1em",marginTop:6}}>Baby Fútbol</div>
        </div>

        {/* ── HOME: 3 círculos verticales ── */}
        {mode==="home"&&(
          <div style={{display:"flex",flexDirection:"column",alignItems:"center",gap:14}}>

            {/* JUGADORES — grande, blanco, camiseta oficial */}
            <button onClick={abrirAccesoJugadores} disabled={loading}
              style={{width:174,height:174,borderRadius:"50%",cursor:"pointer",
                background:"white",
                border:`4px solid ${C.gold}`,
                display:"flex",flexDirection:"column",alignItems:"center",
                justifyContent:"center",gap:6,
                boxShadow:`0 0 0 6px rgba(255,255,255,.12), 0 10px 30px rgba(0,0,0,.35), 0 2px 8px rgba(232,184,75,.2)`,
                fontFamily:"'Barlow Condensed',sans-serif",fontWeight:900,fontSize:14,
                textTransform:"uppercase",color:C.navy,letterSpacing:".03em"}}>
              <img src="data:image/png;base64,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" alt="camiseta"
                style={{width:70,objectFit:"contain",filter:"drop-shadow(0 2px 4px rgba(0,0,0,.15))"}}/>
              <span>Jugadores</span>
            </button>

            {/* DELEGADO — medio, blanco, camiseta alternativa */}
            <button onClick={abrirDelegado}
              style={{width:132,height:132,borderRadius:"50%",cursor:"pointer",
                background:"white",
                border:`3px solid ${C.navy}`,
                outline:`3px solid ${C.gold}`,
                outlineOffset:"-6px",
                display:"flex",flexDirection:"column",alignItems:"center",
                justifyContent:"center",gap:5,
                boxShadow:"0 6px 20px rgba(0,0,0,.3), 0 0 0 5px rgba(255,255,255,.08)",
                fontFamily:"'Barlow Condensed',sans-serif",fontWeight:900,fontSize:13,
                textTransform:"uppercase",color:C.navy}}>
              <img src="data:image/png;base64,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" alt="camiseta"
                style={{width:54,objectFit:"contain",filter:"drop-shadow(0 2px 4px rgba(0,0,0,.2))"}}/>
              Delegado
            </button>

            {/* ADMIN — pequeño, rojo, candado */}
            <button onClick={()=>{setMode("admin");setErr("");}}
              style={{width:90,height:90,borderRadius:"50%",cursor:"pointer",
                background:"linear-gradient(135deg,#c0272d,#9b1c21)",
                border:`2px solid ${C.navy}`,
                outline:`2px solid ${C.gold}`,
                outlineOffset:"-4px",
                display:"flex",flexDirection:"column",alignItems:"center",
                justifyContent:"center",gap:4,
                boxShadow:"0 4px 16px rgba(192,39,45,.5)",
                fontFamily:"'Barlow Condensed',sans-serif",fontWeight:900,fontSize:11,
                textTransform:"uppercase",color:"white"}}>
              <svg viewBox="0 0 64 64" width="28" height="28" fill="none">
                <rect x="14" y="28" width="36" height="28" rx="5" fill="#e8b84b"/>
                <path d="M22 28 V21 A10 10 0 0 1 42 21 V28" stroke="#e8b84b" strokeWidth="5"
                  strokeLinecap="round" fill="none"/>
                <circle cx="32" cy="42" r="5" fill="#9b1c21"/>
                <rect x="29.5" y="42" width="5" height="7" rx="2.5" fill="#9b1c21"/>
              </svg>
              Admin
            </button>

          </div>
        )}

                {/* ── ELEGIR CATEGORÍA ── */}
        {mode==="cats"&&(
          <div className="fi" style={{background:"rgba(255,255,255,.08)",borderRadius:20,padding:24,
            backdropFilter:"blur(8px)",border:"1px solid rgba(255,255,255,.15)"}}>
            <BtnBack onClick={()=>setMode("home")}/>
            <div style={{fontFamily:"'Barlow Condensed',sans-serif",fontWeight:900,fontSize:20,
              color:C.white,textTransform:"uppercase",marginBottom:16,textAlign:"center"}}>
              ⚽ Seleccioná una categoría
            </div>
            <div style={{display:"grid",gridTemplateColumns:"repeat(3,1fr)",gap:8}}>
              {categorias.map(c=>(
                <button key={c.id} onClick={()=>elegirCategoria(c.id)}
                  style={{padding:"16px 8px",background:"rgba(255,255,255,.12)",
                    border:"1px solid rgba(255,255,255,.25)",borderRadius:12,
                    color:C.white,fontFamily:"'Barlow Condensed',sans-serif",
                    fontWeight:900,fontSize:20,cursor:"pointer",textTransform:"uppercase"}}>
                  {c.nombre}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* ── LISTA DE JUGADORES ── */}
        {mode==="jugadores"&&(
          <div className="fi" style={{background:"rgba(255,255,255,.08)",borderRadius:20,padding:20,
            backdropFilter:"blur(8px)",border:"1px solid rgba(255,255,255,.15)",
            maxHeight:"70dvh",overflowY:"auto"}}>
            <BtnBack onClick={()=>setMode("cats")}/>
            <div style={{fontFamily:"'Barlow Condensed',sans-serif",fontWeight:900,fontSize:18,
              color:C.white,textTransform:"uppercase",marginBottom:12,textAlign:"center"}}>
              Categoría {filtCatPub}
            </div>
            {loading&&<div style={{textAlign:"center",color:"rgba(255,255,255,.6)",padding:"20px 0"}}>⏳</div>}
            {jugadoresCat.map(j=>(
              <div key={j.id} style={{display:"flex",alignItems:"center",gap:12,
                padding:"10px 14px",marginBottom:8,borderRadius:12,
                background:"rgba(255,255,255,.12)",border:"1px solid rgba(255,255,255,.2)"}}>
                {j.foto_url
                  ? <img src={j.foto_url} style={{width:42,height:42,borderRadius:"50%",
                      objectFit:"cover",border:"2px solid rgba(255,255,255,.4)",flexShrink:0}}
                      onError={e=>e.target.style.display="none"}/>
                  : <div style={{width:42,height:42,borderRadius:"50%",flexShrink:0,
                      background:"rgba(255,255,255,.15)",display:"flex",alignItems:"center",
                      justifyContent:"center",overflow:"hidden"}}>
                      <svg viewBox="0 0 24 24" width="28" height="28"><circle cx="12" cy="8" r="4" fill="rgba(255,255,255,.7)"/><path d="M4 20c0-4 3.6-7 8-7s8 3 8 7" fill="rgba(255,255,255,.7)"/></svg>
                    </div>
                }
                <div style={{flex:1,minWidth:0}}>
                  <div style={{fontFamily:"'Barlow Condensed',sans-serif",fontWeight:800,
                    fontSize:15,color:C.white,textTransform:"uppercase",
                    overflow:"hidden",textOverflow:"ellipsis",whiteSpace:"nowrap"}}>{j.nombre}</div>
                  {j.ci&&<div style={{fontSize:11,color:"rgba(255,255,255,.5)"}}>CI: {j.ci}</div>}
                </div>
                <button onClick={()=>abrirPagoJugador(j)}
                  style={{padding:"8px 14px",background:`linear-gradient(135deg,${C.green},#15803d)`,
                    color:C.white,border:"none",borderRadius:10,
                    fontFamily:"'Barlow Condensed',sans-serif",fontWeight:800,
                    fontSize:13,cursor:"pointer",textTransform:"uppercase",
                    flexShrink:0,whiteSpace:"nowrap"}}>
                  💳 Pagar
                </button>
              </div>
            ))}
            {jugadoresCat.length===0&&!loading&&(
              <div style={{textAlign:"center",color:"rgba(255,255,255,.5)",padding:"20px 0",fontSize:13}}>
                Sin jugadores en esta categoría
              </div>
            )}
          </div>
        )}

        {/* ── PIN DEL JUGADOR ── */}
        {mode==="pin"&&selJugPub&&(
          <div className="fi" style={{background:"rgba(255,255,255,.08)",borderRadius:20,padding:24,
            backdropFilter:"blur(8px)",border:"1px solid rgba(255,255,255,.15)"}}>
            <BtnBack onClick={()=>{setMode("jugadores");setErr("");}}/>
            <div style={{textAlign:"center",marginBottom:20}}>
              {selJugPub.foto_url
                ? <img src={selJugPub.foto_url} style={{width:70,height:70,borderRadius:"50%",
                    objectFit:"cover",border:"3px solid rgba(255,255,255,.5)",marginBottom:8}}/>
                : <div style={{width:70,height:70,borderRadius:"50%",background:"rgba(255,255,255,.15)",
                    display:"flex",alignItems:"center",justifyContent:"center",margin:"0 auto 8px"}}>
                    <svg viewBox="0 0 24 24" width="44" height="44"><circle cx="12" cy="8" r="4" fill="rgba(255,255,255,.7)"/><path d="M4 20c0-4 3.6-7 8-7s8 3 8 7" fill="rgba(255,255,255,.7)"/></svg>
                  </div>
              }
              <div style={{fontFamily:"'Barlow Condensed',sans-serif",fontWeight:900,fontSize:18,
                color:C.white,textTransform:"uppercase"}}>{selJugPub.nombre}</div>
              <div style={{color:"rgba(255,255,255,.6)",fontSize:13,marginTop:4}}>
                Ingresá el PIN de 3 dígitos
              </div>
            </div>
            <div style={{display:"flex",gap:10,justifyContent:"center",marginBottom:16}}>
              {[0,1,2].map(i=>(
                <input key={i} type="password" inputMode="numeric" maxLength={1} value={pinJug[i]||""}
                  onChange={e=>{
                    const v=e.target.value.replace(/[^0-9]/g,"");
                    const arr=pinJug.split("");
                    arr[i]=v;
                    const np=arr.join("").slice(0,3);
                    setPinJug(np);
                    if(v&&i<2) document.getElementById(`pinjug-${i+1}`)?.focus();
                    if(np.length===3) setTimeout(()=>document.getElementById("btn-confirmar-pin")?.click(),100);
                  }}
                  id={`pinjug-${i}`}
                  style={{width:64,height:64,borderRadius:14,
                    border:"2px solid rgba(201,168,212,.5)",
                    background:"rgba(255,255,255,.1)",color:C.white,fontSize:32,
                    fontWeight:900,textAlign:"center",outline:"none"}}/>
              ))}
            </div>
            {err&&<div style={{color:"#fca5a5",fontSize:13,marginBottom:10,textAlign:"center"}}>{err}</div>}
            <button id="btn-confirmar-pin" onClick={confirmarPinJugador} disabled={pinJug.length<3}
              style={{width:"100%",padding:"13px",
                background:pinJug.length===3?`linear-gradient(135deg,${C.green},#15803d)`:"rgba(255,255,255,.1)",
                color:C.white,border:"none",borderRadius:10,fontFamily:"'Barlow Condensed',sans-serif",
                fontWeight:900,fontSize:16,textTransform:"uppercase",
                cursor:pinJug.length<3?"default":"pointer"}}>
              Ingresar
            </button>
          </div>
        )}

        {/* ── LOGIN ADMIN ── */}
        {mode==="admin" && (
          <div className="fi" style={{background:"rgba(255,255,255,.08)",borderRadius:20,padding:28,
            backdropFilter:"blur(8px)",border:`1px solid ${C.gold}40`}}>
            <div style={{fontFamily:"'Barlow Condensed',sans-serif",fontWeight:900,fontSize:20,
              color:C.gold,textTransform:"uppercase",marginBottom:20,textAlign:"center"}}>👤 Administrador</div>
            <input value={user} onChange={e=>setUser(e.target.value)} placeholder="Usuario"
              style={{width:"100%",padding:"12px 16px",borderRadius:10,border:"1px solid rgba(255,255,255,.3)",
                background:"rgba(255,255,255,.1)",color:C.white,fontSize:15,marginBottom:10,outline:"none"}}/>
            <input type="password" value={pass} onChange={e=>setPass(e.target.value)} placeholder="Contraseña"
              onKeyDown={e=>e.key==="Enter"&&handleAdmin()}
              style={{width:"100%",padding:"12px 16px",borderRadius:10,border:"1px solid rgba(255,255,255,.3)",
                background:"rgba(255,255,255,.1)",color:C.white,fontSize:15,marginBottom:16,outline:"none"}}/>
            {err&&<div style={{color:"#fca5a5",fontSize:12,marginBottom:10,textAlign:"center"}}>{err}</div>}
            <button onClick={handleAdmin}
              style={{width:"100%",padding:"13px",background:`linear-gradient(135deg,${C.gold},#d97706)`,
                color:C.navyDark,border:"none",borderRadius:10,fontFamily:"'Barlow Condensed',sans-serif",
                fontWeight:900,fontSize:16,textTransform:"uppercase"}}>Ingresar</button>
          </div>
        )}

        {/* ── LOGIN DELEGADO ── */}
        {mode==="delegado" && (
          <div className="fi" style={{background:"rgba(255,255,255,.08)",borderRadius:20,padding:28,
            backdropFilter:"blur(8px)",border:"1px solid rgba(134,239,172,.3)"}}>
            <div style={{fontFamily:"'Barlow Condensed',sans-serif",fontWeight:900,fontSize:20,
              color:"#86efac",textTransform:"uppercase",marginBottom:16,textAlign:"center"}}>🏃 Delegado</div>

            {/* Paso 1: elegir delegado */}
            {!selDelegado ? (
              <>
                <div style={{color:"rgba(255,255,255,.6)",fontSize:13,marginBottom:14,textAlign:"center"}}>
                  Seleccioná tu nombre
                </div>
                {delegados.length===0 && (
                  <div style={{color:"rgba(255,255,255,.4)",fontSize:13,textAlign:"center",padding:"20px 0"}}>
                    ⏳ Cargando delegados...
                  </div>
                )}
                <div style={{display:"flex",flexDirection:"column",gap:8,marginBottom:16,maxHeight:240,overflowY:"auto"}}>
                  {delegados.map(d=>(
                    <button key={d.id} onClick={()=>handleDelegado(d)}
                      style={{padding:"10px 14px",background:"rgba(255,255,255,.12)",
                        border:"1px solid rgba(134,239,172,.3)",borderRadius:12,
                        color:C.white,fontFamily:"'Barlow Condensed',sans-serif",fontWeight:700,
                        fontSize:16,textTransform:"uppercase",textAlign:"left",cursor:"pointer",
                        display:"flex",alignItems:"center",gap:12}}>
                      {d.foto_url
                        ? <img src={d.foto_url} style={{width:38,height:38,borderRadius:"50%",
                            objectFit:"cover",border:"2px solid rgba(134,239,172,.5)",flexShrink:0}}
                            onError={e=>e.target.style.display="none"}/>
                        : <div style={{width:38,height:38,borderRadius:"50%",flexShrink:0,
                            background:"rgba(255,255,255,.15)",display:"flex",alignItems:"center",
                            justifyContent:"center",overflow:"hidden"}}>
                            <svg viewBox="0 0 24 24" width="26" height="26"><circle cx="12" cy="8" r="4" fill="rgba(255,255,255,.7)"/><path d="M4 20c0-4 3.6-7 8-7s8 3 8 7" fill="rgba(255,255,255,.7)"/></svg>
                          </div>
                      }
                      <div style={{flex:1,minWidth:0}}>
                        <div>{d.nombre}</div>
                        <div style={{fontSize:11,color:"rgba(255,255,255,.5)",textTransform:"none",
                          fontWeight:400,marginTop:2}}>
                          {(d.categorias||[]).length>0?(d.categorias||[]).join(", "):"Todas las categorías"}
                        </div>
                      </div>
                    </button>
                  ))}
                </div>
              </>
            ) : null }
          </div>
        )}
      </div>
    </div>
  );
}

/* ══ VISTA PÚBLICA — ficha del jugador ════════════════════════════════ */
/* ══ HELPERS REPORTE ════════════════════════════════════════════════ */
function descargarHTML(html, filename) {
  const b = new Blob([html], {type:"text/html;charset=utf-8"});
  const u = URL.createObjectURL(b);
  const a = document.createElement("a");
  a.href = u; a.download = filename;
  document.body.appendChild(a); a.click();
  document.body.removeChild(a); URL.revokeObjectURL(u);
}

function descargarCSV(filas, cols, filename) {
  // CSV compatible con Excel (sep=; para Europa/Latinoamérica)
  const BOM = "﻿"; // UTF-8 BOM para que Excel muestre acentos
  const sep = ";";
  const header = cols.join(sep);
  const rows = filas.map(r => r.map(v => `"${String(v||"").replace(/"/g,'""')}"`).join(sep));
  const csv = BOM + [header, ...rows].join("\r\n");
  const b = new Blob([csv], {type:"text/csv;charset=utf-8"});
  const u = URL.createObjectURL(b);
  const a = document.createElement("a");
  a.href = u; a.download = filename;
  document.body.appendChild(a); a.click();
  document.body.removeChild(a); URL.revokeObjectURL(u);
}

function htmlReporteBase(titulo, subtitulo, colsHTML, rowsHTML, totalHTML="") {
  return `<!DOCTYPE html><html><head><meta charset="UTF-8">
    <title>${titulo}</title>
    <style>
      body{font-family:Arial,sans-serif;padding:20px;color:#1e2a6e;margin:0;}
      .header{display:flex;align-items:center;gap:14px;margin-bottom:6px;}
      h2{font-size:18px;margin:0;color:#1e2a6e;}
      .sub{font-size:11px;color:#666;margin-bottom:14px;}
      table{border-collapse:collapse;width:100%;font-size:12px;}
      th{background:#1e2a6e;color:white;padding:7px 10px;text-align:left;
         font-size:11px;text-transform:uppercase;white-space:nowrap;}
      td{padding:6px 10px;border-bottom:1px solid #e2e2da;vertical-align:middle;}
      tr:nth-child(even)td{background:#f5f5f0;}
      tfoot td{font-weight:900;font-size:13px;color:#1e2a6e;background:#e8f0fe;padding:8px 10px;}
      .btns{margin-top:16px;display:flex;gap:10px;}
      .btn{padding:8px 18px;border:none;border-radius:6px;cursor:pointer;
           font-size:13px;font-weight:700;}
      .btn-print{background:#1e2a6e;color:white;}
      @media print{.btns{display:none;}body{padding:10px;}}
    </style></head><body>
    <div class="header">
      <img src="https://paysandu-tienda.vercel.app/escudo.png" width="42" onerror="this.style.display='none'"/>
      <div><h2>${titulo}</h2></div>
    </div>
    <div class="sub">${subtitulo}</div>
    <table>
      <thead><tr>${colsHTML}</tr></thead>
      <tbody>${rowsHTML}</tbody>
      ${totalHTML ? `<tfoot><tr>${totalHTML}</tr></tfoot>` : ""}
    </table>
    <div class="btns">
      <button class="btn btn-print" onclick="window.print()">🖨 Imprimir</button>
    </div>
    </body></html>`;
}

function PublicoView({ user, onLogout }) {
  const jug = user.jugador;
  const [pagos, setPagos] = useState([]);
  const [plan,  setPlan]  = useState([]);
  const [modal, setModal] = useState(null);
  const [payMethod, setPayMethod] = useState(null);
  const [selectedMeses, setSelectedMeses] = useState([]);
  const [paying, setPaying] = useState(false);
  const [tipoMetodo, setTipoMetodo] = useState(null); // "transferencia" | "electronico"
  const [comprobante, setComprobante] = useState(null); // base64
  const [notaTransf, setNotaTransf] = useState("");
  const CBU_CLUB  = "037-0014628-00001";
  const ALIAS_CLUB = "PAYSANDU.BABY";

  const añoActual = new Date().getFullYear();

  useEffect(()=>{
    const load = async () => {
      const [p, pl] = await Promise.all([
        sbFetch(`baby_pagos?jugador_id=eq.${jug.id}&año=eq.${añoActual}&select=*`),
        sbFetch(`baby_plan_pagos?año=eq.${añoActual}&select=*&order=mes.asc`),
      ]);
      setPagos(p||[]);
      setPlan(pl||[]);
    };
    load();
  },[jug.id]);

  const tipos = TIPOS_CUOTA_DEFAULT;
  const tipoCuota = tipos.find(t=>t.id===jug.tipo_cuota)||tipos[0];

  const cuotaMes = (mes) => {
    const planMes = plan.find(p=>p.mes===mes);
    if (!planMes || planMes.monto===0) return 0;
    return Math.round(planMes.monto * tipoCuota.porcentaje / 100);
  };

  const toggleMesPub = (mes) => setSelectedMeses(prev =>
    prev.includes(mes) ? prev.filter(m=>m!==mes) : [...prev, mes]
  );
  const totalPub = selectedMeses.reduce((acc,mes)=>acc+cuotaMes(mes),0);

  const pagoMes = (mes) => pagos.find(p=>p.mes===mes);

  const mesesConDeuda = () => {
    // Mostrar todos los meses que tienen cuota y no están pagados
    return MESES.map((m,i)=>i+1).filter(mes=>{
      const monto = cuotaMes(mes);
      return monto>0 && !pagoMes(mes);
    });
  };

  const handleComprobante = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = async ev => {
      const compressed = await comprimirImagen(ev.target.result, 900, 0.75);
      setComprobante(compressed);
    };
    reader.readAsDataURL(file);
  };

  const resetModal = () => {
    setModal(null); setTipoMetodo(null);
    setPayMethod(null); setComprobante(null); setNotaTransf("");
  };

  const confirmarTransferencia = async () => {
    if (selectedMeses.length===0 || !comprobante) return;
    setPaying(true);
    const grupoId = uid();
    const detalle = notaTransf || `Meses: ${selectedMeses.map(m=>MESES[m-1]).join(", ")}`;
    const totalMonto = selectedMeses.reduce((a,m)=>a+cuotaMes(m),0);
    // Guardar en baby_formularios_pendientes con _tipo="comprobante"
    // La foto va en foto_url (columna que ya existe)
    await sbFetch("baby_formularios_pendientes","POST",{
      id: grupoId,
      org_id: jug.org_id||"paysandu",
      foto_url: comprobante,
      datos_json: JSON.stringify({
        _tipo: "comprobante",
        jugador_id: jug.id,
        jugador_nombre: jug.nombre,
        categoria_id: jug.categoria_id,
        meses: selectedMeses,
        monto_total: totalMonto,
        detalle,
        año: añoActual,
      }),
      created_at: new Date().toISOString(),
    });
    setPaying(false);
    setModal("success_transf");
    setSelectedMeses([]);
    setComprobante(null); setNotaTransf(""); setTipoMetodo(null);
  };

  const confirmarPago = async () => {
    if (!payMethod || selectedMeses.length===0) return;
    setPaying(true);
    for (const mes of selectedMeses) {
      await sbFetch("baby_pagos","POST",{
        id: uid(), jugador_id: jug.id, org_id: jug.org_id||"paysandu",
        año: añoActual, mes, monto: cuotaMes(mes),
        metodo_pago: payMethod, fecha_pago: fdate(),
        pendiente_verificacion: false,
      });
    }
    const p = await sbFetch(`baby_pagos?jugador_id=eq.${jug.id}&año=eq.${añoActual}&select=*`);
    setPagos(p||[]);
    setPaying(false);
    setModal("success");
    resetModal();
  };

  return (
    <div style={{minHeight:"100dvh",background:C.offWhite}}>
      {/* Header */}
      <div className="app-header" style={{background:`linear-gradient(135deg,${C.navyDark},${C.navy})`,padding:"14px 20px"}}>
        <div style={{display:"flex",alignItems:"center",gap:12}}>
          <ClubLogo size={48}/>
          <div style={{flex:1}}>
            <div style={{fontFamily:"'Barlow Condensed',sans-serif",fontWeight:900,fontSize:18,
              color:C.white,textTransform:"uppercase"}}>Paysandú FC — Baby</div>
            <div style={{color:C.lilac,fontSize:12}}>Ficha del jugador</div>
          </div>
          <button onClick={onLogout} style={{background:"rgba(255,255,255,.1)",border:"none",
            borderRadius:8,padding:"7px 12px",color:C.white,fontFamily:"'Barlow Condensed',sans-serif",
            fontWeight:700,fontSize:12,textTransform:"uppercase"}}>Salir</button>
        </div>
      </div>

      <div style={{padding:16,maxWidth:520,margin:"0 auto"}}>
        {/* Ficha jugador */}
        <div className="fi" style={{background:C.white,borderRadius:16,padding:20,marginBottom:16,
          boxShadow:"0 4px 16px rgba(20,28,78,.08)"}}>
          <div style={{display:"flex",gap:14,alignItems:"center",marginBottom:16}}>
            {jug.foto_url
              ? <img src={jug.foto_url} style={{width:80,height:80,borderRadius:"50%",objectFit:"cover",border:`3px solid ${C.navy}`}}
                  onError={e=>{e.target.style.display="none";e.target.nextSibling&&(e.target.nextSibling.style.display="flex");}}/>
              : null}
            {(!jug.foto_url)&&(
              <div style={{width:80,height:80,borderRadius:"50%",background:`linear-gradient(135deg,${C.navy},${C.navyLight})`,
                display:"flex",alignItems:"center",justifyContent:"center",fontSize:32}}>⚽</div>
            )}
            <div>
              <div style={{fontFamily:"'Barlow Condensed',sans-serif",fontWeight:900,fontSize:22,
                color:C.navy,textTransform:"uppercase",lineHeight:1}}>{jug.nombre}</div>
              <div style={{fontSize:12,color:C.grayMid,marginTop:4}}>ID: <strong>{jug.id}</strong></div>
              {jug.numero_camiseta&&<div style={{fontSize:12,color:C.grayMid}}>Camiseta: #{jug.numero_camiseta}</div>}
            </div>
          </div>
          <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:10}}>
            {[
              ["📅","Nacimiento",jug.fecha_nacimiento],
              ["🏷","Categoría",jug.categoria_id],
              ["📱","Contacto",jug.celular],
              jug.numero_camiseta ? ["👕","Camiseta","#"+jug.numero_camiseta] : null,
            ].filter(Boolean).map(([ico,lbl,val])=>(
              <div key={lbl} style={{background:C.offWhite,borderRadius:10,padding:"8px 12px"}}>
                <div style={{fontSize:10,color:C.grayMid,textTransform:"uppercase",fontWeight:600}}>{ico} {lbl}</div>
                <div style={{fontSize:13,fontWeight:700,color:C.navy,marginTop:2}}>{val||"-"}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Estado pagos */}
        <div style={{fontFamily:"'Barlow Condensed',sans-serif",fontWeight:800,fontSize:16,
          color:C.navy,textTransform:"uppercase",marginBottom:10}}>Pagos {añoActual}</div>
        <div style={{display:"grid",gridTemplateColumns:"repeat(3,1fr)",gap:8,marginBottom:16}}>
          {MESES.map((m,i)=>{
            const mes=i+1;
            const monto=cuotaMes(mes);
            const pago=pagoMes(mes);
            if (monto===0) return(
              <div key={mes} style={{background:C.offWhite,borderRadius:10,padding:"8px 10px",textAlign:"center",opacity:.5}}>
                <div style={{fontFamily:"'Barlow Condensed',sans-serif",fontWeight:700,fontSize:11,color:C.grayMid}}>{m}</div>
                <div style={{fontSize:10,color:C.grayMid}}>Sin cuota</div>
              </div>
            );
            return(
              <div key={mes} style={{background:pago?"#f0fdf4":C.white,borderRadius:10,padding:"8px 10px",
                textAlign:"center",border:`1px solid ${pago?"#86efac":C.gray}`}}>
                <div style={{fontFamily:"'Barlow Condensed',sans-serif",fontWeight:700,fontSize:11,
                  color:pago?C.green:C.navy}}>{m}</div>
                <div style={{fontFamily:"'Barlow Condensed',sans-serif",fontWeight:900,fontSize:13,
                  color:pago?C.green:C.navy}}>{fmt(monto)}</div>
                <div style={{fontSize:9,marginTop:2,
                  color:pago?"#16a34a":"#d97706",fontWeight:700,textTransform:"uppercase"}}>
                  {pago?"✓ Pagado":"Pendiente"}
                </div>
              </div>
            );
          })}
        </div>

        {/* Botón pagar */}
        {mesesConDeuda().length>0&&(
          <button onClick={()=>setModal("pagar")}
            style={{width:"100%",padding:"14px",background:`linear-gradient(135deg,${C.green},#15803d)`,
              color:C.white,border:"none",borderRadius:12,fontFamily:"'Barlow Condensed',sans-serif",
              fontWeight:900,fontSize:18,textTransform:"uppercase"}}>
            💳 Registrar Pago
          </button>
        )}
      </div>

      {/* Modal pago */}
      {modal==="pagar"&&(
        <Modal onClose={resetModal} maxWidth={500}>
          <div style={{background:`linear-gradient(135deg,${C.navyDark},${C.navy})`,padding:"16px 20px",
            display:"flex",alignItems:"center",gap:10}}>
            <div style={{fontFamily:"'Barlow Condensed',sans-serif",fontWeight:900,fontSize:20,
              color:C.white,textTransform:"uppercase",flex:1}}>💳 Registrar Pago</div>
            {selectedMeses.length>0&&(
              <div style={{fontFamily:"'Barlow Condensed',sans-serif",fontWeight:900,fontSize:18,
                color:C.gold}}>{fmt(totalPub)}</div>
            )}
          </div>
          <div style={{padding:"16px 20px",maxHeight:"80dvh",overflowY:"auto"}}>

            {/* MESES */}
            <div style={{fontFamily:"'Barlow Condensed',sans-serif",fontWeight:700,fontSize:12,
              color:C.navy,textTransform:"uppercase",marginBottom:8}}>Meses a pagar</div>
            <div style={{display:"grid",gridTemplateColumns:"repeat(3,1fr)",gap:6,marginBottom:18}}>
              {mesesConDeuda().map(mes=>{
                const sel=selectedMeses.includes(mes);
                return(
                  <button key={mes} onClick={()=>toggleMesPub(mes)}
                    style={{padding:"9px 5px",borderRadius:10,position:"relative",
                      border:`2px solid ${sel?"#16a34a":C.gray}`,
                      background:sel?"#dcfce7":C.white,cursor:"pointer",
                      fontFamily:"'Barlow Condensed',sans-serif",fontWeight:700,fontSize:12,
                      color:sel?"#16a34a":C.navy}}>
                    {sel&&<span style={{position:"absolute",top:2,right:4,fontSize:9}}>✓</span>}
                    <div>{MESES[mes-1].slice(0,3)}</div>
                    <div style={{fontWeight:900,fontSize:14}}>{fmt(cuotaMes(mes))}</div>
                  </button>
                );
              })}
            </div>

            {/* TIPO DE MÉTODO */}
            <div style={{fontFamily:"'Barlow Condensed',sans-serif",fontWeight:700,fontSize:12,
              color:C.navy,textTransform:"uppercase",marginBottom:8}}>Forma de pago</div>
            <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:10,marginBottom:16}}>
              <button onClick={()=>{setTipoMetodo("transferencia");setPayMethod(null);}}
                style={{padding:"14px 8px",borderRadius:14,cursor:"pointer",
                  border:`2px solid ${tipoMetodo==="transferencia"?"#0ea5e9":C.gray}`,
                  background:tipoMetodo==="transferencia"?"#f0f9ff":C.white,
                  fontFamily:"'Barlow Condensed',sans-serif",fontWeight:800,fontSize:13,
                  color:tipoMetodo==="transferencia"?"#0284c7":C.navy,
                  display:"flex",flexDirection:"column",alignItems:"center",gap:5}}>
                <span style={{fontSize:28}}>🏦</span>
                <span>Transferencia</span>
                <span style={{fontSize:9,fontWeight:600,color:tipoMetodo==="transferencia"?"#0284c7":C.grayMid,
                  textAlign:"center",lineHeight:1.2}}>Adjuntar comprobante</span>
              </button>
              <button onClick={()=>{setTipoMetodo("electronico");setComprobante(null);}}
                style={{padding:"14px 8px",borderRadius:14,cursor:"pointer",
                  border:`2px solid ${tipoMetodo==="electronico"?"#7c3aed":C.gray}`,
                  background:tipoMetodo==="electronico"?"#faf5ff":C.white,
                  fontFamily:"'Barlow Condensed',sans-serif",fontWeight:800,fontSize:13,
                  color:tipoMetodo==="electronico"?"#7c3aed":C.navy,
                  display:"flex",flexDirection:"column",alignItems:"center",gap:5}}>
                <span style={{fontSize:28}}>💳</span>
                <span>Débito / MP</span>
                <span style={{fontSize:9,fontWeight:600,color:tipoMetodo==="electronico"?"#7c3aed":C.grayMid,
                  textAlign:"center",lineHeight:1.2}}>Pasarela / QR</span>
              </button>
            </div>

            {/* ── SECCIÓN TRANSFERENCIA ── */}
            {tipoMetodo==="transferencia"&&(
              <div style={{background:"#f0f9ff",borderRadius:14,padding:14,
                border:"1px solid #bae6fd",marginBottom:14}}>
                {/* Datos bancarios */}
                <div style={{fontFamily:"'Barlow Condensed',sans-serif",fontWeight:800,fontSize:13,
                  color:"#0369a1",textTransform:"uppercase",marginBottom:8}}>📋 Datos del club</div>
                <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:6,marginBottom:12}}>
                  {[["CBU",CBU_CLUB],["Alias",ALIAS_CLUB],
                    ["Monto a transferir",fmt(totalPub)],
                    ["A nombre de","Paysandú FC Baby"]].map(([lbl,val])=>(
                    <div key={lbl} style={{background:"white",borderRadius:8,padding:"8px 10px"}}>
                      <div style={{fontSize:9,color:C.grayMid,textTransform:"uppercase",fontWeight:600}}>{lbl}</div>
                      <div style={{fontFamily:"'Barlow Condensed',sans-serif",fontWeight:700,fontSize:12,
                        color:C.navy,wordBreak:"break-all"}}>{val}</div>
                    </div>
                  ))}
                </div>
                {/* Nota / detalle */}
                <div style={{fontFamily:"'Barlow Condensed',sans-serif",fontWeight:700,fontSize:11,
                  color:C.navy,textTransform:"uppercase",marginBottom:5}}>
                  Detalle de meses pagados *
                </div>
                <textarea value={notaTransf}
                  onChange={e=>setNotaTransf(e.target.value)}
                  placeholder={`Ej: ${selectedMeses.map(m=>MESES[m-1]).join(", ")} — ${jug.nombre}`}
                  rows={2}
                  style={{width:"100%",padding:"8px 10px",borderRadius:8,
                    border:`1px solid ${C.gray}`,fontSize:13,fontFamily:"'Barlow',sans-serif",
                    resize:"none",outline:"none",marginBottom:10}}/>
                {/* Foto comprobante */}
                <div style={{fontFamily:"'Barlow Condensed',sans-serif",fontWeight:700,fontSize:11,
                  color:C.navy,textTransform:"uppercase",marginBottom:6}}>
                  Comprobante de transferencia *
                </div>
                {comprobante?(
                  <div style={{textAlign:"center",marginBottom:8}}>
                    <img src={comprobante} style={{maxWidth:"100%",maxHeight:180,borderRadius:10,
                      border:`2px solid #0ea5e9`}}/>
                    <button onClick={()=>setComprobante(null)}
                      style={{display:"block",margin:"6px auto 0",background:"none",border:"none",
                        color:"#dc2626",fontSize:12,cursor:"pointer",fontWeight:600}}>
                      ✕ Eliminar foto
                    </button>
                  </div>
                ):(
                  <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:8}}>
                    <label style={{display:"flex",flexDirection:"column",alignItems:"center",gap:5,
                      padding:"14px 8px",border:`2px dashed #0ea5e9`,borderRadius:12,
                      cursor:"pointer",background:"white",textAlign:"center"}}>
                      <span style={{fontSize:26}}>📸</span>
                      <span style={{fontFamily:"'Barlow Condensed',sans-serif",fontWeight:700,
                        fontSize:12,color:C.navy,textTransform:"uppercase"}}>Sacar foto</span>
                      <span style={{fontSize:10,color:C.grayMid}}>Cámara</span>
                      <input type="file" accept="image/*" capture="environment"
                        style={{display:"none"}} onChange={handleComprobante}/>
                    </label>
                    <label style={{display:"flex",flexDirection:"column",alignItems:"center",gap:5,
                      padding:"14px 8px",border:`2px dashed ${C.gray}`,borderRadius:12,
                      cursor:"pointer",background:"white",textAlign:"center"}}>
                      <span style={{fontSize:26}}>📁</span>
                      <span style={{fontFamily:"'Barlow Condensed',sans-serif",fontWeight:700,
                        fontSize:12,color:C.navy,textTransform:"uppercase"}}>Adjuntar</span>
                      <span style={{fontSize:10,color:C.grayMid}}>Galería / archivo</span>
                      <input type="file" accept="image/*"
                        style={{display:"none"}} onChange={handleComprobante}/>
                    </label>
                  </div>
                )}
              </div>
            )}

            {/* ── SECCIÓN ELECTRÓNICO ── */}
            {tipoMetodo==="electronico"&&(
              <div style={{marginBottom:14}}>
                <div style={{display:"grid",gridTemplateColumns:"repeat(3,1fr)",gap:8}}>
                  {PAY_METHODS.map(pm=>(
                    <button key={pm.id} onClick={()=>setPayMethod(pm.id)}
                      style={{padding:"12px 6px",borderRadius:12,
                        border:`2px solid ${payMethod===pm.id?pm.color:C.gray}`,
                        background:payMethod===pm.id?pm.color+"18":C.white,cursor:"pointer",
                        fontFamily:"'Barlow Condensed',sans-serif",fontWeight:700,fontSize:13,
                        color:payMethod===pm.id?pm.color:C.navy,
                        display:"flex",flexDirection:"column",alignItems:"center",gap:4}}>
                      <span style={{fontSize:22}}>{pm.icon}</span>{pm.label}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* BOTONES ACCIÓN */}
            <div style={{display:"flex",gap:8,marginTop:4}}>
              <button onClick={resetModal}
                style={{flex:1,padding:"11px",background:"transparent",color:C.navy,
                  border:`2px solid ${C.navy}`,borderRadius:10,
                  fontFamily:"'Barlow Condensed',sans-serif",fontWeight:700,
                  fontSize:13,textTransform:"uppercase"}}>Cancelar</button>
              {tipoMetodo==="transferencia"&&(
                <button onClick={confirmarTransferencia}
                  disabled={!comprobante||selectedMeses.length===0||paying}
                  style={{flex:2,padding:"11px",border:"none",borderRadius:10,
                    background:comprobante&&selectedMeses.length>0
                      ?"linear-gradient(135deg,#0ea5e9,#0369a1)":"#e2e2da",
                    color:comprobante&&selectedMeses.length>0?C.white:C.grayMid,
                    fontFamily:"'Barlow Condensed',sans-serif",fontWeight:900,
                    fontSize:14,textTransform:"uppercase"}}>
                  {paying?"⏳ Enviando...":"📤 Enviar comprobante"}
                </button>
              )}
              {tipoMetodo==="electronico"&&(
                <button onClick={confirmarPago}
                  disabled={!payMethod||selectedMeses.length===0||paying}
                  style={{flex:2,padding:"11px",border:"none",borderRadius:10,
                    background:payMethod&&selectedMeses.length>0
                      ?`linear-gradient(135deg,${C.green},#15803d)`:"#e2e2da",
                    color:payMethod&&selectedMeses.length>0?C.white:C.grayMid,
                    fontFamily:"'Barlow Condensed',sans-serif",fontWeight:900,
                    fontSize:14,textTransform:"uppercase"}}>
                  {paying?"⏳ Procesando...":"✅ Confirmar pago"}
                </button>
              )}
            </div>
          </div>
        </Modal>
      )}
      {modal==="success"&&(
        <Modal onClose={()=>setModal(null)} maxWidth={340}>
          <div style={{padding:"36px 28px",textAlign:"center"}}>
            <div style={{fontSize:56,marginBottom:12}}>✅</div>
            <div style={{fontFamily:"'Barlow Condensed',sans-serif",fontWeight:900,fontSize:26,
              color:C.navy,textTransform:"uppercase",marginBottom:8}}>¡Pago registrado!</div>
            <div style={{color:C.grayMid,fontSize:14,marginBottom:20}}>El pago fue registrado correctamente.</div>
            <button onClick={()=>setModal(null)}
              style={{width:"100%",padding:"12px",background:`linear-gradient(135deg,${C.navy},${C.navyLight})`,
                color:C.white,border:"none",borderRadius:10,fontFamily:"'Barlow Condensed',sans-serif",
                fontWeight:900,fontSize:16,textTransform:"uppercase"}}>Cerrar</button>
          </div>
        </Modal>
      )}
      {modal==="success_transf"&&(
        <Modal onClose={()=>setModal(null)} maxWidth={360}>
          <div style={{padding:"36px 28px",textAlign:"center"}}>
            <div style={{fontSize:56,marginBottom:12}}>📤</div>
            <div style={{fontFamily:"'Barlow Condensed',sans-serif",fontWeight:900,fontSize:24,
              color:C.navy,textTransform:"uppercase",marginBottom:8}}>¡Comprobante enviado!</div>
            <div style={{background:"#fef3c7",borderRadius:12,padding:"12px 16px",marginBottom:20,
              border:"1px solid #fde68a",fontSize:13,color:"#92400e",lineHeight:1.5}}>
              ⏳ Tu pago está <strong>pendiente de verificación</strong>.<br/>
              El administrador lo confirmará en breve.
            </div>
            <button onClick={()=>setModal(null)}
              style={{width:"100%",padding:"12px",background:`linear-gradient(135deg,#0ea5e9,#0369a1)`,
                color:C.white,border:"none",borderRadius:10,fontFamily:"'Barlow Condensed',sans-serif",
                fontWeight:900,fontSize:16,textTransform:"uppercase"}}>Cerrar</button>
          </div>
        </Modal>
      )}
    </div>
  );
}

/* ══ FORM ALTA JUGADOR ════════════════════════════════════════════════ */
function FormAltaJugador({ categorias, onSave, onCancel, initialData=null, readonlyPagos=false, showTipoCuota=true, readOnly=false }) {
  const [f, setF] = useState(initialData || {
    nombre:"", celular:"", mail:"", categoria_id:"",
    fecha_nacimiento:"", ci:"", numero_camiseta:"", direccion:"",
    foto_url:"", tipo_cuota:"base", pin_familia:"",
  });

  const set = (k,v) => setF(p=>({...p,[k]:v}));

  const valid = f.nombre && f.celular && f.categoria_id && f.fecha_nacimiento;

  // Validar que el año de nacimiento coincida con la categoría (si la cat es un año)
  const catEsAño = /^\d{4}$/.test(f.categoria_id);
  const añoNac   = f.fecha_nacimiento ? new Date(f.fecha_nacimiento).getFullYear() : null;
  const catMismatch = catEsAño && añoNac && String(añoNac) !== f.categoria_id;

  return (
    <div>
      <div style={{background:`linear-gradient(135deg,${C.navyDark},${C.navy})`,padding:"18px 22px",
        display:"flex",alignItems:"center",gap:14}}>
        {initialData?.foto_url&&(
          <img src={initialData.foto_url} style={{width:48,height:48,borderRadius:"50%",
            objectFit:"cover",border:"2px solid rgba(255,255,255,.4)",flexShrink:0}}
            onError={e=>e.target.style.display="none"}/>
        )}
        <div>
          <div style={{fontFamily:"'Barlow Condensed',sans-serif",fontWeight:900,fontSize:20,
            color:C.white,textTransform:"uppercase"}}>
            {readOnly?"👤 Ficha del jugador":initialData?"✏ Editar Jugador":"➕ Nuevo Jugador"}
          </div>
          {readOnly&&initialData&&<div style={{color:"rgba(255,255,255,.6)",fontSize:12,marginTop:2}}>
            ID: {initialData.id}
          </div>}
        </div>
      </div>
      <div style={{padding:"20px 22px",maxHeight:"70dvh",overflowY:"auto"}}>
        {/* Foto */}
        <div style={{marginBottom:16}}>
          <label style={{display:"block",fontFamily:"'Barlow Condensed',sans-serif",fontWeight:700,
            fontSize:12,color:C.navy,textTransform:"uppercase",marginBottom:8}}>Foto — opcional</label>
          {/* Preview */}
          {f.foto_url&&(
            <div style={{textAlign:"center",marginBottom:10}}>
              <img src={f.foto_url} alt="preview"
                style={{width:80,height:80,borderRadius:"50%",objectFit:"cover",
                  border:`3px solid ${C.navy}`}}
                onError={e=>e.target.style.display="none"}/>
            </div>
          )}
          {/* Opciones foto */}
          <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:8,marginBottom:8}}>
            <label style={{display:"flex",flexDirection:"column",alignItems:"center",gap:4,
              padding:"12px 8px",border:`2px dashed ${C.navy}`,borderRadius:10,cursor:"pointer",
              background:C.offWhite,fontFamily:"'Barlow Condensed',sans-serif",fontWeight:700,
              fontSize:12,color:C.navy,textTransform:"uppercase",textAlign:"center"}}>
              📸 Sacar foto
              <input type="file" accept="image/*" capture="environment"
                style={{display:"none"}}
                onChange={e=>{
                  const file=e.target.files?.[0];
                  if(!file) return;
                  const reader=new FileReader();
                  reader.onload=async ev=>{ const c=await comprimirImagen(ev.target.result); set("foto_url",c); };
                  reader.readAsDataURL(file);
                }}/>
            </label>
            <label style={{display:"flex",flexDirection:"column",alignItems:"center",gap:4,
              padding:"12px 8px",border:`2px dashed ${C.gray}`,borderRadius:10,cursor:"pointer",
              background:C.offWhite,fontFamily:"'Barlow Condensed',sans-serif",fontWeight:700,
              fontSize:12,color:C.navy,textTransform:"uppercase",textAlign:"center"}}>
              🖼 Elegir imagen
              <input type="file" accept="image/*"
                style={{display:"none"}}
                onChange={e=>{
                  const file=e.target.files?.[0];
                  if(!file) return;
                  const reader=new FileReader();
                  reader.onload=async ev=>{ const c=await comprimirImagen(ev.target.result); set("foto_url",c); };
                  reader.readAsDataURL(file);
                }}/>
            </label>
          </div>
          <input value={f.foto_url&&f.foto_url.startsWith("data:")?"":(f.foto_url||"")}
            onChange={e=>set("foto_url",e.target.value)}
            placeholder="O pegá una URL de imagen..."
            style={{width:"100%",padding:"8px 12px",border:`1px solid ${C.gray}`,borderRadius:8,
              fontSize:12,color:C.grayMid}}/>
          {f.foto_url&&(
            <button onClick={()=>set("foto_url","")}
              style={{marginTop:4,background:"none",border:"none",color:"#dc2626",
                fontSize:11,cursor:"pointer",fontFamily:"'Barlow Condensed',sans-serif",
                fontWeight:600}}>✕ Eliminar foto</button>
          )}
        </div>

        {[
          ["nombre","Nombre completo *","text",true],
          ["ci","Cédula de identidad","text",false],
          ["pin_familia","PIN familia (3 dígitos, opcional)","number",false],
          ["celular","Celular *","tel",true],
          ["mail","Email","email",false],
          ["fecha_nacimiento","Fecha de nacimiento *","date",true],
          ["numero_camiseta","Número de camiseta","text",false],
          ["direccion","Dirección","text",false],
        ].map(([k,label,type,req])=>(
          <div key={k} style={{marginBottom:12}}>
            <label style={{display:"block",fontFamily:"'Barlow Condensed',sans-serif",fontWeight:700,
              fontSize:12,color:C.navy,textTransform:"uppercase",marginBottom:5}}>{label}</label>
            <input type={type} value={f[k]||""} onChange={e=>set(k,e.target.value)}
              placeholder={label.replace(" *","")}
              style={{width:"100%",padding:"9px 12px",border:`1px solid ${C.gray}`,borderRadius:8,fontSize:14}}/>
          </div>
        ))}

        <div style={{marginBottom:12}}>
          <label style={{display:"block",fontFamily:"'Barlow Condensed',sans-serif",fontWeight:700,
            fontSize:12,color:C.navy,textTransform:"uppercase",marginBottom:5}}>Categoría *</label>
          <select value={f.categoria_id} onChange={e=>set("categoria_id",e.target.value)}
            style={{width:"100%",padding:"9px 12px",border:`1px solid ${C.gray}`,borderRadius:8,fontSize:14}}>
            <option value="">— Seleccioná categoría —</option>
            {categorias.map(c=>(
              <option key={c.id} value={c.id}>{c.nombre}</option>
            ))}
          </select>
        </div>

        {catMismatch&&(
          <div style={{background:"#fff3cd",border:"1px solid #ffc107",borderRadius:8,
            padding:"10px 14px",marginBottom:12,fontSize:13,color:"#856404"}}>
            ⚠️ El año de nacimiento ({añoNac}) no coincide con la categoría seleccionada ({f.categoria_id}).
            Por favor verificá los datos.
          </div>
        )}

        {showTipoCuota&&(
          <div style={{marginBottom:20}}>
            <label style={{display:"block",fontFamily:"'Barlow Condensed',sans-serif",fontWeight:700,
              fontSize:12,color:C.navy,textTransform:"uppercase",marginBottom:5}}>Tipo de cuota</label>
            <select value={f.tipo_cuota||"base"} onChange={e=>set("tipo_cuota",e.target.value)}
              style={{width:"100%",padding:"9px 12px",border:`1px solid ${C.gray}`,borderRadius:8,fontSize:14}}>
              {TIPOS_CUOTA_DEFAULT.map(t=>(
                <option key={t.id} value={t.id}>{t.nombre} ({t.porcentaje}%)</option>
              ))}
            </select>
          </div>
        )}

        <div style={{display:"flex",gap:10}}>
          <button onClick={onCancel}
            style={{flex:1,padding:"11px",background:"transparent",color:C.navy,
              border:`2px solid ${C.navy}`,borderRadius:10,fontFamily:"'Barlow Condensed',sans-serif",
              fontWeight:700,fontSize:14,textTransform:"uppercase"}}>{readOnly?"Cerrar":"Cancelar"}</button>
          {!readOnly&&(
            <button onClick={()=>valid&&onSave(f)} disabled={!valid}
              style={{flex:2,padding:"11px",background:valid?`linear-gradient(135deg,${C.navy},${C.navyLight})`:"#e2e2da",
                color:valid?C.white:C.grayMid,border:"none",borderRadius:10,fontFamily:"'Barlow Condensed',sans-serif",
                fontWeight:900,fontSize:15,textTransform:"uppercase"}}>Guardar</button>
          )}
        </div>
      </div>
    </div>
  );
}


/* ══ MODAL QR JUGADOR ═════════════════════════════════════════════════ */
function ModalQRJugador({ jugId, jug, onClose }) {
  const nombre = jug ? jug.nombre : "";
  const cat    = jug ? jug.categoria_id : "";
  const qrSrc  = "https://api.qrserver.com/v1/create-qr-code/?size=240x240&data="
    + encodeURIComponent(jugId)
    + "&bgcolor=ffffff&color=1e2a6e&qzone=2";

  const imprimir = () => {
    const html = [
      "<!DOCTYPE html><html><head><meta charset='utf-8'>",
      "<title>QR " + (nombre||jugId) + "</title>",
      "<style>",
      "body{font-family:Arial,sans-serif;text-align:center;padding:30px;max-width:400px;margin:0 auto;}",
      "h2{color:#1e2a6e;font-size:22px;text-transform:uppercase;margin:10px 0 4px;}",
      "p{color:#666;font-size:14px;margin:4px 0;}",
      ".id{font-size:28px;font-weight:900;color:#9c6fae;letter-spacing:.15em;margin:8px 0;}",
      "img.qr{border:3px solid #1e2a6e;border-radius:12px;margin:12px 0;}",
      ".footer{font-size:11px;color:#999;margin-top:12px;}",
      "@media print{button{display:none}}",
      "</style></head><body>",
      "<img src='https://paysandu-pos.vercel.app/escudo.png' width='60' style='border:none;margin-bottom:0;' onerror='this.style.display=\'none\''>",
      "<h2>" + (nombre||"") + "</h2>",
      "<p>Categoría " + (cat||"") + " · Paysandú FC Baby Fútbol</p>",
      "<img class='qr' src='" + qrSrc + "' width='200' height='200'/>",
      "<div class='id'>" + jugId + "</div>",
      "<p class='footer'>Escaneá el QR o usá el código para ver tu ficha y pagos</p>",
      "<script>window.onload=function(){window.print();}<\/script>",
      "</body></html>"
    ].join("");
    const w = window.open("","_blank");
    w.document.write(html);
    w.document.close();
  };

  const linkAcceso = window.location.origin + "?id=" + jugId;

  return (
    <Modal onClose={onClose} maxWidth={420}>
      <div style={{background:`linear-gradient(135deg,${C.navyDark},${C.navy})`,padding:"16px 20px",textAlign:"center"}}>
        <ClubLogo size={52}/>
        <div style={{fontFamily:"'Barlow Condensed',sans-serif",fontWeight:900,fontSize:16,
          color:C.white,textTransform:"uppercase",marginTop:8}}>Paysandú FC — Baby Fútbol</div>
      </div>
      <div style={{padding:"20px 24px",textAlign:"center"}}>
        {nombre&&<div style={{fontFamily:"'Barlow Condensed',sans-serif",fontWeight:900,fontSize:22,
          color:C.navy,textTransform:"uppercase",marginBottom:2}}>{nombre}</div>}
        {cat&&<div style={{fontSize:13,color:C.grayMid,marginBottom:10}}>Categoría {cat}</div>}
        <img src={qrSrc} style={{width:190,height:190,borderRadius:12,border:`3px solid ${C.navy}`,marginBottom:8}}/>
        <div style={{fontFamily:"'Barlow Condensed',sans-serif",fontWeight:900,fontSize:18,
          color:C.lilacDark,letterSpacing:".15em",marginBottom:4}}>{jugId}</div>
        <div style={{fontSize:11,color:C.grayMid,marginBottom:12}}>
          Escaneá el QR o compartí el link de acceso directo
        </div>
        {/* Link de acceso */}
        <div style={{background:C.offWhite,borderRadius:8,padding:"8px 12px",marginBottom:14,
          fontSize:11,color:C.navy,wordBreak:"break-all",border:`1px solid ${C.gray}`}}>
          {linkAcceso}
        </div>
        <div style={{display:"flex",gap:8,marginBottom:8}}>
          <button onClick={()=>{ navigator.clipboard?.writeText(linkAcceso).then(()=>{ alert("✅ Link de acceso copiado para " + (nombre||jugId) + ". Al abrirlo entra directo a la ficha."); }); }}
            style={{flex:1,padding:"10px",background:`linear-gradient(135deg,${C.green},#15803d)`,color:C.white,
              border:"none",borderRadius:10,fontFamily:"'Barlow Condensed',sans-serif",
              fontWeight:700,fontSize:12,textTransform:"uppercase",cursor:"pointer"}}>🔗 Copiar link</button>
          <button onClick={imprimir}
            style={{flex:1,padding:"10px",background:`linear-gradient(135deg,${C.navy},${C.navyLight})`,
              color:C.white,border:"none",borderRadius:10,fontFamily:"'Barlow Condensed',sans-serif",
              fontWeight:700,fontSize:12,textTransform:"uppercase",cursor:"pointer"}}>🖨 Imprimir</button>
        </div>
        <button onClick={onClose}
          style={{width:"100%",padding:"9px",background:"transparent",color:C.grayMid,
            border:`1px solid ${C.gray}`,borderRadius:10,fontFamily:"'Barlow Condensed',sans-serif",
            fontWeight:700,fontSize:13,cursor:"pointer"}}>Cerrar</button>
      </div>
    </Modal>
  );
}

/* ══ ADMIN SCREEN ═════════════════════════════════════════════════════ */
function AdminScreen({ user, onLogout }) {
  const [tab,          setTab]         = useState("delegados");
  const [categorias,   setCategorias]  = useState([]);
  const [jugadores,    setJugadores]   = useState([]);
  const [pendientes,   setPendientes]  = useState([]);
  const [delegados,    setDelegados]   = useState([]);
  const [planPagos,    setPlanPagos]   = useState([]);
  const [pagos,        setPagos]       = useState([]);
  const [tiposCuota,   setTiposCuota]  = useState(TIPOS_CUOTA_DEFAULT);
  const [filtCat,      setFiltCat]     = useState("todos");
  const [modal,        setModal]       = useState(null); // null | "newJug" | "editJug" | "fichaJug" | "newDel" | "editDel"
  const [verComprobante, setVerComprobante] = useState(null); // base64 imagen comprobante
  const [modalReporte,   setModalReporte]   = useState(false);
  const [camposReporte,  setCamposReporte]  = useState({nombre:true,ci:true,categoria:true,fecha_nacimiento:false,camiseta:false,celular:false,tipo_cuota:false,estado:true,codigo:false});
  const [modalTransfRep, setModalTransfRep] = useState(false);
  const [transfMesDesde, setTransfMesDesde] = useState(1);
  const [transfMesHasta, setTransfMesHasta] = useState(new Date().getMonth()+1);
  const [modalLimpieza,  setModalLimpieza]  = useState(false);
  const [claveInput,     setClaveInput]     = useState("");
  const [limpiezaStep,   setLimpiezaStep]   = useState(1); // 1=advertencia, 2=clave, 3=confirmar
  const [limpiezaErr,    setLimpiezaErr]    = useState("");
  const [limpiezaOk,     setLimpiezaOk]     = useState(false);
  const CLAVE_LIMPIEZA = "PAYSANDU2025"; // clave para operaciones destructivas
  const [selJugador,   setSelJugador]  = useState(null);
  const [loading,      setLoading]     = useState(true);
  const [qrLink,       setQrLink]      = useState(null);
  const [jugPagosVer,  setJugPagosVer] = useState(null); // jugador para ver historial desde planteles
  const añoActual = new Date().getFullYear();

  const load = useCallback(async () => {
    setLoading(true);
    const [cats, jugs, pends, dels, plan, pags] = await Promise.all([
      sbFetch("baby_categorias?select=*&order=nombre.asc"),
      sbFetch("baby_jugadores?select=*&order=nombre.asc"),
      sbFetch("baby_formularios_pendientes?select=*&order=created_at.desc"),
      sbFetch("baby_delegados?select=*&order=nombre.asc"),
      sbFetch(`baby_plan_pagos?año=eq.${añoActual}&select=*&order=mes.asc`),
      sbFetch(`baby_pagos?año=eq.${añoActual}&select=*`),
    ]);
    setCategorias(cats||[]);
    setJugadores(jugs||[]);
    setPendientes(pends||[]);
    setDelegados(dels||[]);
    setPlanPagos(plan||[]);
    setPagos(pags||[]);
    setLoading(false);
  },[añoActual]);

  // Sincronización suave de pagos cada 30s (no toca loading ni interrumpe edición)
  const syncPagos = useCallback(async () => {
    const pags = await sbFetch(`baby_pagos?año=eq.${añoActual}&select=*`);
    if (pags) setPagos(pags);
    const pends = await sbFetch("baby_formularios_pendientes?select=*&order=created_at.desc");
    if (pends) setPendientes(pends);
  },[añoActual]);

  useEffect(()=>{ load(); },[load]);
  useEffect(()=>{
    const timer = setInterval(syncPagos, 30000);
    return ()=>clearInterval(timer);
  },[syncPagos]);

  const jugadoresFilt = (filtCat==="todos"
    ? jugadores
    : jugadores.filter(j=>j.categoria_id===filtCat)
  ).filter(j=>j.estado!=="baja");

  const jugadoresDeudores = jugadores.filter(j=>j.estado==="baja");

  const cuotaJugMes = (jug, mes) => {
    const planMes = planPagos.find(p=>p.mes===mes);
    if (!planMes || planMes.monto===0) return 0;
    const tipo = tiposCuota.find(t=>t.id===jug.tipo_cuota)||tiposCuota[0];
    return Math.round(planMes.monto * tipo.porcentaje / 100);
  };

  const pagoJugMes = (jugId, mes) => pagos.find(p=>p.jugador_id===jugId&&p.mes===mes);

  const saveJugador = async (data) => {
    // Si foto es base64 muy grande (>200KB), no la guardamos en este campo
    const fotoOk = data.foto_url && data.foto_url.length < 500000 ? data.foto_url : (data.foto_url?.startsWith("http") ? data.foto_url : "");
    const payload = {
      nombre: data.nombre||"",
      celular: data.celular||"",
      mail: data.mail||"",
      ci: data.ci||"",
      categoria_id: data.categoria_id||"",
      fecha_nacimiento: data.fecha_nacimiento||"",
      numero_camiseta: data.numero_camiseta||"",
      direccion: data.direccion||"",
      foto_url: fotoOk,
      tipo_cuota: data.tipo_cuota||"base",
      pin_familia: data.pin_familia ? String(data.pin_familia).slice(0,3) : "",
      org_id: "paysandu",
      estado: "activo",
      pendiente_validacion: false,
    };
    if (selJugador) {
      const res = await sbFetch(`baby_jugadores?id=eq.${selJugador.id}`, "PATCH", payload);
      if (!res) { alert("Error al guardar. Revisá la consola del navegador (F12)."); return; }
    } else {
      const newId = uid();
      const res = await sbFetch("baby_jugadores", "POST", {
        ...payload, id:newId, created_at:new Date().toISOString(),
      });
      if (!res) {
        const detail = window._lastSbError || "Sin detalle";
        alert("❌ Error al crear jugador:\n\n" + detail + "\n\n¿Ya ejecutaste el SQL para deshabilitar RLS en Supabase?");
        return;
      }
    }
    setModal(null); setSelJugador(null);
    load();
  };

  const deleteJugador = async (id) => {
    // Verificar si tiene deuda
    const jug = jugadores.find(j=>j.id===id);
    const mesActual = new Date().getMonth()+1;
    const deudaMeses = MESES.map((_,i)=>i+1).filter(mes=>{
      const plan=planPagos.find(p=>p.mes===mes);
      if(!plan||plan.monto===0||mes>(new Date().getDate()>10 ? new Date().getMonth()+1 : new Date().getMonth())) return false;
      const tipo=tiposCuota.find(t=>t.id===jug?.tipo_cuota)||tiposCuota[0];
      const monto=Math.round(plan.monto*tipo.porcentaje/100);
      return monto>0&&!pagos.find(p=>p.jugador_id===id&&p.mes===mes);
    });
    const montoDeuda = deudaMeses.reduce((acc,mes)=>{
      const plan=planPagos.find(p=>p.mes===mes);
      const tipo=tiposCuota.find(t=>t.id===jug?.tipo_cuota)||tiposCuota[0];
      return acc+Math.round(plan.monto*tipo.porcentaje/100);
    },0);

    if (deudaMeses.length>0) {
      const ok = confirm(
        "⚠️ " + (jug?.nombre||"Este jugador") + " tiene deuda pendiente de " +
        deudaMeses.length + " mes" + (deudaMeses.length>1?"es":"") +
        " ($" + montoDeuda.toLocaleString("es-UY") + ").\n\n" +
        "Se moverá a la sección DEUDORES. ¿Confirmar baja?"
      );
      if (!ok) return;
      await sbFetch(`baby_jugadores?id=eq.${id}`, "PATCH", {estado:"baja"});
      load();
      return;
    }

    if (!confirm("¿Eliminar jugador? Esta acción no se puede deshacer.")) return;
    await sbFetch(`baby_pagos?jugador_id=eq.${id}`, "DELETE");
    const res = await sbFetch(`baby_jugadores?id=eq.${id}`, "DELETE");
    if (res === null) {
      const detail = window._lastSbError || "Sin detalle";
      alert("❌ Error al eliminar jugador:\n" + detail);
      return;
    }
    load();
  };

  const validarPendiente = async (pend) => {
    const datos = typeof pend.datos_json==="string" ? JSON.parse(pend.datos_json) : pend.datos_json;

    // Si es formulario de delegado
    if (datos._tipo === "delegado") {
      const { _tipo, foto_url: _fotoEnJson, ...ddata } = datos;
      // Foto viene en columna separada pend.foto_url (no dentro del JSON)
      const fotoDel = pend.foto_url || _fotoEnJson || "";
      const payload = {
        id: uid(), org_id: "paysandu", activo: true,
        nombre: ddata.nombre||"", celular: ddata.celular||"",
        mail: ddata.mail||"", pin: ddata.pin||"0000",
        categorias: ddata.categorias||[],
        foto_url: fotoDel,
      };
      let res = await sbFetch("baby_delegados", "POST", payload);
      // Retry sin foto si falla por columna inexistente
      if (!res && window._lastSbError?.includes("foto_url")) {
        const {foto_url:_f, ...sinFoto} = payload;
        res = await sbFetch("baby_delegados", "POST", sinFoto);
      }
      if (!res) { alert("Error al crear delegado: " + (window._lastSbError||"Sin detalle")); return; }
      await sbFetch(`baby_formularios_pendientes?id=eq.${pend.id}`, "DELETE");
      load();
      return;
    }

    // Jugador normal
    const { foto_url: _fotoEnJsonJug, tipo_cuota, _tipo:_t, ...resto } = datos;
    // Foto viene en columna separada pend.foto_url
    const fotoOk = pend.foto_url || _fotoEnJsonJug || "";
    const jugador = {
      nombre: resto.nombre||"",
      celular: resto.celular||"",
      mail: resto.mail||"",
      ci: resto.ci||"",
      categoria_id: resto.categoria_id||"",
      fecha_nacimiento: resto.fecha_nacimiento||"",
      numero_camiseta: resto.numero_camiseta||"",
      direccion: resto.direccion||"",
      foto_url: fotoOk,
      tipo_cuota: tipo_cuota || "base",
      id: uid(),
      org_id: "paysandu",
      estado: "activo",
      pendiente_validacion: false,
      created_at: new Date().toISOString(),
    };
    const res = await sbFetch("baby_jugadores", "POST", jugador);
    if (res) {
      await sbFetch(`baby_formularios_pendientes?id=eq.${pend.id}`, "DELETE");
      load();
    } else {
      const detail = window._lastSbError || "Sin detalle";
      alert("❌ Error al crear jugador:\n\n" + detail + "\n\nSi tiene foto grande, intentando sin foto...");
      const sinFoto = {...jugador, foto_url:""};
      const res2 = await sbFetch("baby_jugadores", "POST", sinFoto);
      if (res2) {
        await sbFetch(`baby_formularios_pendientes?id=eq.${pend.id}`, "DELETE");
        load();
      }
    }
  };

  const rechazarPendiente = async (id) => {
    await sbFetch(`baby_formularios_pendientes?id=eq.${id}`, "DELETE");
    load();
  };

  const savePlanMes = async (mes, monto) => {
    const existe = planPagos.find(p=>p.mes===mes);
    if (existe) {
      await sbFetch(`baby_plan_pagos?id=eq.${existe.id}`, "PATCH", {monto:parseInt(monto)||0});
    } else {
      await sbFetch("baby_plan_pagos", "POST", {
        id:uid(), org_id:"paysandu", año:añoActual, mes, monto:parseInt(monto)||0
      });
    }
    const plan = await sbFetch(`baby_plan_pagos?año=eq.${añoActual}&select=*&order=mes.asc`);
    setPlanPagos(plan||[]);
  };

  const saveDelegado = async (data) => {
    const fotoOk = data.foto_url && data.foto_url.length < 500000
      ? data.foto_url
      : (data.foto_url?.startsWith("http") ? data.foto_url : "");
    const payload = {
      nombre: data.nombre||"",
      celular: data.celular||"",
      mail: data.mail||"",
      pin: data.pin||"0000",
      categorias: data.categorias||[],
      foto_url: fotoOk,
      id: uid(), org_id:"paysandu", activo:true,
    };
    let res = await sbFetch("baby_delegados", "POST", payload);
    if (!res && window._lastSbError?.includes("foto_url")) {
      const {foto_url:_f, ...sinFoto} = payload;
      res = await sbFetch("baby_delegados", "POST", sinFoto);
    }
    setModal(null); load();
  };

  const saveEditDelegado = async (data) => {
    if (!selJugador) return;
    const fotoOk = data.foto_url && data.foto_url.length < 500000
      ? data.foto_url
      : (data.foto_url?.startsWith("http") ? data.foto_url : "");
    await sbFetch(`baby_delegados?id=eq.${selJugador.id}`, "PATCH", {
      nombre: data.nombre,
      celular: data.celular,
      mail: data.mail,
      pin: data.pin,
      categorias: data.categorias,
      foto_url: fotoOk,
    });
    setModal(null); setSelJugador(null); load();
  };

  const deleteDelegado = async (id) => {
    if (!confirm("¿Eliminar delegado?")) return;
    await sbFetch(`baby_delegados?id=eq.${id}`, "DELETE");
    load();
  };

  const generarLink = (tipo) => {
    const base = window.location.origin;
    const link = `${base}?form=${tipo}&org=paysandu`;
    setQrLink(link);
    setModal("qr");
  };

  const registrarPago = async (jugId, mes, monto, metodo) => {
    await sbFetch("baby_pagos", "POST", {
      id:uid(), jugador_id:jugId, org_id:"paysandu",
      año:añoActual, mes, monto, metodo_pago:metodo, fecha_pago:fdate(),
    });
    const pags = await sbFetch(`baby_pagos?año=eq.${añoActual}&select=*`);
    setPagos(pags||[]);
  };

  const TABS = [
    ["planteles",  "⚽ Planteles"],
    ["pagos",      "💳 Pagos"],
    ["plan",       "📋 Plan de Pagos"],
    ["delegados",  "🏃 Delegados"],
    ["pendientes", "⏳ Pendientes"],
    ["deudores",   "📛 Deudores"],
    ["categorias", "🏷 Categorías"],
  ];

  useEffect(()=>{
    document.body.classList.add("needs-landscape");
    return ()=>document.body.classList.remove("needs-landscape");
  },[]);

  return (
    <div style={{minHeight:"100dvh",background:C.offWhite,display:"flex",flexDirection:"column"}}>
      {/* Header */}
      <div className="app-header" style={{background:`linear-gradient(135deg,${C.navyDark},${C.navy})`,padding:"12px 18px"}}>
        <div style={{display:"flex",alignItems:"center",gap:10}}>
          <ClubLogo size={44}/>
          <div style={{flex:1,minWidth:0}}>
            <div style={{fontFamily:"'Barlow Condensed',sans-serif",fontWeight:900,fontSize:17,
              color:C.white,textTransform:"uppercase"}}>Admin — Paysandú FC Baby</div>
            <div style={{color:C.lilac,fontSize:11}}>👤 {user.name}</div>
          </div>
          <button onClick={onLogout} style={{background:"rgba(255,255,255,.1)",border:"none",
            borderRadius:8,padding:"7px 12px",color:C.white,fontFamily:"'Barlow Condensed',sans-serif",
            fontWeight:700,fontSize:12,textTransform:"uppercase"}}>Salir</button>
        </div>
      </div>

      {/* Layout: sidebar izquierdo + contenido derecho */}
      <div className="admin-layout" style={{flex:1,display:"flex",overflow:"hidden"}}>
        {/* Sidebar navegación */}
        <div className="admin-sidebar" style={{width:260,background:C.white,borderRight:`2px solid ${C.gray}`,
          padding:"20px 18px",flexShrink:0,overflowY:"auto"}}>
          <div className="sidebar-grid-admin" style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:16}}>
            {TABS.map(([id,label])=>{
              const active = tab===id;
              const parts = label.split(" ");
              const icon = parts[0];
              const text = parts.slice(1).join(" ");
              const compsPend = pendientes.filter(p=>{try{const d=typeof p.datos_json==="string"?JSON.parse(p.datos_json):p.datos_json;return d._tipo==="comprobante";}catch(e){return false;}}).length;
              const altasPend = pendientes.filter(p=>{try{const d=typeof p.datos_json==="string"?JSON.parse(p.datos_json):p.datos_json;return d._tipo!=="comprobante";}catch(e){return true;}}).length;
              const hasBadge = (id==="pendientes" && altasPend>0) || (id==="pagos" && compsPend>0);
              const badgeCount = id==="pendientes" ? altasPend : id==="pagos" ? compsPend : 0;
              return(
                <button key={id} onClick={()=>setTab(id)}
                  className="sidebar-navbtn"
                  style={{
                    background:active?`linear-gradient(135deg,${C.navy},${C.navyLight})`:C.offWhite,
                    color:active?C.white:C.navy,
                    border:`2px solid ${active?C.navy:C.gray}`,
                    borderRadius:16,padding:"10px 8px",
                    fontFamily:"'Barlow Condensed',sans-serif",fontWeight:900,
                    textTransform:"uppercase",
                    boxShadow:active?"0 6px 18px rgba(20,28,78,.3)":"none",
                    transition:"all .12s",display:"flex",flexDirection:"column",
                    alignItems:"center",justifyContent:"center",gap:8,
                    cursor:"pointer",aspectRatio:"1",position:"relative"}}>
                  {hasBadge&&<span style={{position:"absolute",top:7,right:7,
                    background:C.red,color:C.white,borderRadius:"50%",width:19,height:19,
                    fontSize:10,fontWeight:900,display:"flex",alignItems:"center",
                    justifyContent:"center",lineHeight:1}}>{badgeCount}</span>}
                  <span className="sic" style={{fontSize:32,lineHeight:1}}>{icon}</span>
                  <span className="slb" style={{fontSize:11,fontWeight:800,letterSpacing:".02em",
                    textAlign:"center",lineHeight:1.2}}>{text}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Contenido principal */}
        <div className="admin-content" style={{flex:1,overflowY:"auto",padding:20,paddingBottom:90,minWidth:0}}>
        {loading&&<div style={{textAlign:"center",padding:"40px 0",color:C.grayMid}}>⏳ Cargando...</div>}

        {/* ── TAB PLANTELES ── */}
        {!loading&&tab==="planteles"&&(
          <div style={{maxWidth:"100%",overflowX:"auto"}}>
            {/* Barra acciones — botones cuadrados */}
            <div style={{display:"flex",gap:10,marginBottom:12,alignItems:"flex-start",flexWrap:"wrap"}}>
              <button onClick={()=>{setSelJugador(null);setModal("newJug");}}
                className="toolbar-bq" style={{width:110,height:80,background:`linear-gradient(135deg,${C.navy},${C.navyLight})`,
                  color:C.white,border:"none",borderRadius:12,
                  fontFamily:"'Barlow Condensed',sans-serif",fontWeight:900,fontSize:12,
                  textTransform:"uppercase",cursor:"pointer",display:"flex",flexDirection:"column",
                  alignItems:"center",justifyContent:"center",gap:6,
                  boxShadow:"0 4px 12px rgba(20,28,78,.25)"}}>
                <span style={{fontSize:24}}>➕</span>Nuevo jugador
              </button>
              <button onClick={()=>{
                  const base=window.location.origin;
                  const link=`${base}?form=jugador&org=paysandu`;
                  const msg = "Acceso a Alta de Jugadores - Paysandú FC - Baby Fútbol\n" + link;
                  navigator.clipboard?.writeText(msg).then(()=>{
                    alert("✅ Enlace de alta copiado. Incluye el título y el link. Pegalo en WhatsApp o email.");
                  });
                }}
                style={{width:110,height:80,background:C.offWhite,color:C.navy,
                  border:`2px solid ${C.navy}`,borderRadius:12,
                  fontFamily:"'Barlow Condensed',sans-serif",fontWeight:900,fontSize:12,
                  textTransform:"uppercase",cursor:"pointer",display:"flex",flexDirection:"column",
                  alignItems:"center",justifyContent:"center",gap:6,lineHeight:1.2,textAlign:"center"}}>
                <span style={{fontSize:24}}>📋</span>Crear acceso alta
              </button>
              <button onClick={()=>setModalReporte(true)}
                style={{width:110,height:80,background:C.offWhite,color:"#d97706",
                  border:"2px solid #d97706",borderRadius:12,
                  fontFamily:"'Barlow Condensed',sans-serif",fontWeight:900,fontSize:12,
                  textTransform:"uppercase",cursor:"pointer",display:"flex",flexDirection:"column",
                  alignItems:"center",justifyContent:"center",gap:6,lineHeight:1.2,textAlign:"center"}}>
                <span style={{fontSize:24}}>📊</span>Reporte jugadores
              </button>
              <button onClick={()=>{setModalLimpieza(true);setLimpiezaStep(1);setClaveInput("");setLimpiezaErr("");setLimpiezaOk(false);}}
                style={{width:110,height:80,background:"#fff5f5",color:"#dc2626",
                  border:"2px solid #fca5a5",borderRadius:12,
                  fontFamily:"'Barlow Condensed',sans-serif",fontWeight:900,fontSize:11,
                  textTransform:"uppercase",cursor:"pointer",display:"flex",flexDirection:"column",
                  alignItems:"center",justifyContent:"center",gap:6,lineHeight:1.2,textAlign:"center"}}>
                <span style={{fontSize:24}}>🗑</span>Limpieza anual
              </button>
            </div>
            {/* Filtros categoría — alineados con la tabla */}
            <div style={{display:"flex",gap:6,flexWrap:"wrap",marginBottom:10}}>
              {["todos",...categorias.map(c=>c.id)].map(cid=>(
                <button key={cid} onClick={()=>setFiltCat(cid)}
                  style={{background:filtCat===cid?C.navy:C.white,color:filtCat===cid?C.white:C.navy,
                    border:`2px solid ${filtCat===cid?C.navy:C.gray}`,borderRadius:20,
                    padding:"6px 14px",fontFamily:"'Barlow Condensed',sans-serif",fontWeight:700,
                    fontSize:12,textTransform:"uppercase",cursor:"pointer"}}>
                  {cid==="todos"?"Todos":cid}
                </button>
              ))}
            </div>
            <div style={{fontFamily:"'Barlow Condensed',sans-serif",fontSize:13,color:C.grayMid,marginBottom:8}}>
              {jugadoresFilt.length} jugador{jugadoresFilt.length!==1?"es":""}
            </div>
            {/* Tabla — ancho máximo = suma columnas */}
            <div className="tw-scroll" style={{maxWidth:920,overflowX:"auto"}}>
            {/* Encabezado tabla */}
            <div style={{display:"grid",gridTemplateColumns:"280px 95px 65px 75px 100px 180px",gap:0,
              padding:"9px 14px",background:C.navy,borderRadius:"12px 12px 0 0",alignItems:"center"}}>
              {["Nombre","Nacimiento","Cat.","Código","Estado","Acciones"].map((h,i)=>(
                <div key={i} style={{fontFamily:"'Barlow Condensed',sans-serif",fontWeight:800,
                  fontSize:12,color:C.white,textTransform:"uppercase",
                  textAlign:i>=2?"center":"left",padding:"0 4px"}}>{h}</div>
              ))}
            </div>
            {jugadoresFilt.map((j,idx)=>{
              const linkAcceso = window.location.origin + "?id=" + j.id;
              const mesActual = new Date().getMonth()+1;
              // Calcular estado de pago
              const deudaMeses = MESES.map((_,i)=>i+1).filter(mes=>{
                const plan=planPagos.find(p=>p.mes===mes);
                if(!plan||plan.monto===0) return false;
                const tipo=tiposCuota.find(t=>t.id===j.tipo_cuota)||tiposCuota[0];
                const monto=Math.round(plan.monto*tipo.porcentaje/100);
                return monto>0 && !pagos.find(p=>p.jugador_id===j.id&&p.mes===mes) && mes<=(new Date().getDate()>10 ? new Date().getMonth()+1 : new Date().getMonth());
              });
              const est = deudaMeses.length===0
                ? {icon:"🟢",label:"Al día",color:"#16a34a",bg:"#dcfce7"}
                : deudaMeses.length===1
                  ? {icon:"🟡",label:"1 mes",color:"#d97706",bg:"#fef3c7"}
                  : {icon:"🔴",label:`${deudaMeses.length} meses`,color:"#dc2626",bg:"#fee2e2"};
              return(
                <div key={j.id} style={{display:"grid",
                  gridTemplateColumns:"280px 95px 65px 75px 100px 90px 190px",gap:0,
                  alignItems:"center",padding:"8px 14px",
                  background:idx%2===0?C.white:"#f5f5f0",
                  borderLeft:`1px solid ${C.gray}`,borderRight:`1px solid ${C.gray}`,
                  borderBottom:`1px solid ${C.gray}`,
                  borderRadius:idx===jugadoresFilt.length-1?"0 0 12px 12px":"0"}}>
                  {/* Nombre */}
                  <div style={{minWidth:0,paddingRight:6,display:"flex",alignItems:"center",gap:8}}>
                    {j.foto_url
                      ? <img src={j.foto_url} style={{width:36,height:36,borderRadius:"50%",
                          objectFit:"cover",border:`2px solid ${C.navy}`,flexShrink:0}}
                          onError={e=>{e.target.style.display="none";e.target.nextSibling&&(e.target.nextSibling.style.display="flex");}}/>
                      : null}
                    {!j.foto_url&&(
                      <div style={{width:36,height:36,borderRadius:"50%",flexShrink:0,
                        background:"linear-gradient(135deg,#c9d4f0,#a8b8e8)",
                        border:"2px solid #c0cce8",display:"flex",alignItems:"center",
                        justifyContent:"center",overflow:"hidden"}}>
                        <svg viewBox="0 0 24 24" width="26" height="26"><circle cx="12" cy="8" r="4" fill="#6b7db3"/><path d="M4 20c0-4 3.6-7 8-7s8 3 8 7" fill="#6b7db3"/></svg>
                      </div>
                    )}
                    <div style={{minWidth:0}}>
                      <div style={{fontFamily:"'Barlow Condensed',sans-serif",fontWeight:800,fontSize:15,
                        color:C.navy,textTransform:"uppercase",overflow:"hidden",textOverflow:"ellipsis",
                        whiteSpace:"nowrap"}}>{j.nombre}</div>
                      <div style={{display:"flex",gap:8,alignItems:"center",flexWrap:"nowrap"}}>
                        {j.ci&&<span style={{fontSize:10,color:C.grayMid,whiteSpace:"nowrap"}}>CI {j.ci}</span>}
                        {j.numero_camiseta&&<span style={{fontSize:10,color:C.grayMid,whiteSpace:"nowrap"}}>👕#{j.numero_camiseta}</span>}
                      </div>
                    </div>
                  </div>
                  {/* Nacimiento */}
                  <div style={{fontSize:13,fontFamily:"'Barlow Condensed',sans-serif",
                    fontWeight:700,color:"#1a1a1a",textAlign:"center",whiteSpace:"nowrap"}}>
                    {j.fecha_nacimiento||"-"}
                  </div>
                  {/* Cat */}
                  <div style={{fontFamily:"'Barlow Condensed',sans-serif",fontWeight:800,fontSize:16,
                    color:C.navy,textAlign:"center"}}>{j.categoria_id}</div>
                  {/* Código */}
                  <div className="col-hide-mobile" style={{fontFamily:"'Barlow Condensed',sans-serif",fontWeight:900,fontSize:11,
                    color:C.lilacDark,letterSpacing:".05em",textAlign:"center"}}>{j.id}</div>
                  {/* Estado pago */}
                  <div style={{textAlign:"center"}}>
                    <span style={{background:est.bg,color:est.color,borderRadius:20,padding:"3px 8px",
                      fontFamily:"'Barlow Condensed',sans-serif",fontWeight:800,fontSize:12,
                      whiteSpace:"nowrap"}}>{est.icon} {est.label}</span>
                  </div>
                  {/* Tipo cuota */}
                  <div style={{textAlign:"center"}}>
                    {(()=>{
                      const tc=tiposCuota.find(t=>t.id===j.tipo_cuota)||tiposCuota[0];
                      return <span style={{fontFamily:"'Barlow Condensed',sans-serif",fontWeight:700,
                        fontSize:11,color:tc.porcentaje===0?"#16a34a":tc.porcentaje<100?"#d97706":C.navy,
                        whiteSpace:"nowrap"}}>{tc.nombre}</span>;
                    })()}
                  </div>
                  {/* Acciones: todos iguales, cuadrados, en línea */}
                  <div className="acts-row" style={{display:"flex",gap:4,justifyContent:"center",alignItems:"center"}}>
                    {/* Link pago */}
                    <button onClick={()=>{
                        const msg=j.nombre+" (Cat."+j.categoria_id+") - Link de pago: "+linkAcceso;
                        navigator.clipboard?.writeText(msg).then(()=>{
                          alert("✅ Link de pago copiado para "+j.nombre+" (Cat."+j.categoria_id+")");
                        });
                      }}
                      title="Copiar link de pago"
                      style={{width:34,height:34,padding:0,background:`linear-gradient(135deg,${C.green},#15803d)`,
                        color:C.white,border:"none",borderRadius:8,fontSize:15,cursor:"pointer",
                        display:"flex",alignItems:"center",justifyContent:"center"}}>🔗</button>
                    {/* Pagos registrados */}
                    <button onClick={()=>setJugPagosVer(j)}
                      title="Ver pagos registrados"
                      style={{width:34,height:34,padding:0,background:C.offWhite,
                        border:`1px solid ${C.navy}`,borderRadius:8,fontSize:15,cursor:"pointer",
                        display:"flex",alignItems:"center",justifyContent:"center"}}>💳</button>
                    {/* Ficha */}
                    <button onClick={()=>{setSelJugador(j);setModal("fichaJug");}}
                      title="Ver ficha"
                      style={{width:34,height:34,padding:0,background:C.offWhite,border:`1px solid ${C.gray}`,
                        borderRadius:8,fontSize:15,cursor:"pointer",
                        display:"flex",alignItems:"center",justifyContent:"center"}}>👤</button>
                    {/* Editar */}
                    <button onClick={()=>{setSelJugador(j);setModal("editJug");}}
                      title="Editar"
                      style={{width:34,height:34,padding:0,background:`linear-gradient(135deg,${C.navy},${C.navyLight})`,
                        color:C.white,border:"none",borderRadius:8,fontSize:15,cursor:"pointer",
                        display:"flex",alignItems:"center",justifyContent:"center"}}>✏️</button>
                    {/* Eliminar */}
                    <button onClick={()=>deleteJugador(j.id)}
                      title="Eliminar"
                      style={{width:34,height:34,padding:0,background:"#fff5f5",border:"1px solid #fca5a5",
                        borderRadius:8,fontSize:15,cursor:"pointer",color:"#dc2626",
                        display:"flex",alignItems:"center",justifyContent:"center"}}>🗑</button>
                  </div>
                </div>
              );
            })}
            {jugadoresFilt.length===0&&(
              <div style={{textAlign:"center",padding:"40px 0",color:C.grayMid}}>Sin jugadores en esta categoría</div>
            )}
            </div>{/* fin contenedor tabla */}
          </div>
        )}

        {/* ── TAB PAGOS ── */}
        {!loading&&tab==="pagos"&&(
          <div>
            {/* COMPROBANTES PENDIENTES */}
            {(()=>{
              // Comprobantes de transferencia: vienen de formularios_pendientes con _tipo="comprobante"
              const comprobantes = pendientes.filter(p=>{
                try {
                  const d = typeof p.datos_json==="string"?JSON.parse(p.datos_json):p.datos_json;
                  return d._tipo==="comprobante";
                } catch(e){ return false; }
              });
              if (comprobantes.length===0) return null;
              return(
                <div style={{marginBottom:20}}>
                  <div style={{fontFamily:"'Barlow Condensed',sans-serif",fontWeight:900,fontSize:16,
                    color:"#dc2626",textTransform:"uppercase",marginBottom:10,
                    display:"flex",alignItems:"center",gap:8}}>
                    ⏳ Transferencias pendientes de verificación
                    <span style={{background:"#dc2626",color:"white",borderRadius:20,padding:"1px 10px",
                      fontSize:13,fontWeight:900}}>{comprobantes.length}</span>
                  </div>
                  <div style={{display:"flex",flexDirection:"column",gap:10}}>
                    {comprobantes.map(p=>{
                      const d = typeof p.datos_json==="string"?JSON.parse(p.datos_json):p.datos_json;
                      return(
                        <div key={p.id} style={{background:"white",borderRadius:14,
                          border:"2px solid #fca5a5",overflow:"hidden"}}>
                          {/* Miniatura comprobante si hay foto */}
                          {p.foto_url&&(
                            <div style={{background:"#f0f9ff",padding:"8px 14px 0",
                              display:"flex",justifyContent:"center"}}>
                              <img src={p.foto_url}
                                style={{maxHeight:120,maxWidth:"100%",borderRadius:8,
                                  objectFit:"contain",cursor:"pointer",
                                  border:"1px solid #bae6fd"}}
                                onClick={()=>setVerComprobante(p.foto_url)}
                                title="Click para ampliar"/>
                            </div>
                          )}
                          <div style={{padding:"10px 14px"}}>
                            <div style={{fontFamily:"'Barlow Condensed',sans-serif",fontWeight:800,
                              fontSize:15,color:C.navy,textTransform:"uppercase",marginBottom:2}}>
                              {d.jugador_nombre||"Jugador"} — Cat. {d.categoria_id||"—"}
                            </div>
                            <div style={{fontSize:12,color:C.grayMid,marginBottom:4}}>
                              {(d.meses||[]).map(m=>MESES[m-1]).join(", ")}
                              {" · "}
                              <strong>${(d.monto_total||0).toLocaleString("es-UY")}</strong>
                            </div>
                            {d.detalle&&(
                              <div style={{fontSize:11,color:C.navy,background:"#f0f9ff",
                                borderRadius:6,padding:"4px 8px",marginBottom:8,
                                fontStyle:"italic"}}>"{d.detalle}"</div>
                            )}
                            <div style={{display:"flex",gap:6}}>
                              {p.foto_url&&(
                                <button onClick={()=>setVerComprobante(p.foto_url)}
                                  style={{padding:"6px 10px",background:"#f0f9ff",
                                    color:"#0284c7",border:"1px solid #0ea5e9",borderRadius:8,
                                    fontFamily:"'Barlow Condensed',sans-serif",fontWeight:700,
                                    fontSize:12,cursor:"pointer"}}>
                                  🔍 Ver completo
                                </button>
                              )}
                              <button onClick={async()=>{
                                  if(!confirm("¿Aprobar esta transferencia? Se registrarán los pagos de los meses indicados.")) return;
                                  // Registrar pagos en baby_pagos
                                  for (const mes of (d.meses||[])) {
                                    await sbFetch("baby_pagos","POST",{
                                      id:uid(), jugador_id:d.jugador_id,
                                      org_id:"paysandu", año:d.año||new Date().getFullYear(),
                                      mes, monto:Math.round((d.monto_total||0)/(d.meses||[1]).length),
                                      metodo_pago:"transferencia", fecha_pago:fdate(),
                                      pendiente_verificacion:false,
                                    });
                                  }
                                  // Eliminar de pendientes
                                  await sbFetch(`baby_formularios_pendientes?id=eq.${p.id}`,"DELETE");
                                  load();
                                }}
                                style={{flex:1,padding:"6px 8px",
                                  background:`linear-gradient(135deg,${C.green},#15803d)`,
                                  color:"white",border:"none",borderRadius:8,
                                  fontFamily:"'Barlow Condensed',sans-serif",fontWeight:800,
                                  fontSize:12,cursor:"pointer",textTransform:"uppercase"}}>
                                ✅ Aprobar
                              </button>
                              <button onClick={async()=>{
                                  if(!confirm("¿Rechazar este comprobante?")) return;
                                  await sbFetch(`baby_formularios_pendientes?id=eq.${p.id}`,"DELETE");
                                  load();
                                }}
                                style={{padding:"6px 10px",background:"#fff5f5",
                                  color:"#dc2626",border:"1px solid #fca5a5",borderRadius:8,
                                  fontFamily:"'Barlow Condensed',sans-serif",fontWeight:800,
                                  fontSize:12,cursor:"pointer",textTransform:"uppercase"}}>
                                ✕ Rechazar
                              </button>
                            </div>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              );
            })()}

            <PagosTab jugadores={jugadoresFilt} pagos={pagos} planPagos={planPagos}
              categorias={categorias} tiposCuota={tiposCuota}
              filtCat={filtCat} setFiltCat={setFiltCat}
              onRegistrarPago={registrarPago} añoActual={añoActual}
              onTransfRep={()=>setModalTransfRep(true)}/>
          </div>
        )}

        {/* ── TAB PLAN DE PAGOS ── */}
        {!loading&&tab==="plan"&&(
          <PlanPagosTab planPagos={planPagos} onSave={savePlanMes} añoActual={añoActual}
            tiposCuota={tiposCuota}
            onSaveTipos={(nuevos)=>setTiposCuota(nuevos)}
          />
        )}

        {/* ── TAB DELEGADOS ── */}
        {!loading&&tab==="delegados"&&(
          <div style={{maxWidth:"100%",overflowX:"auto"}}>
            <div style={{display:"flex",gap:10,marginBottom:16,alignItems:"flex-start"}}>
              <button onClick={()=>setModal("newDel")}
                className="toolbar-bq" style={{width:110,height:80,background:`linear-gradient(135deg,${C.navy},${C.navyLight})`,
                  color:C.white,border:"none",borderRadius:12,
                  fontFamily:"'Barlow Condensed',sans-serif",fontWeight:900,fontSize:12,
                  textTransform:"uppercase",cursor:"pointer",display:"flex",flexDirection:"column",
                  alignItems:"center",justifyContent:"center",gap:6,
                  boxShadow:"0 4px 12px rgba(20,28,78,.25)"}}>
                <span style={{fontSize:24}}>➕</span>Nuevo delegado
              </button>
              <button onClick={()=>{
                  const base=window.location.origin;
                  const link=`${base}?form=delegado&org=paysandu`;
                  const msg="Registro de Delegado - Paysandú FC - Baby Fútbol\n"+link;
                  navigator.clipboard?.writeText(msg).then(()=>{
                    alert("✅ Link de registro de delegado copiado. Pegalo en WhatsApp o email.");
                  });
                }}
                style={{width:110,height:80,background:C.offWhite,color:C.navy,
                  border:`2px solid ${C.navy}`,borderRadius:12,
                  fontFamily:"'Barlow Condensed',sans-serif",fontWeight:900,fontSize:12,
                  textTransform:"uppercase",cursor:"pointer",display:"flex",flexDirection:"column",
                  alignItems:"center",justifyContent:"center",gap:6,lineHeight:1.2,textAlign:"center"}}>
                <span style={{fontSize:24}}>📋</span>Link registro
              </button>
            </div>
            {/* Tabla delegados — maxWidth fijo */}
            <div className="tw-scroll" style={{maxWidth:800}}>
            {/* Encabezado */}
            <div style={{display:"grid",gridTemplateColumns:"280px 150px 65px 150px 115px",gap:0,
              padding:"11px 16px",background:C.navy,borderRadius:"12px 12px 0 0",alignItems:"center"}}>
              {["Nombre","Celular / Email","PIN","Categorías","Acciones"].map((h,i)=>(
                <div key={i} style={{fontFamily:"'Barlow Condensed',sans-serif",fontWeight:800,
                  fontSize:13,color:C.white,textTransform:"uppercase",
                  textAlign:i>=4?"center":"left",padding:"0 6px"}}>{h}</div>
              ))}
            </div>
            {delegados.map((d,idx)=>(
              <div key={d.id} style={{display:"grid",gridTemplateColumns:"280px 150px 65px 150px 115px",gap:0,
                alignItems:"center",padding:"14px 16px",
                background:d.activo===false?"#fff5f5":idx%2===0?C.white:"#f8f8f5",
                borderLeft:`1px solid ${d.activo===false?"#fca5a5":C.gray}`,
                borderRight:`1px solid ${d.activo===false?"#fca5a5":C.gray}`,
                borderBottom:`1px solid ${d.activo===false?"#fca5a5":C.gray}`,
                borderRadius:idx===delegados.length-1?"0 0 12px 12px":"0"}}>
                <div style={{paddingRight:8,display:"flex",alignItems:"center",gap:10}}>
                  {d.foto_url
                    ? <img src={d.foto_url} style={{width:36,height:36,borderRadius:"50%",
                        objectFit:"cover",border:`2px solid ${C.navy}`,flexShrink:0}}
                        onError={e=>e.target.style.display="none"}/>
                    : <div style={{width:36,height:36,borderRadius:"50%",flexShrink:0,
                        background:"linear-gradient(135deg,#c9d4f0,#a8b8e8)",
                        border:"2px solid #c0cce8",display:"flex",alignItems:"center",
                        justifyContent:"center",overflow:"hidden"}}>
                        <svg viewBox="0 0 24 24" width="24" height="24"><circle cx="12" cy="8" r="4" fill="#6b7db3"/><path d="M4 20c0-4 3.6-7 8-7s8 3 8 7" fill="#6b7db3"/></svg>
                      </div>
                  }
                  <div>
                    <div style={{fontFamily:"'Barlow Condensed',sans-serif",fontWeight:800,fontSize:17,
                      color:d.activo===false?C.grayMid:C.navy,textTransform:"uppercase"}}>{d.nombre}</div>
                    {d.activo===false&&<span style={{fontSize:11,background:"#fee2e2",color:"#dc2626",
                      borderRadius:10,padding:"2px 10px",fontWeight:700}}>SUSPENDIDO</span>}
                  </div>
                </div>
                <div style={{fontSize:13,color:C.navy,padding:"0 6px"}}>
                  <div style={{fontWeight:600}}>{d.celular}</div>
                  <div style={{fontSize:11,color:C.grayMid,overflow:"hidden",textOverflow:"ellipsis",whiteSpace:"nowrap"}}>{d.mail}</div>
                </div>
                <div style={{fontFamily:"'Barlow Condensed',sans-serif",fontWeight:900,fontSize:22,
                  color:C.navy,textAlign:"center",letterSpacing:".2em"}}>{d.pin}</div>
                <div style={{fontSize:13,color:C.navy,fontWeight:600,padding:"0 6px"}}>
                  {(d.categorias||[]).length>0?(d.categorias||[]).join(", "):"Todas"}
                </div>
                <div style={{display:"flex",gap:5,justifyContent:"center",alignItems:"center",paddingLeft:12}}>
                  <button onClick={()=>{setSelJugador(d);setModal("fichaDel");}}
                    title="Ver ficha"
                    style={{width:34,height:34,padding:0,background:C.offWhite,
                      border:`1px solid ${C.gray}`,borderRadius:8,fontSize:15,cursor:"pointer",
                      color:C.navy,display:"flex",alignItems:"center",justifyContent:"center"}}>👤</button>
                  <button onClick={()=>{setSelJugador(d);setModal("editDel");}}
                    title="Editar"
                    style={{width:34,height:34,padding:0,background:`linear-gradient(135deg,${C.navy},${C.navyLight})`,
                      color:C.white,border:"none",borderRadius:8,fontSize:15,cursor:"pointer",
                      display:"flex",alignItems:"center",justifyContent:"center"}}>✏️</button>
                  <button onClick={async()=>{
                      await sbFetch(`baby_delegados?id=eq.${d.id}`,"PATCH",{activo:d.activo===false?true:false});
                      load();
                    }}
                    title={d.activo===false?"Activar":"Suspender"}
                    style={{width:34,height:34,padding:0,
                      background:d.activo===false?"#dcfce7":"#fef3c7",
                      border:`1px solid ${d.activo===false?"#86efac":"#fde68a"}`,
                      borderRadius:8,fontSize:15,cursor:"pointer",
                      display:"flex",alignItems:"center",justifyContent:"center"}}>
                    {d.activo===false?"▶":"⏸"}
                  </button>
                  <button onClick={()=>deleteDelegado(d.id)}
                    title="Eliminar"
                    style={{width:34,height:34,padding:0,background:"#fff5f5",
                      border:"1px solid #fca5a5",borderRadius:8,fontSize:15,cursor:"pointer",
                      color:"#dc2626",display:"flex",alignItems:"center",justifyContent:"center"}}>🗑</button>
                </div>
              </div>
            ))}
            {delegados.length===0&&<div style={{color:C.grayMid,fontSize:13,padding:"20px 0"}}>Sin delegados registrados</div>}
            </div>{/* fin tabla delegados */}
          </div>
        )}

        {/* ── TAB PENDIENTES ── */}
        {!loading&&tab==="pendientes"&&(
          <div style={{maxWidth:"100%",overflowX:"auto"}}>
            <div style={{fontFamily:"'Barlow Condensed',sans-serif",fontWeight:900,fontSize:18,
              color:C.navy,textTransform:"uppercase",marginBottom:14}}>
              ⏳ Altas pendientes de validación
              <span style={{background:C.gold,color:C.navyDark,borderRadius:20,padding:"2px 12px",
                fontSize:14,fontWeight:900,marginLeft:10}}>{pendientes.length}</span>
            </div>
            {pendientes.length>0&&(
              <>
                {/* Tabla pendientes — maxWidth fijo */}
                <div className="tw-scroll" style={{maxWidth:860}}>
                {/* Encabezado tabla */}
                <div style={{display:"grid",gridTemplateColumns:"280px 80px 110px 120px 100px 130px",gap:0,
                  padding:"10px 16px",background:C.navy,borderRadius:"12px 12px 0 0",alignItems:"center"}}>
                  {["Nombre","Cat.","Celular","Email","Nacimiento","Acciones"].map((h,i)=>(
                    <div key={i} style={{fontFamily:"'Barlow Condensed',sans-serif",fontWeight:800,
                      fontSize:13,color:C.white,textTransform:"uppercase",
                      textAlign:i===5?"center":"left",padding:"0 6px"}}>{h}</div>
                  ))}
                </div>
                {pendientes.map((p,idx)=>{
                  const datos = typeof p.datos_json==="string"?JSON.parse(p.datos_json):p.datos_json;
                  return(
                    <div key={p.id} style={{display:"grid",
                      gridTemplateColumns:"2fr 100px 130px 130px 130px 160px",gap:0,
                      alignItems:"center",padding:"13px 16px",
                      background:idx%2===0?"#fffbeb":"#fff8e1",
                      borderLeft:`2px solid ${C.gold}`,borderRight:`2px solid ${C.gold}`,
                      borderBottom:`1px solid #fde68a`,
                      borderRadius:idx===pendientes.length-1?"0 0 12px 12px":"0"}}>
                      <div style={{paddingRight:8,display:"flex",alignItems:"center",gap:8}}>
                        {datos.foto_url&&(
                          <img src={datos.foto_url} style={{width:32,height:32,borderRadius:"50%",
                            objectFit:"cover",border:`2px solid ${C.navy}`,flexShrink:0}}
                            onError={e=>e.target.style.display="none"}/>
                        )}
                        <div>
                          <div style={{display:"flex",alignItems:"center",gap:6}}>
                            <div style={{fontFamily:"'Barlow Condensed',sans-serif",fontWeight:800,fontSize:16,
                              color:C.navy,textTransform:"uppercase"}}>{datos.nombre}</div>
                            {datos._tipo==="delegado"&&<span style={{background:C.lilacDark,color:C.white,
                              borderRadius:10,padding:"1px 8px",fontSize:10,fontWeight:700,flexShrink:0}}>DELEGADO</span>}
                          </div>
                          {datos.ci&&<div style={{fontSize:11,color:C.grayMid}}>CI: {datos.ci}</div>}
                          {datos.numero_camiseta&&<div style={{fontSize:11,color:C.grayMid}}>Camiseta #{datos.numero_camiseta}</div>}
                        </div>
                      </div>
                      <div style={{fontFamily:"'Barlow Condensed',sans-serif",fontWeight:800,fontSize:16,
                        color:C.navy}}>{datos.categoria_id||"-"}</div>
                      <div style={{fontSize:13,color:C.navy,fontWeight:600}}>{datos.celular||"-"}</div>
                      <div style={{fontSize:12,color:C.grayMid,overflow:"hidden",textOverflow:"ellipsis",
                        whiteSpace:"nowrap"}}>{datos.mail||"-"}</div>
                      <div style={{fontSize:13,fontFamily:"'Barlow Condensed',sans-serif",
                        fontWeight:700,color:"#1a1a1a"}}>{datos.fecha_nacimiento||"-"}</div>
                      <div style={{display:"flex",gap:6,justifyContent:"center"}}>
                        <button onClick={()=>validarPendiente(p)}
                          style={{flex:1,padding:"9px 10px",background:`linear-gradient(135deg,${C.green},#15803d)`,
                            color:C.white,border:"none",borderRadius:8,fontFamily:"'Barlow Condensed',sans-serif",
                            fontWeight:800,fontSize:13,cursor:"pointer",textTransform:"uppercase"}}>✅ Validar</button>
                        <button onClick={()=>rechazarPendiente(p.id)}
                          style={{flex:1,padding:"9px 10px",background:"#fff5f5",color:"#dc2626",
                            border:"1px solid #fca5a5",borderRadius:8,fontFamily:"'Barlow Condensed',sans-serif",
                            fontWeight:800,fontSize:13,cursor:"pointer",textTransform:"uppercase"}}>❌</button>
                      </div>
                    </div>
                  );
                })}
                </div>{/* fin tabla pendientes */}
              </>
            )}
            {pendientes.length===0&&(
              <div style={{background:C.white,borderRadius:12,padding:"40px",textAlign:"center",
                border:`1px solid ${C.gray}`}}>
                <div style={{fontSize:40,marginBottom:10}}>✅</div>
                <div style={{fontFamily:"'Barlow Condensed',sans-serif",fontWeight:700,fontSize:16,
                  color:C.grayMid}}>Sin altas pendientes</div>
              </div>
            )}
          </div>
        )}

        {/* ── TAB CATEGORÍAS ── */}
        {!loading&&tab==="deudores"&&(
          <div>
            <div style={{fontFamily:"'Barlow Condensed',sans-serif",fontWeight:900,fontSize:18,
              color:C.navy,textTransform:"uppercase",marginBottom:14}}>
              📛 Jugadores dados de baja con deuda
              {jugadoresDeudores.length>0&&(
                <span style={{background:"#fee2e2",color:"#dc2626",borderRadius:20,
                  padding:"2px 12px",fontSize:14,fontWeight:900,marginLeft:10}}>
                  {jugadoresDeudores.length}
                </span>
              )}
            </div>
            {jugadoresDeudores.length===0?(
              <div style={{textAlign:"center",padding:"40px 0",color:C.grayMid,fontSize:14}}>
                ✅ Sin jugadores con deuda pendiente
              </div>
            ):(
              <div style={{display:"flex",flexDirection:"column",gap:12}}>
                {jugadoresDeudores.map(j=>{
                  const mesActual=new Date().getMonth()+1;
                  const tipo=tiposCuota.find(t=>t.id===j.tipo_cuota)||tiposCuota[0];
                  const mesesDeuda=MESES.map((_,i)=>i+1).filter(mes=>{
                    const plan=planPagos.find(p=>p.mes===mes);
                    if(!plan||plan.monto===0||mes>(new Date().getDate()>10 ? new Date().getMonth()+1 : new Date().getMonth())) return false;
                    const monto=Math.round(plan.monto*tipo.porcentaje/100);
                    return monto>0&&!pagos.find(p=>p.jugador_id===j.id&&p.mes===mes);
                  });
                  const total=mesesDeuda.reduce((acc,mes)=>{
                    const plan=planPagos.find(p=>p.mes===mes);
                    return acc+Math.round(plan.monto*tipo.porcentaje/100);
                  },0);
                  return(
                    <div key={j.id} style={{background:C.white,borderRadius:14,overflow:"hidden",
                      border:"2px solid #fca5a5",boxShadow:"0 2px 8px rgba(220,38,38,.08)"}}>
                      {/* Header jugador */}
                      <div style={{background:"linear-gradient(135deg,#7f1d1d,#dc2626)",
                        padding:"12px 16px",display:"flex",alignItems:"center",gap:12}}>
                        {j.foto_url
                          ? <img src={j.foto_url} style={{width:44,height:44,borderRadius:"50%",
                              objectFit:"cover",border:"2px solid rgba(255,255,255,.4)",flexShrink:0}}
                              onError={e=>e.target.style.display="none"}/>
                          : <div style={{width:44,height:44,borderRadius:"50%",flexShrink:0,
                              background:"rgba(255,255,255,.2)",display:"flex",alignItems:"center",
                              justifyContent:"center",overflow:"hidden"}}>
                              <svg viewBox="0 0 24 24" width="30" height="30"><circle cx="12" cy="8" r="4" fill="rgba(255,255,255,.7)"/><path d="M4 20c0-4 3.6-7 8-7s8 3 8 7" fill="rgba(255,255,255,.7)"/></svg>
                            </div>
                        }
                        <div style={{flex:1}}>
                          <div style={{fontFamily:"'Barlow Condensed',sans-serif",fontWeight:900,
                            fontSize:18,color:"white",textTransform:"uppercase"}}>{j.nombre}</div>
                          <div style={{color:"rgba(255,255,255,.7)",fontSize:12}}>
                            Cat. {j.categoria_id} · {j.celular} · {tipo.nombre}
                          </div>
                        </div>
                        <div style={{textAlign:"right"}}>
                          <div style={{fontFamily:"'Barlow Condensed',sans-serif",fontWeight:900,
                            fontSize:22,color:"white"}}>${total.toLocaleString("es-UY")}</div>
                          <div style={{color:"rgba(255,255,255,.7)",fontSize:11}}>
                            {mesesDeuda.length} mes{mesesDeuda.length!==1?"es":""} adeudado{mesesDeuda.length!==1?"s":""}
                          </div>
                        </div>
                      </div>
                      {/* Detalle meses */}
                      <div style={{padding:"12px 16px"}}>
                        <div style={{display:"flex",flexWrap:"wrap",gap:6,marginBottom:12}}>
                          {MESES.map((m,i)=>{
                            const mes=i+1;
                            const plan=planPagos.find(p=>p.mes===mes);
                            if(!plan||plan.monto===0) return null;
                            const monto=Math.round(plan.monto*tipo.porcentaje/100);
                            if(monto===0) return null;
                            const pago=pagos.find(p=>p.jugador_id===j.id&&p.mes===mes);
                            const deuda=!pago&&mes<=(new Date().getDate()>10 ? new Date().getMonth()+1 : new Date().getMonth());
                            return(
                              <div key={mes} style={{
                                padding:"4px 10px",borderRadius:8,fontSize:11,fontWeight:700,
                                fontFamily:"'Barlow Condensed',sans-serif",
                                background:pago?"#dcfce7":deuda?"#fee2e2":"#f3f4f6",
                                color:pago?"#16a34a":deuda?"#dc2626":"#9a9a90"}}>
                                {m.slice(0,3)} ${monto.toLocaleString("es-UY")}
                                {pago?" ✓":deuda?" ✗":""}
                              </div>
                            );
                          })}
                        </div>
                        {/* Acciones */}
                        <div style={{display:"flex",gap:8,flexWrap:"wrap"}}>
                          <button onClick={()=>{
                              const link=window.location.origin+"?id="+j.id;
                              const msg=j.nombre+" (Cat."+j.categoria_id+") - Deuda pendiente $"+total.toLocaleString("es-UY")+" - Link de pago: "+link;
                              navigator.clipboard?.writeText(msg).then(()=>{
                                alert("✅ Link de cobro copiado para "+j.nombre);
                              });
                            }}
                            style={{flex:1,padding:"9px",background:`linear-gradient(135deg,${C.green},#15803d)`,
                              color:C.white,border:"none",borderRadius:9,fontFamily:"'Barlow Condensed',sans-serif",
                              fontWeight:800,fontSize:13,cursor:"pointer",textTransform:"uppercase"}}>
                            🔗 Enviar link de pago
                          </button>
                          <button onClick={()=>{
                              setSelJugador(j);
                              setTab("pagos");
                            }}
                            style={{flex:1,padding:"9px",background:`linear-gradient(135deg,${C.navy},${C.navyLight})`,
                              color:C.white,border:"none",borderRadius:9,fontFamily:"'Barlow Condensed',sans-serif",
                              fontWeight:800,fontSize:13,cursor:"pointer",textTransform:"uppercase"}}>
                            💳 Registrar pago
                          </button>
                          <button onClick={async()=>{
                              if(total===0){
                                if(!confirm("¿Eliminar definitivamente a "+j.nombre+"? Esta acción no se puede deshacer.")) return;
                                await sbFetch(`baby_pagos?jugador_id=eq.${j.id}`,"DELETE");
                                await sbFetch(`baby_jugadores?id=eq.${j.id}`,"DELETE");
                                load();
                              } else {
                                if(!confirm("⚠️ "+j.nombre+" todavía tiene deuda de $"+total.toLocaleString("es-UY")+"\n\n¿Eliminar definitivamente igual?")) return;
                                await sbFetch(`baby_pagos?jugador_id=eq.${j.id}`,"DELETE");
                                await sbFetch(`baby_jugadores?id=eq.${j.id}`,"DELETE");
                                load();
                              }
                            }}
                            style={{padding:"9px 14px",background:"#fff5f5",color:"#dc2626",
                              border:"1px solid #fca5a5",borderRadius:9,fontFamily:"'Barlow Condensed',sans-serif",
                              fontWeight:800,fontSize:13,cursor:"pointer",textTransform:"uppercase"}}>
                            🗑 Eliminar
                          </button>
                          <button onClick={async()=>{
                              if(!confirm("¿Reactivar a "+j.nombre+" en planteles?")) return;
                              await sbFetch(`baby_jugadores?id=eq.${j.id}`,"PATCH",{estado:"activo"});
                              load();
                            }}
                            style={{padding:"9px 14px",background:"#fef3c7",color:"#d97706",
                              border:"1px solid #fde68a",borderRadius:9,fontFamily:"'Barlow Condensed',sans-serif",
                              fontWeight:800,fontSize:13,cursor:"pointer",textTransform:"uppercase"}}>
                            ↩ Reactivar
                          </button>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        )}

        {!loading&&tab==="categorias"&&(
          <CategoriasTab categorias={categorias} onRefresh={load}/>
        )}
      </div>{/* fin contenido principal */}
      </div>{/* fin layout sidebar+contenido */}

      {/* ── MOBILE BOTTOM NAV ── */}
      <div className="mobile-bottom-nav" style={{display:"none"}}>
        {TABS.map(([id,label])=>{
          const active=tab===id;
          const parts=label.split(" ");
          const icon=parts[0];
          const text=parts.slice(1).join(" ");
          const hasBadge=id==="pendientes"&&pendientes.length>0;
          return(
            <button key={id} onClick={()=>setTab(id)} className={active?"active":""}>
              {hasBadge&&<span className="mnav-badge">{pendientes.length}</span>}
              <span className="mnav-icon">{icon}</span>
              <span>{text}</span>
            </button>
          );
        })}
      </div>

      {/* ── Modal limpieza anual ── */}
      {modalLimpieza&&(
        <Modal onClose={()=>{setModalLimpieza(false);setLimpiezaStep(1);setClaveInput("");setLimpiezaErr("");}} maxWidth={460}>
          {/* Header */}
          <div style={{background:"linear-gradient(135deg,#7f1d1d,#dc2626)",padding:"18px 22px",
            display:"flex",alignItems:"center",gap:12}}>
            <span style={{fontSize:32}}>⚠️</span>
            <div>
              <div style={{fontFamily:"'Barlow Condensed',sans-serif",fontWeight:900,fontSize:20,
                color:"white",textTransform:"uppercase"}}>Limpieza anual</div>
              <div style={{color:"rgba(255,255,255,.7)",fontSize:12}}>Operación irreversible</div>
            </div>
          </div>

          <div style={{padding:"22px 24px"}}>

            {/* PASO 1: ADVERTENCIA */}
            {limpiezaStep===1&&!limpiezaOk&&(
              <>
                <div style={{background:"#fff5f5",borderRadius:12,padding:"16px",
                  border:"1px solid #fca5a5",marginBottom:18}}>
                  <div style={{fontFamily:"'Barlow Condensed',sans-serif",fontWeight:800,
                    fontSize:15,color:"#dc2626",marginBottom:10}}>
                    ⚠️ Esta operación eliminará permanentemente:
                  </div>
                  <ul style={{fontSize:13,color:"#7f1d1d",lineHeight:1.8,paddingLeft:18}}>
                    <li>Todos los <strong>comprobantes de transferencia</strong> pendientes</li>
                    <li>Las <strong>imágenes</strong> de todos los comprobantes aprobados</li>
                    <li>Los <strong>registros de pagos</strong> quedan intactos</li>
                    <li>Las <strong>fotos de jugadores y delegados</strong> no se tocan</li>
                  </ul>
                </div>
                <div style={{background:"#fef3c7",borderRadius:10,padding:"12px 14px",
                  marginBottom:18,border:"1px solid #fde68a",fontSize:13,color:"#92400e"}}>
                  💡 <strong>Recomendación:</strong> realizar esta operación al inicio de cada año,
                  una vez verificados y archivados todos los comprobantes del año anterior.
                </div>
                <div style={{display:"flex",gap:8}}>
                  <button onClick={()=>setModalLimpieza(false)}
                    style={{flex:1,padding:"11px",background:"transparent",color:"#dc2626",
                      border:"2px solid #fca5a5",borderRadius:10,
                      fontFamily:"'Barlow Condensed',sans-serif",fontWeight:700,fontSize:14}}>
                    Cancelar
                  </button>
                  <button onClick={()=>setLimpiezaStep(2)}
                    style={{flex:2,padding:"11px",background:"linear-gradient(135deg,#dc2626,#b91c1c)",
                      color:"white",border:"none",borderRadius:10,
                      fontFamily:"'Barlow Condensed',sans-serif",fontWeight:900,fontSize:14,
                      cursor:"pointer",textTransform:"uppercase"}}>
                    Entendido — Continuar →
                  </button>
                </div>
              </>
            )}

            {/* PASO 2: CLAVE */}
            {limpiezaStep===2&&!limpiezaOk&&(
              <>
                <div style={{textAlign:"center",marginBottom:20}}>
                  <div style={{fontSize:48,marginBottom:10}}>🔐</div>
                  <div style={{fontFamily:"'Barlow Condensed',sans-serif",fontWeight:800,
                    fontSize:16,color:C.navy,textTransform:"uppercase",marginBottom:6}}>
                    Ingresá la clave de administrador
                  </div>
                  <div style={{fontSize:12,color:C.grayMid}}>
                    Esta clave es requerida para operaciones destructivas
                  </div>
                </div>
                <input
                  type="password"
                  value={claveInput}
                  onChange={e=>setClaveInput(e.target.value)}
                  onKeyDown={e=>{
                    if(e.key==="Enter"){
                      if(claveInput===CLAVE_LIMPIEZA){setLimpiezaStep(3);setLimpiezaErr("");}
                      else{setLimpiezaErr("Clave incorrecta");}
                    }
                  }}
                  placeholder="Clave de administrador"
                  autoFocus
                  style={{width:"100%",padding:"13px 16px",borderRadius:10,
                    border:`2px solid ${limpiezaErr?"#dc2626":C.gray}`,
                    fontSize:16,textAlign:"center",letterSpacing:".1em",
                    marginBottom:8,outline:"none",fontFamily:"'Barlow Condensed',sans-serif"}}/>
                {limpiezaErr&&(
                  <div style={{color:"#dc2626",fontSize:13,marginBottom:8,textAlign:"center"}}>
                    ❌ {limpiezaErr}
                  </div>
                )}
                <div style={{display:"flex",gap:8,marginTop:8}}>
                  <button onClick={()=>setLimpiezaStep(1)}
                    style={{flex:1,padding:"11px",background:"transparent",color:C.navy,
                      border:`2px solid ${C.navy}`,borderRadius:10,
                      fontFamily:"'Barlow Condensed',sans-serif",fontWeight:700,fontSize:14}}>
                    ← Volver
                  </button>
                  <button onClick={()=>{
                      if(claveInput===CLAVE_LIMPIEZA){setLimpiezaStep(3);setLimpiezaErr("");}
                      else{setLimpiezaErr("Clave incorrecta");}
                    }}
                    style={{flex:2,padding:"11px",
                      background:`linear-gradient(135deg,${C.navy},${C.navyLight})`,
                      color:"white",border:"none",borderRadius:10,
                      fontFamily:"'Barlow Condensed',sans-serif",fontWeight:900,fontSize:14,
                      cursor:"pointer",textTransform:"uppercase"}}>
                    Verificar clave
                  </button>
                </div>
              </>
            )}

            {/* PASO 3: CONFIRMACIÓN FINAL */}
            {limpiezaStep===3&&!limpiezaOk&&(
              <>
                <div style={{textAlign:"center",marginBottom:20}}>
                  <div style={{fontSize:48,marginBottom:10}}>🚨</div>
                  <div style={{fontFamily:"'Barlow Condensed',sans-serif",fontWeight:900,
                    fontSize:18,color:"#dc2626",textTransform:"uppercase",marginBottom:8}}>
                    Última confirmación
                  </div>
                  <div style={{fontSize:13,color:C.grayMid,lineHeight:1.6}}>
                    Esta acción borrará todos los comprobantes de transferencia.<br/>
                    <strong style={{color:"#dc2626"}}>No se puede deshacer.</strong>
                  </div>
                </div>
                <div style={{display:"flex",gap:8}}>
                  <button onClick={()=>setModalLimpieza(false)}
                    style={{flex:1,padding:"11px",background:"transparent",color:C.navy,
                      border:`2px solid ${C.navy}`,borderRadius:10,
                      fontFamily:"'Barlow Condensed',sans-serif",fontWeight:700,fontSize:14}}>
                    Cancelar
                  </button>
                  <button onClick={async()=>{
                      // 1. Borrar comprobantes de formularios_pendientes
                      const pends = await sbFetch("baby_formularios_pendientes?select=id,datos_json");
                      let borrados = 0;
                      for (const p of (pends||[])) {
                        try {
                          const d = typeof p.datos_json==="string"?JSON.parse(p.datos_json):p.datos_json;
                          if (d._tipo==="comprobante") {
                            await sbFetch(`baby_formularios_pendientes?id=eq.${p.id}`,"DELETE");
                            borrados++;
                          }
                        } catch(e){}
                      }
                      // 2. Limpiar comprobante_url de pagos aprobados
                      // (si la columna existe)
                      await sbFetch("baby_pagos?pendiente_verificacion=eq.false","PATCH",
                        {comprobante_url:"",nota:"",grupo_comprobante:""}
                      ).catch(()=>{});
                      setLimpiezaOk(true);
                      setLimpiezaOk(`${borrados} comprobantes eliminados`);
                      load();
                    }}
                    style={{flex:2,padding:"11px",
                      background:"linear-gradient(135deg,#dc2626,#b91c1c)",
                      color:"white",border:"none",borderRadius:10,
                      fontFamily:"'Barlow Condensed',sans-serif",fontWeight:900,fontSize:14,
                      cursor:"pointer",textTransform:"uppercase"}}>
                    🗑 Ejecutar limpieza
                  </button>
                </div>
              </>
            )}

            {/* RESULTADO */}
            {limpiezaOk&&(
              <div style={{textAlign:"center",padding:"10px 0"}}>
                <div style={{fontSize:56,marginBottom:12}}>✅</div>
                <div style={{fontFamily:"'Barlow Condensed',sans-serif",fontWeight:900,
                  fontSize:22,color:C.navy,textTransform:"uppercase",marginBottom:8}}>
                  Limpieza completada
                </div>
                <div style={{background:"#f0fdf4",borderRadius:10,padding:"12px 16px",
                  marginBottom:16,border:"1px solid #86efac",fontSize:13,color:"#166534"}}>
                  ✓ {typeof limpiezaOk==="string"?limpiezaOk:"Comprobantes eliminados"}<br/>
                  ✓ Registros de pago intactos<br/>
                  ✓ Fotos de jugadores intactas
                </div>
                <button onClick={()=>{setModalLimpieza(false);setLimpiezaOk(false);}}
                  style={{width:"100%",padding:"12px",
                    background:`linear-gradient(135deg,${C.navy},${C.navyLight})`,
                    color:"white",border:"none",borderRadius:10,
                    fontFamily:"'Barlow Condensed',sans-serif",fontWeight:900,fontSize:15,
                    cursor:"pointer",textTransform:"uppercase"}}>
                  Cerrar
                </button>
              </div>
            )}

          </div>
        </Modal>
      )}

      {/* ── Modal reporte jugadores ── */}
      {modalReporte&&(
        <Modal onClose={()=>setModalReporte(false)} maxWidth={480}>
          <div style={{background:`linear-gradient(135deg,${C.navyDark},${C.navy})`,padding:"16px 20px"}}>
            <div style={{fontFamily:"'Barlow Condensed',sans-serif",fontWeight:900,fontSize:20,
              color:C.white,textTransform:"uppercase"}}>📊 Reporte de jugadores</div>
          </div>
          <div style={{padding:"20px 22px"}}>
            <div style={{fontFamily:"'Barlow Condensed',sans-serif",fontWeight:700,fontSize:13,
              color:C.navy,textTransform:"uppercase",marginBottom:12}}>Campos a incluir</div>
            <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:8,marginBottom:18}}>
              {[["nombre","Nombre"],["ci","CI"],["categoria","Categoría"],
                ["fecha_nacimiento","Fecha nacimiento"],["camiseta","N° camiseta"],
                ["celular","Celular"],["tipo_cuota","Tipo cuota"],
                ["estado","Estado pago"],["codigo","Código"]
              ].map(([k,lbl])=>(
                <label key={k} style={{display:"flex",alignItems:"center",gap:8,padding:"8px 12px",
                  borderRadius:8,cursor:"pointer",
                  background:camposReporte[k]?"#eff6ff":"#f9fafb",
                  border:`1px solid ${camposReporte[k]?"#93c5fd":C.gray}`}}>
                  <input type="checkbox" checked={!!camposReporte[k]}
                    onChange={e=>setCamposReporte(p=>({...p,[k]:e.target.checked}))}
                    style={{accentColor:C.navy,width:16,height:16,cursor:"pointer"}}/>
                  <span style={{fontFamily:"'Barlow Condensed',sans-serif",fontWeight:700,
                    fontSize:13,color:C.navy}}>{lbl}</span>
                </label>
              ))}
            </div>
            <div style={{marginBottom:14}}>
              <label style={{display:"block",fontFamily:"'Barlow Condensed',sans-serif",fontWeight:700,
                fontSize:12,color:C.navy,textTransform:"uppercase",marginBottom:6}}>Categoría</label>
              <select value={filtCat} onChange={e=>setFiltCat(e.target.value)}
                style={{width:"100%",padding:"9px 12px",borderRadius:8,
                  border:`1px solid ${C.gray}`,fontSize:14,
                  fontFamily:"'Barlow Condensed',sans-serif",fontWeight:700,color:C.navy}}>
                <option value="todos">Todas las categorías</option>
                {categorias.map(c=><option key={c.id} value={c.id}>{c.nombre}</option>)}
              </select>
              <div style={{fontSize:11,color:C.grayMid,marginTop:5}}>
                {jugadoresFilt.length} jugadores en esta selección
              </div>
            </div>
            <div style={{display:"flex",gap:8}}>
              <button onClick={()=>setModalReporte(false)}
                style={{flex:1,padding:"10px",background:"transparent",color:C.navy,
                  border:`2px solid ${C.navy}`,borderRadius:10,
                  fontFamily:"'Barlow Condensed',sans-serif",fontWeight:700,fontSize:13}}>Cancelar</button>
              <button onClick={()=>{
                  const cols=[
                    camposReporte.nombre&&["nombre","Nombre"],
                    camposReporte.ci&&["ci","CI"],
                    camposReporte.categoria&&["categoria_id","Categoría"],
                    camposReporte.fecha_nacimiento&&["fecha_nacimiento","Nacimiento"],
                    camposReporte.camiseta&&["numero_camiseta","Camiseta"],
                    camposReporte.celular&&["celular","Celular"],
                    camposReporte.tipo_cuota&&["_tc","Cuota"],
                    camposReporte.estado&&["_est","Estado"],
                    camposReporte.codigo&&["id","Código"],
                  ].filter(Boolean);
                  const ml=(new Date().getDate()>10?new Date().getMonth()+1:new Date().getMonth());
                  const est=j=>{
                    const d=planPagos.filter(pl=>{
                      if(!pl.monto||pl.mes>ml)return false;
                      const tc=tiposCuota.find(t=>t.id===j.tipo_cuota)||tiposCuota[0];
                      return Math.round(pl.monto*tc.porcentaje/100)>0&&!pagos.find(p=>p.jugador_id===j.id&&p.mes===pl.mes);
                    });
                    return d.length===0?"Al día":d.length+" mes"+(d.length>1?"es":"")+" adeudado"+(d.length>1?"s":"");
                  };
                  const rows=jugadoresFilt.map(j=>cols.map(([k])=>{
                    if(k==="_tc")return(tiposCuota.find(t=>t.id===j.tipo_cuota)||tiposCuota[0]).nombre;
                    if(k==="_est")return est(j);
                    return j[k]||"—";
                  }));
                  const html=`<!DOCTYPE html><html><head><meta charset="UTF-8"><title>Jugadores</title>
                    <style>body{font-family:Arial,sans-serif;padding:20px;}
                    h2{font-size:18px;margin-bottom:4px;color:#1e2a6e;}
                    .sub{font-size:11px;color:#666;margin-bottom:12px;}
                    table{border-collapse:collapse;width:100%;font-size:12px;}
                    th{background:#1e2a6e;color:white;padding:6px 10px;text-align:left;font-size:11px;text-transform:uppercase;}
                    td{padding:5px 10px;border-bottom:1px solid #e2e2da;}
                    tr:nth-child(even)td{background:#f5f5f0;}
                    .btn{margin-top:14px;padding:8px 16px;background:#1e2a6e;color:white;border:none;border-radius:6px;cursor:pointer;}
                    @media print{.btn{display:none;}}</style></head><body>
                    <h2>Paysandú FC — Baby Fútbol</h2>
                    <div class="sub">Categoría: ${filtCat==="todos"?"Todas":filtCat} · ${jugadoresFilt.length} jugadores · ${new Date().toLocaleDateString("es-UY")}</div>
                    <table><thead><tr>${cols.map(([,h])=>`<th>${h}</th>`).join("")}</tr></thead>
                    <tbody>${rows.map(r=>`<tr>${r.map(v=>`<td>${v}</td>`).join("")}</tr>`).join("")}</tbody></table>
                    <button class="btn" onclick="window.print()">Imprimir</button>
                    </body></html>`;
                  descargarHTML(html, `jugadores-${filtCat==="todos"?"todos":filtCat}.html`);
                }}
                style={{flex:1,padding:"10px",background:"linear-gradient(135deg,#d97706,#b45309)",
                  color:"white",border:"none",borderRadius:10,
                  fontFamily:"'Barlow Condensed',sans-serif",fontWeight:900,fontSize:13,cursor:"pointer"}}>
                📄 HTML
              </button>
              <button onClick={()=>{
                  const cols2=[
                    camposReporte.nombre&&["nombre","Nombre"],
                    camposReporte.ci&&["ci","CI"],
                    camposReporte.categoria&&["categoria_id","Categoría"],
                    camposReporte.fecha_nacimiento&&["fecha_nacimiento","Nacimiento"],
                    camposReporte.camiseta&&["numero_camiseta","Camiseta"],
                    camposReporte.celular&&["celular","Celular"],
                    camposReporte.tipo_cuota&&["_tc","Cuota"],
                    camposReporte.estado&&["_est","Estado"],
                    camposReporte.codigo&&["id","Código"],
                  ].filter(Boolean);
                  const ml2=(new Date().getDate()>10?new Date().getMonth()+1:new Date().getMonth());
                  const est2=j=>{
                    const d=planPagos.filter(pl=>{
                      if(!pl.monto||pl.mes>ml2)return false;
                      const tc=tiposCuota.find(t=>t.id===j.tipo_cuota)||tiposCuota[0];
                      return Math.round(pl.monto*tc.porcentaje/100)>0&&!pagos.find(p=>p.jugador_id===j.id&&p.mes===pl.mes);
                    });
                    return d.length===0?"Al día":d.length+" mes"+(d.length>1?"es":"")+" adeudado"+(d.length>1?"s":"");
                  };
                  const filas=jugadoresFilt.map(j=>cols2.map(([k])=>{
                    if(k==="_tc")return(tiposCuota.find(t=>t.id===j.tipo_cuota)||tiposCuota[0]).nombre;
                    if(k==="_est")return est2(j);
                    return j[k]||"";
                  }));
                  descargarCSV(filas, cols2.map(([,h])=>h), `jugadores-${filtCat==="todos"?"todos":filtCat}.csv`);
                  setModalReporte(false);
                }}
                style={{flex:1,padding:"10px",background:"linear-gradient(135deg,#16a34a,#15803d)",
                  color:"white",border:"none",borderRadius:10,
                  fontFamily:"'Barlow Condensed',sans-serif",fontWeight:900,fontSize:13,cursor:"pointer"}}>
                📊 Excel
              </button>
            </div>
          </div>
        </Modal>
      )}

      {/* ── Modal reporte transferencias ── */}
      {modalTransfRep&&(
        <Modal onClose={()=>setModalTransfRep(false)} maxWidth={500}>
          <div style={{background:"linear-gradient(135deg,#0369a1,#0ea5e9)",padding:"16px 20px"}}>
            <div style={{fontFamily:"'Barlow Condensed',sans-serif",fontWeight:900,fontSize:20,
              color:"white",textTransform:"uppercase"}}>🏦 Reporte de transferencias</div>
          </div>
          <div style={{padding:"20px 22px"}}>
            <div style={{fontFamily:"'Barlow Condensed',sans-serif",fontWeight:700,fontSize:13,
              color:C.navy,textTransform:"uppercase",marginBottom:12}}>Período</div>
            <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:12,marginBottom:18}}>
              {[["Desde",transfMesDesde,setTransfMesDesde],["Hasta",transfMesHasta,setTransfMesHasta]].map(([lbl,val,set])=>(
                <div key={lbl}>
                  <label style={{display:"block",fontFamily:"'Barlow Condensed',sans-serif",fontWeight:700,
                    fontSize:11,color:C.navy,textTransform:"uppercase",marginBottom:5}}>{lbl}</label>
                  <select value={val} onChange={e=>set(+e.target.value)}
                    style={{width:"100%",padding:"8px 10px",borderRadius:8,
                      border:`1px solid ${C.gray}`,fontSize:13,fontFamily:"'Barlow Condensed',sans-serif"}}>
                    {MESES.map((m,i)=><option key={i+1} value={i+1}>{m}</option>)}
                  </select>
                </div>
              ))}
            </div>
            {(()=>{
              const tr=pagos.filter(p=>p.metodo_pago==="transferencia"&&p.mes>=transfMesDesde&&p.mes<=transfMesHasta);
              const tot=tr.reduce((a,p)=>a+(p.monto||0),0);
              return(
                <div>
                  <div style={{background:"#f0f9ff",borderRadius:10,padding:"10px 14px",marginBottom:16,
                    display:"flex",justifyContent:"space-between",alignItems:"center",
                    border:"1px solid #bae6fd"}}>
                    <span style={{fontFamily:"'Barlow Condensed',sans-serif",fontWeight:700,fontSize:13,color:"#0369a1"}}>
                      {tr.length} transferencia{tr.length!==1?"s":""} · {MESES[transfMesDesde-1]} a {MESES[transfMesHasta-1]}
                    </span>
                    <span style={{fontFamily:"'Barlow Condensed',sans-serif",fontWeight:900,fontSize:20,color:"#0369a1"}}>
                      ${tot.toLocaleString("es-UY")}
                    </span>
                  </div>
                  <div style={{display:"flex",gap:8}}>
                    <button onClick={()=>setModalTransfRep(false)}
                      style={{flex:1,padding:"10px",background:"transparent",color:C.navy,
                        border:`2px solid ${C.navy}`,borderRadius:10,
                        fontFamily:"'Barlow Condensed',sans-serif",fontWeight:700,fontSize:13}}>Cancelar</button>
                    <button onClick={()=>{
                        const tr2=pagos.filter(p=>p.metodo_pago==="transferencia"&&p.mes>=transfMesDesde&&p.mes<=transfMesHasta)
                          .sort((a,b)=>(a.fecha_pago||"").localeCompare(b.fecha_pago||""));
                        const tot2=tr2.reduce((a,p)=>a+(p.monto||0),0);
                        const rows=tr2.map(p=>{
                          const j=jugadores.find(x=>x.id===p.jugador_id);
                          return `<tr><td>${p.fecha_pago||"—"}</td><td>${j?.nombre||"—"}</td><td>${j?.categoria_id||"—"}</td><td>${MESES[(p.mes||1)-1]}</td><td style="text-align:right;font-weight:700">$${(p.monto||0).toLocaleString("es-UY")}</td></tr>`;
                        }).join("");
                        const html=`<!DOCTYPE html><html><head><meta charset="UTF-8"><title>Transferencias</title>
                          <style>body{font-family:Arial,sans-serif;padding:20px;}
                          h2{font-size:18px;margin-bottom:4px;color:#0369a1;}
                          .sub{font-size:11px;color:#666;margin-bottom:12px;}
                          table{border-collapse:collapse;width:100%;font-size:12px;}
                          th{background:#0369a1;color:white;padding:6px 10px;text-align:left;font-size:11px;text-transform:uppercase;}
                          td{padding:5px 10px;border-bottom:1px solid #e2e2da;}
                          tr:nth-child(even)td{background:#f0f9ff;}
                          tfoot td{font-weight:900;font-size:13px;color:#0369a1;text-align:right;padding:8px 10px;}
                          .btn{margin-top:14px;padding:8px 16px;background:#0369a1;color:white;border:none;border-radius:6px;cursor:pointer;}
                          @media print{.btn{display:none;}}</style></head><body>
                          <h2>Paysandú FC — Baby Fútbol</h2>
                          <div class="sub">Transferencias · ${MESES[transfMesDesde-1]} a ${MESES[transfMesHasta-1]} · ${new Date().toLocaleDateString("es-UY")}</div>
                          <table><thead><tr><th>Fecha</th><th>Jugador</th><th>Cat.</th><th>Mes</th><th>Monto</th></tr></thead>
                          <tbody>${rows}</tbody>
                          <tfoot><tr><td colspan="4">TOTAL</td><td>$${tot2.toLocaleString("es-UY")}</td></tr></tfoot>
                          </table><button class="btn" onclick="window.print()">Imprimir</button>
                          </body></html>`;
                        descargarHTML(html, `transferencias-${MESES[transfMesDesde-1]}-${MESES[transfMesHasta-1]}.html`);
                      }}
                      style={{flex:1,padding:"10px",background:"linear-gradient(135deg,#0ea5e9,#0369a1)",
                        color:"white",border:"none",borderRadius:10,
                        fontFamily:"'Barlow Condensed',sans-serif",fontWeight:900,fontSize:13,cursor:"pointer"}}>
                      📄 HTML
                    </button>
                    <button onClick={()=>{
                        const tr3=pagos.filter(p=>p.metodo_pago==="transferencia"&&p.mes>=transfMesDesde&&p.mes<=transfMesHasta)
                          .sort((a,b)=>(a.fecha_pago||"").localeCompare(b.fecha_pago||""));
                        const filas3=tr3.map(p=>{
                          const j=jugadores.find(x=>x.id===p.jugador_id);
                          return [p.fecha_pago||"",j?.nombre||"",j?.categoria_id||"",MESES[(p.mes||1)-1],(p.monto||0).toString()];
                        });
                        filas3.push(["","","","TOTAL",tr3.reduce((a,p)=>a+(p.monto||0),0).toString()]);
                        descargarCSV(filas3,["Fecha","Jugador","Categoría","Mes","Monto"],`transferencias-${MESES[transfMesDesde-1]}-${MESES[transfMesHasta-1]}.csv`);
                        setModalTransfRep(false);
                      }}
                      style={{flex:1,padding:"10px",background:"linear-gradient(135deg,#16a34a,#15803d)",
                        color:"white",border:"none",borderRadius:10,
                        fontFamily:"'Barlow Condensed',sans-serif",fontWeight:900,fontSize:13,cursor:"pointer"}}>
                      📊 Excel
                    </button>
                  </div>
                </div>
              );
            })()}
          </div>
        </Modal>
      )}

      {/* ── Modal comprobante pantalla completa ── */}
      {verComprobante&&(
        <div style={{position:"fixed",inset:0,background:"rgba(0,0,0,.93)",zIndex:9999,
          display:"flex",flexDirection:"column",alignItems:"center",justifyContent:"center",padding:20}}>
          <button onClick={()=>setVerComprobante(null)}
            style={{position:"fixed",top:16,right:16,width:44,height:44,borderRadius:"50%",
              background:"#dc2626",border:"2px solid white",color:"white",fontSize:22,
              cursor:"pointer",fontWeight:900,display:"flex",alignItems:"center",
              justifyContent:"center",zIndex:10000}}>✕</button>
          <img src={verComprobante}
            style={{maxWidth:"90vw",maxHeight:"82dvh",borderRadius:10,objectFit:"contain",
              boxShadow:"0 8px 40px rgba(0,0,0,.7)"}}/>
          <div style={{color:"rgba(255,255,255,.5)",fontSize:12,marginTop:12}}>
            Presioná ✕ para cerrar
          </div>
        </div>
      )}

      {/* Modales */}
      {(modal==="newJug"||modal==="editJug")&&(
        <Modal onClose={()=>{setModal(null);setSelJugador(null);}}>
          <FormAltaJugador
            categorias={categorias}
            initialData={selJugador}
            onSave={saveJugador}
            onCancel={()=>{setModal(null);setSelJugador(null);}}
            showTipoCuota={true}
          />
        </Modal>
      )}
      {modal==="fichaJug"&&selJugador&&(
        <Modal onClose={()=>{setModal(null);setSelJugador(null);}}>
          <FormAltaJugador
            categorias={categorias}
            initialData={selJugador}
            onSave={()=>{}}
            onCancel={()=>{setModal(null);setSelJugador(null);}}
            showTipoCuota={true}
            readOnly={true}
          />
        </Modal>
      )}
      {modal==="newDel"&&<Modal onClose={()=>setModal(null)}><FormDelegado categorias={categorias} onSave={saveDelegado} onCancel={()=>setModal(null)}/></Modal>}
      {modal==="fichaDel"&&selJugador&&(
        <Modal onClose={()=>{setModal(null);setSelJugador(null);}} maxWidth={420}>
          <div style={{background:`linear-gradient(135deg,${C.navyDark},${C.navy})`,padding:"24px",
            display:"flex",flexDirection:"column",alignItems:"center",gap:12}}>
            {selJugador.foto_url
              ? <img src={selJugador.foto_url} style={{width:90,height:90,borderRadius:"50%",
                  objectFit:"cover",border:"3px solid rgba(255,255,255,.5)"}}
                  onError={e=>e.target.style.display="none"}/>
              : <div style={{width:90,height:90,borderRadius:"50%",
                  background:"rgba(255,255,255,.15)",display:"flex",alignItems:"center",
                  justifyContent:"center",overflow:"hidden",border:"2px solid rgba(255,255,255,.3)"}}>
                  <svg viewBox="0 0 24 24" width="60" height="60"><circle cx="12" cy="8" r="4" fill="rgba(255,255,255,.7)"/><path d="M4 20c0-4 3.6-7 8-7s8 3 8 7" fill="rgba(255,255,255,.7)"/></svg>
                </div>
            }
            <div style={{textAlign:"center"}}>
              <div style={{fontFamily:"'Barlow Condensed',sans-serif",fontWeight:900,fontSize:22,
                color:C.white,textTransform:"uppercase"}}>{selJugador.nombre}</div>
              <div style={{color:C.lilac,fontSize:13,marginTop:3}}>
                {selJugador.activo===false
                  ? <span style={{background:"#dc2626",color:"white",borderRadius:10,padding:"2px 10px",fontSize:11,fontWeight:700}}>SUSPENDIDO</span>
                  : <span style={{background:"rgba(134,239,172,.3)",color:"#86efac",borderRadius:10,padding:"2px 10px",fontSize:11,fontWeight:700}}>ACTIVO</span>
                }
              </div>
            </div>
          </div>
          <div style={{padding:"20px 24px"}}>
            <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:10,marginBottom:16}}>
              {[
                ["📱","Celular",selJugador.celular],
                ["📧","Email",selJugador.mail||"—"],
                ["🔐","PIN","••••"],
                ["🏷","Categorías",(selJugador.categorias||[]).length>0?(selJugador.categorias||[]).join(", "):"Todas"],
              ].map(([ico,lbl,val])=>(
                <div key={lbl} style={{background:C.offWhite,borderRadius:10,padding:"10px 14px"}}>
                  <div style={{fontSize:10,color:C.grayMid,textTransform:"uppercase",fontWeight:600,marginBottom:3}}>
                    {ico} {lbl}
                  </div>
                  <div style={{fontFamily:"'Barlow Condensed',sans-serif",fontWeight:700,fontSize:14,
                    color:C.navy}}>{val||"—"}</div>
                </div>
              ))}
            </div>
            <div style={{display:"flex",gap:8}}>
              <button onClick={()=>{setModal("editDel");}}
                style={{flex:1,padding:"10px",background:`linear-gradient(135deg,${C.navy},${C.navyLight})`,
                  color:C.white,border:"none",borderRadius:10,fontFamily:"'Barlow Condensed',sans-serif",
                  fontWeight:800,fontSize:14,cursor:"pointer",textTransform:"uppercase"}}>
                ✏️ Editar
              </button>
              <button onClick={()=>{setModal(null);setSelJugador(null);}}
                style={{flex:1,padding:"10px",background:C.offWhite,color:C.navy,
                  border:`1px solid ${C.gray}`,borderRadius:10,fontFamily:"'Barlow Condensed',sans-serif",
                  fontWeight:700,fontSize:14,cursor:"pointer"}}>
                Cerrar
              </button>
            </div>
          </div>
        </Modal>
      )}
      {modal==="editDel"&&selJugador&&(
        <Modal onClose={()=>{setModal(null);setSelJugador(null);}}>
          <FormDelegado
            categorias={categorias}
            initialData={selJugador}
            onSave={saveEditDelegado}
            onCancel={()=>{setModal(null);setSelJugador(null);}}
          />
        </Modal>
      )}
      {modal==="qr"&&qrLink&&(
        <Modal onClose={()=>setModal(null)} maxWidth={380}>
          <div style={{padding:"28px",textAlign:"center"}}>
            <div style={{fontFamily:"'Barlow Condensed',sans-serif",fontWeight:900,fontSize:20,
              color:C.navy,textTransform:"uppercase",marginBottom:16}}>🔗 Link de formulario</div>
            <img src={`https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=${encodeURIComponent(qrLink)}&bgcolor=ffffff&color=1e2a6e`}
              style={{width:200,height:200,borderRadius:12,border:`3px solid ${C.navy}`,marginBottom:12}}/>
            <div style={{background:C.offWhite,borderRadius:8,padding:"10px 12px",fontSize:12,
              color:C.navy,wordBreak:"break-all",marginBottom:16}}>{qrLink}</div>
            <button onClick={()=>{
                navigator.clipboard?.writeText(qrLink);
                alert("✅ Enlace copiado. Podés pegarlo en WhatsApp o email para que completen el formulario.");
              }}
              style={{width:"100%",padding:"10px",background:`linear-gradient(135deg,${C.navy},${C.navyLight})`,
                color:C.white,border:"none",borderRadius:10,fontFamily:"'Barlow Condensed',sans-serif",
                fontWeight:700,fontSize:14,textTransform:"uppercase"}}>📋 Copiar enlace</button>
          </div>
        </Modal>
      )}
      {/* Modal historial pagos desde planteles */}
      {jugPagosVer&&(
        <Modal onClose={()=>setJugPagosVer(null)} maxWidth={500}>
          <div style={{background:`linear-gradient(135deg,${C.navyDark},${C.navy})`,padding:"14px 20px",
            display:"flex",alignItems:"center",gap:12}}>
            {jugPagosVer.foto_url&&<img src={jugPagosVer.foto_url} style={{width:40,height:40,
              borderRadius:"50%",objectFit:"cover",border:"2px solid rgba(255,255,255,.4)"}}
              onError={e=>e.target.style.display="none"}/>}
            <div>
              <div style={{fontFamily:"'Barlow Condensed',sans-serif",fontWeight:900,fontSize:18,
                color:C.white,textTransform:"uppercase"}}>💳 Historial de pagos</div>
              <div style={{color:C.lilac,fontSize:12}}>{jugPagosVer.nombre} · Cat. {jugPagosVer.categoria_id}</div>
            </div>
          </div>
          <div style={{padding:"16px 20px",maxHeight:"65dvh",overflowY:"auto"}}>
            {MESES.map((m,i)=>{
              const mes=i+1;
              const plan=planPagos.find(p=>p.mes===mes);
              if(!plan||plan.monto===0) return null;
              const tipo=tiposCuota.find(t=>t.id===jugPagosVer.tipo_cuota)||tiposCuota[0];
              const monto=Math.round(plan.monto*tipo.porcentaje/100);
              const pago=pagos.find(p=>p.jugador_id===jugPagosVer.id&&p.mes===mes);
              return(
                <div key={mes} style={{display:"flex",justifyContent:"space-between",alignItems:"center",
                  padding:"9px 0",borderBottom:`1px solid ${C.gray}`}}>
                  <div>
                    <div style={{fontFamily:"'Barlow Condensed',sans-serif",fontWeight:700,fontSize:15,
                      color:C.navy}}>{m}</div>
                    {pago&&<div style={{fontSize:11,color:C.grayMid}}>{pago.fecha_pago} · {pago.metodo_pago}</div>}
                  </div>
                  <div style={{display:"flex",alignItems:"center",gap:10}}>
                    <div style={{fontFamily:"'Barlow Condensed',sans-serif",fontWeight:800,fontSize:15,
                      color:C.navy}}>{fmt(monto)}</div>
                    <span style={{background:pago?"#dcfce7":"#fee2e2",color:pago?"#16a34a":"#dc2626",
                      borderRadius:16,padding:"2px 10px",fontSize:11,fontWeight:700}}>
                      {pago?"✓ Pagado":"Pendiente"}
                    </span>
                  </div>
                </div>
              );
            })}
            <div style={{marginTop:14,display:"flex",gap:8}}>
              <button onClick={()=>{
                  const link = window.location.origin+"?id="+jugPagosVer.id;
                  const msg = jugPagosVer.nombre+" (Cat."+jugPagosVer.categoria_id+") - Link de pago: "+link;
                  navigator.clipboard?.writeText(msg).then(()=>{
                    alert("✅ Link de pago copiado para "+jugPagosVer.nombre);
                  });
                }}
                style={{flex:1,padding:"10px",background:`linear-gradient(135deg,${C.green},#15803d)`,
                  color:C.white,border:"none",borderRadius:10,fontFamily:"'Barlow Condensed',sans-serif",
                  fontWeight:700,fontSize:13,cursor:"pointer",textTransform:"uppercase"}}>
                💳 Enviar link de pago
              </button>
              <button onClick={()=>setJugPagosVer(null)}
                style={{padding:"10px 16px",background:C.offWhite,color:C.navy,
                  border:`1px solid ${C.gray}`,borderRadius:10,fontFamily:"'Barlow Condensed',sans-serif",
                  fontWeight:700,fontSize:13,cursor:"pointer"}}>Cerrar</button>
            </div>
          </div>
        </Modal>
      )}

      {modal==="qrJugador"&&qrLink&&<ModalQRJugador
        jugId={qrLink}
        jug={jugadores.find(j=>j.id===qrLink)||null}
        onClose={()=>setModal(null)}
      />}
    </div>
  );
}

/* ══ PAGOS TAB ════════════════════════════════════════════════════════ */
function PagosTab({ jugadores, pagos, planPagos, categorias, tiposCuota,
  filtCat, setFiltCat, onRegistrarPago, añoActual, onTransfRep }) {
  const [selJug,    setSelJug]   = useState(null);
  const [verHistorial, setVerHistorial] = useState(null);
  const [selMeses,  setSelMeses] = useState([]); // múltiples meses
  const [verReporte, setVerReporte] = useState(false);
  const [reporteCat, setReporteCat] = useState("todos");
  const [metodo,    setMetodo]   = useState(null);
  const [saving,    setSaving]   = useState(false);
  const [done,      setDone]     = useState(false);

  const toggleMes = (mes) => setSelMeses(prev =>
    prev.includes(mes) ? prev.filter(m=>m!==mes) : [...prev, mes]
  );
  const totalSeleccionado = selJug
    ? selMeses.reduce((acc,mes)=>acc+cuotaMes(selJug,mes),0) : 0;

  const cuotaMes = (jug, mes) => {
    const planMes = planPagos.find(p=>p.mes===mes);
    if (!planMes||planMes.monto===0) return 0;
    const tipo = (tiposCuota||TIPOS_CUOTA_DEFAULT).find(t=>t.id===jug.tipo_cuota)||(tiposCuota||TIPOS_CUOTA_DEFAULT)[0];
    return Math.round(planMes.monto * tipo.porcentaje / 100);
  };

  const pagoJugMes = (jugId, mes) => pagos.find(p=>p.jugador_id===jugId&&p.mes===mes);

  const mesActual = new Date().getMonth()+1;

  // Semáforo: 0=al día verde, 1=un mes rojo claro, 2+=rojo fuerte
  const estadoPago = (jug) => {
    const deuda = MESES.map((_,i)=>i+1).filter(mes=>{
      const monto=cuotaMes(jug,mes);
      return monto>0&&!pagoJugMes(jug.id,mes)&&mes<=(new Date().getDate()>10 ? new Date().getMonth()+1 : new Date().getMonth());
    });
    if (deuda.length===0) return {color:"#16a34a",bg:"#dcfce7",label:"Al día",icon:"🟢",meses:0};
    if (deuda.length===1) return {color:"#d97706",bg:"#fef3c7",label:"1 mes",icon:"🟡",meses:1};
    return {color:"#dc2626",bg:"#fee2e2",label:`${deuda.length} meses`,icon:"🔴",meses:deuda.length};
  };

  const confirmar = async () => {
    if (!selJug||selMeses.length===0||!metodo) return;
    setSaving(true);
    for (const mes of selMeses) {
      await onRegistrarPago(selJug.id, mes, cuotaMes(selJug,mes), metodo);
    }
    setSaving(false); setDone(true);
    setTimeout(()=>{setDone(false);setSelJug(null);setSelMeses([]);setMetodo(null);},2500);
  };

  // Ordenar jugadores: por categoría luego alfabético
  const jugadoresOrdenados = [...jugadores].sort((a,b)=>{
    if(a.categoria_id < b.categoria_id) return -1;
    if(a.categoria_id > b.categoria_id) return 1;
    return a.nombre.localeCompare(b.nombre);
  });
  const jugFiltrados = filtCat==="todos" ? jugadoresOrdenados
    : jugadoresOrdenados.filter(j=>j.categoria_id===filtCat);

  return (
    <div style={{maxWidth:900}}>
      {/* Barra superior: botones reporte */}
      <div style={{display:"flex",gap:10,marginBottom:12,alignItems:"flex-start",flexWrap:"wrap"}}>
        <button onClick={()=>setVerReporte(true)}
          style={{width:110,height:80,background:`linear-gradient(135deg,#b45309,#d97706)`,
            color:C.white,border:"none",borderRadius:12,
            fontFamily:"'Barlow Condensed',sans-serif",fontWeight:900,fontSize:12,
            textTransform:"uppercase",cursor:"pointer",display:"flex",flexDirection:"column",
            alignItems:"center",justifyContent:"center",gap:6,
            boxShadow:"0 4px 12px rgba(180,83,9,.3)"}}>
          <span style={{fontSize:24}}>📊</span>Reporte Pagos
        </button>
        <button onClick={()=>onTransfRep&&onTransfRep()}
          style={{width:110,height:80,background:"linear-gradient(135deg,#0ea5e9,#0369a1)",
            color:"white",border:"none",borderRadius:12,
            fontFamily:"'Barlow Condensed',sans-serif",fontWeight:900,fontSize:11,
            textTransform:"uppercase",cursor:"pointer",display:"flex",flexDirection:"column",
            alignItems:"center",justifyContent:"center",gap:6,lineHeight:1.2,textAlign:"center",
            boxShadow:"0 4px 12px rgba(3,105,161,.3)"}}>
          <span style={{fontSize:24}}>🏦</span>Reporte<br/>Transferencias
        </button>
      </div>
      {/* Filtros categoría */}
      <div style={{display:"flex",gap:6,flexWrap:"wrap",marginBottom:10}}>
        {["todos",...categorias.map(c=>c.id)].map(cid=>(
          <button key={cid} onClick={()=>setFiltCat(cid)}
            style={{background:filtCat===cid?C.navy:C.white,color:filtCat===cid?C.white:C.navy,
              border:`2px solid ${filtCat===cid?C.navy:C.gray}`,borderRadius:20,padding:"6px 14px",
              fontFamily:"'Barlow Condensed',sans-serif",fontWeight:700,fontSize:13,
              textTransform:"uppercase",cursor:"pointer"}}>
            {cid==="todos"?"Todos":cid}
          </button>
        ))}
      </div>

      {/* Encabezado lista */}
      <div style={{display:"grid",gridTemplateColumns:"50px 1fr 100px 90px 130px 155px",gap:8,
        padding:"10px 16px",background:C.navy,borderRadius:"10px 10px 0 0",alignItems:"center"}}>
        {["","Nombre","Cat.","Cuota","Estado","Acciones"].map((h,i)=>(
          <div key={i} style={{fontFamily:"'Barlow Condensed',sans-serif",fontWeight:800,
            fontSize:13,color:C.white,textTransform:"uppercase",textAlign:i>2?"center":"left"}}>{h}</div>
        ))}
      </div>
      {jugFiltrados.map((j,idx)=>{
        const est=estadoPago(j);
        const deudaMeses=MESES.map((_,i)=>i+1).filter(mes=>{
          const monto=cuotaMes(j,mes);
          return monto>0&&!pagoJugMes(j.id,mes)&&mes<=(new Date().getDate()>10 ? new Date().getMonth()+1 : new Date().getMonth());
        });
        return(
          <div key={j.id} style={{display:"grid",gridTemplateColumns:"50px 1fr 100px 90px 130px 155px",gap:8,
            alignItems:"center",padding:"12px 16px",
            background:idx%2===0?C.white:"#f8f8f5",border:`1px solid ${C.gray}`,
            borderRadius:idx===jugFiltrados.length-1?"0 0 10px 10px":"0",borderTop:"none"}}>
            {/* Semáforo */}
            <div style={{fontSize:24,textAlign:"center"}}>{est.icon}</div>
            {/* Nombre */}
            <div style={{minWidth:0,display:"flex",alignItems:"center",gap:8}}>
              {j.foto_url
                ? <img src={j.foto_url} style={{width:32,height:32,borderRadius:"50%",
                    objectFit:"cover",border:`2px solid ${C.navy}`,flexShrink:0}}
                    onError={e=>e.target.style.display="none"}/>
                : <div style={{width:32,height:32,borderRadius:"50%",flexShrink:0,
                    background:"linear-gradient(135deg,#c9d4f0,#a8b8e8)",
                    border:"2px solid #c0cce8",display:"flex",alignItems:"center",
                    justifyContent:"center",overflow:"hidden"}}>
                    <svg viewBox="0 0 24 24" width="22" height="22"><circle cx="12" cy="8" r="4" fill="#6b7db3"/><path d="M4 20c0-4 3.6-7 8-7s8 3 8 7" fill="#6b7db3"/></svg>
                  </div>
              }
              <div style={{fontFamily:"'Barlow Condensed',sans-serif",fontWeight:800,fontSize:16,
                color:C.navy,textTransform:"uppercase",overflow:"hidden",textOverflow:"ellipsis",
                whiteSpace:"nowrap"}}>{j.nombre}</div>
            </div>
            {/* Categoría */}
            <div style={{fontFamily:"'Barlow Condensed',sans-serif",fontWeight:700,fontSize:15,
              color:C.navy,textAlign:"center"}}>{j.categoria_id}</div>
            {/* Tipo cuota */}
            <div style={{textAlign:"center"}}>
              {(()=>{
                const tc=(tiposCuota||TIPOS_CUOTA_DEFAULT).find(t=>t.id===j.tipo_cuota)||(tiposCuota||TIPOS_CUOTA_DEFAULT)[0];
                return <span style={{fontFamily:"'Barlow Condensed',sans-serif",fontWeight:700,
                  fontSize:11,color:tc.porcentaje===0?"#16a34a":tc.porcentaje<100?"#d97706":C.navy,
                  whiteSpace:"nowrap"}}>{tc.nombre}</span>;
              })()}
            </div>
            {/* Estado */}
            <div style={{background:est.bg,borderRadius:20,padding:"5px 12px",textAlign:"center",
              fontFamily:"'Barlow Condensed',sans-serif",fontWeight:800,fontSize:13,
              color:est.color,whiteSpace:"nowrap"}}>{est.label}</div>
            {/* Acciones */}
            <div style={{display:"flex",gap:6,alignItems:"center"}}>
              <button onClick={()=>setVerHistorial(j)}
                style={{flex:1,padding:"9px 10px",background:`linear-gradient(135deg,${C.navy},${C.navyLight})`,
                  color:C.white,border:"none",borderRadius:8,fontFamily:"'Barlow Condensed',sans-serif",
                  fontWeight:800,fontSize:13,cursor:"pointer",textTransform:"uppercase"}}>
                💳 Pagos
              </button>
              <button onClick={()=>{
                  const link=window.location.origin+"?id="+j.id;
                  const msg=j.nombre+" (Cat."+j.categoria_id+") - Link de pago: "+link;
                  navigator.clipboard?.writeText(msg).then(()=>{
                    alert("✅ Link de pago copiado para "+j.nombre);
                  });
                }}
                title="Enviar link de pago"
                style={{width:38,height:38,padding:0,background:`linear-gradient(135deg,${C.green},#15803d)`,
                  color:C.white,border:"none",borderRadius:8,fontSize:17,cursor:"pointer",
                  display:"flex",alignItems:"center",justifyContent:"center",flexShrink:0}}>🔗</button>
            </div>
          </div>
        );
      })}
      {jugFiltrados.length===0&&(
        <div style={{textAlign:"center",padding:"40px 0",color:C.grayMid}}>Sin jugadores</div>
      )}

      {/* Modal historial */}
      {verHistorial&&(
        <Modal onClose={()=>setVerHistorial(null)} maxWidth={500}>
          <div style={{background:`linear-gradient(135deg,${C.navyDark},${C.navy})`,padding:"16px 20px"}}>
            <div style={{fontFamily:"'Barlow Condensed',sans-serif",fontWeight:900,fontSize:18,
              color:C.white,textTransform:"uppercase"}}>📋 Historial de pagos</div>
            <div style={{color:C.lilac,fontSize:13}}>{verHistorial.nombre} · {verHistorial.categoria_id}</div>
          </div>
          <div style={{padding:"18px 20px",maxHeight:"60dvh",overflowY:"auto"}}>
            {MESES.map((m,i)=>{
              const mes=i+1;
              const monto=cuotaMes(verHistorial,mes);
              const pago=pagoJugMes(verHistorial.id,mes);
              if(monto===0) return null;
              return(
                <div key={mes} style={{display:"flex",justifyContent:"space-between",alignItems:"center",
                  padding:"8px 0",borderBottom:`1px solid ${C.gray}`}}>
                  <div>
                    <div style={{fontFamily:"'Barlow Condensed',sans-serif",fontWeight:700,fontSize:15,
                      color:C.navy}}>{m}</div>
                    {pago&&<div style={{fontSize:11,color:C.grayMid}}>{pago.fecha_pago} · {pago.metodo_pago}</div>}
                  </div>
                  <div style={{display:"flex",alignItems:"center",gap:10}}>
                    <div style={{fontFamily:"'Barlow Condensed',sans-serif",fontWeight:800,fontSize:15,
                      color:C.navy}}>{fmt(monto)}</div>
                    <span style={{background:pago?"#dcfce7":"#fee2e2",color:pago?"#16a34a":"#dc2626",
                      borderRadius:16,padding:"2px 10px",fontSize:11,fontWeight:700}}>
                      {pago?"✓ Pagado":"Pendiente"}
                    </span>
                  </div>
                </div>
              );
            })}
            <div style={{marginTop:14,display:"flex",flexDirection:"column",gap:8}}>
              {(()=>{
                const deudaMeses=MESES.map((_,i)=>i+1).filter(mes=>{
                  const monto=cuotaMes(verHistorial,mes);
                  return monto>0&&!pagoJugMes(verHistorial.id,mes)&&mes<=(new Date().getDate()>10 ? new Date().getMonth()+1 : new Date().getMonth());
                });
                return deudaMeses.length>0 ? (
                  <button onClick={()=>{setSelJug(verHistorial);setVerHistorial(null);setSelMeses([]);setMetodo(null);}}
                    style={{padding:"10px",background:`linear-gradient(135deg,${C.navy},${C.navyLight})`,
                      color:C.white,border:"none",borderRadius:10,fontFamily:"'Barlow Condensed',sans-serif",
                      fontWeight:800,fontSize:14,textTransform:"uppercase",cursor:"pointer"}}>
                    ✏ Registrar pago
                  </button>
                ) : (
                  <div style={{padding:"10px",background:"#dcfce7",borderRadius:10,
                    textAlign:"center",fontFamily:"'Barlow Condensed',sans-serif",fontWeight:800,
                    fontSize:14,color:"#16a34a"}}>✅ Al día con los pagos</div>
                );
              })()}
              <button onClick={()=>{
                  const link=window.location.origin+"?id="+verHistorial.id;
                  const msg=verHistorial.nombre+" (Cat."+verHistorial.categoria_id+") - Link de pago: "+link;
                  navigator.clipboard?.writeText(msg).then(()=>{
                    alert("✅ Link de pago copiado para "+verHistorial.nombre+" (Cat."+verHistorial.categoria_id+")");
                  });
                }}
                style={{padding:"10px",background:`linear-gradient(135deg,${C.green},#15803d)`,
                  color:C.white,border:"none",borderRadius:10,fontFamily:"'Barlow Condensed',sans-serif",
                  fontWeight:800,fontSize:14,cursor:"pointer",textTransform:"uppercase"}}>
                🔗 Enviar link de pago
              </button>
              <button onClick={()=>setVerHistorial(null)}
                style={{padding:"9px",background:C.offWhite,color:C.navy,
                  border:`1px solid ${C.gray}`,borderRadius:10,fontFamily:"'Barlow Condensed',sans-serif",
                  fontWeight:700,fontSize:13,cursor:"pointer"}}>Cerrar</button>
            </div>
          </div>
        </Modal>
      )}

      {/* Modal registrar pago */}
      {selJug&&(
        <Modal onClose={()=>setSelJug(null)}>
          <div style={{background:`linear-gradient(135deg,${C.navyDark},${C.navy})`,padding:"16px 20px"}}>
            <div style={{fontFamily:"'Barlow Condensed',sans-serif",fontWeight:900,fontSize:18,
              color:C.white,textTransform:"uppercase"}}>💳 Registrar pago</div>
            <div style={{color:C.lilac,fontSize:13}}>{selJug.nombre}</div>
          </div>
          <div style={{padding:"18px 20px"}}>
            {done?(
              <div style={{textAlign:"center",padding:"20px 0"}}>
                <div style={{fontSize:48}}>✅</div>
                <div style={{fontFamily:"'Barlow Condensed',sans-serif",fontWeight:900,fontSize:18,
                  color:C.navy,textTransform:"uppercase",marginTop:8}}>¡Pago registrado!</div>
              </div>
            ):(
              <>
                <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:8}}>
                  <div style={{fontFamily:"'Barlow Condensed',sans-serif",fontWeight:700,fontSize:12,
                    color:C.navy,textTransform:"uppercase"}}>Seleccioná los meses a pagar</div>
                  {selMeses.length>0&&<div style={{fontFamily:"'Barlow Condensed',sans-serif",fontWeight:900,
                    fontSize:14,color:C.green}}>Total: {fmt(totalSeleccionado)}</div>}
                </div>
                <div style={{display:"grid",gridTemplateColumns:"repeat(3,1fr)",gap:6,marginBottom:16}}>
                  {MESES.map((_,i)=>{
                    const mes=i+1;
                    const monto=cuotaMes(selJug,mes);
                    const pago=pagoJugMes(selJug.id,mes);
                    if(monto===0||pago) return null;
                    if(mes>mesActual+1) return null;
                    const sel=selMeses.includes(mes);
                    return(
                      <button key={mes} onClick={()=>toggleMes(mes)}
                        style={{padding:"10px 4px",borderRadius:8,
                          border:`2px solid ${sel?C.green:C.gray}`,
                          background:sel?"#dcfce7":C.white,cursor:"pointer",
                          fontFamily:"'Barlow Condensed',sans-serif",fontWeight:700,fontSize:12,
                          color:sel?"#16a34a":C.navy,position:"relative"}}>
                        {sel&&<span style={{position:"absolute",top:3,right:5,fontSize:10}}>✓</span>}
                        <div>{MESES[i].slice(0,3)}</div>
                        <div style={{fontWeight:900,fontSize:13}}>{fmt(monto)}</div>
                      </button>
                    );
                  })}
                </div>
                <div style={{fontFamily:"'Barlow Condensed',sans-serif",fontWeight:700,fontSize:12,
                  color:C.navy,textTransform:"uppercase",marginBottom:8}}>Medio de pago</div>
                <div style={{display:"grid",gridTemplateColumns:"repeat(3,1fr)",gap:6,marginBottom:16}}>
                  {PAY_METHODS.map(pm=>(
                    <button key={pm.id} onClick={()=>setMetodo(pm.id)}
                      style={{padding:"10px 6px",borderRadius:10,border:`2px solid ${metodo===pm.id?pm.color:C.gray}`,
                        background:metodo===pm.id?pm.color+"18":C.white,cursor:"pointer",
                        fontFamily:"'Barlow Condensed',sans-serif",fontWeight:700,fontSize:12,
                        color:metodo===pm.id?pm.color:C.navy,display:"flex",flexDirection:"column",
                        alignItems:"center",gap:3}}>
                      <span style={{fontSize:18}}>{pm.icon}</span>{pm.label}
                    </button>
                  ))}
                </div>
                <div style={{display:"flex",gap:8}}>
                  <button onClick={()=>setSelJug(null)}
                    style={{flex:1,padding:"10px",background:"transparent",color:C.navy,
                      border:`2px solid ${C.navy}`,borderRadius:10,fontFamily:"'Barlow Condensed',sans-serif",
                      fontWeight:700,fontSize:13,textTransform:"uppercase"}}>Cancelar</button>
                  <button onClick={confirmar} disabled={selMeses.length===0||!metodo||saving}
                    style={{flex:2,padding:"10px",
                      background:selMeses.length>0&&metodo?`linear-gradient(135deg,${C.green},#15803d)`:"#e2e2da",
                      color:selMeses.length>0&&metodo?C.white:C.grayMid,border:"none",borderRadius:10,
                      fontFamily:"'Barlow Condensed',sans-serif",fontWeight:900,fontSize:14,
                      textTransform:"uppercase"}}>
                    {saving?"⏳ Guardando...":`✅ Confirmar ${selMeses.length>1?"("+selMeses.length+" meses)":""}`}
                  </button>
                </div>
              </>
            )}
          </div>
        </Modal>
      )}

      {/* ── MODAL REPORTE ── */}
      {verReporte&&(
        <Modal onClose={()=>setVerReporte(false)} maxWidth={980}>
          <div style={{background:`linear-gradient(135deg,${C.navyDark},${C.navy})`,padding:"16px 24px",
            display:"flex",alignItems:"center",justifyContent:"space-between",flexWrap:"wrap",gap:10}}>
            <div>
              <div style={{fontFamily:"'Barlow Condensed',sans-serif",fontWeight:900,fontSize:22,
                color:C.white,textTransform:"uppercase"}}>📊 Reporte de pagos {añoActual}</div>
              <div style={{color:C.lilac,fontSize:12,marginTop:2}}>
                Verde = pagado · Rojo = pendiente · Gris = sin cuota
              </div>
            </div>
            <div style={{display:"flex",gap:8,alignItems:"center"}}>
              <select value={reporteCat} onChange={e=>setReporteCat(e.target.value)}
                style={{padding:"8px 12px",border:`1px solid rgba(255,255,255,.3)`,borderRadius:8,
                  background:"rgba(255,255,255,.1)",color:C.white,fontSize:13,cursor:"pointer",
                  fontFamily:"'Barlow Condensed',sans-serif",fontWeight:700}}>
                <option value="todos" style={{color:C.navy}}>Todas las categorías</option>
                {categorias.map(c=><option key={c.id} value={c.id} style={{color:C.navy}}>{c.nombre}</option>)}
              </select>
              <button onClick={()=>{
                  // Imprimir/exportar
                  const el = document.getElementById("reporte-tabla");
                  if(!el) return;
                  const w = window.open("","_blank");
                  if(w){w.document.write("<!DOCTYPE html><html><head><meta charset=\'utf-8\'><title>Reporte Pagos</title><style>body{font-family:Arial,sans-serif;font-size:11px;}table{border-collapse:collapse;width:100%;}th,td{border:1px solid #ccc;padding:4px 6px;text-align:center;}th{background:#1e2a6e;color:white;}.verde{background:#dcfce7;color:#16a34a;font-weight:700;}.rojo{background:#fee2e2;color:#dc2626;font-weight:700;}.gris{background:#f3f4f6;color:#9ca3af;}.nombre{text-align:left;font-weight:700;text-transform:uppercase;}</style></head><body>"+el.outerHTML+"<script>window.onload=function(){window.print();}<\/script></body></html>");w.document.close();}
                  else{descargarHTML("<!DOCTYPE html><html><head><meta charset=\"UTF-8\"><title>Reporte Pagos</title><style>body{font-family:Arial,sans-serif;font-size:11px;}table{border-collapse:collapse;width:100%;}th,td{border:1px solid #ccc;padding:4px 6px;text-align:center;}th{background:#1e2a6e;color:white;}</style></head><body>"+el.outerHTML+"</body></html>","reporte-pagos.html");}
                }}
                style={{padding:"8px 14px",background:C.gold,color:C.navyDark,border:"none",borderRadius:8,
                  fontFamily:"'Barlow Condensed',sans-serif",fontWeight:700,fontSize:13,cursor:"pointer",
                  textTransform:"uppercase"}}>🖨 Imprimir</button>
            </div>
          </div>
          <div style={{padding:"16px",overflowX:"auto",maxHeight:"75dvh",overflowY:"auto"}}>
            {(()=>{
              const jugRep = reporteCat==="todos"
                ? [...jugadores].sort((a,b)=>{
                    if(a.categoria_id<b.categoria_id) return -1;
                    if(a.categoria_id>b.categoria_id) return 1;
                    return a.nombre.localeCompare(b.nombre);
                  })
                : [...jugadores].filter(j=>j.categoria_id===reporteCat)
                    .sort((a,b)=>a.nombre.localeCompare(b.nombre));

              // Meses que tienen cuota definida (algún jugador tiene monto > 0)
              const mesesActivos = MESES.map((_,i)=>i+1).filter(mes=>{
                const plan=planPagos.find(p=>p.mes===mes);
                return plan&&plan.monto>0;
              });

              return(
                <table id="reporte-tabla" style={{borderCollapse:"collapse",width:"100%",fontSize:12}}>
                  <thead>
                    <tr>
                      <th style={{background:C.navy,color:C.white,padding:"8px 10px",
                        textAlign:"left",fontFamily:"'Barlow Condensed',sans-serif",
                        fontSize:12,textTransform:"uppercase",position:"sticky",left:0,zIndex:1,
                        borderRight:`2px solid ${C.navyLight}`}}>Cat.</th>
                      <th style={{background:C.navy,color:C.white,padding:"8px 10px",
                        textAlign:"left",fontFamily:"'Barlow Condensed',sans-serif",
                        fontSize:12,textTransform:"uppercase",minWidth:160,
                        borderRight:`2px solid ${C.navyLight}`}}>Nombre</th>
                      <th style={{background:C.navy,color:C.white,padding:"8px 10px",
                        fontFamily:"'Barlow Condensed',sans-serif",fontSize:12,textTransform:"uppercase",
                        borderRight:`2px solid ${C.navyLight}`}}>Tipo</th>
                      <th style={{background:"#b45309",color:C.white,padding:"8px 10px",
                        fontFamily:"'Barlow Condensed',sans-serif",fontSize:12,textTransform:"uppercase",
                        borderRight:`2px solid ${C.navyLight}`}}>Saldo pend.</th>
                      {mesesActivos.map(mes=>(
                        <th key={mes} style={{background:C.navy,color:C.white,padding:"8px 8px",
                          fontFamily:"'Barlow Condensed',sans-serif",fontSize:11,textTransform:"uppercase",
                          minWidth:52,borderRight:`1px solid ${C.navyLight}`}}>
                          {MESES[mes-1].slice(0,3)}
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {jugRep.map((j,idx)=>{
                      const tipo=(tiposCuota||TIPOS_CUOTA_DEFAULT).find(t=>t.id===j.tipo_cuota)||(tiposCuota||TIPOS_CUOTA_DEFAULT)[0];
                      const mesActual=new Date().getMonth()+1;
                      // Saldo pendiente = meses pasados sin pagar
                      const saldo=mesesActivos.filter(mes=>{
                        if(mes>(new Date().getDate()>10 ? new Date().getMonth()+1 : new Date().getMonth())) return false;
                        const plan=planPagos.find(p=>p.mes===mes);
                        if(!plan||plan.monto===0) return false;
                        const monto=Math.round(plan.monto*tipo.porcentaje/100);
                        return monto>0&&!pagos.find(p=>p.jugador_id===j.id&&p.mes===mes);
                      }).reduce((acc,mes)=>{
                        const plan=planPagos.find(p=>p.mes===mes);
                        const monto=Math.round(plan.monto*tipo.porcentaje/100);
                        return acc+monto;
                      },0);

                      return(
                        <tr key={j.id} style={{background:idx%2===0?C.white:"#f8f8f5"}}>
                          <td style={{padding:"7px 10px",fontFamily:"'Barlow Condensed',sans-serif",
                            fontWeight:800,fontSize:14,color:C.navy,textAlign:"center",
                            borderRight:`2px solid ${C.gray}`,borderBottom:`1px solid ${C.gray}`}}>
                            {j.categoria_id}
                          </td>
                          <td style={{padding:"7px 10px",fontFamily:"'Barlow Condensed',sans-serif",
                            fontWeight:700,fontSize:13,color:C.navy,textTransform:"uppercase",
                            borderRight:`2px solid ${C.gray}`,borderBottom:`1px solid ${C.gray}`}}>
                            {j.foto_url&&<img src={j.foto_url} style={{width:22,height:22,borderRadius:"50%",
                              objectFit:"cover",verticalAlign:"middle",marginRight:6}}
                              onError={e=>e.target.style.display="none"}/>}
                            {j.nombre}
                          </td>
                          <td style={{padding:"7px 8px",textAlign:"center",fontSize:11,color:C.grayMid,
                            borderRight:`2px solid ${C.gray}`,borderBottom:`1px solid ${C.gray}`}}>
                            {tipo.nombre.replace("Cuota ","")}
                          </td>
                          <td style={{padding:"7px 8px",textAlign:"center",
                            fontFamily:"'Barlow Condensed',sans-serif",fontWeight:900,fontSize:13,
                            color:saldo>0?"#dc2626":"#16a34a",
                            background:saldo>0?"#fee2e2":"#dcfce7",
                            borderRight:`2px solid ${C.gray}`,borderBottom:`1px solid ${C.gray}`}}>
                            {saldo>0?("$"+saldo.toLocaleString("es-UY")):"✓"}
                          </td>
                          {mesesActivos.map(mes=>{
                            const plan=planPagos.find(p=>p.mes===mes);
                            const monto=plan?Math.round(plan.monto*tipo.porcentaje/100):0;
                            const pago=pagos.find(p=>p.jugador_id===j.id&&p.mes===mes);
                            const futuro=mes>(new Date().getDate()>10 ? new Date().getMonth()+1 : new Date().getMonth());
                            if(monto===0) return(
                              <td key={mes} style={{background:"#f3f4f6",borderRight:`1px solid ${C.gray}`,
                                borderBottom:`1px solid ${C.gray}`}}></td>
                            );
                            if(pago) return(
                              <td key={mes} style={{background:"#dcfce7",color:"#16a34a",
                                fontWeight:700,fontSize:11,textAlign:"center",padding:"4px",
                                borderRight:`1px solid ${C.gray}`,borderBottom:`1px solid ${C.gray}`}}>
                                ✓
                              </td>
                            );
                            if(futuro) return(
                              <td key={mes} style={{background:"#fef9c3",color:"#ca8a04",
                                fontWeight:600,fontSize:10,textAlign:"center",padding:"4px",
                                borderRight:`1px solid ${C.gray}`,borderBottom:`1px solid ${C.gray}`}}>
                                —
                              </td>
                            );
                            return(
                              <td key={mes} style={{background:"#fee2e2",color:"#dc2626",
                                fontWeight:700,fontSize:11,textAlign:"center",padding:"4px",
                                borderRight:`1px solid ${C.gray}`,borderBottom:`1px solid ${C.gray}`}}>
                                ✗
                              </td>
                            );
                          })}
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              );
            })()}
          </div>
        </Modal>
      )}

    </div>
  );
}

/* ══ PLAN PAGOS TAB ═══════════════════════════════════════════════════ */
function PlanPagosTab({ planPagos, onSave, añoActual, tiposCuota, onSaveTipos }) {
  const [montos, setMontos] = useState(
    Object.fromEntries(MESES.map((_,i)=>{
      const mes=i+1;
      const found=planPagos.find(p=>p.mes===mes);
      return [mes, found?String(found.monto):""];
    }))
  );
  const [editTipos, setEditTipos]   = useState(false);
  const [tiposEdit, setTiposEdit]   = useState(tiposCuota);
  const [saving,    setSaving]      = useState(false);
  const [saved,     setSaved]       = useState(false);

  useEffect(()=>{
    setMontos(Object.fromEntries(MESES.map((_,i)=>{
      const mes=i+1;
      const found=planPagos.find(p=>p.mes===mes);
      return [mes, found?String(found.monto):""];
    })));
  },[planPagos]);

  useEffect(()=>{ setTiposEdit(tiposCuota); },[tiposCuota]);

  const mesActual = new Date().getMonth()+1;

  const guardarTodo = async () => {
    setSaving(true);
    // Guardar todos los meses editables (mes >= mesActual)
    for (let mes = mesActual; mes <= 12; mes++) {
      await onSave(mes, montos[mes]||"0");
    }
    setSaving(false); setSaved(true);
    setTimeout(()=>setSaved(false), 2500);
  };

  return (
    <div style={{maxWidth:700}}>
      {/* ── Tipos de cuota ── */}
      <div style={{background:C.white,borderRadius:16,padding:"18px 20px",marginBottom:20,
        border:`2px solid ${C.navy}`}}>
        <div style={{display:"flex",alignItems:"center",justifyContent:"space-between",marginBottom:12}}>
          <div style={{fontFamily:"'Barlow Condensed',sans-serif",fontWeight:900,fontSize:17,
            color:C.navy,textTransform:"uppercase"}}>💳 Tipos de cuota</div>
          <button onClick={()=>{setEditTipos(!editTipos);if(editTipos)setTiposEdit(tiposCuota);}}
            style={{background:editTipos?C.offWhite:`linear-gradient(135deg,${C.navy},${C.navyLight})`,
              color:editTipos?C.navy:C.white,border:`1px solid ${C.navy}`,borderRadius:8,
              padding:"6px 14px",fontFamily:"'Barlow Condensed',sans-serif",fontWeight:700,
              fontSize:12,textTransform:"uppercase",cursor:"pointer"}}>
            {editTipos?"Cancelar":"✏ Editar"}
          </button>
        </div>
        <div style={{display:"grid",gridTemplateColumns:"repeat(2,1fr)",gap:10}}>
          {tiposEdit.map((t,i)=>(
            <div key={t.id} style={{background:C.offWhite,borderRadius:10,padding:"10px 14px",
              border:`1px solid ${C.gray}`}}>
              <div style={{fontFamily:"'Barlow Condensed',sans-serif",fontWeight:700,fontSize:13,
                color:C.navy,marginBottom:6}}>{t.nombre}</div>
              {editTipos ? (
                <div style={{display:"flex",alignItems:"center",gap:6}}>
                  <input type="number" min="0" max="100" value={t.porcentaje}
                    disabled={t.id==="base"}
                    onChange={e=>setTiposEdit(prev=>prev.map((x,j)=>j===i?{...x,porcentaje:parseInt(e.target.value)||0}:x))}
                    style={{flex:1,padding:"6px 10px",border:`1px solid ${C.gray}`,borderRadius:6,
                      fontSize:16,fontWeight:700,color:C.navy,textAlign:"center",
                      background:t.id==="base"?C.gray:C.white}}/>
                  <span style={{fontWeight:700,color:C.grayMid}}>%</span>
                </div>
              ) : (
                <div style={{fontFamily:"'Barlow Condensed',sans-serif",fontWeight:900,fontSize:22,
                  color:t.porcentaje===100?C.green:t.porcentaje===0?"#dc2626":C.amber}}>
                  {t.porcentaje}%
                </div>
              )}
              {t.id==="base"&&<div style={{fontSize:10,color:C.grayMid,marginTop:2}}>Asignado por defecto</div>}
            </div>
          ))}
        </div>
        {editTipos&&(
          <button onClick={()=>{onSaveTipos(tiposEdit);setEditTipos(false);}}
            style={{width:"100%",marginTop:12,padding:"10px",background:`linear-gradient(135deg,${C.green},#15803d)`,
              color:C.white,border:"none",borderRadius:10,fontFamily:"'Barlow Condensed',sans-serif",
              fontWeight:900,fontSize:15,textTransform:"uppercase",cursor:"pointer"}}>
            ✅ Guardar cambios
          </button>
        )}
      </div>

      {/* ── Plan mensual ── */}
      <div style={{fontFamily:"'Barlow Condensed',sans-serif",fontWeight:800,fontSize:16,
        color:C.navy,textTransform:"uppercase",marginBottom:4}}>Plan de Pagos {añoActual}</div>
      <div style={{fontSize:12,color:C.grayMid,marginBottom:14}}>
        Cuota base mensual. Los meses pasados no se pueden editar. Colocá 0 si un mes no tiene cuota.
      </div>
      <div style={{display:"grid",gridTemplateColumns:"repeat(2,1fr)",gap:10}}>
        {MESES.map((m,i)=>{
          const mes=i+1;
          const editable = mes >= mesActual;
          const monto = montos[mes]||"";
          return(
            <div key={mes} style={{background:C.white,borderRadius:12,padding:"12px 14px",
              border:`1px solid ${C.gray}`,opacity:editable?1:.65}}>
              <div style={{fontFamily:"'Barlow Condensed',sans-serif",fontWeight:700,fontSize:13,
                color:C.navy,textTransform:"uppercase",marginBottom:6}}>{m}</div>
              <div style={{display:"flex",gap:8,alignItems:"center"}}>
                <input type="number" min="0" value={monto}
                  disabled={!editable}
                  onChange={e=>setMontos(p=>({...p,[mes]:e.target.value}))}
                  placeholder="$ 0"
                  style={{flex:1,padding:"7px 10px",border:`1px solid ${C.gray}`,borderRadius:8,
                    fontSize:16,fontWeight:700,color:C.navy,outline:"none",
                    background:editable?C.white:C.offWhite}}/>

              </div>
              {!editable&&<div style={{fontSize:10,color:C.grayMid,marginTop:4}}>Mes pasado — no editable</div>}
            </div>
          );
        })}
      </div>

      {/* Botón único guardar todo */}
      <div style={{marginTop:20,display:"flex",gap:12,alignItems:"center"}}>
        <button onClick={guardarTodo} disabled={saving}
          style={{padding:"13px 32px",background:saved?`linear-gradient(135deg,${C.green},#15803d)`:`linear-gradient(135deg,${C.navy},${C.navyLight})`,
            color:C.white,border:"none",borderRadius:12,fontFamily:"'Barlow Condensed',sans-serif",
            fontWeight:900,fontSize:16,textTransform:"uppercase",cursor:"pointer",
            boxShadow:"0 4px 14px rgba(20,28,78,.25)",minWidth:200}}>
          {saving?"⏳ Guardando...":saved?"✅ Guardado":"💾 Guardar plan de pagos"}
        </button>
        <div style={{fontSize:12,color:C.grayMid}}>
          Solo se guardan los meses en curso y futuros (desde {MESES[mesActual-1]})
        </div>
      </div>
    </div>
  );
}

/* ══ CATEGORIAS TAB ═══════════════════════════════════════════════════ */
function CategoriasTab({ categorias, onRefresh }) {
  const [nombre,    setNombre]   = useState("");
  const [saving,    setSaving]   = useState(false);
  const [editando,  setEditando] = useState(null); // {id, nombre}
  const [editNombre,setEditNombre]=useState("");

  const addCat = async () => {
    if (!nombre.trim()) return;
    setSaving(true);
    await sbFetch("baby_categorias","POST",{id:nombre.trim(),org_id:"paysandu",nombre:nombre.trim(),activo:true});
    setNombre(""); setSaving(false); onRefresh();
  };

  const saveCat = async () => {
    if (!editando||!editNombre.trim()) return;
    await sbFetch(`baby_categorias?id=eq.${editando.id}`,"PATCH",{nombre:editNombre.trim()});
    setEditando(null); onRefresh();
  };

  const delCat = async (cat) => {
    // Verificar si tiene jugadores
    const jugs = await sbFetch(`baby_jugadores?categoria_id=eq.${cat.id}&select=id`);
    const cant = (jugs||[]).length;
    const msg = cant>0
      ? `⚠️ La categoría "${cat.nombre}" tiene ${cant} jugador${cant!==1?"es":""} asignado${cant!==1?"s":""}.

Si la eliminás, esos jugadores quedarán sin categoría asignada (no se borrarán).

¿Confirmás la eliminación?`
      : `¿Eliminar la categoría "${cat.nombre}"? No tiene jugadores asignados.`;
    if (!confirm(msg)) return;
    await sbFetch(`baby_categorias?id=eq.${cat.id}`,"DELETE");
    onRefresh();
  };

  return (
    <div style={{maxWidth:560}}>
      <div style={{fontFamily:"'Barlow Condensed',sans-serif",fontWeight:800,fontSize:16,
        color:C.navy,textTransform:"uppercase",marginBottom:12}}>Categorías</div>
      <div style={{display:"flex",gap:8,marginBottom:18}}>
        <input value={nombre} onChange={e=>setNombre(e.target.value)}
          onKeyDown={e=>e.key==="Enter"&&addCat()}
          placeholder="Ej: 2015"
          style={{flex:1,padding:"11px 14px",border:`2px solid ${C.gray}`,borderRadius:10,fontSize:15}}/>
        <button onClick={addCat} disabled={saving||!nombre.trim()}
          style={{padding:"11px 22px",background:`linear-gradient(135deg,${C.navy},${C.navyLight})`,
            color:C.white,border:"none",borderRadius:10,fontFamily:"'Barlow Condensed',sans-serif",
            fontWeight:800,fontSize:15,textTransform:"uppercase",cursor:"pointer"}}>+ Agregar</button>
      </div>
      {categorias.map(c=>(
        <div key={c.id} style={{background:C.white,borderRadius:10,padding:"12px 16px",marginBottom:6,
          border:`1px solid ${C.gray}`}}>
          {editando?.id===c.id ? (
            <div style={{display:"flex",gap:8,alignItems:"center"}}>
              <input value={editNombre} onChange={e=>setEditNombre(e.target.value)}
                onKeyDown={e=>e.key==="Enter"&&saveCat()}
                style={{flex:1,padding:"8px 12px",border:`2px solid ${C.navy}`,borderRadius:8,fontSize:15,fontWeight:700}}/>
              <button onClick={saveCat}
                style={{padding:"8px 14px",background:`linear-gradient(135deg,${C.green},#15803d)`,
                  color:C.white,border:"none",borderRadius:8,fontFamily:"'Barlow Condensed',sans-serif",
                  fontWeight:700,fontSize:13,cursor:"pointer"}}>✓ Guardar</button>
              <button onClick={()=>setEditando(null)}
                style={{padding:"8px 12px",background:C.offWhite,border:`1px solid ${C.gray}`,
                  borderRadius:8,fontFamily:"'Barlow Condensed',sans-serif",fontWeight:700,
                  fontSize:13,cursor:"pointer"}}>Cancelar</button>
            </div>
          ) : (
            <div style={{display:"flex",alignItems:"center",justifyContent:"space-between"}}>
              <div style={{fontFamily:"'Barlow Condensed',sans-serif",fontWeight:800,fontSize:18,
                color:C.navy}}>{c.nombre}</div>
              <div style={{display:"flex",gap:6}}>
                <button onClick={()=>{setEditando(c);setEditNombre(c.nombre);}}
                  style={{padding:"7px 14px",background:`linear-gradient(135deg,${C.navy},${C.navyLight})`,
                    color:C.white,border:"none",borderRadius:8,fontFamily:"'Barlow Condensed',sans-serif",
                    fontWeight:700,fontSize:13,cursor:"pointer",textTransform:"uppercase"}}>✏ Editar</button>
                <button onClick={()=>delCat(c)}
                  style={{padding:"7px 14px",background:"#fff5f5",border:"1px solid #fca5a5",borderRadius:8,
                    fontFamily:"'Barlow Condensed',sans-serif",fontWeight:700,fontSize:13,
                    cursor:"pointer",color:"#dc2626",textTransform:"uppercase"}}>🗑 Eliminar</button>
              </div>
            </div>
          )}
        </div>
      ))}
      <div style={{background:"#fff8e1",borderRadius:10,padding:"12px 14px",marginTop:12,
        border:"1px solid #fde68a",fontSize:12,color:"#92400e"}}>
        ⚠️ Si eliminás una categoría que tiene jugadores asignados, esos jugadores quedarán sin categoría pero no serán eliminados.
      </div>
    </div>
  );
}

/* ══ FORM DELEGADO ════════════════════════════════════════════════════ */
function FormDelegado({ categorias, onSave, onCancel, initialData=null }) {
  const [f, setF] = useState(initialData ? {
    nombre: initialData.nombre||"",
    celular: initialData.celular||"",
    mail: initialData.mail||"",
    pin: initialData.pin||"",
    categorias: initialData.categorias||[],
    foto_url: initialData.foto_url||"",
  } : {nombre:"",celular:"",mail:"",pin:"",categorias:[],foto_url:""});
  const set = (k,v) => setF(p=>({...p,[k]:v}));
  const valid = f.nombre&&f.pin.length===4;
  const esEdicion = !!initialData;

  const toggleCat = (id) => {
    setF(p=>({...p, categorias: p.categorias.includes(id)
      ? p.categorias.filter(c=>c!==id) : [...p.categorias, id]}));
  };

  const handleFotoDel = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = async ev => {
      const compressed = await comprimirImagen(ev.target.result, 400, 0.65);
      set("foto_url", compressed);
    };
    reader.readAsDataURL(file);
  };

  return (
    <div>
      <div style={{background:`linear-gradient(135deg,${C.navyDark},${C.navy})`,padding:"18px 22px",
        display:"flex",alignItems:"center",gap:14}}>
        {f.foto_url&&(
          <img src={f.foto_url} style={{width:44,height:44,borderRadius:"50%",
            objectFit:"cover",border:"2px solid rgba(255,255,255,.4)",flexShrink:0}}
            onError={e=>e.target.style.display="none"}/>
        )}
        <div style={{fontFamily:"'Barlow Condensed',sans-serif",fontWeight:900,fontSize:20,
          color:C.white,textTransform:"uppercase"}}>{esEdicion?"✏️ Editar Delegado":"🏃 Nuevo Delegado"}</div>
      </div>
      <div style={{padding:"20px 22px",maxHeight:"70dvh",overflowY:"auto"}}>
        {/* Foto */}
        <div style={{marginBottom:16}}>
          <label style={{display:"block",fontFamily:"'Barlow Condensed',sans-serif",fontWeight:700,
            fontSize:12,color:C.navy,textTransform:"uppercase",marginBottom:8}}>Foto — opcional</label>
          {f.foto_url&&(
            <div style={{textAlign:"center",marginBottom:10}}>
              <img src={f.foto_url} style={{width:80,height:80,borderRadius:"50%",
                objectFit:"cover",border:`3px solid ${C.navy}`}}
                onError={e=>e.target.style.display="none"}/>
            </div>
          )}
          <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:8,marginBottom:8}}>
            <label style={{display:"flex",flexDirection:"column",alignItems:"center",gap:6,
              padding:"12px 8px",border:`2px dashed ${C.navy}`,borderRadius:10,cursor:"pointer",
              background:"#f0f4ff",textAlign:"center"}}>
              <span style={{fontSize:24}}>📸</span>
              <span style={{fontFamily:"'Barlow Condensed',sans-serif",fontWeight:700,
                fontSize:12,color:C.navy,textTransform:"uppercase"}}>Sacar foto</span>
              <input type="file" accept="image/*" capture="environment"
                style={{display:"none"}} onChange={handleFotoDel}/>
            </label>
            <label style={{display:"flex",flexDirection:"column",alignItems:"center",gap:6,
              padding:"12px 8px",border:`2px dashed ${C.gray}`,borderRadius:10,cursor:"pointer",
              background:C.offWhite,textAlign:"center"}}>
              <span style={{fontSize:24}}>🖼</span>
              <span style={{fontFamily:"'Barlow Condensed',sans-serif",fontWeight:700,
                fontSize:12,color:C.navy,textTransform:"uppercase"}}>Galería</span>
              <input type="file" accept="image/*"
                style={{display:"none"}} onChange={handleFotoDel}/>
            </label>
          </div>
          {f.foto_url&&(
            <button onClick={()=>set("foto_url","")}
              style={{background:"none",border:"none",color:"#dc2626",
                fontSize:11,cursor:"pointer",fontWeight:600}}>✕ Eliminar foto</button>
          )}
        </div>
        {[["nombre","Nombre *"],["celular","Celular"],["mail","Email"]].map(([k,l])=>(
          <div key={k} style={{marginBottom:12}}>
            <label style={{display:"block",fontFamily:"'Barlow Condensed',sans-serif",fontWeight:700,
              fontSize:12,color:C.navy,textTransform:"uppercase",marginBottom:5}}>{l}</label>
            <input value={f[k]} onChange={e=>set(k,e.target.value)}
              style={{width:"100%",padding:"9px 12px",border:`1px solid ${C.gray}`,borderRadius:8,fontSize:14}}/>
          </div>
        ))}
        <div style={{marginBottom:12}}>
          <label style={{display:"block",fontFamily:"'Barlow Condensed',sans-serif",fontWeight:700,
            fontSize:12,color:C.navy,textTransform:"uppercase",marginBottom:5}}>PIN (4 dígitos) *</label>
          <input type="number" maxLength={4} value={f.pin}
            onChange={e=>set("pin",e.target.value.slice(0,4))}
            style={{width:"100%",padding:"9px 12px",border:`1px solid ${C.gray}`,borderRadius:8,fontSize:18,
              fontWeight:700,textAlign:"center",letterSpacing:".2em"}}/>
        </div>
        <div style={{marginBottom:20}}>
          <label style={{display:"block",fontFamily:"'Barlow Condensed',sans-serif",fontWeight:700,
            fontSize:12,color:C.navy,textTransform:"uppercase",marginBottom:8}}>Categorías asignadas</label>
          <div style={{display:"flex",flexWrap:"wrap",gap:6}}>
            {categorias.map(c=>(
              <button key={c.id} onClick={()=>toggleCat(c.id)}
                style={{padding:"5px 12px",borderRadius:16,border:`2px solid ${f.categorias.includes(c.id)?C.navy:C.gray}`,
                  background:f.categorias.includes(c.id)?C.navy:C.white,cursor:"pointer",
                  fontFamily:"'Barlow Condensed',sans-serif",fontWeight:700,fontSize:12,
                  color:f.categorias.includes(c.id)?C.white:C.navy,textTransform:"uppercase"}}>
                {c.nombre}
              </button>
            ))}
          </div>
        </div>
        <div style={{display:"flex",gap:8}}>
          <button onClick={onCancel}
            style={{flex:1,padding:"11px",background:"transparent",color:C.navy,
              border:`2px solid ${C.navy}`,borderRadius:10,fontFamily:"'Barlow Condensed',sans-serif",
              fontWeight:700,fontSize:14,textTransform:"uppercase"}}>Cancelar</button>
          <button onClick={()=>valid&&onSave(f)} disabled={!valid}
            style={{flex:2,padding:"11px",background:valid?`linear-gradient(135deg,${C.navy},${C.navyLight})`:"#e2e2da",
              color:valid?C.white:C.grayMid,border:"none",borderRadius:10,fontFamily:"'Barlow Condensed',sans-serif",
              fontWeight:900,fontSize:15,textTransform:"uppercase"}}>Guardar</button>
        </div>
      </div>
    </div>
  );
}

/* ══ DELEGADO SCREEN ══════════════════════════════════════════════════ */
function DelegadoScreen({ user, onLogout }) {
  const [tab,         setTab]       = useState("planteles");
  const [categorias,  setCat]       = useState([]);
  const [jugadores,   setJug]       = useState([]);
  const [pendientes,  setPend]      = useState([]);
  const [planPagos,   setPlan]      = useState([]);
  const [filtCat,     setFiltCat]   = useState("todos");
  const [modal,       setModal]     = useState(null);
  const [selJugador,  setSelJug]    = useState(null);
  const [loading,     setLoading]   = useState(true);
  const misCategs = user.categorias||[];
  const añoActual = new Date().getFullYear();

  useEffect(()=>{
    const load = async () => {
      setLoading(true);
      const [cats,jugs,pends,plan] = await Promise.all([
        sbFetch("baby_categorias?select=*&order=nombre.asc"),
        sbFetch("baby_jugadores?select=*&order=nombre.asc"),
        sbFetch("baby_formularios_pendientes?select=*&order=created_at.desc"),
        sbFetch(`baby_plan_pagos?año=eq.${añoActual}&select=*`),
      ]);
      const catsFilt = (cats||[]).filter(c=>misCategs.length===0||misCategs.includes(c.id));
      setCat(catsFilt);
      const jugFilt = (jugs||[]).filter(j=>misCategs.length===0||misCategs.includes(j.categoria_id));
      setJug(jugFilt);
      setPend(pends||[]);
      setPlan(plan||[]);
      setLoading(false);
    };
    load();
  },[]);

  const jugFiltrados = filtCat==="todos"?jugadores:jugadores.filter(j=>j.categoria_id===filtCat);

  const saveJugador = async (data) => {
    if (selJugador) {
      const {pagos:_,...rest}=data;
      await sbFetch(`baby_jugadores?id=eq.${selJugador.id}`,"PATCH",rest);
    } else {
      await sbFetch("baby_jugadores","POST",{
        ...data, id:uid(), org_id:"paysandu", estado:"activo",
        pendiente_validacion:false, created_at:new Date().toISOString(),
      });
    }
    setModal(null); setSelJug(null);
    const jugs = await sbFetch("baby_jugadores?select=*&order=nombre.asc");
    setJug((jugs||[]).filter(j=>misCategs.length===0||misCategs.includes(j.categoria_id)));
  };

  const validarPend = async (p) => {
    const datos = typeof p.datos_json==="string"?JSON.parse(p.datos_json):p.datos_json;
    const { foto_url, tipo_cuota, ...resto } = datos;
    const jugador = {
      ...resto,
      foto_url: foto_url || "",
      tipo_cuota: tipo_cuota || "base",
      id: uid(), org_id:"paysandu", estado:"activo",
      pendiente_validacion:false, created_at:new Date().toISOString(),
    };
    const res = await sbFetch("baby_jugadores","POST",jugador);
    if (!res) {
      await sbFetch("baby_jugadores","POST",{...jugador, foto_url:""});
    }
    await sbFetch(`baby_formularios_pendientes?id=eq.${p.id}`,"DELETE");
    setPend(prev=>prev.filter(x=>x.id!==p.id));
    const jugs = await sbFetch("baby_jugadores?select=*&order=nombre.asc");
    setJug((jugs||[]).filter(j=>misCategs.length===0||misCategs.includes(j.categoria_id)));
  };

  useEffect(()=>{
    document.body.classList.add("needs-landscape");
    return ()=>document.body.classList.remove("needs-landscape");
  },[]);

  return (
    <div style={{minHeight:"100dvh",background:C.offWhite,display:"flex",flexDirection:"column"}}>
      <div className="app-header" style={{background:`linear-gradient(135deg,${C.navyDark},${C.navy})`,padding:"12px 18px"}}>
        <div style={{display:"flex",alignItems:"center",gap:10}}>
          <ClubLogo size={44}/>
          <div style={{flex:1}}>
            <div style={{fontFamily:"'Barlow Condensed',sans-serif",fontWeight:900,fontSize:16,
              color:C.white,textTransform:"uppercase"}}>Delegado — {user.nombre}</div>
            <div style={{color:C.lilac,fontSize:11}}>
              {misCategs.length>0?`Categorías: ${misCategs.join(", ")}`:"Todas las categorías"}
            </div>
          </div>
          <button onClick={onLogout} style={{background:"rgba(255,255,255,.1)",border:"none",
            borderRadius:8,padding:"7px 12px",color:C.white,fontFamily:"'Barlow Condensed',sans-serif",
            fontWeight:700,fontSize:12,textTransform:"uppercase"}}>Salir</button>
        </div>
      </div>

      {/* Layout sidebar + contenido igual que admin */}
      <div className="admin-layout" style={{flex:1,display:"flex",overflow:"hidden"}}>
        {/* Sidebar */}
        <div className="admin-sidebar" style={{width:200,background:C.white,borderRight:`2px solid ${C.gray}`,
          padding:"20px 14px",flexShrink:0,overflowY:"auto"}}>
          <div className="sidebar-grid-admin" style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:14}}>
            {[["planteles","⚽","Planteles"],["pendientes","⏳","Pendientes"]].map(([id,icon,lbl])=>{
              const active=tab===id;
              const hasBadge=id==="pendientes"&&pendientes.length>0;
              return(
                <button key={id} onClick={()=>setTab(id)}
                  style={{
                    background:active?`linear-gradient(135deg,${C.navy},${C.navyLight})`:C.offWhite,
                    color:active?C.white:C.navy,
                    border:`2px solid ${active?C.navy:C.gray}`,
                    borderRadius:16,padding:"10px 8px",
                    fontFamily:"'Barlow Condensed',sans-serif",fontWeight:900,
                    textTransform:"uppercase",
                    boxShadow:active?"0 6px 18px rgba(20,28,78,.3)":"none",
                    transition:"all .12s",display:"flex",flexDirection:"column",
                    alignItems:"center",justifyContent:"center",gap:8,
                    cursor:"pointer",aspectRatio:"1",position:"relative"}}>
                  {hasBadge&&<span style={{position:"absolute",top:7,right:7,
                    background:C.red,color:C.white,borderRadius:"50%",width:19,height:19,
                    fontSize:10,fontWeight:900,display:"flex",alignItems:"center",
                    justifyContent:"center",lineHeight:1}}>{badgeCount}</span>}
                  <span style={{fontSize:32,lineHeight:1}}>{icon}</span>
                  <span style={{fontSize:11,fontWeight:800,textAlign:"center",lineHeight:1.2}}>{lbl}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Contenido */}
        <div style={{flex:1,overflowY:"auto",padding:18,paddingBottom:80,minWidth:0}}>
        {loading&&<div style={{textAlign:"center",padding:"40px 0",color:C.grayMid}}>⏳ Cargando...</div>}

        {!loading&&tab==="planteles"&&(
          <div>
            <div style={{display:"flex",gap:10,marginBottom:12,alignItems:"flex-start",flexWrap:"wrap"}}>
              <button onClick={()=>{setSelJug(null);setModal("form");}}
                className="toolbar-bq" style={{width:110,height:80,background:`linear-gradient(135deg,${C.navy},${C.navyLight})`,
                  color:C.white,border:"none",borderRadius:12,
                  fontFamily:"'Barlow Condensed',sans-serif",fontWeight:900,fontSize:12,
                  textTransform:"uppercase",cursor:"pointer",display:"flex",flexDirection:"column",
                  alignItems:"center",justifyContent:"center",gap:6,
                  boxShadow:"0 4px 12px rgba(20,28,78,.25)"}}>
                <span style={{fontSize:24}}>➕</span>Nuevo jugador
              </button>
              <button onClick={()=>{
                  const base=window.location.origin;
                  const link=`${base}?form=jugador&org=paysandu`;
                  const msg = "Acceso a Alta de Jugadores - Paysandú FC - Baby Fútbol\n" + link;
                  navigator.clipboard?.writeText(msg).then(()=>{
                    alert("✅ Enlace de alta copiado. Incluye el título y el link. Pegalo en WhatsApp o email.");
                  });
                }}
                style={{width:110,height:80,background:C.offWhite,color:C.navy,
                  border:`2px solid ${C.navy}`,borderRadius:12,
                  fontFamily:"'Barlow Condensed',sans-serif",fontWeight:900,fontSize:12,
                  textTransform:"uppercase",cursor:"pointer",display:"flex",flexDirection:"column",
                  alignItems:"center",justifyContent:"center",gap:6,lineHeight:1.2,textAlign:"center"}}>
                <span style={{fontSize:24}}>📋</span>Crear acceso alta
              </button>

            </div>
            {/* Filtros categoría */}
            <div style={{display:"flex",gap:6,flexWrap:"wrap",marginBottom:10}}>
              {["todos",...categorias.map(c=>c.id)].map(cid=>(
                <button key={cid} onClick={()=>setFiltCat(cid)}
                  style={{background:filtCat===cid?C.navy:C.white,color:filtCat===cid?C.white:C.navy,
                    border:`2px solid ${filtCat===cid?C.navy:C.gray}`,borderRadius:20,
                    padding:"6px 14px",fontFamily:"'Barlow Condensed',sans-serif",fontWeight:700,
                    fontSize:12,textTransform:"uppercase",cursor:"pointer"}}>
                  {cid==="todos"?"Todos":cid}
                </button>
              ))}
            </div>
            {/* Tabla delegado planteles — maxWidth fijo */}
            <div className="tw-scroll" style={{maxWidth:560}}>
            {/* Header tabla */}
            <div style={{display:"grid",gridTemplateColumns:"260px 65px 95px 160px",gap:0,
              padding:"9px 14px",background:C.navy,borderRadius:"12px 12px 0 0",alignItems:"center"}}>
              {["Nombre","Cat.","Nacimiento","Acciones"].map((h,i)=>(
                <div key={i} style={{fontFamily:"'Barlow Condensed',sans-serif",fontWeight:800,
                  fontSize:12,color:C.white,textTransform:"uppercase",
                  textAlign:i>=2?"center":"left",padding:"0 4px"}}>{h}</div>
              ))}
            </div>
            {jugFiltrados.map((j,idx)=>(
              <div key={j.id} style={{display:"grid",
                gridTemplateColumns:"260px 65px 95px 160px",gap:0,
                alignItems:"center",padding:"8px 14px",
                background:idx%2===0?C.white:"#f8f8f5",
                borderLeft:`1px solid ${C.gray}`,borderRight:`1px solid ${C.gray}`,
                borderBottom:`1px solid ${C.gray}`,
                borderRadius:idx===jugFiltrados.length-1?"0 0 12px 12px":"0"}}>
                {/* Nombre */}
                <div style={{display:"flex",alignItems:"center",gap:8,minWidth:0}}>
                  {j.foto_url
                    ? <img src={j.foto_url} style={{width:34,height:34,borderRadius:"50%",
                        objectFit:"cover",border:`2px solid ${C.navy}`,flexShrink:0}}
                        onError={e=>e.target.style.display="none"}/>
                    : <div style={{width:34,height:34,borderRadius:"50%",flexShrink:0,
                        background:"linear-gradient(135deg,#c9d4f0,#a8b8e8)",
                        border:"2px solid #c0cce8",display:"flex",alignItems:"center",
                        justifyContent:"center",overflow:"hidden"}}>
                        <svg viewBox="0 0 24 24" width="24" height="24"><circle cx="12" cy="8" r="4" fill="#6b7db3"/><path d="M4 20c0-4 3.6-7 8-7s8 3 8 7" fill="#6b7db3"/></svg>
                      </div>
                  }
                  <div style={{minWidth:0}}>
                    <div style={{fontFamily:"'Barlow Condensed',sans-serif",fontWeight:800,fontSize:14,
                      color:C.navy,textTransform:"uppercase",overflow:"hidden",
                      textOverflow:"ellipsis",whiteSpace:"nowrap"}}>{j.nombre}</div>
                    <div style={{fontSize:10,color:C.grayMid}}>{j.celular}</div>
                  </div>
                </div>
                {/* Cat */}
                <div style={{fontFamily:"'Barlow Condensed',sans-serif",fontWeight:800,fontSize:16,
                  color:C.navy,textAlign:"center"}}>{j.categoria_id}</div>
                {/* Nacimiento */}
                <div style={{fontSize:13,fontFamily:"'Barlow Condensed',sans-serif",
                  fontWeight:700,color:"#1a1a1a",textAlign:"center"}}>{j.fecha_nacimiento||"-"}</div>
                {/* Acciones */}
                <div style={{display:"flex",gap:4,justifyContent:"center",alignItems:"center"}}>
                  <button onClick={()=>{
                      const link=window.location.origin+"?id="+j.id;
                      const msg=j.nombre+" (Cat."+j.categoria_id+") - Link de pago: "+link;
                      navigator.clipboard?.writeText(msg).then(()=>{
                        alert("✅ Link de pago copiado para "+j.nombre);
                      });
                    }}
                    title="Link de pago"
                    style={{width:30,height:30,padding:0,background:`linear-gradient(135deg,${C.green},#15803d)`,
                      color:C.white,border:"none",borderRadius:7,fontSize:14,cursor:"pointer",
                      display:"flex",alignItems:"center",justifyContent:"center"}}>🔗</button>
                  <button onClick={()=>{setSelJug(j);setModal("ficha");}}
                    title="Ver ficha"
                    style={{width:30,height:30,padding:0,background:C.offWhite,border:`1px solid ${C.gray}`,
                      borderRadius:7,fontSize:13,cursor:"pointer",color:C.navy,
                      display:"flex",alignItems:"center",justifyContent:"center"}}>👤</button>
                  <button onClick={()=>{setSelJug(j);setModal("form");}}
                    title="Editar"
                    style={{width:30,height:30,padding:0,background:`linear-gradient(135deg,${C.navy},${C.navyLight})`,
                      color:C.white,border:"none",borderRadius:7,fontSize:13,cursor:"pointer",
                      display:"flex",alignItems:"center",justifyContent:"center"}}>✏️</button>
                  <button onClick={async()=>{
                      if(!confirm("¿Eliminar jugador?")) return;
                      await sbFetch(`baby_pagos?jugador_id=eq.${j.id}`,"DELETE");
                      await sbFetch(`baby_jugadores?id=eq.${j.id}`,"DELETE");
                      const jugs=await sbFetch("baby_jugadores?select=*&order=nombre.asc");
                      setJug((jugs||[]).filter(x=>misCategs.length===0||misCategs.includes(x.categoria_id)));
                    }}
                    title="Eliminar"
                    style={{width:30,height:30,padding:0,background:"#fff5f5",border:"1px solid #fca5a5",
                      borderRadius:7,fontSize:13,cursor:"pointer",color:"#dc2626",
                      display:"flex",alignItems:"center",justifyContent:"center"}}>🗑</button>
                </div>
              </div>
            ))}
            </div>{/* fin tabla delegado planteles */}
          </div>
        )}

        {!loading&&tab==="pendientes"&&(
          <div>
            <div style={{fontFamily:"'Barlow Condensed',sans-serif",fontWeight:900,fontSize:16,
              color:C.navy,textTransform:"uppercase",marginBottom:12}}>
              ⏳ Altas pendientes
              {pendientes.filter(p=>{const d=typeof p.datos_json==="string"?JSON.parse(p.datos_json):p.datos_json;return misCategs.length===0||misCategs.includes(d.categoria_id);}).length > 0 &&
                <span style={{background:C.gold,color:C.navyDark,borderRadius:20,padding:"2px 10px",
                  fontSize:13,fontWeight:900,marginLeft:8}}>
                  {pendientes.filter(p=>{const d=typeof p.datos_json==="string"?JSON.parse(p.datos_json):p.datos_json;return misCategs.length===0||misCategs.includes(d.categoria_id);}).length}
                </span>
              }
            </div>
            {/* Header tabla */}
            <div style={{display:"grid",gridTemplateColumns:"260px 65px 110px 95px 105px",gap:0,
              padding:"9px 14px",background:C.navy,borderRadius:"12px 12px 0 0",alignItems:"center"}}>
              {["Nombre","Cat.","Celular","Nacimiento","Acciones"].map((h,i)=>(
                <div key={i} style={{fontFamily:"'Barlow Condensed',sans-serif",fontWeight:800,
                  fontSize:12,color:C.white,textTransform:"uppercase",
                  textAlign:i>=4?"center":"left",padding:"0 4px"}}>{h}</div>
              ))}
            </div>
            {pendientes.filter(p=>{
              const datos=typeof p.datos_json==="string"?JSON.parse(p.datos_json):p.datos_json;
              return misCategs.length===0||misCategs.includes(datos.categoria_id);
            }).map((p,idx,arr)=>{
              const datos=typeof p.datos_json==="string"?JSON.parse(p.datos_json):p.datos_json;
              return(
                <div key={p.id} style={{display:"grid",
                  gridTemplateColumns:"260px 65px 110px 95px 105px",gap:0,
                  alignItems:"center",padding:"10px 14px",
                  background:idx%2===0?"#fffbeb":"#fff8e1",
                  borderLeft:`2px solid ${C.gold}`,borderRight:`2px solid ${C.gold}`,
                  borderBottom:`1px solid #fde68a`,
                  borderRadius:idx===arr.length-1?"0 0 12px 12px":"0"}}>
                  <div>
                    <div style={{fontFamily:"'Barlow Condensed',sans-serif",fontWeight:800,
                      fontSize:14,color:C.navy,textTransform:"uppercase"}}>{datos.nombre}</div>
                    {datos.ci&&<div style={{fontSize:10,color:C.grayMid}}>CI {datos.ci}</div>}
                  </div>
                  <div style={{fontFamily:"'Barlow Condensed',sans-serif",fontWeight:800,
                    fontSize:16,color:C.navy,textAlign:"center"}}>{datos.categoria_id||"-"}</div>
                  <div style={{fontSize:12,color:C.navy}}>{datos.celular||"-"}</div>
                  <div style={{fontSize:13,fontFamily:"'Barlow Condensed',sans-serif",
                    fontWeight:700,color:"#1a1a1a",textAlign:"center"}}>{datos.fecha_nacimiento||"-"}</div>
                  <div style={{display:"flex",gap:4,justifyContent:"center"}}>
                    <button onClick={()=>validarPend(p)}
                      style={{padding:"6px 12px",background:`linear-gradient(135deg,${C.green},#15803d)`,
                        color:C.white,border:"none",borderRadius:7,fontFamily:"'Barlow Condensed',sans-serif",
                        fontWeight:800,fontSize:12,cursor:"pointer",textTransform:"uppercase",
                        whiteSpace:"nowrap"}}>✅ Validar</button>
                  </div>
                </div>
              );
            })}
            {pendientes.filter(p=>{const d=typeof p.datos_json==="string"?JSON.parse(p.datos_json):p.datos_json;return misCategs.length===0||misCategs.includes(d.categoria_id);}).length===0&&(
              <div style={{textAlign:"center",padding:"30px 0",color:C.grayMid,fontSize:13}}>Sin pendientes</div>
            )}
          </div>
        )}
        </div>{/* fin contenido delegado */}
      </div>{/* fin layout sidebar+contenido delegado */}

      {/* MOBILE BOTTOM NAV DELEGADO */}
      <div className="mobile-bottom-nav" style={{display:"none"}}>
        {[["planteles","⚽","Planteles"],["pendientes","⏳","Pendientes"]].map(([id,icon,lbl])=>{
          const active=tab===id;
          const hasBadge=id==="pendientes"&&pendientes.length>0;
          return(
            <button key={id} onClick={()=>setTab(id)} className={active?"active":""}>
              {hasBadge&&<span className="mnav-badge">{pendientes.length}</span>}
              <span className="mnav-icon">{icon}</span>
              <span>{lbl}</span>
            </button>
          );
        })}
      </div>

      {modal==="form"&&(
        <Modal onClose={()=>{setModal(null);setSelJug(null);}}>
          <FormAltaJugador categorias={categorias} initialData={selJugador}
            onSave={saveJugador} onCancel={()=>{setModal(null);setSelJug(null);}}
            showTipoCuota={false}/>
        </Modal>
      )}
      {modal==="ficha"&&selJugador&&(
        <Modal onClose={()=>{setModal(null);setSelJug(null);}}>
          <FormAltaJugador categorias={categorias} initialData={selJugador}
            onSave={()=>{}} onCancel={()=>{setModal(null);setSelJug(null);}}
            showTipoCuota={false} readOnly={true}/>
        </Modal>
      )}
    </div>
  );
}

/* ══ APP ROOT ═════════════════════════════════════════════════════════ */
/* ══ ROTATE OVERLAY COMPONENT ════════════════════════════════════════ */
function RotateOverlay() {
  return (
    <div id="rotate-overlay">
      <div className="ri">📱</div>
      <div className="rm">Girá la pantalla</div>
      <div className="rs">Este sistema funciona mejor en modo horizontal</div>
    </div>
  );
}

export default function App() {
  const [currentUser, setCurrentUser] = useState(null);
  const [autoLoading, setAutoLoading] = useState(false);

  const params = new URLSearchParams(window.location.search);
  const formType = params.get("form");
  const directId  = params.get("id"); // link directo ?id=XXXXXX

  // Acceso directo con link de jugador
  useEffect(()=>{
    if (directId && !currentUser) {
      setAutoLoading(true);
      sbFetch(`baby_jugadores?id=eq.${directId.toUpperCase()}&select=*`).then(data=>{
        setAutoLoading(false);
        if (data && data.length > 0) {
          setCurrentUser({role:"publico", jugador:data[0]});
          // Limpiar URL para no recargar
          window.history.replaceState({}, "", window.location.pathname);
        }
      });
    }
  },[directId]);

  if (formType === "jugador") {
    return (
      <>
        <GlobalStyle/>
        <RotateOverlay/>
        <FormularioPublico tipo={formType} org={params.get("org")||"paysandu"}/>
      </>
    );
  }
  if (formType === "delegado") {
    return (
      <>
        <GlobalStyle/>
        <RotateOverlay/>
        <FormularioDelegado org={params.get("org")||"paysandu"}/>
      </>
    );
  }

  if (autoLoading) {
    return (
      <>
        <GlobalStyle/>
        <RotateOverlay/>
        <div style={{minHeight:"100dvh",background:`linear-gradient(160deg,${C.navyDark},${C.navy})`,
          display:"flex",alignItems:"center",justifyContent:"center",flexDirection:"column",gap:16}}>
          <ClubLogo size={64}/>
          <div style={{fontFamily:"'Barlow Condensed',sans-serif",fontWeight:700,fontSize:18,
            color:"rgba(255,255,255,.7)"}}>Cargando ficha...</div>
        </div>
      </>
    );
  }

  if (!currentUser) {
    return (
      <>
        <GlobalStyle/>
        <RotateOverlay/>
        <LoginScreen onLogin={setCurrentUser}/>
      </>
    );
  }

  return (
    <>
      <GlobalStyle/>
      <RotateOverlay/>
      <div id="app-root">
      {currentUser.role==="admin"    && <AdminScreen    user={currentUser} onLogout={()=>setCurrentUser(null)}/>}
      {currentUser.role==="delegado" && <DelegadoScreen user={currentUser} onLogout={()=>setCurrentUser(null)}/>}
      {currentUser.role==="publico"  && <PublicoView    user={currentUser} onLogout={()=>setCurrentUser(null)}/>}
      </div>
    </>
  );
}


/* ══ FORMULARIO DELEGADO (via link externo) ══════════════════════════ */
function FormularioDelegado({ org }) {
  const [f, setF] = useState({nombre:"",celular:"",mail:"",pin:"",categorias:[],foto_url:""});
  const [cats, setCats] = useState([]);
  const [sent, setSent] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(()=>{
    sbFetch("baby_categorias?select=*&order=nombre.asc").then(d=>setCats(d||[]));
  },[]);

  const set = (k,v) => setF(p=>({...p,[k]:v}));
  const toggleCat = (id) => setF(p=>({...p,
    categorias: p.categorias.includes(id) ? p.categorias.filter(c=>c!==id) : [...p.categorias,id]
  }));
  const valid = f.nombre && f.pin.length===4;

  const handleFotoFormDel = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = async ev => {
      const compressed = await comprimirImagen(ev.target.result, 400, 0.65);
      set("foto_url", compressed);
    };
    reader.readAsDataURL(file);
  };

  const enviar = async () => {
    if (!valid) return;
    setLoading(true);
    // Guardar directamente en baby_delegados_pendientes o en baby_delegados inactivo
    // Separar foto del JSON para evitar límite de tamaño
    const { foto_url: fotoDelForm, ...fSinFoto } = f;
    await sbFetch("baby_formularios_pendientes","POST",{
      id:uid(), org_id:org,
      datos_json: JSON.stringify({...fSinFoto, _tipo:"delegado"}),
      foto_url: fotoDelForm||"",
      created_at: new Date().toISOString(),
    });
    setSent(true);
    setLoading(false);
  };

  if (sent) return (
    <div style={{minHeight:"100dvh",background:`linear-gradient(160deg,${C.navyDark},${C.navy})`,
      display:"flex",alignItems:"center",justifyContent:"center",padding:20}}>
      <div style={{background:C.white,borderRadius:24,padding:"40px 28px",maxWidth:380,width:"100%",
        textAlign:"center",boxShadow:"0 32px 80px rgba(20,28,78,.5)"}}>
        <ClubLogo size={56}/>
        <div style={{fontSize:52,margin:"16px 0"}}>✅</div>
        <h2 style={{fontFamily:"'Barlow Condensed',sans-serif",fontWeight:900,fontSize:24,
          color:C.navy,textTransform:"uppercase",marginBottom:10}}>¡Solicitud enviada!</h2>
        <p style={{color:C.grayMid,fontSize:14,lineHeight:1.6}}>
          Tu solicitud de registro fue recibida. El administrador la revisará y te confirmará el acceso.
        </p>
      </div>
    </div>
  );

  return (
    <div style={{minHeight:"100dvh",background:`linear-gradient(160deg,${C.navyDark},${C.navy})`,padding:20,paddingBottom:40}}>
      <div style={{maxWidth:480,margin:"0 auto"}}>
        <div style={{textAlign:"center",marginBottom:24}}>
          <ClubLogo size={90}/>
          <h1 style={{fontFamily:"'Barlow Condensed',sans-serif",fontSize:28,fontWeight:900,
            color:C.white,textTransform:"uppercase",marginTop:14,lineHeight:1.1}}>Paysandú FC</h1>
          <div style={{color:C.gold,fontFamily:"'Barlow Condensed',sans-serif",fontSize:20,fontWeight:700,
            textTransform:"uppercase",letterSpacing:".08em",marginTop:4}}>Baby Fútbol</div>
          <div style={{color:"rgba(255,255,255,.7)",fontSize:14,marginTop:6,
            fontFamily:"'Barlow Condensed',sans-serif",fontWeight:600}}>
            Registro de Delegado
          </div>
        </div>
        <div style={{background:C.white,borderRadius:20,padding:"24px 22px",
          boxShadow:"0 24px 64px rgba(20,28,78,.4)"}}>

          {/* FOTO */}
          <div style={{marginBottom:18}}>
            <label style={{display:"block",fontFamily:"'Barlow Condensed',sans-serif",fontWeight:700,
              fontSize:12,color:C.navy,textTransform:"uppercase",marginBottom:8}}>
              Foto — opcional
            </label>
            {f.foto_url&&(
              <div style={{textAlign:"center",marginBottom:10}}>
                <img src={f.foto_url} style={{width:86,height:86,borderRadius:"50%",
                  objectFit:"cover",border:`3px solid ${C.navy}`}}/>
              </div>
            )}
            <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:8,marginBottom:6}}>
              <label style={{display:"flex",flexDirection:"column",alignItems:"center",gap:6,
                padding:"14px 8px",border:`2px dashed ${C.navy}`,borderRadius:12,
                cursor:"pointer",background:"#f0f4ff",textAlign:"center"}}>
                <span style={{fontSize:28}}>📸</span>
                <span style={{fontFamily:"'Barlow Condensed',sans-serif",fontWeight:700,
                  fontSize:13,color:C.navy,textTransform:"uppercase"}}>Sacar foto</span>
                <span style={{fontSize:10,color:C.grayMid}}>Abre la cámara</span>
                <input type="file" accept="image/*" capture="environment"
                  style={{display:"none"}} onChange={handleFotoFormDel}/>
              </label>
              <label style={{display:"flex",flexDirection:"column",alignItems:"center",gap:6,
                padding:"14px 8px",border:`2px dashed ${C.gray}`,borderRadius:12,
                cursor:"pointer",background:C.offWhite,textAlign:"center"}}>
                <span style={{fontSize:28}}>🖼</span>
                <span style={{fontFamily:"'Barlow Condensed',sans-serif",fontWeight:700,
                  fontSize:13,color:C.navy,textTransform:"uppercase"}}>Galería</span>
                <span style={{fontSize:10,color:C.grayMid}}>Elegir imagen</span>
                <input type="file" accept="image/*"
                  style={{display:"none"}} onChange={handleFotoFormDel}/>
              </label>
            </div>
            {f.foto_url&&(
              <button onClick={()=>set("foto_url","")}
                style={{background:"none",border:"none",color:"#dc2626",
                  fontSize:12,cursor:"pointer",fontWeight:600}}>✕ Eliminar foto</button>
            )}
          </div>

          {[["nombre","Nombre completo *","text"],["celular","Celular *","tel"],["mail","Email","email"]].map(([k,l,t])=>(
            <div key={k} style={{marginBottom:14}}>
              <label style={{display:"block",fontFamily:"'Barlow Condensed',sans-serif",fontWeight:700,
                fontSize:12,color:C.navy,textTransform:"uppercase",marginBottom:5}}>{l}</label>
              <input type={t} value={f[k]||""} onChange={e=>set(k,e.target.value)}
                style={{width:"100%",padding:"10px 14px",border:`1px solid ${C.gray}`,
                  borderRadius:10,fontSize:14,outline:"none"}}/>
            </div>
          ))}
          <div style={{marginBottom:16}}>
            <label style={{display:"block",fontFamily:"'Barlow Condensed',sans-serif",fontWeight:700,
              fontSize:12,color:C.navy,textTransform:"uppercase",marginBottom:8}}>PIN de 4 dígitos *</label>
            <input type="number" value={f.pin} onChange={e=>set("pin",e.target.value.slice(0,4))}
              placeholder="Elegí un PIN de 4 números"
              style={{width:"100%",padding:"12px 14px",border:`1px solid ${C.gray}`,borderRadius:10,
                fontSize:22,fontWeight:900,textAlign:"center",letterSpacing:".2em",outline:"none"}}/>
            <div style={{fontSize:11,color:C.grayMid,marginTop:4}}>Este será tu código de acceso al sistema</div>
          </div>
          <div style={{marginBottom:20}}>
            <label style={{display:"block",fontFamily:"'Barlow Condensed',sans-serif",fontWeight:700,
              fontSize:12,color:C.navy,textTransform:"uppercase",marginBottom:8}}>
              Categorías a cargo (opcional)
            </label>
            <div style={{display:"flex",flexWrap:"wrap",gap:6}}>
              {cats.map(c=>(
                <button key={c.id} type="button" onClick={()=>toggleCat(c.id)}
                  style={{padding:"6px 14px",borderRadius:16,
                    border:`2px solid ${f.categorias.includes(c.id)?C.navy:C.gray}`,
                    background:f.categorias.includes(c.id)?C.navy:C.white,cursor:"pointer",
                    fontFamily:"'Barlow Condensed',sans-serif",fontWeight:700,fontSize:13,
                    color:f.categorias.includes(c.id)?C.white:C.navy,textTransform:"uppercase"}}>
                  {c.nombre}
                </button>
              ))}
            </div>
          </div>
          <button onClick={enviar} disabled={!valid||loading}
            style={{width:"100%",padding:"14px",background:valid?`linear-gradient(135deg,${C.green},#15803d)`:"#e2e2da",
              color:valid?C.white:C.grayMid,border:"none",borderRadius:12,fontFamily:"'Barlow Condensed',sans-serif",
              fontWeight:900,fontSize:17,textTransform:"uppercase"}}>
            {loading?"Enviando...":"✅ Enviar solicitud"}
          </button>
        </div>
      </div>
    </div>
  );
}

/* ══ FORMULARIO PÚBLICO (via QR/link) ════════════════════════════════ */
function FormularioPublico({ tipo, org }) {
  const [f, setF] = useState({nombre:"",celular:"",mail:"",ci:"",categoria_id:"",
    fecha_nacimiento:"",numero_camiseta:"",direccion:"",foto_url:"",tipo_cuota:"base"});
  const [categorias, setCat]   = useState([]);
  const [sent,       setSent]  = useState(false);
  const [loading,    setLoading]= useState(false);

  useEffect(()=>{
    sbFetch("baby_categorias?select=*&order=nombre.asc").then(d=>setCat(d||[]));
  },[]);

  const set = (k,v) => setF(p=>({...p,[k]:v}));
  const valid = f.nombre&&f.celular&&f.categoria_id&&f.fecha_nacimiento;

  const handleFoto = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = async ev => {
      const compressed = await comprimirImagen(ev.target.result, 400, 0.65);
      set("foto_url", compressed);
    };
    reader.readAsDataURL(file);
  };

  const enviar = async () => {
    if (!valid) return;
    setLoading(true);
    // Separar foto del JSON para evitar límite de tamaño
    const { foto_url: fotoJugForm, ...fJugSinFoto } = f;
    await sbFetch("baby_formularios_pendientes","POST",{
      id:uid(), org_id:org,
      datos_json: JSON.stringify(fJugSinFoto),
      foto_url: fotoJugForm||"",
      created_at: new Date().toISOString(),
    });
    setSent(true);
    setLoading(false);
  };

  if (sent) return (
    <div style={{minHeight:"100dvh",background:`linear-gradient(160deg,${C.navyDark},${C.navy})`,
      display:"flex",alignItems:"center",justifyContent:"center",padding:20}}>
      <div className="fi pop" style={{background:C.white,borderRadius:24,padding:"40px 28px",
        maxWidth:380,width:"100%",textAlign:"center",boxShadow:"0 32px 80px rgba(20,28,78,.5)"}}>
        <div style={{fontSize:64,marginBottom:16}}>✅</div>
        <h2 style={{fontFamily:"'Barlow Condensed',sans-serif",fontWeight:900,fontSize:26,
          color:C.navy,textTransform:"uppercase",marginBottom:12}}>¡Formulario enviado!</h2>
        <p style={{color:C.grayMid,fontSize:14,lineHeight:1.6}}>
          Tu solicitud fue recibida. Un delegado la revisará y te confirmará el alta.
        </p>
      </div>
    </div>
  );

  return (
    <div style={{minHeight:"100dvh",background:`linear-gradient(160deg,${C.navyDark},${C.navy})`,padding:20,paddingBottom:40}}>
      <div style={{maxWidth:480,margin:"0 auto"}}>
        <div style={{textAlign:"center",marginBottom:24}}>
          <ClubLogo size={90}/>
          <h1 style={{fontFamily:"'Barlow Condensed',sans-serif",fontSize:28,fontWeight:900,
            color:C.white,textTransform:"uppercase",marginTop:14,lineHeight:1.1}}>Paysandú FC</h1>
          <div style={{color:C.gold,fontFamily:"'Barlow Condensed',sans-serif",fontSize:20,fontWeight:700,
            textTransform:"uppercase",letterSpacing:".08em",marginTop:4}}>Baby Fútbol</div>
          <div style={{color:"rgba(255,255,255,.7)",fontSize:14,marginTop:6,
            fontFamily:"'Barlow Condensed',sans-serif",fontWeight:600}}>
            Acceso a Alta de Jugadores
          </div>
        </div>
        <div className="fi" style={{background:C.white,borderRadius:20,padding:"24px 22px",
          boxShadow:"0 24px 64px rgba(20,28,78,.4)"}}>

          {/* FOTO */}
          <div style={{marginBottom:18}}>
            <label style={{display:"block",fontFamily:"'Barlow Condensed',sans-serif",fontWeight:700,
              fontSize:12,color:C.navy,textTransform:"uppercase",marginBottom:8}}>
              Foto del jugador — opcional
            </label>
            {/* Preview */}
            {f.foto_url&&(
              <div style={{textAlign:"center",marginBottom:10}}>
                <img src={f.foto_url} alt="preview"
                  style={{width:90,height:90,borderRadius:"50%",objectFit:"cover",
                    border:`3px solid ${C.navy}`}}/>
              </div>
            )}
            <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:8}}>
              <label style={{display:"flex",flexDirection:"column",alignItems:"center",gap:6,
                padding:"14px 8px",border:`2px dashed ${C.navy}`,borderRadius:12,
                cursor:"pointer",background:"#f0f4ff",textAlign:"center"}}>
                <span style={{fontSize:28}}>📸</span>
                <span style={{fontFamily:"'Barlow Condensed',sans-serif",fontWeight:700,
                  fontSize:13,color:C.navy,textTransform:"uppercase"}}>Sacar foto</span>
                <span style={{fontSize:10,color:C.grayMid}}>Abre la cámara</span>
                <input type="file" accept="image/*" capture="environment"
                  style={{display:"none"}} onChange={handleFoto}/>
              </label>
              <label style={{display:"flex",flexDirection:"column",alignItems:"center",gap:6,
                padding:"14px 8px",border:`2px dashed ${C.gray}`,borderRadius:12,
                cursor:"pointer",background:C.offWhite,textAlign:"center"}}>
                <span style={{fontSize:28}}>🖼</span>
                <span style={{fontFamily:"'Barlow Condensed',sans-serif",fontWeight:700,
                  fontSize:13,color:C.navy,textTransform:"uppercase"}}>Galería</span>
                <span style={{fontSize:10,color:C.grayMid}}>Elegir imagen</span>
                <input type="file" accept="image/*"
                  style={{display:"none"}} onChange={handleFoto}/>
              </label>
            </div>
            {f.foto_url&&(
              <button onClick={()=>set("foto_url","")}
                style={{marginTop:6,background:"none",border:"none",color:"#dc2626",
                  fontSize:12,cursor:"pointer",fontFamily:"'Barlow Condensed',sans-serif",
                  fontWeight:600}}>✕ Eliminar foto</button>
            )}
          </div>

          {/* CAMPOS TEXTO */}
          {[
            ["nombre","Nombre completo del jugador *","text"],
            ["ci","Cédula de identidad (opcional)","text"],
            ["celular","Celular del tutor *","tel"],
            ["mail","Email del tutor (opcional)","email"],
            ["fecha_nacimiento","Fecha de nacimiento *","date"],
            ["numero_camiseta","Número de camiseta (opcional)","text"],
            ["direccion","Dirección (opcional)","text"],
          ].map(([k,l,t])=>(
            <div key={k} style={{marginBottom:12}}>
              <label style={{display:"block",fontFamily:"'Barlow Condensed',sans-serif",fontWeight:700,
                fontSize:12,color:C.navy,textTransform:"uppercase",marginBottom:5}}>{l}</label>
              <input type={t} value={f[k]||""} onChange={e=>set(k,e.target.value)}
                style={{width:"100%",padding:"10px 14px",border:`1px solid ${C.gray}`,
                  borderRadius:10,fontSize:14,outline:"none"}}/>
            </div>
          ))}

          {/* CATEGORÍA */}
          <div style={{marginBottom:20}}>
            <label style={{display:"block",fontFamily:"'Barlow Condensed',sans-serif",fontWeight:700,
              fontSize:12,color:C.navy,textTransform:"uppercase",marginBottom:5}}>Categoría *</label>
            <select value={f.categoria_id} onChange={e=>set("categoria_id",e.target.value)}
              style={{width:"100%",padding:"10px 14px",border:`1px solid ${C.gray}`,borderRadius:10,fontSize:14}}>
              <option value="">— Seleccioná —</option>
              {categorias.map(c=><option key={c.id} value={c.id}>{c.nombre}</option>)}
            </select>
          </div>

          <button onClick={enviar} disabled={!valid||loading}
            style={{width:"100%",padding:"14px",background:valid?`linear-gradient(135deg,${C.green},#15803d)`:"#e2e2da",
              color:valid?C.white:C.grayMid,border:"none",borderRadius:12,fontFamily:"'Barlow Condensed',sans-serif",
              fontWeight:900,fontSize:17,textTransform:"uppercase"}}>
            {loading?"Enviando...":"✅ Enviar formulario"}
          </button>
        </div>
      </div>
    </div>
  );
}
