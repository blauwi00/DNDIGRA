// Version dispatch: never reinterpret an existing seed with a new algorithm.
import * as v1 from '../worldgen-v1/world.js';
import * as v2 from './world-v2.js';
import * as v3 from './world-v3.js';
export const GEN_VERSION=3, SUPPORTED_VERSIONS=[1,2,3];
export const {randomSeed,SIZES,TOWN_SIZES}=v2;
const engine=v=>{if(v===1)return v1;if(v===2)return v2;if(v===3)return v3;throw Error('Версия генератора этого мира не поддерживается.');};
export function normalizeGen(gen={}){const v=gen.v??GEN_VERSION;return {...engine(v).normalizeGen(gen),v};}
export const createWorld=(seed,size,v=GEN_VERSION)=>engine(v).createWorld(seed,size);
export const generateScene=(plan,id)=>engine(plan.v).generateScene(plan,id);
export const sceneIds=plan=>engine(plan.v).sceneIds(plan);
export const isGeneratedId=(plan,id)=>engine(plan.v).isGeneratedId(plan,id);
export const exits=scene=>engine(scene.gen?.planVersion??GEN_VERSION).exits(scene);
export const validateScene=scene=>engine(scene.gen?.planVersion??GEN_VERSION).validateScene(scene);
// Archived v1 never exposed brief helpers; its adapter has always been v2's.
export const gmBrief=plan=>(plan.v===3?v3:v2).gmBrief(plan);
export const npcBrief=(scene,prop)=>(scene.gen?.planVersion===3?v3:v2).npcBrief(scene,prop);
