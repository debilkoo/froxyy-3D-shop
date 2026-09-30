const products=[
{id:1,n:"Controller Stand",d:"Stabilný stojan na gamepad.",p:8.9,c:"setup",tag:"HOT"},
{id:2,n:"Headset Hook",d:"Držiak slúchadiel pod stôl.",p:5.9,c:"gaming",tag:"NEW"},
{id:3,n:"Desk Cable Clip",d:"Usporiadaj káble bez chaosu.",p:1.9,c:"setup",tag:""},
{id:4,n:"Froxy Mini",d:"Malý detail s veľkým vibe.",p:3.9,c:"dekor",tag:"NEW"},
{id:5,n:"Gamepad Dock",d:"Dock pre tvoj controller.",p:12.9,c:"gaming",tag:""},
{id:6,n:"Setup Logo",d:"FROXYYY detail na stôl alebo poličku.",p:10.9,c:"dekor",tag:""},
{id:7,n:"Phone Stand",d:"Praktický stojan vedľa monitora.",p:4.9,c:"setup",tag:""}];
let cart=JSON.parse(localStorage.getItem("froxyyy-cart")||"[]");
const money=n=>n.toFixed(2).replace(".",",")+" €";
function render(cat="all"){productsEl.innerHTML=products.filter(x=>cat==="all"||x.c===cat).map((x,i)=>`<article class="card"><div class="pic">${["◈","◒","≋","✦","▣","F","▯"][i]}</div><div class="info"><small>${x.tag}</small><h3>${x.n}</h3><p>${x.d}</p><div class="row"><strong>${money(x.p)}</strong><button onclick="add(${x.id})">Pridať +</button></div></div></article>`).join("")}
function add(id){cart.push(id);save();openCart()}function save(){localStorage.setItem("froxyyy-cart",JSON.stringify(cart));renderCart()}
function renderCart(){let total=0;cartItems.innerHTML=cart.map((id,i)=>{let p=products.find(x=>x.id===id);total+=p.p;return `<div class="item"><span>${p.n}<small>${money(p.p)}</small></span><button onclick="removeItem(${i})">×</button></div>`}).join("")||"<p class='hint'>Košík je prázdny.</p>";document.querySelector("#total").textContent=money(total);document.querySelector("#cartCount").textContent=cart.length}
function removeItem(i){cart.splice(i,1);save()}function openCart(){cartEl.classList.add("open");overlay.classList.add("show")}function closeCart(){cartEl.classList.remove("open");overlay.classList.remove("show")}
const productsEl=document.querySelector("#products"),cartEl=document.querySelector("#cart"),cartItems=document.querySelector("#cartItems"),overlay=document.querySelector("#overlay");
document.querySelectorAll(".filters button").forEach(b=>b.onclick=()=>{document.querySelectorAll(".filters button").forEach(x=>x.classList.remove("active"));b.classList.add("active");render(b.dataset.cat)});
document.querySelector("#cartBtn").onclick=openCart;document.querySelector("#closeCart").onclick=closeCart;overlay.onclick=closeCart;
const cm=document.querySelector("#customModal");document.querySelector("#customOpen").onclick=()=>cm.classList.add("open");document.querySelector("#customClose").onclick=()=>cm.classList.remove("open");
document.querySelectorAll(".choices button").forEach(b=>b.onclick=()=>{document.querySelectorAll(".choices button").forEach(x=>x.classList.remove("active"));b.classList.add("active")});
document.querySelector("#keyName").oninput=e=>document.querySelector("#keyPreview").textContent=e.target.value.trim()||"TVOJE MENO";
document.querySelector("#addCustom").onclick=()=>{let n=document.querySelector("#keyName").value.trim(),c=document.querySelector(".choices .active").dataset.color;if(!n)return alert("Napíš meno na kľúčenku.");cart.push({custom:1,n:"Kľúčenka: "+n,d:c,p:6.9});save();cm.classList.remove("open");openCart()};
const om=document.querySelector("#checkoutModal");document.querySelector("#checkout").onclick=()=>cart.length?om.classList.add("open"):alert("Košík je prázdny.");document.querySelector("#checkoutClose").onclick=()=>om.classList.remove("open");
document.querySelector("#sendOrder").onclick=()=>{let n=orderName.value.trim(),e=orderEmail.value.trim(),ph=orderPhone.value.trim(),pl=orderPlace.value.trim();if(!n||!e||!ph||!pl)return alert("Vyplň prosím všetky údaje.");alert("Objednávka je pripravená! Ozveme sa ti na "+e+".");om.classList.remove("open")};
render();renderCart();