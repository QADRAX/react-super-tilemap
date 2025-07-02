# 🗺️ React Super Tilemap

[![Build](https://github.com/QADRAX/react-super-tilemap/actions/workflows/Build.yaml/badge.svg)](https://github.com/QADRAX/react-super-tilemap/actions/workflows/Build.yaml)
[![Publish](https://github.com/QADRAX/react-super-tilemap/actions/workflows/Publish.yaml/badge.svg)](https://github.com/QADRAX/react-super-tilemap/actions/workflows/Publish.yaml)

![TypeScript](https://img.shields.io/badge/typescript-%23007ACC.svg?style=for-the-badge&logo=typescript&logoColor=white)
![React](https://img.shields.io/badge/react-%2320232a.svg?style=for-the-badge&logo=react&logoColor=%2361DAFB)
![NPM](https://img.shields.io/badge/NPM-%23CB3837.svg?style=for-the-badge&logo=npm&logoColor=white)
![Storybook](https://img.shields.io/badge/-Storybook-FF4785?style=for-the-badge&logo=storybook&logoColor=white)

**React Super Tilemap** is a low-level tilemap rendering engine for React, optimized for browser performance.

Ideal for games and apps that require:

- Grid-based map rendering.
- Camera control and zooming.
- Support for animated, oversized, and offset sprites.
- Dynamic movable elements.

---

## 🚀 Installation

```bash
npm install react-super-tilemap
# or
yarn add react-super-tilemap
```

---

## 🧱 1. Define your sprites

> API Reference: [📜 SpriteDefinition](https://qadrax.github.io/react-super-tilemap/modules.html#SpriteDefinition)

### 🔹 Basic  
[🕹 Demo](https://qadrax.github.io/react-super-tilemap/storybook/?path=/story/sprites-demo--sprites-basic) · [📄 Code](https://github.com/QADRAX/react-super-tilemap/blob/main/src/__stories__/demos/sprites/DemoSpriteBasic.tsx)

```ts
const sprites: SpriteDefinition[] = [
  {
    key: 'grass',
    imageSrc: ['path/to/grass.png'],
  },
]
```

### 🔄 Animated  
[🕹 Demo](https://qadrax.github.io/react-super-tilemap/storybook/?path=/story/sprites-demo--sprites-animated) · [📄 Code](https://github.com/QADRAX/react-super-tilemap/blob/main/src/__stories__/demos/sprites/DemoSpriteAnimated.tsx)

```ts
{
  key: 'ocean',
  imageSrc: [ocean_1, ocean_2, ocean_3, ocean_4],
  animationDelay: 400,
}
```

> ⚠️ All animation images must be the same size.

### 📏 Oversized  
[🕹 Demo](https://qadrax.github.io/react-super-tilemap/storybook/?path=/story/sprites-demo--sprites-oversize)

```ts
{
  key: 'building',
  imageSrc: [building_1],
  animationDelay: 800,
  size: { width: 1, height: 2 },
}
```

### 🎯 Offset  
[🕹 Demo](https://qadrax.github.io/react-super-tilemap/storybook/?path=/story/sprites-demo--sprites-offset)

```ts
{
  key: 'selector',
  imageSrc: [selector1, selector2],
  animationDelay: 800,
  size: { width: 2, height: 2 },
  offset: { col: -0.5, row: 0.5 },
}
```

---

## 🗺️ 2. Create your tilemap

> API Reference: [📜 Tilemap API](https://qadrax.github.io/react-super-tilemap/modules.html#Tilemap) 

[🕹 Demo](https://qadrax.github.io/react-super-tilemap/storybook/?path=/story/tilemap-demo--tilemap-props-demo)

```ts
<Tilemap tilmapScheme={scheme} spriteDefinition={sprites}>
  ...
</Tilemap>
```

---

## 🎥 3. Add a camera

### 🔧 ManualCamera  
[🕹 Demo](https://qadrax.github.io/react-super-tilemap/storybook/?path=/story/manual-camera-demo--manual-camera-demo)

```ts
<ManualCamera position={{ col: 0, row: 0 }} zoom={0} />
```

### 🧲 ThirdPersonCamera  
[🕹 Demo](https://qadrax.github.io/react-super-tilemap/storybook/?path=/story/third-person-camera-demo--third-person-camera-demo)

```ts
<ThirdPersonCamera />
```

### 🧠 Camera Context  
[🕹 Demo](https://qadrax.github.io/react-super-tilemap/storybook/?path=/story/tilemap-cameras--third-person-camera-example)

```ts
const { addZoomMotion } = useThirdPersonCameraContext()
```

---

## 🧍 4. Add elements

### 🛠 ManualElement  
[🕹 Demo](https://qadrax.github.io/react-super-tilemap/storybook/?path=/story/tilemap-elements--manual-element-example)

```ts
<ManualElement
  elementKey="unit"
  spriteKey="armyIdle"
  layer={1}
  tilePosition={{ x: 0, y: 0 }}
/>
```

### 🌀 MotionableElement  
[🕹 Demo](https://qadrax.github.io/react-super-tilemap/storybook/?path=/story/motionable-element-demo--motionable-element-demo)

```ts
<MotionableElement
  elementKey="unit"
  spriteKey="armyIdle"
  layer={1}
  tilePosition={{ x: 5, y: 5 }}
  motionSettings={{ speed: 1, easing: 'linear' }}
/>
```

---

## 📚 Additional Resources

- 📘 [Full API Documentation](https://qadrax.github.io/react-super-tilemap/modules.html)
- 🧪 [Interactive Storybook](https://qadrax.github.io/react-super-tilemap/storybook/)
- 🧾 [Source Code](https://github.com/QADRAX/react-super-tilemap)
