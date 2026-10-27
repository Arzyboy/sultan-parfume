const http=require('http'),fs=require('fs'),path=require('path');
const root=__dirname;const db=JSON.parse(fs.readFileSync(path.join(root,'data.json'),'utf8'));
const types={'.html':'text/html; charset=utf-8','.css':'text/css; charset=utf-8','.js':'text/javascript; charset=utf-8','.json':'application/json; charset=utf-8','.png':'image/png','.svg':'image/svg+xml'};
function send(res,status,payload,type='application/json; charset=utf-8'){res.writeHead(status,{'Content-Type':type,'Access-Control-Allow-Origin':'*'});res.end(typeof payload==='string'?payload:JSON.stringify(payload));}
function body(req){return new Promise(resolve=>{let raw='';req.on('data',c=>raw+=c);req.on('end',()=>{try{resolve(raw?JSON.parse(raw):{})}catch{resolve({})}})})}
const server=http.createServer(async(req,res)=>{const url=new URL(req.url,'http://localhost');
 if(req.method==='OPTIONS'){res.writeHead(204,{'Access-Control-Allow-Origin':'*','Access-Control-Allow-Headers':'Content-Type'});return res.end()}
 if(url.pathname==='/api/health')return send(res,200,{ok:true,service:'sultan-parfume-api'});
 if(url.pathname==='/api/products'&&req.method==='GET')return send(res,200,db.products);
 if(url.pathname==='/api/orders'&&req.method==='GET')return send(res,200,db.orders);
 if(url.pathname==='/api/stats'&&req.method==='GET')return send(res,200,{sales:18460000,orders:48,units:126,lowStock:db.products.filter(p=>p.stock<50).length});
 if(url.pathname==='/api/customers'&&req.method==='GET')return send(res,200,db.customers);
 if(url.pathname==='/api/suppliers'&&req.method==='GET')return send(res,200,db.suppliers);
 if(url.pathname==='/api/purchase-orders'&&req.method==='GET')return send(res,200,db.purchaseOrders);
 if(url.pathname==='/api/vouchers'&&req.method==='GET')return send(res,200,db.vouchers);
 if(url.pathname==='/api/login'&&req.method==='POST'){const input=await body(req);const users={ 'admin@sultanparfume.id':{password:'sultan2026',role:'owner',name:'Raka Admin'}, 'staff@sultanparfume.id':{password:'staff2026',role:'cashier',name:'Staff Kasir'} };const user=users[input.email];if(!user||user.password!==input.password)return send(res,401,{error:'Email atau password salah'});return send(res,200,{ok:true,user:{email:input.email,role:user.role,name:user.name},token:'demo-session'});}
 if(url.pathname==='/api/orders'&&req.method==='POST'){const input=await body(req);if(!Array.isArray(input.items)||!input.items.length)return send(res,400,{error:'items wajib diisi'});const order={id:'SP-'+String(Date.now()).slice(-5),customer:input.customer||'Walk-in customer',items:input.items,total:Number(input.total)||0,status:'Selesai'};db.orders.unshift(order);return send(res,201,order)}
 let file=url.pathname==='/'?'/public.html':url.pathname;file=path.normalize(file).replace(/^([/\\])+/, '');const full=path.join(root,file);if(!full.startsWith(root)||!fs.existsSync(full))return send(res,404,{error:'Not found'});const ext=path.extname(full);res.writeHead(200,{'Content-Type':types[ext]||'application/octet-stream'});fs.createReadStream(full).pipe(res);
});server.on('error',err=>{if(err.code==='EADDRINUSE'){console.log('Sultan Parfume sudah berjalan di http://localhost:'+(process.env.PORT||8787));process.exit(0)}throw err});server.listen(process.env.PORT||8787,()=>console.log('Sultan Parfume running at http://localhost:'+(process.env.PORT||8787)));




