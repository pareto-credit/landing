import { useEffect, useRef } from 'react'
import * as THREE from 'three'

const Earth3D = () => {
  const mountRef = useRef<HTMLDivElement | null>(null)

  useEffect(() => {
    const mount = mountRef.current
    if (!mount) return

    const width = mount.clientWidth
    const height = mount.clientHeight

    const scene = new THREE.Scene()
    const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 1000)
    camera.position.z = 2.8

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true })
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
    renderer.setSize(width, height)
    mount.appendChild(renderer.domElement)

    const radius = 0.81
    const geometry = new THREE.SphereGeometry(radius, 80, 80)

    const shaderMaterial = new THREE.ShaderMaterial({
      uniforms: {
        uColor: { value: new THREE.Color(0x70b19e) },
        uMousePos: { value: new THREE.Vector3(999, 999, 999) },
        uHoverState: { value: 0.0 },
      },
      vertexShader: `
        varying vec3 vWorldPosition;
        void main() {
          vec4 worldPosition = modelMatrix * vec4(position, 1.0);
          vWorldPosition = worldPosition.xyz;
          vec4 mvPosition = viewMatrix * worldPosition;
          gl_PointSize = 8.0 * (1.0 / -mvPosition.z);
          gl_Position = projectionMatrix * mvPosition;
        }
      `,
      fragmentShader: `
        uniform vec3 uColor;
        uniform vec3 uMousePos;
        uniform float uHoverState;
        varying vec3 vWorldPosition;

        void main() {
          vec2 coord = gl_PointCoord - vec2(0.5);
          if (length(coord) > 0.5) discard;

          float dist = distance(vWorldPosition, uMousePos);
          float spotlight = smoothstep(0.8, 0.1, dist);

          float targetAlpha = max(0.05, spotlight * 0.9);
          float alpha = mix(0.05, targetAlpha, uHoverState);

          gl_FragColor = vec4(uColor, alpha);
        }
      `,
      transparent: true,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
    })

    const points = new THREE.Points(geometry, shaderMaterial)
    scene.add(points)

    const hitGeometry = new THREE.SphereGeometry(radius, 32, 32)
    const hitMaterial = new THREE.MeshBasicMaterial({ visible: false })
    const hitMesh = new THREE.Mesh(hitGeometry, hitMaterial)
    scene.add(hitMesh)

    const raycaster = new THREE.Raycaster()
    const mouse2D = new THREE.Vector2(-1, -1)

    let animationFrameId = 0
    let mouseX = 0
    let mouseY = 0
    let targetX = 0
    let targetY = 0
    let isInView = true

    const handleMouseMove = (event: MouseEvent) => {
      if (!isInView) return

      mouseX = (event.clientX - window.innerWidth / 2) * 0.0005
      mouseY = (event.clientY - window.innerHeight / 2) * 0.0005

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

    const animate = () => {
      animationFrameId = window.requestAnimationFrame(animate)

      if (!isInView) return

      points.rotation.y += 0.001
      points.rotation.x += 0.0002
      hitMesh.rotation.copy(points.rotation)

      targetX = mouseX * 0.5
      targetY = mouseY * 0.5
      points.rotation.y += 0.05 * (targetX - points.rotation.y)
      points.rotation.x += 0.05 * (targetY - points.rotation.x)

      raycaster.setFromCamera(mouse2D, camera)
      const intersects = raycaster.intersectObject(hitMesh)

      if (intersects.length > 0) {
        shaderMaterial.uniforms.uMousePos.value.copy(intersects[0].point)
        shaderMaterial.uniforms.uHoverState.value = THREE.MathUtils.lerp(
          shaderMaterial.uniforms.uHoverState.value,
          1,
          0.1,
        )
      } else {
        shaderMaterial.uniforms.uHoverState.value = THREE.MathUtils.lerp(
          shaderMaterial.uniforms.uHoverState.value,
          0,
          0.05,
        )
      }

      renderer.render(scene, camera)
    }

    window.addEventListener('mousemove', handleMouseMove, { passive: true })
    window.addEventListener('resize', handleResize, { passive: true })
    document.addEventListener('visibilitychange', handlePageVisibility)
    animate()

    return () => {
      window.removeEventListener('mousemove', handleMouseMove)
      window.removeEventListener('resize', handleResize)
      document.removeEventListener('visibilitychange', handlePageVisibility)
      visibilityObserver.disconnect()
      window.cancelAnimationFrame(animationFrameId)

      if (mount.contains(renderer.domElement)) {
        mount.removeChild(renderer.domElement)
      }

      geometry.dispose()
      hitGeometry.dispose()
      shaderMaterial.dispose()
      hitMaterial.dispose()
      renderer.dispose()
    }
  }, [])

  return (
    <div
      ref={mountRef}
      className="pointer-events-none absolute inset-0 z-0 opacity-80 mix-blend-screen"
    />
  )
}

export default Earth3D
