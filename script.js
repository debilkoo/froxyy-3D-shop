const products=[{id:1,name:'Controller Stand',desc:'Stabilny stojan na gamepad.',stock:0,price:8.9,cat:'setup',tag:'HOT',icon:'⌁'},{id:2,name:'Headset Hook',desc:'Držiak slúchadiel pod stôl.',stock:0,price:5.9,cat:'gaming',tag:'NEW',icon:'◒'},{id:3,name:'Desk Cable Clip',desc:'Usporiadaj káble bez chaosu.',stock:0,price:1.9,cat:'setup',tag:'',icon:'≋'},{id:4,name:'Froxy Mini',desc:'Malý detail s veľkým vibe.',stock:0,price:3.9,cat:'dekor',tag:'NEW',icon:'✦'},{id:5,name:'Gamepad Dock',desc:'Dock pre tvoj controller.',stock:0,price:12.9,cat:'gaming',tag:'',icon:'▣'},{id:6,name:'Setup Logo',desc:'Froxy detail na stôl alebo poličku.',stock:0,price:10.9,cat:'dekor',tag:'',icon:'F'},{id:7,name:'Phone Stand',desc:'Praktický stojan vedľa monitora.',stock:0,price:4.9,cat:'setup',tag:'HOT',icon:'▯'},{id:9,name:'Gaming Phone Stand',desc:'Stojan na mobil pre gaming setup.',stock:0,price:7.9,cat:'setup',tag:'NEW',icon:'▯'},{id:10,name:'Froxy Keychain',desc:'3D tlačená kľúčenka s Froxy vibe.',stock:0,price:1,cat:'dekor',tag:'NEW',icon:'⌘'},{id:11,name:'Mini Keychain',desc:'Malá kľúčenka na kľúče alebo batoh.',stock:0,price:0.9,cat:'dekor',tag:'',icon:'✦'},{id:12,name:'Mystery Box',desc:'Prekvapenie od Froxy — nevieš, čo dostaneš, až kým ho neotvoríš.',stock:0,price:18.45,cat:'dekor',tag:'MYSTERY',icon:'?'}];let cart=JSON.parse(localStorage.getItem('froxy-cart')||'[]');const productsEl=document.querySelector('#products');const topEl=document.querySelector('#topProducts');function money(n){return n.toFixed(2).replace('.',',')+' €'}function card(p){return '<article class="card"><div class="visual"><b>'+p.icon+'</b></div><div class="info">'+(p.tag?'<small class="eyebrow">'+p.tag+'</small>':'')+'<h3>'+p.name+'</h3><p>'+p.desc+'</p><div class="row"><span class="price">'+money(p.price)+'</span><span class="stockBadge">Na objednávku</span><button class="add" onclick="add('+p.id+')">+ Pridať</button></div></div></article>}function render(cat='all'){productsEl.innerHTML=products.filter(p=>cat==='all'||p.cat===cat).map(card).join('')}function renderTop(){topEl.innerHTML=products.filter(p=>p.tag==='HOT').slice(0,3).map(card).join('')}function add(id){
  const existing=cart.find(x=>typeof x==='object'&&x.id===id);
  if(existing){existing.qty=(existing.qty||1)+1}
  else{cart.push({id,qty:1})}
  save();openCart()
}function addCustomKeychain(){const name=document.querySelector('#keyName').value.trim();const color=document.querySelector('.colorChoice.active')?.dataset.color||'Čiernobiela';if(!name){alert('Napíš meno na kľúčenku.');return}cart.push({custom:true,name:'Kľúčenka: '+name,desc:'Vlastná kľúčenka • '+color,price:6.9,qty:1});save();closeCustom();openCart()}function remove(i){cart.splice(i,1);save()}
function changeQty(i,delta){
  const item=cart[i];
  if(typeof item==='number'){cart[i]={id:item,qty:Math.max(1,1+delta)}}
  else{item.qty=(item.qty||1)+delta}
  const normalized=cart[i];
  if((normalized.qty||1)<=0) cart.splice(i,1);
  save()
}function save(){localStorage.setItem('froxy-cart',JSON.stringify(cart));renderCart()}function renderCart(){
  const el=document.querySelector('#cartItems');let total=0,itemsCount=0;
  el.innerHTML=cart.map((raw,i)=>{
    const item=typeof raw==='number'?{id:raw,qty:1}:raw;
    const p=item.custom?item:products.find(x=>x.id===item.id);
    const qty=item.qty||1; total+=p.price*qty; itemsCount+=qty;
    return '<div class="cartItem"><div><b>'+p.name+'</b><br><small>'+money(p.price)+' × '+qty+'</small><div class="qty"><button onclick="changeQty('+i+',-1)">−</button><span>'+qty+'</span><button onclick="changeQty('+i+',1)">+</button></div></div><button onclick="remove('+i+')">×</button></div>'
  }).join('')||'<p style="color:#9ca69b">Košík je zatiaľ prázdny.</p>';
  document.querySelector('#total').textContent=money(total);
  document.querySelector('#cartCount').textContent=itemsCount
}function openCart(){document.querySelector('#cart').classList.add('open');document.querySelector('#overlay').classList.add('show')}function closeCart(){document.querySelector('#cart').classList.remove('open');document.querySelector('#overlay').classList.remove('show')}function openCustom(){document.querySelector('#customModal').classList.add('open');document.querySelector('#keyName').focus()}function closeCustom(){document.querySelector('#customModal').classList.remove('open')}document.querySelectorAll('.filters button').forEach(b=>b.onclick=()=>{document.querySelectorAll('.filters button').forEach(x=>x.classList.remove('active'));b.classList.add('active');render(b.dataset.cat)});document.querySelectorAll('.colorChoice').forEach(b=>b.onclick=()=>{document.querySelectorAll('.colorChoice').forEach(x=>x.classList.remove('active'));b.classList.add('active')});document.querySelector('#keyName').oninput=e=>document.querySelector('#keyPreview').textContent=e.target.value.trim()||'TVOJE MENO';document.querySelector('#addCustom').onclick=addCustomKeychain;document.querySelector('#customOpen').onclick=openCustom;document.querySelector('#customTeaser')?.addEventListener('click',openCustom);document.querySelector('#customClose').onclick=closeCustom;document.querySelector('#cartBtn').onclick=openCart;document.querySelector('#closeCart').onclick=closeCart;document.querySelector('#overlay').onclick=closeCart;document.querySelector('#customModal').onclick=e=>{if(e.target.id==='customModal')closeCustom()};document.addEventListener('keydown',e=>{if(e.key==='Escape'){closeCustom();closeCheckout()}});function openCheckout(){if(!cart.length){alert('Najprv pridaj produkt do košíka.');return}document.querySelector('#checkoutModal').classList.add('open')}function closeCheckout(){document.querySelector('#checkoutModal').classList.remove('open')}document.querySelector('#checkout').onclick=openCheckout;document.querySelector('#checkoutClose').onclick=closeCheckout;document.querySelector('#checkoutModal').onclick=e=>{if(e.target.id==='checkoutModal')closeCheckout()};document.querySelector('#sendOrder').onclick=()=>{const name=document.querySelector('#orderName').value.trim(),
email=document.querySelector('#orderEmail').value.trim(),
phone=document.querySelector('#orderPhone').value.trim(),
place=document.querySelector('#selectedPlace').textContent.trim();if(!name||!email||!phone||!place){alert('Vyplň prosím všetky údaje a vyber výdajné miesto.');return} if(!/^\\S+@\\S+\\.\\S+$/.test(email)){alert('Skontroluj e-mailovú adresu.');return}alert('Objednávka je pripravená!\n\n'+name+'\n'+email+'\n'+phone+'\nDoručenie: '+place+'\n\nObjednávku následne spracuje rodič a overí konkrétne Packeta výdajné miesto.');closeCheckout();};
const pickupPlaces=[
  {name:'Packeta – Nitra, centrum',city:'Nitra'},
  {name:'Packeta – Nitra, Chrenová',city:'Nitra'},
  {name:'Packeta – Cífer, centrum',city:'Cífer'},
  {name:'Packeta – Trnava, centrum',city:'Trnava'},
  {name:'Packeta – Bratislava, centrum',city:'Bratislava'},
  {name:'Packeta – Košice, centrum',city:'Košice'}
];
function renderPickups(query=''){
  const q=query.trim().toLowerCase();
  const results=pickupPlaces.filter(p=>!q||p.name.toLowerCase().includes(q)||p.city.toLowerCase().includes(q));
  const el=document.querySelector('#packetaResults');
  el.innerHTML=results.length?results.map((p,i)=>'<button type="button" class="pickup" data-place="'+p.name.replace(/"/g,'&quot;')+'">📦 <span><b>'+p.name+'</b><br><small>'+p.city+'</small></span><span>›</span></button>').join(''):'<div class="noResults">Miesto sme nenašli. Skús iné mesto alebo obec.</div>';
  el.querySelectorAll('.pickup').forEach(btn=>btn.onclick=()=>{
    document.querySelectorAll('.pickup').forEach(x=>x.classList.remove('active'));
    btn.classList.add('active');
    document.querySelector('#selectedPlace').textContent=btn.dataset.place;
  });
}
document.querySelector('#packetaSearchBtn').onclick=()=>renderPickups(document.querySelector('#packetaSearch').value);
document.querySelector('#packetaSearch').oninput=e=>renderPickups(e.target.value);
render();renderTop();renderCart();renderPickups();
