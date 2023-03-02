# **React Super Tilemap 🗺**

[![Build](https://github.com/QADRAX/react-super-tilemap/actions/workflows/Build.yaml/badge.svg)](https://github.com/QADRAX/react-super-tilemap/actions/workflows/Build.yaml)
[![Publish](https://github.com/QADRAX/react-super-tilemap/actions/workflows/Publish.yaml/badge.svg)](https://github.com/QADRAX/react-super-tilemap/actions/workflows/Publish.yaml)
[![Publish Storybook](https://github.com/QADRAX/react-super-tilemap/actions/workflows/PublishPages.yaml/badge.svg)](https://github.com/QADRAX/react-super-tilemap/actions/workflows/PublishPages.yaml)

![TypeScript](https://img.shields.io/badge/typescript-%23007ACC.svg?style=for-the-badge&logo=typescript&logoColor=white)
![React](https://img.shields.io/badge/react-%2320232a.svg?style=for-the-badge&logo=react&logoColor=%2361DAFB)
![NPM](https://img.shields.io/badge/NPM-%23CB3837.svg?style=for-the-badge&logo=npm&logoColor=white)
![Storybook](https://img.shields.io/badge/-Storybook-FF4785?style=for-the-badge&logo=storybook&logoColor=white)

This package provides a React implementation of a low-level 2D tilemap board optimized for high-performance rendering in web browsers. 

It pretends to be the graphic engine of games or applications where you need to paint a grid map with sprites, operate with a camera and position elements on it.

- Written entirely in typescript.
- Designed for React developers.
- Minimal dependencies.
- Designed to have animations and motions.

## **Motivations**



## **Installation**

```ssh
npm i react-super-tilemap
// OR
yarn add react-super-tilemap
```

# **Getting started**

## **1) Define your sprite set**

[📜 SpriteDefinition](https://qadrax.github.io/react-super-tilemap/modules.html#SpriteDefinition)

Mainly you will need to define the set of sprites that the map will render. These sprites can be oriented to different purposes and have configurations so you can adapt them according to your needs.

### **Basic sprites**

[🕹 Demo](https://qadrax.github.io/react-super-tilemap/storybook/?path=/story/sprites-demo--sprites-basic)

[🎼 Demo code](https://github.com/QADRAX/react-super-tilemap/blob/main/src/__stories__/demos/sprites/DemoSpriteBasic.tsx)

Each sprite will need a unique key, **it is important that they are not repeated** to avoid overlapping.

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

### **Animated sprites**

[🕹 Demo](https://qadrax.github.io/react-super-tilemap/storybook/?path=/story/sprites-demo--sprites-animated)

[🎼 Demo code](https://github.com/QADRAX/react-super-tilemap/blob/main/src/__stories__/demos/sprites/DemoSpriteAnimated.tsx)

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

### **Oversized sprites**

[🕹 Demo](https://qadrax.github.io/react-super-tilemap/storybook/?path=/story/sprites-demo--sprites-oversize)

[🎼 Demo code](https://github.com/QADRAX/react-super-tilemap/blob/main/src/__stories__/demos/sprites/DemoSpriteOversize.tsx)

You can declare oversized sprites with the property `size` when you have sprites that stick out of the tile grid.

```ts

const sprites: SpriteDefinition[] = [

    ...

    {
        key: 'building',
        imagesSrc: [building_1, building_2],
        animationDelay: 800,
        size: {
            width: 1,
            height: 2,
        },
    },
]

```

### **Offseted sprites**

[🕹 Demo](https://qadrax.github.io/react-super-tilemap/storybook/?path=/story/sprites-demo--sprites-offset)

[🎼 Demo code](https://github.com/QADRAX/react-super-tilemap/blob/main/src/__stories__/demos/sprites/DemoSpriteOffset.tsx)

You can declare offseted sprites with the property `offset` when you have sprites that you want to fix the anchor point.

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

## **2) Wrap the tilemap component**

[📜 Tilemap](https://qadrax.github.io/react-super-tilemap/modules.html#Tilemap)

[🕹 Demo](https://qadrax.github.io/react-super-tilemap/storybook/?path=/story/tilemap-demo--tilemap-props-demo)

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

## **3) Use a camera**

### **Manual camera**

[📜 ManualCamera](https://qadrax.github.io/react-super-tilemap/modules.html#ManualCamera)

[🕹 Demo](https://qadrax.github.io/react-super-tilemap/storybook/?path=/story/manual-camera-demo--manual-camera-demo)

[🎼 Demo code](https://github.com/QADRAX/react-super-tilemap/blob/main/src/__stories__/demos/cameras/DemoManualCamera.tsx)

This component is used to manually control the camera position and zoom of the tilemap.

```ts
import { Tilemap, ManualCamera } from 'react-super-tilemap'

const position = {
    col: 0,
    row: 0,
}

const zoom = 0;

const YourComponent = () => {
    return (
        <Tilemap
            tilmapScheme={scheme}
            spriteDefinition={sprites}
        >
            <ManualCamera 
                position={position}
                zoom={zoom}
            />
        </Tilemap>
    )
}
```

### **Third person camera**

[📜 ThirdPersonCamera](https://qadrax.github.io/react-super-tilemap/modules.html#ThirdPersonCamera)

[🕹 Demo](https://qadrax.github.io/react-super-tilemap/storybook/?path=/story/third-person-camera-demo--third-person-camera-demo)

Use this component to operate with a third person camera in the tilemap.

Here you can forget about control the camera position and zoom because this component will do it for you enabling drag and zoom controls by default.

**It is important that multiple cameras are not added between the `Tilemap` children.**

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

[📜 CameraContext](https://qadrax.github.io/react-super-tilemap/modules.html#CameraContext)

[📜 useThirdPersonCameraContext](https://qadrax.github.io/react-super-tilemap/modules.html#useThirdPersonCameraContext)

[🕹 Demo](https://qadrax.github.io/react-super-tilemap/storybook/?path=/story/tilemap-cameras--third-person-camera-example)

[🎼 Demo code](https://github.com/QADRAX/react-super-tilemap/blob/main/src/__stories__/demos/cameras/DemoThirdPersonCameraContext.tsx)

Third person camera allows you to apply motion effects to the position and zoom. To do this you just have to create a child component and use the `useThirdPersonCameraContext` hook.

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


## **4) Use tilemap elements**

To include dynamic elements to the scene you can add child components to `Tilemap` such as the following that are provided:

### **Manual element**

[📜 ManualElement](https://qadrax.github.io/react-super-tilemap/modules.html#ManualElement)

[🕹 Demo](https://qadrax.github.io/react-super-tilemap/storybook/?path=/story/tilemap-elements--manual-element-example)

[🎼 Demo code](https://github.com/QADRAX/react-super-tilemap/blob/main/src/__stories__/demos/elements/DemoManualElement.tsx)

Similar as `ManualCamera`, you can use add a ManualElment as a child of a Tilemap. Using this component you have full control of the position of the element on the map.

```ts
const YourComponent = () => {
    return (
        <Tilemap
            tilmapScheme={scheme}
            spriteDefinition={sprites}
        >
            <ThirdPersonCamera />
            <ManualElement 
                elementKey="element1"
                spriteKey="armyIdle"
                layer={1}
                tilePosition={{
                    col: 0,
                    row: 0,
                }} 
            />
        </Tilemap>
    )
}
```

### **Motionable element**

[📜 MotionableElement](https://qadrax.github.io/react-super-tilemap/modules.html#MotionableElement)

[🕹 Demo](https://qadrax.github.io/react-super-tilemap/storybook/?path=/story/motionable-element-demo--motionable-element-demo&args=cols:18;elementCol:9;elementRow:15)

[🎼 Demo code](https://github.com/QADRAX/react-super-tilemap/blob/main/src/__stories__/demos/elements/DemoMotionableElement.tsx)

With this component you can have relative control over the position keeping you out of everything related to element motions. Just sends props with the position where the element is and, in case of possible changes, these will be done with the given motion configuration.

```ts
const YourComponent = () => {
    return (
        <Tilemap
            tilmapScheme={scheme}
            spriteDefinition={sprites}
        >
            <ThirdPersonCamera />
                  <MotionableElement
                    tilePosition={{
                        col: elementCol,
                        row: elementRow,
                    }}
                    spriteKey={elementSprite}
                    layer={1}
                    elementKey='element1'
                    motionSettings={{
                        speed: motionSpeed,
                        easing: 'linear',
                    }}
                >
                    {/* Children JSX */}
                    <label> Element 1 </label>
                </MotionableElement>
        </Tilemap>
    )
}
```

# **Links**

[**📜 Full API documentation**](https://qadrax.github.io/react-super-tilemap/modules.html)

[**🕹 Storybook**](https://qadrax.github.io/react-super-tilemap/storybook/)
