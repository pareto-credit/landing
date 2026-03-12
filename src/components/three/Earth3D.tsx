import { useEffect, useRef } from 'react'
import * as THREE from 'three'
import earthDayTextureUrl from '../../assets/images/earth/earth-day.jpg'
import earthWaterMaskUrl from '../../assets/images/earth/earth-water.png'

const EARTH_RADIUS = 0.81

const createFallbackTexture = (hex: number) => {
  const color = new THREE.Color(hex)
  const data = new Uint8Array([Math.round(color.r * 255), Math.round(color.g * 255), Math.round(color.b * 255), 255])

  const texture = new THREE.DataTexture(data, 1, 1, THREE.RGBAFormat)
  texture.colorSpace = THREE.SRGBColorSpace
  texture.needsUpdate = true
  return texture
}

interface LandMaskResource {
  texture: THREE.Texture
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
      texture: createFallbackTexture(0x000000),
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
    texture,
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

const Earth3D = () => {
  const mountRef = useRef<HTMLDivElement | null>(null)

  useEffect(() => {
    const mount = mountRef.current
    if (!mount) return

    let disposeScene: (() => void) | null = null
    let isCancelled = false

    const init = async () => {
      const [earthImage, waterMaskImage] = await Promise.all([loadImage(earthDayTextureUrl), loadImage(earthWaterMaskUrl)])

      if (isCancelled) return

      const width = mount.clientWidth
      const height = mount.clientHeight

      const scene = new THREE.Scene()
      const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 1000)
      camera.position.z = 2.9

      const renderer = new THREE.WebGLRenderer({
        antialias: true,
        alpha: true,
        powerPreference: 'high-performance',
      })
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
          if (landMask < 0.22) discard;

          float grain = random(vUv * 2048.0);
          float landStrength = smoothstep(0.22, 0.9, landMask);
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

      const earthParticles = new THREE.Points(new THREE.SphereGeometry(EARTH_RADIUS, 220, 220), earthParticlesMaterial)
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

      const hitMesh = new THREE.Mesh(new THREE.SphereGeometry(EARTH_RADIUS * 1.02, 40, 40), new THREE.MeshBasicMaterial({ visible: false }))
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

      const sweepLimit = EARTH_RADIUS * 1.05

      const animate = () => {
        animationFrameId = window.requestAnimationFrame(animate)

        if (!isInView) return

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
          earthParticlesMaterial.uniforms.uHoverState.value = THREE.MathUtils.lerp(earthParticlesMaterial.uniforms.uHoverState.value, 1, 0.1)
        } else {
          earthParticlesMaterial.uniforms.uHoverState.value = THREE.MathUtils.lerp(earthParticlesMaterial.uniforms.uHoverState.value, 0, 0.06)
        }

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
