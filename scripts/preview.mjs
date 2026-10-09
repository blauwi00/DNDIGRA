import {createServer} from 'node:http';
import {readFile,stat} from 'node:fs/promises';
import {resolve,extname,sep} from 'node:path';
import {fileURLToPath} from 'node:url';

const root=fileURLToPath(new URL('../dist/client/',import.meta.url));
const port=Number(process.env.PORT||4173);
const types={'.html':'text/html; charset=utf-8','.js':'text/javascript; charset=utf-8','.css':'text/css; charset=utf-8','.svg':'image/svg+xml','.png':'image/png','.jpeg':'image/jpeg','.woff':'font/woff','.ttf':'font/ttf'};
createServer(async(request,response)=>{
  try{
    const url=new URL(request.url,'http://localhost');
    if(request.method!=='GET'&&request.method!=='HEAD'){response.writeHead(405);response.end();return;}
    if(url.pathname==='/'&&!url.searchParams.has('offline')){response.writeHead(302,{Location:'/?offline=1'});response.end();return;}
    if(url.pathname==='/favicon.ico'){response.writeHead(204);response.end();return;}
    const path=resolve(root,'.'+decodeURIComponent(url.pathname==='/'?'/index.html':url.pathname));
    if(!path.startsWith(resolve(root)+sep)){response.writeHead(403);response.end();return;}
    if(!(await stat(path)).isFile())throw Error('Not a file');
    response.writeHead(200,{'Content-Type':types[extname(path)]||'application/octet-stream','Cache-Control':'no-store'});
    response.end(request.method==='HEAD'?undefined:await readFile(path));
  }catch{response.writeHead(404);response.end('Not found');}
}).listen(port,'0.0.0.0',()=>console.log(`Local solo game: http://localhost:${port}/?offline=1`));
