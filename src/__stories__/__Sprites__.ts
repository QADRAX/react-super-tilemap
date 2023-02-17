import { SpriteDefinition } from '../types/SpriteDefinition';

const armyIdle1 =
  'https://firebasestorage.googleapis.com/v0/b/react-super-tilemap.appspot.com/o/army_idle_1.png?alt=media&token=56a4f094-6c3a-43e6-a92d-c2354d177a51';
const armyIdle2 =
  'https://firebasestorage.googleapis.com/v0/b/react-super-tilemap.appspot.com/o/army_idle_2.png?alt=media&token=066c0bef-dfb2-4d3a-8f93-e63bb91bde88';
const armyIdle3 =
  'https://firebasestorage.googleapis.com/v0/b/react-super-tilemap.appspot.com/o/army_idle_4.png?alt=media&token=01a1fab6-9383-4a6d-a9f4-0afbb880c7b3';
const building_1 =
  'https://firebasestorage.googleapis.com/v0/b/react-super-tilemap.appspot.com/o/building_1.png?alt=media&token=6be5b876-0004-45ae-91cc-d7f8df04b4dc';
const building_2 =
  'https://firebasestorage.googleapis.com/v0/b/react-super-tilemap.appspot.com/o/building_2.png?alt=media&token=1e80feb5-c522-4c80-92d5-64b6d7b6b491';
const forest1 =
  'https://firebasestorage.googleapis.com/v0/b/react-super-tilemap.appspot.com/o/forest_1.png?alt=media&token=1351efff-5d46-4824-86f7-0a919ffbabc9';
const forest2 =
  'https://firebasestorage.googleapis.com/v0/b/react-super-tilemap.appspot.com/o/forest_2.png?alt=media&token=18510b26-dbfc-47f6-9e6a-606f6cba8631';
const grass =
  'https://firebasestorage.googleapis.com/v0/b/react-super-tilemap.appspot.com/o/grass.png?alt=media&token=9c2877b9-5b2d-4021-a2d8-3d37ef90584b';
const mountain =
  'https://firebasestorage.googleapis.com/v0/b/react-super-tilemap.appspot.com/o/montain.png?alt=media&token=63bb1e76-dd3c-4d15-ae52-ad737bd54086';
const ocean1_1 =
  'https://firebasestorage.googleapis.com/v0/b/react-super-tilemap.appspot.com/o/ocean_1_1.png?alt=media&token=e78f33cd-149b-4a23-a441-c21075deb388';
const ocean1_2 =
  'https://firebasestorage.googleapis.com/v0/b/react-super-tilemap.appspot.com/o/ocean_1_2.png?alt=media&token=39945f0a-c19f-461d-be12-6a2b747278dc';
const ocean1_3 =
  'https://firebasestorage.googleapis.com/v0/b/react-super-tilemap.appspot.com/o/ocean_1_3.png?alt=media&token=fb097527-8c8a-4267-a9ff-2ab482a584ba';
const ocean1_4 =
  'https://firebasestorage.googleapis.com/v0/b/react-super-tilemap.appspot.com/o/ocean_1_4.png?alt=media&token=36679fd5-da12-47fe-8651-8103aed35269';
const road1 =
  'https://firebasestorage.googleapis.com/v0/b/react-super-tilemap.appspot.com/o/road_1.png?alt=media&token=675554f5-7a1c-4f9e-a86a-e4de2e3010cb';
const road2 =
  'https://firebasestorage.googleapis.com/v0/b/react-super-tilemap.appspot.com/o/road_2.png?alt=media&token=990b93b0-5a6e-4a6c-abdd-fa2109cdb362';
const road3 =
  'https://firebasestorage.googleapis.com/v0/b/react-super-tilemap.appspot.com/o/road_3.png?alt=media&token=7bc0c0fc-79ac-4bd7-895e-96fb5fed84d4';
const road4 =
  'https://firebasestorage.googleapis.com/v0/b/react-super-tilemap.appspot.com/o/road_4.png?alt=media&token=7fa1074e-b02a-4379-8659-741577d1589a';
const road5 =
  'https://firebasestorage.googleapis.com/v0/b/react-super-tilemap.appspot.com/o/road_5.png?alt=media&token=e2b21090-45f6-4780-abd3-dd054f1d0752';
const road6 =
  'https://firebasestorage.googleapis.com/v0/b/react-super-tilemap.appspot.com/o/road_6.png?alt=media&token=29dfe1e7-cbaf-4069-b6a2-612b7c61ecc4';
const shadow =
  'https://firebasestorage.googleapis.com/v0/b/react-super-tilemap.appspot.com/o/shadow.png?alt=media&token=8b973cbb-9606-435e-99c8-60b4ba9937e7';
const selector1 =
  'https://firebasestorage.googleapis.com/v0/b/react-super-tilemap.appspot.com/o/selector_1.png?alt=media&token=b59b6457-22ad-4c6d-a467-47d39b8e3997';
const selector2 = 
  'https://firebasestorage.googleapis.com/v0/b/react-super-tilemap.appspot.com/o/selector_2.png?alt=media&token=425f4cd4-880c-4263-8d70-b597a65913a4';


export enum SpriteName {
  forest1 = 'forest1',
  forest2 = 'forest2',
  grass = 'grass',
  shadow = 'shadow',
  mountain = 'mountain',
  road1 = 'road1',
  road2 = 'road2',
  road3 = 'road3',
  road4 = 'road4',
  road5 = 'road5',
  road6 = 'road6',
  ocean1 = 'ocean1',
  armyIdle = 'armyIdle',
  building = 'building',
  selector = 'selector',
}

export const spritesDefinition: SpriteDefinition[] = [
  {
    key: SpriteName.grass,
    imagesSrc: [grass],
  },
  {
    key: SpriteName.forest1,
    imagesSrc: [forest1],
  },
  {
    key: SpriteName.forest2,
    imagesSrc: [forest2],
  },
  {
    key: SpriteName.shadow,
    imagesSrc: [shadow],
  },
  {
    key: SpriteName.mountain,
    imagesSrc: [mountain],
  },
  {
    key: SpriteName.road1,
    imagesSrc: [road1],
  },
  {
    key: SpriteName.road2,
    imagesSrc: [road2],
  },
  {
    key: SpriteName.road3,
    imagesSrc: [road3],
  },
  {
    key: SpriteName.road4,
    imagesSrc: [road4],
  },
  {
    key: SpriteName.road5,
    imagesSrc: [road5],
  },
  {
    key: SpriteName.road6,
    imagesSrc: [road6],
  },
  {
    key: SpriteName.ocean1,
    imagesSrc: [ocean1_1, ocean1_2, ocean1_3, ocean1_4],
    animationDelay: 300,
  },
  {
    key: SpriteName.armyIdle,
    imagesSrc: [armyIdle1, armyIdle2, armyIdle3],
    animationDelay: 300,
  },
  {
    key: SpriteName.building,
    imagesSrc: [building_1, building_2],
    animationDelay: 800,
    size: {
      width: 1,
      height: 2,
    },
  },
  {
    key: SpriteName.selector,
    imagesSrc: [selector2, selector1],
    animationDelay: 800,
    size: {
      width: 2,
      height: 2,
    },
    offset: {
      col: -0.5,
      row: 0.5,
    },
  },
];

export const FirstLayerSprites = [
  SpriteName.grass,
  SpriteName.forest1,
  SpriteName.forest2,
  SpriteName.shadow,
  SpriteName.mountain,
  SpriteName.road1,
  SpriteName.road2,
  SpriteName.road3,
  SpriteName.road4,
  SpriteName.road5,
  SpriteName.road6,
  SpriteName.ocean1,
];

export const SecondLayerSprites = [
  SpriteName.building,
  SpriteName.armyIdle,
  SpriteName.selector,
];
