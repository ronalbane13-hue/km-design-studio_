const $=id=>document.getElementById(id);
const canvas=$('designCanvas'),ctx=canvas.getContext('2d');
const state={template:'bold',accent:'#e3212b',image:null,imageUrl:null};
const fields=['productName','productCode','productDescription','productPrice','showPrice'];
function text(id){return $(id).value.trim()}
function fitText(str,max){return str.length>max?str.slice(0,max-1)+'…':str}
function drawImageContain(img,x,y,w,h){const scale=Math.min(w/img.width,h/img.height);const dw=img.width*scale,dh=img.height*scale;ctx.drawImage(img,x+(w-dw)/2,y+(h-dh)/2,dw,dh)}
function draw(){
 const name=fitText(text('productName')||'Nombre del producto',30),code=fitText(text('productCode')||'CÓDIGO',26),desc=fitText(text('productDescription')||'Descripción del producto',70),price=text('productPrice');
 ctx.clearRect(0,0,1080,1080);
 if(state.template==='bold'){
  ctx.fillStyle='#111214';ctx.fillRect(0,0,1080,1080);ctx.fillStyle=state.accent;ctx.fillRect(0,0,22,1080);ctx.fillStyle='#202124';ctx.beginPath();ctx.moveTo(760,0);ctx.lineTo(1080,0);ctx.lineTo(1080,1080);ctx.lineTo(920,1080);ctx.closePath();ctx.fill();
  ctx.fillStyle='#fff';ctx.font='800 42px Arial';ctx.fillText('KM',70,92);ctx.fillStyle=state.accent;ctx.fillRect(70,120,110,8);
  ctx.fillStyle='#888';ctx.font='bold 19px Arial';ctx.fillText('REPUESTOS Y ACCESORIOS',70,185);
  ctx.fillStyle='#fff';ctx.font='900 70px Arial';wrap(name.toUpperCase(),70,285,570,82);
  ctx.fillStyle='#aaa';ctx.font='27px Arial';wrap(desc,72,490,470,42);
  if(state.image)drawImageContain(state.image,520,420,500,470);else placeholder(560,430,420,410);
  ctx.fillStyle='#777';ctx.font='bold 18px Arial';ctx.fillText(code.toUpperCase(),72,850);
  if($('showPrice').checked&&price){ctx.fillStyle=state.accent;ctx.font='900 48px Arial';ctx.fillText(price,72,930)}
  ctx.fillStyle='#aaa';ctx.font='bold 17px Arial';ctx.fillText('KMMOTOS.COM',72,1010);
 }else if(state.template==='clean'){
  ctx.fillStyle='#f0efec';ctx.fillRect(0,0,1080,1080);ctx.fillStyle='#161616';ctx.font='800 40px Arial';ctx.fillText('KM MOTOS',70,85);ctx.fillStyle=state.accent;ctx.fillRect(70,115,940,5);
  if(state.image)drawImageContain(state.image,140,170,800,520);else placeholder(230,220,620,420,true);
  ctx.fillStyle='#171717';ctx.font='900 62px Arial';wrap(name,75,770,900,70);
  ctx.fillStyle='#686868';ctx.font='25px Arial';ctx.fillText(code.toUpperCase(),78,910);
  ctx.fillStyle='#555';ctx.font='23px Arial';wrap(desc,78,960,650,31);
  if($('showPrice').checked&&price){ctx.fillStyle=state.accent;ctx.font='bold 35px Arial';ctx.textAlign='right';ctx.fillText(price,1000,1010);ctx.textAlign='left'}
 }else{
  ctx.fillStyle='#171a1f';ctx.fillRect(0,0,1080,1080);ctx.strokeStyle='#303944';ctx.lineWidth=2;for(let i=0;i<1080;i+=54){ctx.beginPath();ctx.moveTo(i,0);ctx.lineTo(i,1080);ctx.stroke();ctx.beginPath();ctx.moveTo(0,i);ctx.lineTo(1080,i);ctx.stroke()}
  ctx.fillStyle=state.accent;ctx.fillRect(0,0,1080,18);ctx.fillStyle='#fff';ctx.font='800 34px Arial';ctx.fillText('KM MOTOS  /  PRODUCT SERIES',65,92);
  ctx.fillStyle='#aeb7c2';ctx.font='bold 18px Arial';ctx.fillText('FICHA DE PRODUCTO',65,160);
  ctx.fillStyle='#fff';ctx.font='900 64px Arial';wrap(name.toUpperCase(),65,250,850,74);
  if(state.image)drawImageContain(state.image,180,330,720,450);else placeholder(240,360,600,390);
  ctx.fillStyle=state.accent;ctx.fillRect(65,835,950,4);ctx.fillStyle='#c4cbd3';ctx.font='bold 21px Arial';ctx.fillText('CÓDIGO  '+code.toUpperCase(),65,890);
  ctx.fillStyle='#fff';ctx.font='24px Arial';wrap(desc,65,940,670,31);
  if($('showPrice').checked&&price){ctx.fillStyle=state.accent;ctx.font='bold 32px Arial';ctx.textAlign='right';ctx.fillText(price,1015,990);ctx.textAlign='left'}
 }
}
function wrap(str,x,y,maxWidth,lineHeight){const words=str.split(' ');let line='';for(const word of words){const test=line?line+' '+word:word;if(ctx.measureText(test).width>maxWidth&&line){ctx.fillText(line,x,y);line=word;y+=lineHeight}else line=test}if(line)ctx.fillText(line,x,y)}
function placeholder(x,y,w,h,light=false){ctx.fillStyle=light?'#deddd9':'#25272b';ctx.fillRect(x,y,w,h);ctx.strokeStyle=light?'#c2c0bb':'#45484e';ctx.lineWidth=3;ctx.strokeRect(x+18,y+18,w-36,h-36);ctx.fillStyle='#777';ctx.textAlign='center';ctx.font='bold 22px Arial';ctx.fillText('FOTOGRAFÍA DEL PRODUCTO',x+w/2,y+h/2);ctx.textAlign='left'}
fields.forEach(id=>$(id).addEventListener('input',draw));
$('imageUpload').addEventListener('change',e=>{const file=e.target.files[0];if(!file)return;if(state.imageUrl)URL.revokeObjectURL(state.imageUrl);state.imageUrl=URL.createObjectURL(file);const img=new Image();img.onload=()=>{state.image=img;draw()};img.src=state.imageUrl});
$('removeImage').addEventListener('click',()=>{state.image=null;$('imageUpload').value='';if(state.imageUrl)URL.revokeObjectURL(state.imageUrl);state.imageUrl=null;draw()});
document.querySelectorAll('.template-card').forEach(btn=>btn.addEventListener('click',()=>{state.template=btn.dataset.template;document.querySelectorAll('.template-card').forEach(b=>b.classList.toggle('active',b===btn));draw()}));
$('accentColor').addEventListener('input',e=>{state.accent=e.target.value;$('colorValue').textContent=state.accent.toUpperCase();draw()});
document.querySelectorAll('.swatch').forEach(btn=>btn.addEventListener('click',()=>{$('accentColor').value=btn.dataset.color;state.accent=btn.dataset.color;$('colorValue').textContent=state.accent.toUpperCase();draw()}));
$('downloadBtn').addEventListener('click',()=>{const link=document.createElement('a');link.download='km-motos-publicacion.png';link.href=canvas.toDataURL('image/png');link.click()});
draw();