// ---------- the island's campaign: acts, what the hero has learned, how it ends ----------
// One island is one campaign, as one party at the table: a trouble in plain sight (act 1), the truth
// behind it (act 2), the confrontation and its choice (act 3), and an ending put together from what the
// hero did. Facts are written into the chronicle as the hero learns them, so the story can be re-read.
// Format and how to add more secrets: docs/CAMPAIGN.md.
const CAMPAIGN={id:'tax',title:'Голодный налог',
  acts:[{n:'Беда на дорогах',goal:'Помочь страже на тракте и заслужить доверие короля.'},{n:'Кто такой Ворон',goal:'Узнать, кто стоит за всеми шайками острова.'},
    {n:'Рагнар',goal:'Решить судьбу атамана.'},{n:'После',goal:'Остров живёт дальше.'}],
  facts:{rumor:'Жители говорят, что у разбойников появился один главный — Ворон.',
    king:'Король: все шайки слушаются Ворона. Начать со старухи в бедном посёлке.',
    old:'Старуха: люди Ворона ходят ночью к руинам и носят чёрные перья. Днём там пусто.',
    feather:'Чёрное перо с красной ниткой — знак людей Ворона.',
    riddle:'Камень в руинах: «Днём я сплю, ночью летаю. Покажи мне моё перо — и я пущу тебя к хозяину».',
    list:'В замке, в списке стражи, имя «капитан Рагнар» вычеркнуто так, что прорвана бумага.',
    ragnar:'Ворон — это Рагнар, бывший капитан стражи. Его выгнали за отказ выбивать налог из голодного посёлка.',
    pack:'В глухом лесу живёт Седой — вожак волков. С ним можно говорить.'}};
const KNOWN=new Set();let actShown=0;
function learn(k){if(KNOWN.has(k)||!CAMPAIGN.facts[k])return;KNOWN.add(k);toast('Летопись: новая запись');save();}
function actNow(){const q=Q.raven;if(!q||q.state===0)return 0;if(q.state===3)return 3;return q.step==='lair'||q.state===2?2:1;}
function actCheck(){const a=actNow();if(a>actShown){actShown=a;setTimeout(()=>banner('Акт '+(a+1)+' · '+CAMPAIGN.acts[a].n),1200);}}
function epilogue(){const q=Q.raven,L=[];
  L.push(q.spared?'Рагнар служит на дальнем маяке. Налог с бедных посёлков отменён, и в посёлке '+q.oldA.place.n+' впервые за много лет хватает хлеба.':'Рагнара похоронили без имени. Налог остался, но на дорогах снова спокойно.');
  L.push(PACK_ANGRY?'Стая Седого помнит обиду: по ночам в лесу опасно.':SEDOY&&SEDOY.deal&&SEDOY.deal.done?'Волки Седого не трогают людей, а охотники больше не ставят капканы.':'Седой так и живёт в глухом лесу, сам по себе.');
  L.push({left:'Огонь часовни горит ровно.',broken:'Часовня стоит тёмной: мёртвые больше не встают.',kept:'Сердце часовни у вас, и огонь там едва теплится.',absorbed:'Пламя часовни живёт теперь в вас.'}[ART.fate]||'Часовня в руинах ждёт своего часа.');
  L.push('Для Заводи вы — '+repName('village')+', для королевства — '+repName('kingdom')+'.');return L.join(' ');}
function journal(){const a=actNow(),A=CAMPAIGN.acts[a],facts=[...KNOWN].map(k=>CAMPAIGN.facts[k]);
  const pages=['«'+CAMPAIGN.title+'». Акт '+(a+1)+' · '+A.n+'. '+A.goal+(facts.length?'':' Записей пока нет: расспрашивайте людей.')];
  for(let i=0;i<facts.length;i+=2)pages.push(facts.slice(i,i+2).join(' '));if(a===3)pages.push(epilogue());
  const show=i=>say('Летопись острова',pages[i],i+1<pages.length?[['Дальше',()=>show(i+1)]]:[]);show(0);}
function campaignSave(){return {known:[...KNOWN],act:actShown};}
function campaignLoad(d){if(!d)return;for(const k of d.known||[])KNOWN.add(k);actShown=d.act||0;}
