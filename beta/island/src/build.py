import re,os
OUT=os.environ.get('OUT','..')  # where island.html goes; the local-three preview is only written for scratch testing
head=open('head.html').read();stage=open('stage.html').read();models=open('models.js').read();tex=open('tex.js').read()+open('weapons.js').read();rig=open('rig.js').read();hands=open('hands.js').read();main=open('main.js').read()
head=head.replace('<title>Эталонный кусок острова</title>','<title>Остров Хельги</title>')
head=head.replace('</style>','''.zone{position:absolute;left:50%;top:16%;transform:translateX(-50%);font-family:var(--display);font-size:clamp(20px,3.4vw,30px);color:#f3e2bd;text-shadow:0 2px 8px #000;opacity:0;pointer-events:none}
.zone.show{animation:zone 2.6s ease}
@keyframes zone{0%{opacity:0;transform:translate(-50%,8px)}15%,70%{opacity:1;transform:translate(-50%,0)}100%{opacity:0}}
@media (prefers-reduced-motion:reduce){.zone.show{animation:none;opacity:1}}
.fade{position:absolute;inset:0;background:#05070a;opacity:0;pointer-events:none;transition:opacity .25s;z-index:8}.fade.on{opacity:1}
.talk{position:absolute;left:50%;bottom:24px;transform:translateX(-50%);width:min(440px,calc(100% - 340px));min-width:240px;z-index:9;background:#1d1611;color:#f0e2c2;padding:12px 14px;
  font-family:"PT Sans",system-ui,sans-serif;box-shadow:inset 0 0 0 2px #b8923e,inset 0 0 0 4px #1d1611,inset 0 0 0 6px #4a3522,0 6px 0 #0008}
.talk b{color:#f2c14e;font-size:14px;text-shadow:2px 2px 0 #000}.talk p{margin:6px 0 10px;font-size:14px;line-height:1.35}
.talk div{display:flex;gap:8px;flex-wrap:wrap}.talk button{font:inherit;font-size:13px;color:#f0e2c2;background:#3a2a1a;border:0;padding:8px 12px;min-height:36px;box-shadow:inset 0 0 0 2px #b8923e;cursor:pointer}
.talk button:last-child{background:#0e0a07;box-shadow:inset 0 0 0 2px #4a3522}
.quest{position:absolute;top:84px;left:max(16px,env(safe-area-inset-left,0px));max-width:300px;font-family:"PT Sans",system-ui,sans-serif;font-size:12px;color:#e8d8b4;pointer-events:none;text-shadow:1px 1px 0 #000}
.quest div{background:#1d1611cc;padding:5px 8px;margin-bottom:4px;box-shadow:inset 3px 0 0 #f2c14e}.quest div.done{box-shadow:inset 3px 0 0 #7fe08a;color:#bfe8b0}
[hidden]{display:none!important}
.hp,.title,.quest{text-shadow:0 1px 2px #000,0 0 6px #000}
#sneak.on,#stone.on{box-shadow:inset 0 0 0 2px #7fd0ff;color:#cfeeff}
.cstat{font-size:12px;color:#d8c8a6}
.order{position:absolute;top:10px;left:50%;transform:translateX(-50%);display:flex;gap:4px;z-index:6;font-family:"PT Sans",system-ui,sans-serif;font-size:11px;max-width:calc(100% - 360px);flex-wrap:wrap;justify-content:center}
.order span{background:#1d1611e6;color:#e8d8b4;padding:4px 7px;box-shadow:inset 0 0 0 2px #4a3522}.order .round{color:#f2c14e;box-shadow:none;background:#0e0a07cc}
.order .now{box-shadow:inset 0 0 0 2px #f2c14e;color:#fff;transform:translateY(2px)}.order .me{color:#9fe0ff}
.roll{position:absolute;left:50%;top:30%;transform:translateX(-50%);z-index:8;background:#1d1611f0;color:#f0e2c2;padding:10px 16px;text-align:center;min-width:240px;pointer-events:none;
  font-family:"PT Sans",system-ui,sans-serif;box-shadow:inset 0 0 0 2px #b8923e,inset 0 0 0 4px #1d1611,inset 0 0 0 6px #4a3522,0 6px 0 #0008}
.roll small{display:block;color:#f2c14e;font-size:13px}.roll .dz{display:flex;gap:10px;justify-content:center;margin:8px 0}
.roll .d20{width:46px;height:46px;display:grid;place-items:center;font-size:22px;font-weight:700;color:#fff;background:#3a2a1a;clip-path:polygon(50% 0,100% 25%,100% 75%,50% 100%,0 75%,0 25%)}
.roll .d20.spin{animation:spin .12s linear infinite}.roll .d20.ok{background:#3c6a34}.roll .d20.no{background:#7a2620}.roll .d20.crit{background:#c8962a;color:#1d1611}.roll .d20.drop{opacity:.35}
@keyframes spin{50%{transform:rotate(30deg) scale(.9)}}
.roll p{margin:2px 0;font-size:13px}.roll b.ok{color:#8fe07a}.roll b.no{color:#ff7d6e}.roll .dmg{color:#ffd27a}
.amenu{position:absolute;z-index:9;background:#1d1611;padding:8px;display:flex;flex-direction:column;gap:5px;min-width:190px;font-family:"PT Sans",system-ui,sans-serif;
  box-shadow:inset 0 0 0 2px #b8923e,inset 0 0 0 4px #1d1611,inset 0 0 0 6px #4a3522,0 6px 0 #0008}
.amenu>b{font-size:12px;color:#f2c14e;padding:2px 4px}.amenu button{display:flex;justify-content:space-between;gap:12px;font:inherit;font-size:13px;color:#f0e2c2;background:#3a2a1a;border:0;padding:8px 10px;min-height:38px;box-shadow:inset 0 0 0 2px #6a4a2a;cursor:pointer;text-align:left}
.amenu button small{color:#8fe07a;font-size:12px}.amenu button:disabled{opacity:.45;cursor:not-allowed}.amenu button:disabled small{color:#a8987a}
@media (prefers-reduced-motion:reduce){.roll .d20.spin{animation:none}}
@media (max-height:440px){.roll{top:22%;padding:6px 12px}.roll .d20{width:36px;height:36px;font-size:17px}.order{top:6px;max-width:calc(100% - 300px)}.cstat{font-size:11px}.title p,.bar-ui .hint{display:none}.title h1{font-size:20px}.bar-ui{padding:6px 10px!important;gap:8px}.bar-ui button{min-height:36px;padding:6px 14px!important}.quest{top:44px}.palm{width:88px!important;height:88px!important;bottom:-10px!important}.inv{bottom:60px!important;width:172px!important;padding:8px!important}.inv .grid{grid-template-columns:repeat(4,34px)!important;gap:5px!important}.inv button{width:34px!important;height:34px!important}.inv h4{font-size:12px!important;margin-bottom:6px!important}.held{width:34px!important;height:34px!important;padding:5px!important;bottom:26px!important}.held.l{left:66px!important}.held.r{right:66px!important}.hp{width:120px!important}}
@media (max-width:700px){.talk{width:calc(100% - 32px);bottom:auto;top:70px}}
'''+open('ui.css').read()+'''</style>''',1)
stage=re.sub(r'<div class="title">.*?</div>','<div class="title"><h1>Остров Хельги · ночь</h1><p>Причал, деревня, лес, руины и кладбище</p></div><div class="zone" id="zone" aria-live="polite"></div><div class="quest" id="quest" hidden></div><div class="talk" id="talk" hidden role="dialog" aria-live="polite"></div><div class="fade" id="fade"></div><div class="order" id="order" hidden></div><div class="roll" id="roll" hidden aria-live="polite"></div>',stage,count=1,flags=re.S)
i=stage.index('<div class="bar-ui">');j=stage.index('</div>',i)+6
stage=stage[:i]+stage[j:]
# version shown in the menu corner: 0.<number of island changes>, counting the one being built, and the build date
import subprocess,datetime
try:n=int(subprocess.run(['git','rev-list','--count','HEAD','--','.'],capture_output=True,text=True,cwd=os.path.dirname(os.path.abspath(__file__))+'/..').stdout.strip())+1
except Exception:n=0
VERSION='0.%d · %s'%(n,datetime.date.today().strftime('%d.%m.%Y'))
stage=stage.replace('<canvas id="c"></canvas>','<canvas id="c"></canvas>'+open('ui.html').read().replace('{VERSION}',VERSION),1)
rig=rig.replace("window.equipHero=(L,R)=>{const two=TWO.has(L)?L:TWO.has(R)?R:null;","window.equipHero=(L,R)=>{const two=TWO.has(L)?L:TWO.has(R)?R:null;hero.userData.held={L:two?null:L,R:two?null:R,two};")
main=main.replace('{INTERIORS}',open('interiors.js').read()).replace('{EXTRAS}',open('extras.js').read()).replace('{COMBAT}',open('combat.js').read().replace('{RACES}',open('races.js').read()).replace('{CLASSES}',open('classes.js').read())).replace('{UI}',open('ui.js').read()).replace('{EDITOR}',open('editor.js').read()).replace('{LIFE}',open('life.js').read()+'\n'+open('people.js').read()).replace('{INTRO}',open('intro.js').read()+'\n'+open('settings.js').read()).replace('{RIG}',rig).replace("setHeld(hero,'L','shield');setHeld(hero,'R','sword');","setHeld(hero,'L','shield');setHeld(hero,'R','sword');hero.userData.held={L:'shield',R:'sword'};",1)
chars=open('../../../dist/characters.js').read()
main='window.__chars=1;\n'+main
# fonts are inlined (SIL Open Font License) so text looks right offline and in the app
head=head.replace('</style>',open('fonts.css').read()+'\n</style>',1)
out='<!-- За гранью · Остров Хельги. Copyright (c) 2026 blauwi00. Все права защищены. Копирование, распространение и изменение без разрешения запрещены. three.js — MIT, шрифты — SIL OFL 1.1. -->\n<meta name="copyright" content="© 2026 blauwi00. Все права защищены.">\n<meta name="viewport" content="width=device-width,initial-scale=1,viewport-fit=cover">\n'+head+stage+'<script src="https://cdnjs.cloudflare.com/ajax/libs/three.js/r128/three.min.js"></script>\n<script>\n'+chars+'\n</script>\n<script>\n'+models+tex+main+'\n'+hands+'\n</script>\n'
open(os.path.join(OUT,'island.html'),'w').write(out)
# inside the app: a local three.js copy (works offline and in the native shell) and a way back to the game menu
APP=os.environ.get('APP')
if APP:
  os.makedirs(APP,exist_ok=True)
  app=out.replace('https://cdnjs.cloudflare.com/ajax/libs/three.js/r128/three.min.js','three.min.js').replace('<script>\n','<script>\nwindow.ISLAND_IN_APP=true;\n',1)
  open(os.path.join(APP,'index.html'),'w').write('<!doctype html><html lang="ru"><head><meta charset="utf-8">'+app+'</html>')
# the standalone public site (Netlify publishes this folder): no link back into the game, hidden from search engines
SITE=os.environ.get('SITE')
if SITE:
  import shutil
  os.makedirs(SITE,exist_ok=True)
  site=out.replace('https://cdnjs.cloudflare.com/ajax/libs/three.js/r128/three.min.js','three.min.js').replace('<meta name="viewport"','<meta name="robots" content="noindex,nofollow"><meta name="viewport"',1)
  open(os.path.join(SITE,'index.html'),'w').write('<!doctype html><html lang="ru"><head><meta charset="utf-8">'+site+'</html>')
  root=os.path.join(os.path.dirname(os.path.abspath(__file__)),'../../..')
  shutil.copy(os.path.join(root,'dist/island/three.min.js'),SITE);shutil.copy(os.path.join(root,'LICENSE'),os.path.join(SITE,'LICENSE.txt'));shutil.copy(os.path.join(root,'THIRD_PARTY_NOTICES.md'),SITE)
  open(os.path.join(SITE,'robots.txt'),'w').write('User-agent: *\nDisallow: /\n')
prev='<!doctype html><html><head><meta charset="utf-8"></head><body style="margin:0">'+out.replace('https://cdnjs.cloudflare.com/ajax/libs/three.js/r128/three.min.js','package/build/three.min.js')+'</body></html>'
print('built',len(out))
