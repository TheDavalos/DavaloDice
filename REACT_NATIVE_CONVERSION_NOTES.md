# React Native Conversion Assessment

**Difficulty Rating: 7-8 out of 10**
- 1 = "done in a minute"
- 10 = "we might not be able to pull this over sir"

## Major Challenges

### 1. Three.js doesn't run natively in React Native
This is the biggest issue. Your entire 3D dice rendering would need to be rebuilt using:
- **Expo + expo-gl + react-three-fiber** (most viable path)
- OR a WebView wrapper (performance issues, feels less native)
- OR completely different 3D engine (basically start from scratch)

### 2. Cannon-es physics engine
May or may not work smoothly in React Native environment, would need testing/alternatives

### 3. Complete UI rewrite
All your CSS needs converting to React Native StyleSheet:
- Flexbox only (no CSS grid)
- Different styling patterns
- Platform-specific adjustments

### 4. App Store complexity
- Code signing
- Developer accounts:
  - Apple: $99/year
  - Google Play: $25 one-time fee
- Review processes
- Platform-specific builds

### 5. Performance
3D physics on mobile devices is demanding, especially on lower-end Android devices

## What Transfers Over

- ✓ React component logic and TypeScript
- ✓ State management concepts
- ✓ General app structure

## Realistic Path Forward

1. Use **Expo** (makes React Native much easier)
2. Use **expo-gl + react-three-fiber** for 3D rendering
3. Expect **1-3 weeks** of focused work if you know React Native
4. Expect **several weeks** if learning it fresh
5. Budget for developer accounts:
   - Apple Developer: $99/year
   - Google Play: $25 one-time

## Honest Take

It's doable, but you're essentially rebuilding **60-70% of the app**. The business logic stays, but the rendering engine and UI need significant rework.

---

*Assessment date: February 16, 2026*
