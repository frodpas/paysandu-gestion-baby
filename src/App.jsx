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
  const [mode,        setMode]       = useState("publico"); // publico | admin | delegado
  const [user,        setUser]       = useState("");
  const [pass,        setPass]       = useState("");
  const [pin,         setPin]        = useState("");
  const [jugId,       setJugId]      = useState("");
  const [err,         setErr]        = useState("");
  const [loading,     setLoading]    = useState(false);
  const [delegados,   setDelegados]  = useState([]);
  const [selDelegado, setSelDelegado]= useState(null); // delegado elegido antes del PIN

  const handleAdmin = async () => {
    onLogin({role:"admin", name:"Administrador"});
  };

  // Cargar delegados activos cuando se abre el panel
  const abrirDelegado = async () => {
    if (mode === "delegado") { setMode("publico"); return; }
    setMode("delegado"); setErr(""); setPin(""); setSelDelegado(null);
    const data = await sbFetch("baby_delegados?activo=eq.true&select=id,nombre,categorias&order=nombre.asc");
    setDelegados(data||[]);
  };

  const handleDelegado = async () => {
    if (!selDelegado) return;
    setLoading(true);
    const data = await sbFetch(`baby_delegados?id=eq.${selDelegado.id}&pin=eq.${pin}&activo=eq.true&select=*`);
    setLoading(false);
    if (data && data.length > 0) {
      onLogin({role:"delegado", ...data[0]});
    } else {
      setErr("PIN incorrecto");
    }
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

  return (
    <div style={{minHeight:"100dvh",background:`linear-gradient(160deg,${C.navyDark} 0%,${C.navy} 50%,${C.navyLight} 100%)`,
      display:"flex",alignItems:"center",justifyContent:"center",padding:20,position:"relative"}}>

      {/* Iconos pequeños Admin y Delegado — esquina superior derecha */}
      <div style={{position:"fixed",top:16,right:16,display:"flex",gap:8,zIndex:10}}>
        <button onClick={()=>{setMode(mode==="admin"?"publico":"admin");setErr("");setUser("");setPass("");}}
          title="Administrador"
          style={{background:mode==="admin"?"rgba(232,184,75,.3)":"rgba(255,255,255,.1)",
            border:`1px solid ${mode==="admin"?C.gold:"rgba(255,255,255,.25)"}`,
            borderRadius:10,padding:"8px 12px",color:C.white,fontSize:12,
            fontFamily:"'Barlow Condensed',sans-serif",fontWeight:700,cursor:"pointer",
            textTransform:"uppercase",backdropFilter:"blur(8px)"}}>
          👤 Admin
        </button>
        <button onClick={abrirDelegado}
          title="Delegado"
          style={{background:mode==="delegado"?"rgba(134,239,172,.2)":"rgba(255,255,255,.1)",
            border:`1px solid ${mode==="delegado"?"#86efac":"rgba(255,255,255,.25)"}`,
            borderRadius:10,padding:"8px 12px",color:C.white,fontSize:12,
            fontFamily:"'Barlow Condensed',sans-serif",fontWeight:700,cursor:"pointer",
            textTransform:"uppercase",backdropFilter:"blur(8px)"}}>
          🏃 Delegado
        </button>
      </div>

      <div className="fi" style={{maxWidth:400,width:"100%"}}>
        {/* Header siempre visible */}
        <div style={{textAlign:"center",marginBottom:28}}>
          <ClubLogo size={80}/>
          <h1 style={{fontFamily:"'Barlow Condensed',sans-serif",fontSize:32,fontWeight:900,
            color:C.white,textTransform:"uppercase",letterSpacing:".05em",marginTop:16,lineHeight:1}}>
            Paysandú FC
          </h1>
          <div style={{color:C.lilac,fontFamily:"'Barlow Condensed',sans-serif",fontSize:18,fontWeight:700,
            textTransform:"uppercase",letterSpacing:".1em",marginTop:4}}>Baby Fútbol</div>
        </div>

        {/* ── PANTALLA PÚBLICA (por defecto) ── */}
        {mode==="publico" && (
          <div className="fi" style={{background:"rgba(255,255,255,.08)",borderRadius:20,padding:28,
            backdropFilter:"blur(8px)",border:"1px solid rgba(255,255,255,.15)"}}>
            <div style={{fontFamily:"'Barlow Condensed',sans-serif",fontWeight:900,fontSize:22,
              color:C.white,textTransform:"uppercase",marginBottom:6,textAlign:"center"}}>Código del jugador</div>
            <div style={{color:"rgba(255,255,255,.6)",fontSize:13,marginBottom:20,textAlign:"center"}}>
              Ingresá el código para ver la ficha y los pagos
            </div>
            <input value={jugId} onChange={e=>setJugId(e.target.value.toUpperCase())}
              onKeyDown={e=>e.key==="Enter"&&handlePublico()}
              placeholder="Ej: AB1234" maxLength={8} autoFocus
              style={{width:"100%",padding:"18px 16px",borderRadius:14,border:"2px solid rgba(255,255,255,.4)",
                background:"rgba(255,255,255,.15)",color:C.white,fontSize:26,fontWeight:900,
                textAlign:"center",letterSpacing:".2em",marginBottom:16,outline:"none"}}/>
            {err&&<div style={{color:"#fca5a5",fontSize:13,marginBottom:12,textAlign:"center"}}>{err}</div>}
            <button onClick={handlePublico} disabled={loading||!jugId}
              style={{width:"100%",padding:"15px",background:jugId?`linear-gradient(135deg,${C.lilacDark},#7c3aed)`:"rgba(255,255,255,.1)",
                color:C.white,border:"none",borderRadius:12,fontFamily:"'Barlow Condensed',sans-serif",
                fontWeight:900,fontSize:18,textTransform:"uppercase",cursor:jugId?"pointer":"default"}}>
              {loading?"Buscando...":"👨‍👧 Ver ficha"}
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
                    <button key={d.id} onClick={()=>{setSelDelegado(d);setPin("");setErr("");}}
                      style={{padding:"12px 16px",background:"rgba(255,255,255,.12)",
                        border:"1px solid rgba(134,239,172,.3)",borderRadius:12,
                        color:C.white,fontFamily:"'Barlow Condensed',sans-serif",fontWeight:700,
                        fontSize:16,textTransform:"uppercase",textAlign:"left",cursor:"pointer",
                        display:"flex",alignItems:"center",justifyContent:"space-between"}}>
                      <span>{d.nombre}</span>
                      <span style={{fontSize:11,color:"rgba(255,255,255,.5)",textTransform:"none",fontWeight:400}}>
                        {(d.categorias||[]).length>0?(d.categorias||[]).join(", "):"Todas"}
                      </span>
                    </button>
                  ))}
                </div>
              </>
            ) : (
              /* Paso 2: ingresar PIN */
              <>
                <div style={{display:"flex",alignItems:"center",gap:10,marginBottom:20,
                  background:"rgba(255,255,255,.1)",borderRadius:12,padding:"10px 14px"}}>
                  <div style={{flex:1}}>
                    <div style={{color:"rgba(255,255,255,.5)",fontSize:11,textTransform:"uppercase"}}>Delegado</div>
                    <div style={{fontFamily:"'Barlow Condensed',sans-serif",fontWeight:800,fontSize:18,
                      color:C.white,textTransform:"uppercase"}}>{selDelegado.nombre}</div>
                  </div>
                  <button onClick={()=>{setSelDelegado(null);setPin("");setErr("");}}
                    style={{background:"rgba(255,255,255,.15)",border:"none",borderRadius:8,
                      padding:"6px 10px",color:"rgba(255,255,255,.7)",fontSize:12,cursor:"pointer"}}>
                    Cambiar
                  </button>
                </div>
                <div style={{color:"rgba(255,255,255,.6)",fontSize:13,marginBottom:14,textAlign:"center"}}>
                  Ingresá tu PIN de 4 dígitos
                </div>
                <div style={{display:"flex",gap:10,justifyContent:"center",marginBottom:16}}>
                  {[0,1,2,3].map(i=>(
                    <input key={i} type="password" maxLength={1} value={pin[i]||""}
                      onChange={e=>{
                        const v=e.target.value.replace(/\D/g,"");
                        const arr=pin.split("");
                        arr[i]=v;
                        const np=arr.join("").slice(0,4);
                        setPin(np);
                        if(v&&i<3) document.getElementById(`pin-${i+1}`)?.focus();
                      }}
                      id={`pin-${i}`}
                      style={{width:60,height:60,borderRadius:14,border:"2px solid rgba(134,239,172,.5)",
                        background:"rgba(255,255,255,.1)",color:C.white,fontSize:30,fontWeight:900,
                        textAlign:"center",outline:"none"}}/>
                  ))}
                </div>
                {err&&<div style={{color:"#fca5a5",fontSize:13,marginBottom:10,textAlign:"center"}}>{err}</div>}
                <button onClick={handleDelegado} disabled={loading||pin.length<4}
                  style={{width:"100%",padding:"13px",background:`linear-gradient(135deg,${C.green},#15803d)`,
                    color:C.white,border:"none",borderRadius:10,fontFamily:"'Barlow Condensed',sans-serif",
                    fontWeight:900,fontSize:16,textTransform:"uppercase",cursor:pin.length<4?"default":"pointer"}}>
                  {loading?"...":"Ingresar"}
                </button>
              </>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

/* ══ VISTA PÚBLICA — ficha del jugador ════════════════════════════════ */
function PublicoView({ user, onLogout }) {
  const jug = user.jugador;
  const [pagos, setPagos] = useState([]);
  const [plan,  setPlan]  = useState([]);
  const [modal, setModal] = useState(null);
  const [payMethod, setPayMethod] = useState(null);
  const [selectedMeses, setSelectedMeses] = useState([]); // multi-selección
  const [paying, setPaying] = useState(false);

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
    const mesActual = new Date().getMonth()+1;
    return MESES.map((m,i)=>i+1).filter(mes=>{
      const monto = cuotaMes(mes);
      return monto>0 && !pagoMes(mes) && mes<=mesActual+1;
    });
  };

  const confirmarPago = async () => {
    if (!payMethod || selectedMeses.length===0) return;
    setPaying(true);
    for (const mes of selectedMeses) {
      const monto = cuotaMes(mes);
      await sbFetch("baby_pagos","POST",{
        id: uid(),
        jugador_id: jug.id,
        org_id: jug.org_id||"paysandu",
        año: añoActual,
        mes,
        monto,
        metodo_pago: payMethod,
        fecha_pago: fdate(),
      });
    }
    const p = await sbFetch(`baby_pagos?jugador_id=eq.${jug.id}&año=eq.${añoActual}&select=*`);
    setPagos(p||[]);
    setPaying(false);
    setModal("success");
    setPayMethod(null);
    setSelectedMeses([]);
  };

  return (
    <div style={{minHeight:"100dvh",background:C.offWhite}}>
      {/* Header */}
      <div className="app-header" style={{background:`linear-gradient(135deg,${C.navyDark},${C.navy})`,padding:"14px 20px"}}>
        <div style={{display:"flex",alignItems:"center",gap:12}}>
          <ClubLogo size={36}/>
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
        <Modal onClose={()=>setModal(null)}>
          <div style={{background:`linear-gradient(135deg,${C.navyDark},${C.navy})`,padding:"18px 22px"}}>
            <div style={{fontFamily:"'Barlow Condensed',sans-serif",fontWeight:900,fontSize:22,
              color:C.white,textTransform:"uppercase"}}>💳 Registrar Pago</div>
          </div>
          <div style={{padding:"20px 22px"}}>
            <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:10}}>
              <div style={{fontFamily:"'Barlow Condensed',sans-serif",fontWeight:700,fontSize:13,
                color:C.navy,textTransform:"uppercase"}}>Seleccioná los meses a pagar</div>
              {selectedMeses.length>0&&<div style={{fontFamily:"'Barlow Condensed',sans-serif",
                fontWeight:900,fontSize:14,color:C.green}}>Total: {fmt(totalPub)}</div>}
            </div>
            <div style={{display:"grid",gridTemplateColumns:"repeat(3,1fr)",gap:8,marginBottom:18}}>
              {mesesConDeuda().map(mes=>{
                const sel=selectedMeses.includes(mes);
                return(
                  <button key={mes} onClick={()=>toggleMesPub(mes)}
                    style={{padding:"10px 6px",borderRadius:10,position:"relative",
                      border:`2px solid ${sel?"#16a34a":C.gray}`,
                      background:sel?"#dcfce7":C.white,cursor:"pointer",
                      fontFamily:"'Barlow Condensed',sans-serif",fontWeight:700,fontSize:13,
                      color:sel?"#16a34a":C.navy}}>
                    {sel&&<span style={{position:"absolute",top:3,right:5,fontSize:10}}>✓</span>}
                    <div>{MESES[mes-1]}</div>
                    <div style={{fontWeight:900,fontSize:15}}>{fmt(cuotaMes(mes))}</div>
                  </button>
                );
              })}
            </div>
            <div style={{fontFamily:"'Barlow Condensed',sans-serif",fontWeight:700,fontSize:13,
              color:C.navy,textTransform:"uppercase",marginBottom:10}}>Medio de pago</div>
            <div style={{display:"grid",gridTemplateColumns:"repeat(3,1fr)",gap:8,marginBottom:18}}>
              {PAY_METHODS.map(pm=>(
                <button key={pm.id} onClick={()=>setPayMethod(pm.id)}
                  style={{padding:"12px 8px",borderRadius:12,border:`2px solid ${payMethod===pm.id?pm.color:C.gray}`,
                    background:payMethod===pm.id?pm.color+"18":C.white,cursor:"pointer",
                    fontFamily:"'Barlow Condensed',sans-serif",fontWeight:700,fontSize:14,
                    color:payMethod===pm.id?pm.color:C.navy,display:"flex",flexDirection:"column",
                    alignItems:"center",gap:4}}>
                  <span style={{fontSize:22}}>{pm.icon}</span>{pm.label}
                </button>
              ))}
            </div>
            <div style={{display:"flex",gap:10}}>
              <button onClick={()=>setModal(null)}
                style={{flex:1,padding:"11px",background:"transparent",color:C.navy,
                  border:`2px solid ${C.navy}`,borderRadius:10,fontFamily:"'Barlow Condensed',sans-serif",
                  fontWeight:700,fontSize:14,textTransform:"uppercase"}}>Cancelar</button>
              <button onClick={confirmarPago} disabled={!payMethod||selectedMeses.length===0||paying}
                style={{flex:2,padding:"11px",
                  background:payMethod&&selectedMeses.length>0?`linear-gradient(135deg,${C.green},#15803d)`:"#e2e2da",
                  color:payMethod&&selectedMeses.length>0?C.white:C.grayMid,border:"none",borderRadius:10,
                  fontFamily:"'Barlow Condensed',sans-serif",fontWeight:900,fontSize:15,
                  textTransform:"uppercase"}}>
                {paying?"⏳ Procesando...":`✅ Confirmar${selectedMeses.length>1?" ("+selectedMeses.length+" meses)":""}`}
              </button>
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
    </div>
  );
}

/* ══ FORM ALTA JUGADOR ════════════════════════════════════════════════ */
function FormAltaJugador({ categorias, onSave, onCancel, initialData=null, readonlyPagos=false, showTipoCuota=true, readOnly=false }) {
  const [f, setF] = useState(initialData || {
    nombre:"", celular:"", mail:"", categoria_id:"",
    fecha_nacimiento:"", ci:"", numero_camiseta:"", direccion:"",
    foto_url:"", tipo_cuota:"base",
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
        <ClubLogo size={40}/>
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

  const jugadoresFilt = filtCat==="todos"
    ? jugadores
    : jugadores.filter(j=>j.categoria_id===filtCat);

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
    if (!confirm("¿Eliminar jugador?")) return;
    await sbFetch(`baby_jugadores?id=eq.${id}`, "DELETE");
    load();
  };

  const validarPendiente = async (pend) => {
    const datos = typeof pend.datos_json==="string" ? JSON.parse(pend.datos_json) : pend.datos_json;

    // Si es formulario de delegado
    if (datos._tipo === "delegado") {
      const { _tipo, ...ddata } = datos;
      const res = await sbFetch("baby_delegados", "POST", {
        id: uid(), org_id: "paysandu", activo: true,
        nombre: ddata.nombre||"", celular: ddata.celular||"",
        mail: ddata.mail||"", pin: ddata.pin||"0000",
        categorias: ddata.categorias||[],
      });
      if (!res) { alert("Error al crear delegado. Revisá la consola."); return; }
      await sbFetch(`baby_formularios_pendientes?id=eq.${pend.id}`, "DELETE");
      load();
      return;
    }

    // Jugador normal
    const { foto_url, tipo_cuota, _tipo:_t, ...resto } = datos;
    const fotoOk = foto_url && foto_url.length < 500000 ? foto_url : (foto_url?.startsWith("http") ? foto_url : "");
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
    await sbFetch("baby_delegados", "POST", {
      ...data, id:uid(), org_id:"paysandu", activo:true
    });
    setModal(null); load();
  };

  const saveEditDelegado = async (data) => {
    if (!selJugador) return;
    await sbFetch(`baby_delegados?id=eq.${selJugador.id}`, "PATCH", {
      nombre: data.nombre,
      celular: data.celular,
      mail: data.mail,
      pin: data.pin,
      categorias: data.categorias,
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
    ["categorias", "🏷 Categorías"],
  ];

  return (
    <div style={{minHeight:"100dvh",background:C.offWhite,display:"flex",flexDirection:"column"}}>
      {/* Header */}
      <div className="app-header" style={{background:`linear-gradient(135deg,${C.navyDark},${C.navy})`,padding:"12px 18px"}}>
        <div style={{display:"flex",alignItems:"center",gap:10}}>
          <ClubLogo size={32}/>
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
      <div style={{flex:1,display:"flex",overflow:"hidden"}}>
        {/* Sidebar navegación */}
        <div style={{width:260,background:C.white,borderRight:`2px solid ${C.gray}`,
          padding:"20px 18px",flexShrink:0,overflowY:"auto"}}>
          <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:16}}>
            {TABS.map(([id,label])=>{
              const active = tab===id;
              const parts = label.split(" ");
              const icon = parts[0];
              const text = parts.slice(1).join(" ");
              const hasBadge = id==="pendientes" && pendientes.length>0;
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
                    justifyContent:"center",lineHeight:1}}>{pendientes.length}</span>}
                  <span style={{fontSize:32,lineHeight:1}}>{icon}</span>
                  <span style={{fontSize:11,fontWeight:800,letterSpacing:".02em",
                    textAlign:"center",lineHeight:1.2}}>{text}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Contenido principal */}
        <div style={{flex:1,overflowY:"auto",padding:20,minWidth:0}}>
        {loading&&<div style={{textAlign:"center",padding:"40px 0",color:C.grayMid}}>⏳ Cargando...</div>}

        {/* ── TAB PLANTELES ── */}
        {!loading&&tab==="planteles"&&(
          <div style={{maxWidth:"100%"}}>
            {/* Barra acciones — botones cuadrados */}
            <div style={{display:"flex",gap:10,marginBottom:12,alignItems:"flex-start",flexWrap:"wrap"}}>
              <button onClick={()=>{setSelJugador(null);setModal("newJug");}}
                style={{width:110,height:80,background:`linear-gradient(135deg,${C.navy},${C.navyLight})`,
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
            {/* Encabezado tabla */}
            <div style={{display:"grid",gridTemplateColumns:"minmax(160px,280px) 95px 65px 75px 100px auto",gap:0,
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
                return monto>0 && !pagos.find(p=>p.jugador_id===j.id&&p.mes===mes) && mes<mesActual;
              });
              const est = deudaMeses.length===0
                ? {icon:"🟢",label:"Al día",color:"#16a34a",bg:"#dcfce7"}
                : deudaMeses.length===1
                  ? {icon:"🟡",label:"1 mes",color:"#d97706",bg:"#fef3c7"}
                  : {icon:"🔴",label:`${deudaMeses.length} meses`,color:"#dc2626",bg:"#fee2e2"};
              return(
                <div key={j.id} style={{display:"grid",
                  gridTemplateColumns:"minmax(160px,280px) 95px 65px 75px 100px auto",gap:0,
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
                  <div style={{fontSize:11,color:C.grayMid,textAlign:"center",whiteSpace:"nowrap"}}>
                    {j.fecha_nacimiento||"-"}
                  </div>
                  {/* Cat */}
                  <div style={{fontFamily:"'Barlow Condensed',sans-serif",fontWeight:800,fontSize:16,
                    color:C.navy,textAlign:"center"}}>{j.categoria_id}</div>
                  {/* Código */}
                  <div style={{fontFamily:"'Barlow Condensed',sans-serif",fontWeight:900,fontSize:11,
                    color:C.lilacDark,letterSpacing:".05em",textAlign:"center"}}>{j.id}</div>
                  {/* Estado pago */}
                  <div style={{textAlign:"center"}}>
                    <span style={{background:est.bg,color:est.color,borderRadius:20,padding:"3px 8px",
                      fontFamily:"'Barlow Condensed',sans-serif",fontWeight:800,fontSize:12,
                      whiteSpace:"nowrap"}}>{est.icon} {est.label}</span>
                  </div>
                  {/* Acciones: todos iguales, cuadrados, en línea */}
                  <div style={{display:"flex",gap:5,justifyContent:"center",alignItems:"center"}}>
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
          </div>
        )}

        {/* ── TAB PAGOS ── */}
        {!loading&&tab==="pagos"&&(
          <PagosTab jugadores={jugadoresFilt} pagos={pagos} planPagos={planPagos}
            categorias={categorias} tiposCuota={tiposCuota}
            filtCat={filtCat} setFiltCat={setFiltCat}
            onRegistrarPago={registrarPago} añoActual={añoActual}/>
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
          <div style={{maxWidth:"100%"}}>
            <div style={{display:"flex",gap:10,marginBottom:16,alignItems:"flex-start"}}>
              <button onClick={()=>setModal("newDel")}
                style={{width:110,height:80,background:`linear-gradient(135deg,${C.navy},${C.navyLight})`,
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
            {/* Encabezado */}
            <div style={{display:"grid",gridTemplateColumns:"minmax(160px,280px) 150px 65px 150px auto",gap:0,
              padding:"11px 16px",background:C.navy,borderRadius:"12px 12px 0 0",alignItems:"center"}}>
              {["Nombre","Celular / Email","PIN","Categorías","Acciones"].map((h,i)=>(
                <div key={i} style={{fontFamily:"'Barlow Condensed',sans-serif",fontWeight:800,
                  fontSize:13,color:C.white,textTransform:"uppercase",
                  textAlign:i>=4?"center":"left",padding:"0 6px"}}>{h}</div>
              ))}
            </div>
            {delegados.map((d,idx)=>(
              <div key={d.id} style={{display:"grid",gridTemplateColumns:"minmax(160px,280px) 150px 65px 150px auto",gap:0,
                alignItems:"center",padding:"14px 16px",
                background:d.activo===false?"#fff5f5":idx%2===0?C.white:"#f8f8f5",
                borderLeft:`1px solid ${d.activo===false?"#fca5a5":C.gray}`,
                borderRight:`1px solid ${d.activo===false?"#fca5a5":C.gray}`,
                borderBottom:`1px solid ${d.activo===false?"#fca5a5":C.gray}`,
                borderRadius:idx===delegados.length-1?"0 0 12px 12px":"0"}}>
                <div style={{paddingRight:8}}>
                  <div style={{fontFamily:"'Barlow Condensed',sans-serif",fontWeight:800,fontSize:17,
                    color:d.activo===false?C.grayMid:C.navy,textTransform:"uppercase"}}>{d.nombre}</div>
                  {d.activo===false&&<span style={{fontSize:11,background:"#fee2e2",color:"#dc2626",
                    borderRadius:10,padding:"2px 10px",fontWeight:700}}>SUSPENDIDO</span>}
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
                <div style={{display:"flex",gap:5,justifyContent:"center",alignItems:"center",padding:"0 4px"}}>
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
          </div>
        )}

        {/* ── TAB PENDIENTES ── */}
        {!loading&&tab==="pendientes"&&(
          <div style={{maxWidth:"100%"}}>
            <div style={{fontFamily:"'Barlow Condensed',sans-serif",fontWeight:900,fontSize:18,
              color:C.navy,textTransform:"uppercase",marginBottom:14}}>
              ⏳ Altas pendientes de validación
              <span style={{background:C.gold,color:C.navyDark,borderRadius:20,padding:"2px 12px",
                fontSize:14,fontWeight:900,marginLeft:10}}>{pendientes.length}</span>
            </div>
            {pendientes.length>0&&(
              <>
                {/* Encabezado tabla */}
                <div style={{display:"grid",gridTemplateColumns:"minmax(140px,280px) 80px 110px 120px 100px 150px",gap:0,
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
                      <div style={{paddingRight:8}}>
                        <div style={{fontFamily:"'Barlow Condensed',sans-serif",fontWeight:800,fontSize:16,
                          color:C.navy,textTransform:"uppercase"}}>{datos.nombre}</div>
                        {datos.ci&&<div style={{fontSize:11,color:C.grayMid}}>CI: {datos.ci}</div>}
                        {datos.numero_camiseta&&<div style={{fontSize:11,color:C.grayMid}}>Camiseta #{datos.numero_camiseta}</div>}
                      </div>
                      <div style={{fontFamily:"'Barlow Condensed',sans-serif",fontWeight:800,fontSize:16,
                        color:C.navy}}>{datos.categoria_id||"-"}</div>
                      <div style={{fontSize:13,color:C.navy,fontWeight:600}}>{datos.celular||"-"}</div>
                      <div style={{fontSize:12,color:C.grayMid,overflow:"hidden",textOverflow:"ellipsis",
                        whiteSpace:"nowrap"}}>{datos.mail||"-"}</div>
                      <div style={{fontSize:13,color:C.navy}}>{datos.fecha_nacimiento||"-"}</div>
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
        {!loading&&tab==="categorias"&&(
          <CategoriasTab categorias={categorias} onRefresh={load}/>
        )}
      </div>{/* fin contenido principal */}
      </div>{/* fin layout sidebar+contenido */}

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
  filtCat, setFiltCat, onRegistrarPago, añoActual }) {
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
      return monto>0&&!pagoJugMes(jug.id,mes)&&mes<mesActual;
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
      {/* Barra superior: botón reporte cuadrado */}
      <div style={{display:"flex",gap:10,marginBottom:12,alignItems:"flex-start"}}>
        <button onClick={()=>setVerReporte(true)}
          style={{width:110,height:80,background:`linear-gradient(135deg,#b45309,#d97706)`,
            color:C.white,border:"none",borderRadius:12,
            fontFamily:"'Barlow Condensed',sans-serif",fontWeight:900,fontSize:12,
            textTransform:"uppercase",cursor:"pointer",display:"flex",flexDirection:"column",
            alignItems:"center",justifyContent:"center",gap:6,
            boxShadow:"0 4px 12px rgba(180,83,9,.3)"}}>
          <span style={{fontSize:24}}>📊</span>Generar reporte
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
      <div style={{display:"grid",gridTemplateColumns:"50px 1fr 100px 130px 200px",gap:8,
        padding:"10px 16px",background:C.navy,borderRadius:"10px 10px 0 0",alignItems:"center"}}>
        {["","Nombre","Cat.","Estado","Acciones"].map((h,i)=>(
          <div key={i} style={{fontFamily:"'Barlow Condensed',sans-serif",fontWeight:800,
            fontSize:13,color:C.white,textTransform:"uppercase",textAlign:i>2?"center":"left"}}>{h}</div>
        ))}
      </div>
      {jugFiltrados.map((j,idx)=>{
        const est=estadoPago(j);
        const deudaMeses=MESES.map((_,i)=>i+1).filter(mes=>{
          const monto=cuotaMes(j,mes);
          return monto>0&&!pagoJugMes(j.id,mes)&&mes<=mesActual;
        });
        return(
          <div key={j.id} style={{display:"grid",gridTemplateColumns:"50px 1fr 100px 130px 200px",gap:8,
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
                  return monto>0&&!pagoJugMes(verHistorial.id,mes)&&mes<=mesActual;
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
                  w.document.write("<!DOCTYPE html><html><head><meta charset='utf-8'><title>Reporte Pagos</title><style>body{font-family:Arial,sans-serif;font-size:11px;}table{border-collapse:collapse;width:100%;}th,td{border:1px solid #ccc;padding:4px 6px;text-align:center;}th{background:#1e2a6e;color:white;}.verde{background:#dcfce7;color:#16a34a;font-weight:700;}.rojo{background:#fee2e2;color:#dc2626;font-weight:700;}.gris{background:#f3f4f6;color:#9ca3af;}.nombre{text-align:left;font-weight:700;text-transform:uppercase;}</style></head><body>"+el.outerHTML+"<script>window.onload=function(){window.print();}<\/script></body></html>");
                  w.document.close();
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
                        if(mes>mesActual) return false;
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
                            const futuro=mes>mesActual;
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
  } : {nombre:"",celular:"",mail:"",pin:"",categorias:[]});
  const set = (k,v) => setF(p=>({...p,[k]:v}));
  const valid = f.nombre&&f.pin.length===4;
  const esEdicion = !!initialData;

  const toggleCat = (id) => {
    setF(p=>({...p, categorias: p.categorias.includes(id)
      ? p.categorias.filter(c=>c!==id) : [...p.categorias, id]}));
  };

  return (
    <div>
      <div style={{background:`linear-gradient(135deg,${C.navyDark},${C.navy})`,padding:"18px 22px"}}>
        <div style={{fontFamily:"'Barlow Condensed',sans-serif",fontWeight:900,fontSize:20,
          color:C.white,textTransform:"uppercase"}}>{esEdicion?"✏️ Editar Delegado":"🏃 Nuevo Delegado"}</div>
      </div>
      <div style={{padding:"20px 22px"}}>
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

  return (
    <div style={{minHeight:"100dvh",background:C.offWhite,display:"flex",flexDirection:"column"}}>
      <div className="app-header" style={{background:`linear-gradient(135deg,${C.navyDark},${C.navy})`,padding:"12px 18px"}}>
        <div style={{display:"flex",alignItems:"center",gap:10}}>
          <ClubLogo size={30}/>
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
      <div style={{flex:1,display:"flex",overflow:"hidden"}}>
        {/* Sidebar */}
        <div style={{width:200,background:C.white,borderRight:`2px solid ${C.gray}`,
          padding:"20px 14px",flexShrink:0,overflowY:"auto"}}>
          <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:14}}>
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
                    justifyContent:"center",lineHeight:1}}>{pendientes.length}</span>}
                  <span style={{fontSize:32,lineHeight:1}}>{icon}</span>
                  <span style={{fontSize:11,fontWeight:800,textAlign:"center",lineHeight:1.2}}>{lbl}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Contenido */}
        <div style={{flex:1,overflowY:"auto",padding:18,minWidth:0}}>
        {loading&&<div style={{textAlign:"center",padding:"40px 0",color:C.grayMid}}>⏳ Cargando...</div>}

        {!loading&&tab==="planteles"&&(
          <div>
            <div style={{display:"flex",gap:10,marginBottom:12,alignItems:"flex-start",flexWrap:"wrap"}}>
              <button onClick={()=>{setSelJug(null);setModal("form");}}
                style={{width:110,height:80,background:`linear-gradient(135deg,${C.navy},${C.navyLight})`,
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
            {/* Header tabla */}
            <div style={{display:"grid",gridTemplateColumns:"minmax(160px,280px) 65px 95px auto",gap:0,
              padding:"9px 14px",background:C.navy,borderRadius:"12px 12px 0 0",alignItems:"center"}}>
              {["Nombre","Cat.","Nacimiento","Acciones"].map((h,i)=>(
                <div key={i} style={{fontFamily:"'Barlow Condensed',sans-serif",fontWeight:800,
                  fontSize:12,color:C.white,textTransform:"uppercase",
                  textAlign:i>=2?"center":"left",padding:"0 4px"}}>{h}</div>
              ))}
            </div>
            {jugFiltrados.map((j,idx)=>(
              <div key={j.id} style={{display:"grid",
                gridTemplateColumns:"minmax(160px,280px) 65px 95px auto",gap:0,
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
                <div style={{fontSize:11,color:C.grayMid,textAlign:"center"}}>{j.fecha_nacimiento||"-"}</div>
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
                </div>
              </div>
            ))}
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
            <div style={{display:"grid",gridTemplateColumns:"minmax(140px,280px) 65px 110px 95px auto",gap:0,
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
                  gridTemplateColumns:"minmax(140px,280px) 65px 110px 95px auto",gap:0,
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
                  <div style={{fontSize:11,color:C.grayMid,textAlign:"center"}}>{datos.fecha_nacimiento||"-"}</div>
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
        <FormularioPublico tipo={formType} org={params.get("org")||"paysandu"}/>
      </>
    );
  }
  if (formType === "delegado") {
    return (
      <>
        <GlobalStyle/>
        <FormularioDelegado org={params.get("org")||"paysandu"}/>
      </>
    );
  }

  if (autoLoading) {
    return (
      <>
        <GlobalStyle/>
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
        <LoginScreen onLogin={setCurrentUser}/>
      </>
    );
  }

  return (
    <>
      <GlobalStyle/>
      {currentUser.role==="admin"    && <AdminScreen    user={currentUser} onLogout={()=>setCurrentUser(null)}/>}
      {currentUser.role==="delegado" && <DelegadoScreen user={currentUser} onLogout={()=>setCurrentUser(null)}/>}
      {currentUser.role==="publico"  && <PublicoView    user={currentUser} onLogout={()=>setCurrentUser(null)}/>}
    </>
  );
}


/* ══ FORMULARIO DELEGADO (via link externo) ══════════════════════════ */
function FormularioDelegado({ org }) {
  const [f, setF] = useState({nombre:"",celular:"",mail:"",pin:"",categorias:[]});
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

  const enviar = async () => {
    if (!valid) return;
    setLoading(true);
    // Guardar directamente en baby_delegados_pendientes o en baby_delegados inactivo
    await sbFetch("baby_formularios_pendientes","POST",{
      id:uid(), org_id:org,
      datos_json: JSON.stringify({...f, _tipo:"delegado"}),
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
          <ClubLogo size={70}/>
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
    await sbFetch("baby_formularios_pendientes","POST",{
      id:uid(), org_id:org,
      datos_json: JSON.stringify(f),
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
          <ClubLogo size={70}/>
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
