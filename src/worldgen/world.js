// Version dispatch: never reinterpret an existing seed with a new algorithm.
import * as v1 from '../worldgen-v1/world.js';
import * as v2 from './world-v2.js';
export const GEN_VERSION=2, SUPPORTED_VERSIONS=[1,2];
export const {randomSeed,SIZES,TOWN_SIZES,gmBrief,npcBrief}=v2;
const engine=v=>{if(v===1)return v1;if(v===2)return v2;throw Error('Версия генератора этого мира не поддерживается.');};
export function normalizeGen(gen={}){const v=gen.v??GEN_VERSION;return {...engine(v).normalizeGen(gen),v};}
export const createWorld=(seed,size,v=GEN_VERSION)=>engine(v).createWorld(seed,size);
export const generateScene=(plan,id)=>engine(plan.v).generateScene(plan,id);
export const sceneIds=plan=>engine(plan.v).sceneIds(plan);
export const isGeneratedId=(plan,id)=>engine(plan.v).isGeneratedId(plan,id);
export const exits=scene=>engine(scene.gen?.planVersion??GEN_VERSION).exits(scene);
export const validateScene=scene=>engine(scene.gen?.planVersion??GEN_VERSION).validateScene(scene);
