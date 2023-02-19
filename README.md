# **💎 React Super Tilemap 💎**

This package provides an implementation as a React component of a low-level 2D tilemap optimized for high-performance rendering in web browsers, as well as a set of implementations to operate with a camera or moving tilemap elements.

## **Motivations**



## **Installation**

```ssh
npm i react-super-tilemap
// OR
yarn add react-super-tilemap
```

# **Getting started**

## **🎞 Sprite 🎞**

[**SpriteDefinition API 📜**]()

Mainly you will need to define the set of sprites that the map will render. These sprites can be oriented to different purposes and have configurations so you can adapt them according to your needs.

### **Basic sprite**

```ts
import { SpriteDefinition } from 'react-super-tilemap'

// Tip: any string you could pass to an <image src={...} /> is a valid imageSrc 
const grass = '{ path to your sprite image }'

const sprites: SpriteDefinition[] = [
    {
        key: 'grass',
        imageSrc: [grass],
    },

    ...
]

```

### **Animated sprite**

When you need a sprite to have an animation, you have the possibility to declare an array of imageSrc and the animationDelay field where you can adjust the transition  time between images in milliseconds.

**It is important that each of the images have the same size**, otherwise the tilemap will throw an exception on the initial load of the sprite definition.

```ts

const sprites: SpriteDefinition[] = [

    ...

    {
        key: 'ocean',
        imageSrc: [ocean_1, ocean_2, ocean_3, ocean_4],
        animationDelay: 400
    }
]

```

### **Oversized and offseted sprite**

You can declare oversized and offset sprites when you have elements that stick out of the tile grid.

```ts

const sprites: SpriteDefinition[] = [

    ...

    {
        key: 'selector',
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
]

```

## **🗺 Tilemap 🗺**

[**Tilemap API 📜**]()

[**Demo 🕹**]()

This is the main component to start painting in your React application 2D tilemaps.

```ts
import { Tilemap, SpriteDefinition } from 'react-super-tilemap'

const sprites: SpriteDefinition[] = [...]

const scheme: string[][][] = [
    [
        ['ocean'],
        ['ocean'],
    ],
    [
        ['grass'],
        ['grass'],
    ]
]

const YourComponent = () => (
    <Tilemap
        tilmapScheme={scheme}
        spriteDefinition={sprites}
    >
        ...
    </Tilemap>
)
```

## **🎥 Camera 🎥**

### **Manual camera**

[**ManualCamera API 📜**]()

[**Demo 🕹**]()

This component is used to manually control the camera position and zoom of the tilemap.

```ts
import { Tilemap, ManualCamera } from 'react-super-tilemap'

const YourComponent = () => (
    <Tilemap
        tilmapScheme={scheme}
        spriteDefinition={sprites}
    >
        <ManualCamera 
            position={{
                col: 0,
                row: 0,
            }}
            zoom={0}
        />
    </Tilemap>
)
```

### **Third person camera**

[**ThirdPersonCamera API 📜**]()

[**Demo 🕹**]()

Use this component to operate with a third person camera in the tilemap.

Here you can forget about control the camera position and zoom because this component will do it for you enabling drag and zoom controls by default.

```ts
import { Tilemap, ThirdPersonCamera } from 'react-super-tilemap'

const YourComponent = () => {
    return (
        <Tilemap
            tilmapScheme={scheme}
            spriteDefinition={sprites}
        >
            <ThirdPersonCamera />
        </Tilemap>
    )
}
```

### **Third person camera context**

[**ThirdPersonCameraContext API 📜**]()

[**Demo 🕹**]()

```ts
import { Tilemap, ThirdPersonCamera, useThirdPersonCameraContext } from 'react-super-tilemap'

const CameraControls = () => {
    const {
        addZoomMotion,
    } = useThirdPersonCameraContext();

    const resetZoom = () => addZoomMotion(motionSettings, 0);

    return (
        <button onClick={resetZoom}>Reset zoom</buttton>
    );
}

const YourComponent = () => {
    return (
        <Tilemap
            tilmapScheme={scheme}
            spriteDefinition={sprites}
        >
            <ThirdPersonCamera>
                <CameraControls />
            </ThirdPersonCamera>
        </Tilemap>
    )
}
```


## **♟ Element ♟**

### **Manual element**

[**ManualElement API 📜**]()

[**Demo 🕹**]()

### **Motionable element**

[**MotionableCamera API 📜**]()

[**Demo 🕹**]()

# **API**

## **Size**

## **TilePosition**

## **SpriteDefinition**

| Prop           | Type         | Description                                                                                  | Default                 |
|----------------|--------------|----------------------------------------------------------------------------------------------|-------------------------|
| key            | string       | Unique key to idenitfy the sprite                                                            |                         |
| imageSrc       | string[]     | List of image sources to be used as sprite frames                                            |                         |
| animationDelay | number       | Delay in milliseconds between each animation frame.                                          | 1000                    |
| size           | Size         | Sprite's size in tiles. Indicates how many tiles the sprite will occupy.                     | { width: 1, height: 1 } |
| offset         | TilePosition | Sprite's offset in tiles. Indicates how many tiles the sprite will be offset from it origin. | { col: 0, row: 0 }      |

## **Tilemap**

| Prop                 | Type                         | Description                                                                                        | Default |
|----------------------|------------------------------|----------------------------------------------------------------------------------------------------|---------|
| defaultTileSize      | number                       | Tile default size in px                                                                            | 16      |
| backgroundColor      | string                       | Tilemap's background color. (It must be a valid CSS color)                                         | #cbf0ff |
| tilemapSchema        | string[][][]                 | Scheme of Columns/rows/layers of sprite keys that will be rendered on the tile map                 |         |
| spriteDefinition     | SpriteDefinition[]           | Definition of the sprites that tilemap will render                                                 |         |
| onSpritesLoadError   | (error: Error) => void       | It will be called when an error occurs while loading sprites                                       |         |
| onTilemapClick       | (tile: TilePosition) => void | It will be called when the tilemap is clicked, even if is not a valid tile where the click happened        |         |
| onTilemapDoubleClick | (tile: TilePosition) => void | It will be called when the tilemap is double clicked, even if is not a valid tile where the click happened |         |
| onTilemapContextMenu | (tile: TilePosition) => void | It will be called when the tilemap is right clicked, even if is not a valid tile where the click happened  |         |
| onTileClick          | (tile: TilePosition) => void | It will be called when defined tilemap's tile are clicked                                          |         |
| onTileDoubleClick    | (tile: TilePosition) => void | It will be called when a tile is double clicked                                                    |         |
| onTileContextMenu    | (tile: TilePosition) => void | It will be called when a tile is right clicked                                                     |         |
| onTileHover          | (tile: TilePosition) => void | It will be called when a tile is hovered                                                           |         |
| onTileHoverOut       | (tile: TilePosition) => void | It will be called when a tile is hovered out                                                       |         |


## **ManualCamera**

## **ThirdPersonCamera**

## **ThirdPersonCameraContext**

## **ManualElement**
