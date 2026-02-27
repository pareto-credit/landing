import { useEffect, useRef } from 'react'
import * as THREE from 'three'
import earthDayTextureUrl from '../../assets/images/earth/earth-day.jpg'
import earthWaterMaskUrl from '../../assets/images/earth/earth-water.png'

interface CitySpec {
  name: string
  lat: number
  lon: number
  footprint: number
  towerHeight: number
  density: number
  seed: number
}

const EARTH_RADIUS = 0.81

const CITY_SPECS: CitySpec[] = [
  { name: 'New York', lat: 40.7128, lon: -74.006, footprint: 0.03, towerHeight: 0.11, density: 14, seed: 11 },
  { name: 'London', lat: 51.5072, lon: -0.1276, footprint: 0.028, towerHeight: 0.1, density: 13, seed: 29 },
  { name: 'Milan', lat: 45.4642, lon: 9.19, footprint: 0.024, towerHeight: 0.09, density: 11, seed: 43 },
  { name: 'Dubai', lat: 25.2048, lon: 55.2708, footprint: 0.024, towerHeight: 0.12, density: 10, seed: 59 },
  { name: 'Tokyo', lat: 35.6764, lon: 139.65, footprint: 0.027, towerHeight: 0.11, density: 13, seed: 73 },
  { name: 'Singapore', lat: 1.3521, lon: 103.8198, footprint: 0.022, towerHeight: 0.095, density: 10, seed: 91 },
  { name: 'Sao Paulo', lat: -23.5558, lon: -46.6396, footprint: 0.022, towerHeight: 0.085, density: 10, seed: 107 },
  { name: 'San Francisco', lat: 37.7749, lon: -122.4194, footprint: 0.022, towerHeight: 0.09, density: 9, seed: 127 },
]

const seededRandom = (seed: number) => {
  const value = Math.sin(seed * 12.9898 + 78.233) * 43758.5453123
  return value - Math.floor(value)
}

const createFallbackTexture = (hex: number) => {
  const color = new THREE.Color(hex)
  const data = new Uint8Array([
    Math.round(color.r * 255),
    Math.round(color.g * 255),
    Math.round(color.b * 255),
    255,
  ])

  const texture = new THREE.DataTexture(data, 1, 1, THREE.RGBAFormat)
  texture.colorSpace = THREE.SRGBColorSpace
  texture.needsUpdate = true
  return texture
}

interface LandMaskResource {
  data: Uint8ClampedArray
  height: number
  texture: THREE.Texture
  width: number
}

const loadImage = (src: string) =>
  new Promise<HTMLImageElement>((resolve, reject) => {
    const image = new Image()
    image.decoding = 'async'
    image.onload = () => resolve(image)
    image.onerror = () => reject(new Error(`Failed to load image: ${src}`))
    image.src = src
  })

const createEarthTexture = (image: HTMLImageElement) => {
  const texture = new THREE.Texture(image)
  texture.colorSpace = THREE.SRGBColorSpace
  texture.needsUpdate = true
  return texture
}

const createLandMaskTexture = (waterMaskImage: HTMLImageElement): LandMaskResource => {
  const canvas = document.createElement('canvas')
  canvas.width = 2048
  canvas.height = 1024

  const context = canvas.getContext('2d')
  if (!context) {
    return {
      data: new Uint8ClampedArray([0, 0, 0, 255]),
      height: 1,
      texture: createFallbackTexture(0x000000),
      width: 1,
    }
  }

  context.drawImage(waterMaskImage, 0, 0, canvas.width, canvas.height)

  const imageData = context.getImageData(0, 0, canvas.width, canvas.height)
  const data = imageData.data

  for (let index = 0; index < data.length; index += 4) {
    const waterSample = (data[index] + data[index + 1] + data[index + 2]) / 3
    const landFactor = THREE.MathUtils.clamp((182 - waterSample) / 92, 0, 1)
    const shapedLand = Math.pow(landFactor, 0.78)
    const value = Math.round(shapedLand * 255)

    data[index] = value
    data[index + 1] = value
    data[index + 2] = value
    data[index + 3] = 255
  }

  context.putImageData(imageData, 0, 0)

  const texture = new THREE.CanvasTexture(canvas)
  texture.colorSpace = THREE.NoColorSpace
  texture.needsUpdate = true

  return {
    data,
    height: canvas.height,
    texture,
    width: canvas.width,
  }
}

const createGlowTexture = () => {
  const canvas = document.createElement('canvas')
  canvas.width = 512
  canvas.height = 512

  const context = canvas.getContext('2d')
  if (!context) {
    return createFallbackTexture(0x71b29f)
  }

  const gradient = context.createRadialGradient(256, 256, 0, 256, 256, 256)
  gradient.addColorStop(0, 'rgba(130, 230, 200, 0.55)')
  gradient.addColorStop(0.35, 'rgba(113, 178, 159, 0.24)')
  gradient.addColorStop(0.7, 'rgba(37, 72, 57, 0.08)')
  gradient.addColorStop(1, 'rgba(37, 72, 57, 0)')

  context.fillStyle = gradient
  context.fillRect(0, 0, 512, 512)

  const texture = new THREE.CanvasTexture(canvas)
  texture.colorSpace = THREE.SRGBColorSpace
  texture.needsUpdate = true
  return texture
}

const createStarField = () => {
  const count = 650
  const positions = new Float32Array(count * 3)

  for (let index = 0; index < count; index += 1) {
    const theta = Math.random() * Math.PI * 2
    const phi = Math.acos(2 * Math.random() - 1)
    const radius = 3.4 + Math.random() * 3.4

    positions[index * 3] = radius * Math.sin(phi) * Math.cos(theta)
    positions[index * 3 + 1] = radius * Math.cos(phi)
    positions[index * 3 + 2] = radius * Math.sin(phi) * Math.sin(theta)
  }

  const geometry = new THREE.BufferGeometry()
  geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3))

  const material = new THREE.PointsMaterial({
    color: 0x4d76cf,
    size: 0.022,
    sizeAttenuation: true,
    transparent: true,
    opacity: 0.5,
    depthWrite: false,
  })

  return new THREE.Points(geometry, material)
}

const latLonToVector3 = (lat: number, lon: number, radius: number) => {
  const phi = THREE.MathUtils.degToRad(90 - lat)
  const theta = THREE.MathUtils.degToRad(lon + 180)

  return new THREE.Vector3(
    -radius * Math.sin(phi) * Math.cos(theta),
    radius * Math.cos(phi),
    radius * Math.sin(phi) * Math.sin(theta),
  )
}

const clamp01 = (value: number) => THREE.MathUtils.clamp(value, 0, 1)

const normalizeLongitude = (longitude: number) => {
  let normalized = longitude
  while (normalized < -180) normalized += 360
  while (normalized > 180) normalized -= 360
  return normalized
}

const latLonToUV = (lat: number, lon: number) => {
  const normalizedLon = normalizeLongitude(lon)
  return {
    u: clamp01((normalizedLon + 180) / 360),
    v: clamp01((90 - lat) / 180),
  }
}

const uvToLatLon = (u: number, v: number) => ({
  lat: 90 - clamp01(v) * 180,
  lon: clamp01(u) * 360 - 180,
})

const sampleLandMask = (resource: LandMaskResource, u: number, v: number) => {
  const wrappedU = ((u % 1) + 1) % 1
  const clampedV = clamp01(v)
  const x = Math.floor(wrappedU * (resource.width - 1))
  const y = Math.floor(clampedV * (resource.height - 1))
  const index = (y * resource.width + x) * 4
  return resource.data[index] > 120
}

const moveCityToNearestLand = (lat: number, lon: number, resource: LandMaskResource) => {
  const uv = latLonToUV(lat, lon)
  if (sampleLandMask(resource, uv.u, uv.v)) {
    return { lat, lon: normalizeLongitude(lon) }
  }

  const maxRadius = Math.max(18, Math.floor(resource.width * 0.1))
  const xCenter = uv.u * resource.width
  const yCenter = uv.v * resource.height

  for (let radius = 1; radius <= maxRadius; radius += 1) {
    let best: { x: number; y: number; score: number } | null = null

    for (let x = -radius; x <= radius; x += 1) {
      for (let y = -radius; y <= radius; y += 1) {
        if (Math.abs(x) !== radius && Math.abs(y) !== radius) continue

        const sampleX = xCenter + x
        const sampleY = yCenter + y
        const sampleU = sampleX / resource.width
        const sampleV = sampleY / resource.height

        if (!sampleLandMask(resource, sampleU, sampleV)) continue

        const score = Math.hypot(x, y)
        if (!best || score < best.score) {
          best = { x, y, score }
        }
      }
    }

    if (best) {
      const adjusted = uvToLatLon((xCenter + best.x) / resource.width, (yCenter + best.y) / resource.height)
      return {
        lat: adjusted.lat,
        lon: normalizeLongitude(adjusted.lon),
      }
    }
  }

  return { lat, lon: normalizeLongitude(lon) }
}

interface CityCluster {
  group: THREE.Group
  beacon: THREE.Points<THREE.BufferGeometry, THREE.PointsMaterial>
}

const createCityCluster = (city: CitySpec, radius: number): CityCluster => {
  const group = new THREE.Group()
  group.name = `${city.name} skyline`

  const normal = latLonToVector3(city.lat, city.lon, 1)
  const center = normal.clone().multiplyScalar(radius + 0.003)
  group.position.copy(center)

  const alignToSurface = new THREE.Quaternion().setFromUnitVectors(
    new THREE.Vector3(0, 1, 0),
    normal.normalize(),
  )
  group.quaternion.copy(alignToSurface)

  const cityScale = 0.78
  const baseFootprint = city.footprint * cityScale

  const wireMaterial = new THREE.LineBasicMaterial({
    color: 0x5f9f83,
    transparent: true,
    opacity: 0.58,
  })

  const addWireBuilding = (
    centerX: number,
    centerZ: number,
    width: number,
    depth: number,
    height: number,
    baseY: number,
    rotationY: number,
  ) => {
    const buildingGeometry = new THREE.BoxGeometry(width, height, depth)
    const edgesGeometry = new THREE.EdgesGeometry(buildingGeometry)
    const buildingWire = new THREE.LineSegments(edgesGeometry, wireMaterial)
    buildingWire.position.set(centerX, baseY + height * 0.5, centerZ)
    buildingWire.rotation.y = rotationY

    group.add(buildingWire)
    buildingGeometry.dispose()
  }

  const ringCurve = new THREE.EllipseCurve(0, 0, baseFootprint * 1.22, baseFootprint * 1.22, 0, Math.PI * 2, false, 0)
  const ringPoints = ringCurve.getPoints(72).map((point) => new THREE.Vector3(point.x, 0.0035, point.y))
  const ring = new THREE.LineLoop(
    new THREE.BufferGeometry().setFromPoints(ringPoints),
    new THREE.LineBasicMaterial({
      color: 0x4f8b71,
      transparent: true,
      opacity: 0.36,
    }),
  )
  group.add(ring)

  const buildingCount = Math.max(5, city.density - 2 + Math.floor(seededRandom(city.seed * 0.73) * 2))
  const buildingCenters: Array<{ x: number; z: number }> = []
  const minCenterDistance = baseFootprint * 0.4

  for (let index = 0; index < buildingCount; index += 1) {
    const width = (0.009 + seededRandom(city.seed + index * 5.3) * 0.01) * 0.7
    const depth = (0.009 + seededRandom(city.seed + index * 6.1) * 0.01) * 0.7
    const height = 0.016 + seededRandom(city.seed + index * 7.9) * city.towerHeight * 0.54
    const rotationY = seededRandom(city.seed + index * 14.7) * Math.PI

    let centerX = 0
    let centerZ = 0
    let placed = false

    for (let attempt = 0; attempt < 18; attempt += 1) {
      const angle = seededRandom(city.seed + index * 18.7 + attempt * 3.9) * Math.PI * 2
      const radial = baseFootprint * (0.14 + Math.sqrt(seededRandom(city.seed + index * 23.3 + attempt * 5.1)) * 1.08)
      const stretchX = 0.82 + seededRandom(city.seed + index * 27.1 + attempt * 6.7) * 0.4
      const stretchZ = 0.82 + seededRandom(city.seed + index * 31.7 + attempt * 7.3) * 0.4

      centerX = Math.cos(angle) * radial * stretchX
      centerZ = Math.sin(angle) * radial * stretchZ

      const reservedCenterRadius = baseFootprint * 0.2
      const insideReservedCenter = Math.hypot(centerX, centerZ) < reservedCenterRadius
      if (insideReservedCenter) {
        continue
      }

      const tooClose = buildingCenters.some(({ x, z }) => {
        const dx = centerX - x
        const dz = centerZ - z
        return Math.hypot(dx, dz) < minCenterDistance
      })

      if (tooClose) {
        continue
      }

      placed = true
      break
    }

    if (!placed) {
      const fallbackAngle = seededRandom(city.seed + index * 41.9) * Math.PI * 2
      const fallbackSpread = baseFootprint * (0.62 + seededRandom(city.seed + index * 47.1) * 0.34)
      centerX = Math.cos(fallbackAngle) * fallbackSpread
      centerZ = Math.sin(fallbackAngle) * fallbackSpread
    }

    buildingCenters.push({ x: centerX, z: centerZ })

    addWireBuilding(centerX, centerZ, width, depth, height, 0.003, rotationY)

    const hasSetback = seededRandom(city.seed + index * 19.1) > 0.6
    if (hasSetback) {
      const topHeight = height * (0.24 + seededRandom(city.seed + index * 23.7) * 0.22)
      const topBaseY = 0.003 + height - topHeight
      addWireBuilding(
        centerX,
        centerZ,
        width * 0.72,
        depth * 0.72,
        topHeight,
        topBaseY,
        rotationY * 1.05,
      )
    }
  }

  const landmarkHeight = city.towerHeight * 0.56 + 0.024
  const landmarkWidth = baseFootprint * 0.26
  const landmarkDepth = baseFootprint * 0.24
  addWireBuilding(0, 0, landmarkWidth, landmarkDepth, landmarkHeight, 0.003, 0)
  addWireBuilding(
    0,
    0,
    landmarkWidth * 0.7,
    landmarkDepth * 0.7,
    landmarkHeight * 0.24,
    0.003 + landmarkHeight * 0.76,
    0.05,
  )

  const beaconPositions: number[] = []
  const beaconCenterY = 0.003 + landmarkHeight + baseFootprint * 0.03
  const beaconRadius = baseFootprint * 0.08
  const beaconPointsCount = 36

  for (let index = 0; index < beaconPointsCount; index += 1) {
    const theta = seededRandom(city.seed * 7.9 + index * 1.3) * Math.PI * 2
    const phi = Math.acos(2 * seededRandom(city.seed * 9.7 + index * 1.9) - 1)
    const radial = beaconRadius * (0.5 + seededRandom(city.seed * 11.3 + index * 2.7) * 0.5)

    beaconPositions.push(
      Math.sin(phi) * Math.cos(theta) * radial,
      beaconCenterY + Math.cos(phi) * radial,
      Math.sin(phi) * Math.sin(theta) * radial,
    )
  }

  const beacon = new THREE.Points(
    new THREE.BufferGeometry().setAttribute('position', new THREE.Float32BufferAttribute(beaconPositions, 3)),
    new THREE.PointsMaterial({
      color: 0x8de7d0,
      size: 0.0105,
      sizeAttenuation: true,
      transparent: true,
      opacity: 0.82,
      depthWrite: false,
      blending: THREE.AdditiveBlending,
    }),
  )
  group.add(beacon)

  return { group, beacon }
}

const Earth3D = () => {
  const mountRef = useRef<HTMLDivElement | null>(null)

  useEffect(() => {
    const mount = mountRef.current
    if (!mount) return

    let disposeScene: (() => void) | null = null
    let isCancelled = false

    const init = async () => {
      const [earthImage, waterMaskImage] = await Promise.all([
        loadImage(earthDayTextureUrl),
        loadImage(earthWaterMaskUrl),
      ])

      if (isCancelled) return

    const width = mount.clientWidth
    const height = mount.clientHeight

    const scene = new THREE.Scene()
    const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 1000)
    camera.position.z = 2.9

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true, powerPreference: 'high-performance' })
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
    renderer.setSize(width, height)
    renderer.outputColorSpace = THREE.SRGBColorSpace
    mount.appendChild(renderer.domElement)

    const ambientLight = new THREE.HemisphereLight(0xe4f2eb, 0x0e1813, 0.45)
    const keyLight = new THREE.DirectionalLight(0xd2f7ea, 0.7)
    keyLight.position.set(3, 2, 2)
    const rimLight = new THREE.DirectionalLight(0x1d3e31, 0.5)
    rimLight.position.set(-2.5, -1.5, -2)

    scene.add(ambientLight)
    scene.add(keyLight)
    scene.add(rimLight)

    const stars = createStarField()
    scene.add(stars)

    const globeGroup = new THREE.Group()
    globeGroup.rotation.set(0.18, -0.9, 0)
    scene.add(globeGroup)

    const earthTexture = createEarthTexture(earthImage)
    const landMaskResource = createLandMaskTexture(waterMaskImage)
    const landMaskTexture = landMaskResource.texture
    const glowTexture = createGlowTexture()
    const anisotropy = Math.min(8, renderer.capabilities.getMaxAnisotropy())
    earthTexture.anisotropy = anisotropy
    landMaskTexture.anisotropy = anisotropy
    landMaskTexture.minFilter = THREE.NearestFilter
    landMaskTexture.magFilter = THREE.NearestFilter
    landMaskTexture.generateMipmaps = false
    landMaskTexture.needsUpdate = true
    glowTexture.anisotropy = anisotropy

    const activeCitySpecs = CITY_SPECS.map((city) => {
      const adjusted = moveCityToNearestLand(city.lat, city.lon, landMaskResource)
      return {
        ...city,
        lat: adjusted.lat,
        lon: adjusted.lon,
      }
    })

    const earthParticlesMaterial = new THREE.ShaderMaterial({
      uniforms: {
        uMap: { value: earthTexture },
        uLandMask: { value: landMaskTexture },
        uGlowColor: { value: new THREE.Color(0x4a8a73) },
        uBias: { value: 1.0 },
        uScale: { value: -1.0 },
        uPower: { value: 3.2 },
        uSweep: { value: EARTH_RADIUS },
        uMousePos: { value: new THREE.Vector3(999, 999, 999) },
        uHoverState: { value: 0.0 },
        uHoverColor: { value: new THREE.Color(0x174b3a) },
      },
      vertexShader: `
        varying vec2 vUv;
        varying vec3 vWorldPosition;
        varying vec3 vWorldNormal;
        varying float vLocalY;
        varying float vHoverInfluence;

        uniform vec3 uMousePos;
        uniform float uHoverState;

        void main() {
          vUv = uv;
          vLocalY = position.y;

          vec4 worldPosition = modelMatrix * vec4(position, 1.0);
          vWorldPosition = worldPosition.xyz;
          vWorldNormal = normalize(mat3(modelMatrix) * normal);

          float hoverDistance = distance(vWorldPosition, uMousePos);
          vHoverInfluence = smoothstep(0.95, 0.0, hoverDistance) * uHoverState;

          vec4 mvPosition = viewMatrix * worldPosition;
          float depthScale = clamp(2.8 / -mvPosition.z, 1.0, 4.5);
          gl_PointSize = (2.35 + vHoverInfluence * 1.55) * depthScale;
          gl_Position = projectionMatrix * mvPosition;
        }
      `,
      fragmentShader: `
        uniform sampler2D uMap;
        uniform sampler2D uLandMask;
        uniform vec3 uGlowColor;
        uniform float uBias;
        uniform float uScale;
        uniform float uPower;
        uniform float uSweep;
        uniform vec3 uMousePos;
        uniform float uHoverState;
        uniform vec3 uHoverColor;

        varying vec2 vUv;
        varying vec3 vWorldPosition;
        varying vec3 vWorldNormal;
        varying float vLocalY;
        varying float vHoverInfluence;

        float random(vec2 p) {
          return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453123);
        }

        void main() {
          vec2 coord = gl_PointCoord - vec2(0.5);
          float pointDist = length(coord);
          if (pointDist > 0.5) discard;

          vec3 textureColor = texture2D(uMap, vUv).rgb;
          float landMask = texture2D(uLandMask, vUv).r;
          if (landMask < 0.35) discard;

          float grain = random(vUv * 2048.0);
          float landStrength = smoothstep(0.35, 0.92, landMask);
          float landTone = clamp(textureColor.g * 1.12, 0.0, 1.0);
          vec3 surfaceColor = mix(vec3(0.19, 0.38, 0.29), vec3(0.9, 1.0, 0.93), landTone);
          surfaceColor *= mix(0.86, 1.18, grain);

          vec3 viewDir = normalize(cameraPosition - vWorldPosition);
          float fresnel = pow(uBias + uScale * abs(dot(vWorldNormal, viewDir)), uPower);
          float sweep = smoothstep(0.22, 0.0, abs(vLocalY - uSweep));

          float distanceToMouse = distance(vWorldPosition, uMousePos);
          float spotlight = max(vHoverInfluence, smoothstep(0.95, 0.08, distanceToMouse) * uHoverState);

          vec3 finalColor = mix(surfaceColor * 0.92, surfaceColor, landStrength);
          finalColor = mix(finalColor, uGlowColor, clamp(fresnel * 0.1 + sweep * 0.08, 0.0, 1.0));
          finalColor = mix(finalColor, uHoverColor, spotlight * 0.5);

          // Boost local saturation and contrast under the hover spotlight.
          float baseLuma = dot(finalColor, vec3(0.2126, 0.7152, 0.0722));
          vec3 saturated = mix(vec3(baseLuma), finalColor, 1.0 + spotlight * 3.1);
          vec3 contrasted = (saturated - 0.5) * (1.0 + spotlight * 2.5) + 0.5;
          vec3 darkened = contrasted * mix(vec3(1.0), vec3(0.66, 0.83, 0.74), spotlight);
          finalColor = mix(finalColor, clamp(darkened, 0.0, 1.0), spotlight);

          float alpha = 0.68 + landStrength * 0.28;
          alpha += fresnel * 0.1;
          alpha += sweep * 0.08;
          alpha += spotlight * 0.56;
          alpha *= 1.0 - smoothstep(0.38, 0.5, pointDist);

          if (alpha < 0.02) discard;

          gl_FragColor = vec4(finalColor, min(alpha, 0.95));
        }
      `,
      transparent: true,
      depthWrite: false,
      blending: THREE.NormalBlending,
    })

    const earthParticles = new THREE.Points(
      new THREE.SphereGeometry(EARTH_RADIUS, 220, 220),
      earthParticlesMaterial,
    )
    globeGroup.add(earthParticles)

    const glowSprite = new THREE.Sprite(
      new THREE.SpriteMaterial({
        map: glowTexture,
        color: 0x71b29f,
        transparent: true,
        opacity: 0.14,
        depthWrite: false,
        blending: THREE.AdditiveBlending,
      }),
    )
    glowSprite.scale.set(EARTH_RADIUS * 3.1, EARTH_RADIUS * 3.1, 1)
    globeGroup.add(glowSprite)

    const cityBeacons: Array<THREE.Points<THREE.BufferGeometry, THREE.PointsMaterial>> = []

    activeCitySpecs.forEach((city) => {
      const cluster = createCityCluster(city, EARTH_RADIUS)
      cityBeacons.push(cluster.beacon)
      globeGroup.add(cluster.group)
    })

    const cityLightPositions = new Float32Array(activeCitySpecs.length * 3)
    activeCitySpecs.forEach((city, index) => {
      const position = latLonToVector3(city.lat, city.lon, EARTH_RADIUS + 0.02)
      cityLightPositions[index * 3] = position.x
      cityLightPositions[index * 3 + 1] = position.y
      cityLightPositions[index * 3 + 2] = position.z
    })

    const cityLights = new THREE.Points(
      new THREE.BufferGeometry().setAttribute('position', new THREE.BufferAttribute(cityLightPositions, 3)),
      new THREE.PointsMaterial({
        color: 0x8de7d0,
        size: 0.026,
        transparent: true,
        opacity: 0.75,
        depthWrite: false,
      }),
    )
    globeGroup.add(cityLights)

    const hitMesh = new THREE.Mesh(
      new THREE.SphereGeometry(EARTH_RADIUS * 1.02, 40, 40),
      new THREE.MeshBasicMaterial({ visible: false }),
    )
    globeGroup.add(hitMesh)

    const raycaster = new THREE.Raycaster()
    const mouse2D = new THREE.Vector2(-1, -1)

    let animationFrameId = 0
    let mouseX = 0
    let mouseY = 0
    let autoRotationY = globeGroup.rotation.y
    const autoRotationX = globeGroup.rotation.x
    let isInView = true

    const handleMouseMove = (event: MouseEvent) => {
      if (!isInView) return

      mouseX = (event.clientX - window.innerWidth / 2) * 0.0005
      mouseY = (event.clientY - window.innerHeight / 2) * 0.00045

      mouse2D.x = (event.clientX / window.innerWidth) * 2 - 1
      mouse2D.y = -(event.clientY / window.innerHeight) * 2 + 1
    }

    const resetHover = () => {
      mouse2D.set(-10, -10)
    }

    const handleResize = () => {
      const current = mountRef.current
      if (!current) return

      const newWidth = current.clientWidth
      const newHeight = current.clientHeight

      camera.aspect = newWidth / newHeight
      camera.updateProjectionMatrix()
      renderer.setSize(newWidth, newHeight)
    }

    const visibilityObserver = new IntersectionObserver(
      (entries) => {
        const [entry] = entries
        isInView = Boolean(entry?.isIntersecting)

        if (!isInView) {
          resetHover()
        }
      },
      { threshold: 0.01 },
    )
    visibilityObserver.observe(mount)

    const handlePageVisibility = () => {
      if (document.hidden) {
        isInView = false
        resetHover()
        return
      }

      const rect = mount.getBoundingClientRect()
      isInView = rect.bottom > 0 && rect.top < window.innerHeight
    }

    const clock = new THREE.Clock()
    const sweepLimit = EARTH_RADIUS * 1.05

    const animate = () => {
      animationFrameId = window.requestAnimationFrame(animate)

      if (!isInView) return

      const elapsed = clock.getElapsedTime()
      autoRotationY += 0.001

      const desiredY = autoRotationY + mouseX * 0.55
      const desiredX = THREE.MathUtils.clamp(autoRotationX + mouseY * 0.7, -0.38, 0.38)

      globeGroup.rotation.y = THREE.MathUtils.lerp(globeGroup.rotation.y, desiredY, 0.045)
      globeGroup.rotation.x = THREE.MathUtils.lerp(globeGroup.rotation.x, desiredX, 0.05)

      stars.rotation.y -= 0.00004

      const currentSweep = earthParticlesMaterial.uniforms.uSweep.value
      earthParticlesMaterial.uniforms.uSweep.value = currentSweep < -sweepLimit ? sweepLimit : currentSweep - 0.0018

      raycaster.setFromCamera(mouse2D, camera)
      const intersections = raycaster.intersectObject(hitMesh)

      if (intersections.length > 0) {
        earthParticlesMaterial.uniforms.uMousePos.value.copy(intersections[0].point)
        earthParticlesMaterial.uniforms.uHoverState.value = THREE.MathUtils.lerp(
          earthParticlesMaterial.uniforms.uHoverState.value,
          1,
          0.1,
        )
      } else {
        earthParticlesMaterial.uniforms.uHoverState.value = THREE.MathUtils.lerp(
          earthParticlesMaterial.uniforms.uHoverState.value,
          0,
          0.06,
        )
      }

      const cityPulse = 0.95 + Math.sin(elapsed * 2.2) * 0.06
      cityLights.material.size = 0.026 * cityPulse

      cityBeacons.forEach((beacon, index) => {
        const seed = activeCitySpecs[index].seed
        const pulse = 0.86 + Math.sin(elapsed * 2.6 + seed) * 0.16
        beacon.scale.setScalar(pulse)
        beacon.material.size = 0.0105 * (0.92 + Math.sin(elapsed * 2.9 + seed * 0.5) * 0.1)
      })

      renderer.render(scene, camera)
    }

    window.addEventListener('mousemove', handleMouseMove, { passive: true })
    window.addEventListener('resize', handleResize, { passive: true })
    document.addEventListener('visibilitychange', handlePageVisibility)

    animate()

    disposeScene = () => {
      window.removeEventListener('mousemove', handleMouseMove)
      window.removeEventListener('resize', handleResize)
      document.removeEventListener('visibilitychange', handlePageVisibility)

      visibilityObserver.disconnect()
      window.cancelAnimationFrame(animationFrameId)

      if (mount.contains(renderer.domElement)) {
        mount.removeChild(renderer.domElement)
      }

      const geometries = new Set<THREE.BufferGeometry>()
      const materials = new Set<THREE.Material>()

      scene.traverse((object) => {
        if (object instanceof THREE.Mesh || object instanceof THREE.Points || object instanceof THREE.Sprite || object instanceof THREE.Line) {
          if ('geometry' in object && object.geometry) {
            geometries.add(object.geometry)
          }

          if ('material' in object && object.material) {
            if (Array.isArray(object.material)) {
              object.material.forEach((material) => materials.add(material))
            } else {
              materials.add(object.material)
            }
          }
        }
      })

      geometries.forEach((geometry) => geometry.dispose())
      materials.forEach((material) => material.dispose())

      earthTexture.dispose()
      landMaskTexture.dispose()
      glowTexture.dispose()
      renderer.dispose()
    }

    }

    init().catch((error) => {
      console.error('Failed to initialize Earth3D scene', error)
    })

    return () => {
      isCancelled = true
      if (disposeScene) {
        disposeScene()
      }
    }
  }, [])

  return <div ref={mountRef} className="pointer-events-none absolute inset-0 z-0" />
}

export default Earth3D
