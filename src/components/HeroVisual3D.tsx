import { useEffect, useRef, useState } from 'react'
import * as THREE from 'three'

/**
 * Procedural Canvas Drawing Helper: draws a rounded rectangle path
 */
function drawRoundedRect(
  ctx: CanvasRenderingContext2D,
  x: number,
  y: number,
  w: number,
  h: number,
  r: number
) {
  ctx.beginPath()
  ctx.moveTo(x + r, y)
  ctx.lineTo(x + w - r, y)
  ctx.quadraticCurveTo(x + w, y, x + w, y + r)
  ctx.lineTo(x + w, y + h - r)
  ctx.quadraticCurveTo(x + w, y + h, x + w - r, y + h)
  ctx.lineTo(x + r, y + h)
  ctx.quadraticCurveTo(x, y + h, x, y + h - r)
  ctx.lineTo(x, y + r)
  ctx.quadraticCurveTo(x, y, x + r, y)
  ctx.closePath()
}

/**
 * Creates the small, recognizable Java Logo badge texture.
 * Uses authentic Java Coffee Cup SVG path (FaJava) with dual-tone gradient.
 */
function createJavaLogoTexture(): THREE.CanvasTexture {
  const canvas = document.createElement('canvas')
  canvas.width = 256
  canvas.height = 256
  const ctx = canvas.getContext('2d')!

  // Glassy circular disc background
  const grad = ctx.createRadialGradient(128, 128, 20, 128, 128, 125)
  grad.addColorStop(0, '#1c2e24')
  grad.addColorStop(0.7, '#121d17')
  grad.addColorStop(1, '#0b120e')
  ctx.fillStyle = grad
  ctx.beginPath()
  ctx.arc(128, 128, 120, 0, Math.PI * 2)
  ctx.fill()

  // Border rings in fresh green and soft lime
  ctx.strokeStyle = '#39834a'
  ctx.lineWidth = 4
  ctx.beginPath()
  ctx.arc(128, 128, 118, 0, Math.PI * 2)
  ctx.stroke()

  ctx.strokeStyle = 'rgba(216, 240, 162, 0.4)'
  ctx.lineWidth = 1.5
  ctx.beginPath()
  ctx.arc(128, 128, 112, 0, Math.PI * 2)
  ctx.stroke()

  // Authentic Java SVG Path (FaJava)
  const javaSvgPath =
    'M277.74 312.9c9.8-6.7 23.4-12.5 23.4-12.5s-38.7 7-77.2 10.2c-47.1 3.9-97.7 4.7-123.1 1.3-60.1-8 33-30.1 33-30.1s-36.1-2.4-80.6 19c-52.5 25.4 130 37 224.5 12.1zm-85.4-32.1c-19-42.7-83.1-80.2 0-145.8C296 53.2 242.84 0 242.84 0c21.5 84.5-75.6 110.1-110.7 162.6-23.9 35.9 11.7 74.4 60.2 118.2zm114.6-176.2c.1 0-175.2 43.8-91.5 140.2 24.7 28.4-6.5 54-6.5 54s62.7-32.4 33.9-72.9c-26.9-37.8-47.5-56.6 64.1-121.3zm-6.1 270.5a12.19 12.19 0 0 1-2 2.6c128.3-33.7 81.1-118.9 19.8-97.3a17.33 17.33 0 0 0-8.2 6.3 70.45 70.45 0 0 1 11-3c31-6.5 75.5 41.5-20.6 91.4zM348 437.4s14.5 11.9-15.9 21.2c-57.9 17.5-240.8 22.8-291.6.7-18.3-7.9 16-19 26.8-21.3 11.2-2.4 17.7-2 17.7-2-20.3-14.3-131.3 28.1-56.4 40.2C232.84 509.4 401 461.3 348 437.4zM124.44 396c-78.7 22 47.9 67.4 148.1 24.5a185.89 185.89 0 0 1-28.2-13.8c-44.7 8.5-65.4 9.1-106 4.5-33.5-3.8-13.9-15.2-13.9-15.2zm179.8 97.2c-78.7 14.8-175.8 13.1-233.3 3.6 0-.1 11.8 9.7 72.4 13.6 92.2 5.9 233.8-3.3 237.1-46.9 0 0-6.4 16.5-76.2 29.7zM260.64 353c-59.2 11.4-93.5 11.1-136.8 6.6-33.5-3.5-11.6-19.7-11.6-19.7-86.8 28.8 48.2 61.4 169.5 25.9a60.37 60.37 0 0 1-21.1-12.8z'

  const path = new Path2D(javaSvgPath)
  ctx.save()
  const scale = 0.32
  const ox = 128 - (384 * scale) / 2
  const oy = 116 - (512 * scale) / 2
  ctx.translate(ox, oy)
  ctx.scale(scale, scale)

  const logoGrad = ctx.createLinearGradient(0, 0, 0, 512)
  logoGrad.addColorStop(0, '#e76f00')
  logoGrad.addColorStop(0.38, '#ea2d2e')
  logoGrad.addColorStop(0.65, '#5382a1')
  logoGrad.addColorStop(1, '#007396')
  ctx.fillStyle = logoGrad
  ctx.fill(path)
  ctx.restore()

  // Small bottom label: Java
  ctx.fillStyle = '#faf8f2'
  ctx.font = 'bold 18px ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace'
  ctx.textAlign = 'center'
  ctx.fillText('Java', 128, 222)

  const texture = new THREE.CanvasTexture(canvas)
  texture.generateMipmaps = true
  texture.minFilter = THREE.LinearMipmapLinearFilter
  return texture
}

/**
 * Creates the small, recognizable Spring Boot Logo badge texture.
 * Uses authentic Spring Boot power leaf SVG path (SiSpringboot).
 */
function createSpringBootLogoTexture(): THREE.CanvasTexture {
  const canvas = document.createElement('canvas')
  canvas.width = 256
  canvas.height = 256
  const ctx = canvas.getContext('2d')!

  const drawHexagon = (cx: number, cy: number, r: number) => {
    ctx.beginPath()
    for (let i = 0; i < 6; i++) {
      const angle = (Math.PI / 3) * i - Math.PI / 6
      const x = cx + r * Math.cos(angle)
      const y = cy + r * Math.sin(angle)
      if (i === 0) ctx.moveTo(x, y)
      else ctx.lineTo(x, y)
    }
    ctx.closePath()
  }

  // Hexagonal dark background
  const grad = ctx.createRadialGradient(128, 128, 20, 128, 128, 125)
  grad.addColorStop(0, '#182d1e')
  grad.addColorStop(0.7, '#101d14')
  grad.addColorStop(1, '#09110b')
  ctx.fillStyle = grad
  drawHexagon(128, 128, 120)
  ctx.fill()

  ctx.strokeStyle = '#6db33f'
  ctx.lineWidth = 4
  drawHexagon(128, 128, 118)
  ctx.stroke()

  ctx.strokeStyle = 'rgba(216, 240, 162, 0.4)'
  ctx.lineWidth = 1.5
  drawHexagon(128, 128, 112)
  ctx.stroke()

  // Authentic Spring Boot SVG Path (SiSpringboot)
  const springSvgPath =
    'm23.693 10.7058-4.73-8.1844c-.4094-.7106-1.4166-1.2942-2.2402-1.2942H7.2725c-.819 0-1.8308.5836-2.2402 1.2942L.307 10.7058c-.4095.7106-.4095 1.873 0 2.5837l4.7252 8.189c.4094.7107 1.4166 1.2943 2.2402 1.2943h9.455c.819 0 1.826-.5836 2.2402-1.2942l4.7252-8.189c.4095-.7107.4095-1.8732 0-2.5838zM10.9763 5.7547c0-.5365.4377-.9742.9742-.9742s.9742.4377.9742.9742v5.8217c0 .5366-.4377.9742-.9742.9742s-.9742-.4376-.9742-.9742zm.9742 12.4294c-3.6427 0-6.6077-2.965-6.6077-6.6077.0047-2.0896.993-4.0521 2.6685-5.304a.8657.8657 0 0 1 1.2142.1788.8657.8657 0 0 1-.1788 1.2143c-2.1602 1.6048-2.612 4.6592-1.0072 6.8194 1.6049 2.1603 4.6593 2.612 6.8195 1.0072 1.2378-.9177 1.9673-2.372 1.9673-3.9157a4.8972 4.8972 0 0 0-1.9861-3.925c-.386-.2824-.466-.8284-.1836-1.2143.2824-.386.8283-.466 1.2143-.1835 1.6895 1.2471 2.6826 3.2238 2.6873 5.3228 0 3.6474-2.965 6.6077-6.6077 6.6077z'

  const path = new Path2D(springSvgPath)
  ctx.save()
  const scale = 5.8
  const ox = 128 - (24 * scale) / 2
  const oy = 114 - (24 * scale) / 2
  ctx.translate(ox, oy)
  ctx.scale(scale, scale)

  ctx.fillStyle = '#6db33f'
  ctx.fill(path)
  ctx.restore()

  // Small bottom label: Spring
  ctx.fillStyle = '#d8f0a2'
  ctx.font = 'bold 18px ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace'
  ctx.textAlign = 'center'
  ctx.fillText('Spring', 128, 222)

  const texture = new THREE.CanvasTexture(canvas)
  texture.generateMipmaps = true
  texture.minFilter = THREE.LinearMipmapLinearFilter
  return texture
}

/**
 * Creates the small, recognizable MySQL Database Logo badge texture.
 * Uses authentic MySQL dolphin & typography SVG path (SiMysql).
 */
function createMysqlLogoTexture(): THREE.CanvasTexture {
  const canvas = document.createElement('canvas')
  canvas.width = 256
  canvas.height = 256
  const ctx = canvas.getContext('2d')!

  // Glassy circular disc background
  const grad = ctx.createRadialGradient(128, 128, 20, 128, 128, 125)
  grad.addColorStop(0, '#10232b')
  grad.addColorStop(0.7, '#0c171d')
  grad.addColorStop(1, '#060d10')
  ctx.fillStyle = grad
  ctx.beginPath()
  ctx.arc(128, 128, 120, 0, Math.PI * 2)
  ctx.fill()

  // Border rings in MySQL teal & orange highlight
  ctx.strokeStyle = '#00758f'
  ctx.lineWidth = 4
  ctx.beginPath()
  ctx.arc(128, 128, 118, 0, Math.PI * 2)
  ctx.stroke()

  ctx.strokeStyle = 'rgba(242, 145, 17, 0.45)'
  ctx.lineWidth = 1.5
  ctx.beginPath()
  ctx.arc(128, 128, 112, 0, Math.PI * 2)
  ctx.stroke()

  // Authentic MySQL SVG Path (SiMysql)
  const mysqlSvgPath =
    'M16.405 5.501c-.115 0-.193.014-.274.033v.013h.014c.054.104.146.18.214.273.054.107.1.214.154.32l.014-.015c.094-.066.14-.172.14-.333-.04-.047-.046-.094-.08-.14-.04-.067-.126-.1-.18-.153zM5.77 18.695h-.927a50.854 50.854 0 00-.27-4.41h-.008l-1.41 4.41H2.45l-1.4-4.41h-.01a72.892 72.892 0 00-.195 4.41H0c.055-1.966.192-3.81.41-5.53h1.15l1.335 4.064h.008l1.347-4.064h1.095c.242 2.015.384 3.86.428 5.53zm4.017-4.08c-.378 2.045-.876 3.533-1.492 4.46-.482.716-1.01 1.073-1.583 1.073-.153 0-.34-.046-.566-.138v-.494c.11.017.24.026.386.026.268 0 .483-.075.647-.222.197-.18.295-.382.295-.605 0-.155-.077-.47-.23-.944L6.23 14.615h.91l.727 2.36c.164.536.233.91.205 1.123.4-1.064.678-2.227.835-3.483zm12.325 4.08h-2.63v-5.53h.885v4.85h1.745zm-3.32.135l-1.016-.5c.09-.076.177-.158.255-.25.433-.506.648-1.258.648-2.253 0-1.83-.718-2.746-2.155-2.746-.704 0-1.254.232-1.65.697-.43.508-.646 1.256-.646 2.245 0 .972.19 1.686.574 2.14.35.41.877.615 1.583.615.264 0 .506-.033.725-.098l1.325.772.36-.622zM15.5 17.588c-.225-.36-.337-.94-.337-1.736 0-1.393.424-2.09 1.27-2.09.443 0 .77.167.977.5.224.362.336.936.336 1.723 0 1.404-.424 2.108-1.27 2.108-.445 0-.77-.167-.978-.5zm-1.658-.425c0 .47-.172.856-.516 1.156-.344.3-.803.45-1.384.45-.543 0-1.064-.172-1.573-.515l.237-.476c.438.22.833.328 1.19.328.332 0 .593-.073.783-.22a.754.754 0 00.3-.615c0-.33-.23-.61-.648-.845-.388-.213-1.163-.657-1.163-.657-.422-.307-.632-.636-.632-1.177 0-.45.157-.81.47-1.085.315-.278.72-.415 1.22-.415.512 0 .98.136 1.4.41l-.213.476a2.726 2.726 0 00-1.064-.23c-.283 0-.502.068-.654.206a.685.685 0 00-.248.524c0 .328.234.61.666.85.393.215 1.187.67 1.187.67.433.305.648.63.648 1.168zm9.382-5.852c-.535-.014-.95.04-1.297.188-.1.04-.26.04-.274.167.055.053.063.14.11.214.08.134.218.313.346.407.14.11.28.216.427.31.26.16.555.255.81.416.145.094.293.213.44.313.073.05.12.14.214.172v-.02c-.046-.06-.06-.147-.105-.214-.067-.067-.134-.127-.2-.193a3.223 3.223 0 00-.695-.675c-.214-.146-.682-.35-.77-.595l-.013-.014c.146-.013.32-.066.46-.106.227-.06.435-.047.67-.106.106-.027.213-.06.32-.094v-.06c-.12-.12-.21-.283-.334-.395a8.867 8.867 0 00-1.104-.823c-.21-.134-.476-.22-.697-.334-.08-.04-.214-.06-.26-.127-.12-.146-.19-.34-.275-.514a17.69 17.69 0 01-.547-1.163c-.12-.262-.193-.523-.34-.763-.69-1.137-1.437-1.826-2.586-2.5-.247-.14-.543-.2-.856-.274-.167-.008-.334-.02-.5-.027-.11-.047-.216-.174-.31-.235-.38-.24-1.364-.76-1.644-.072-.18.434.267.862.422 1.082.115.153.26.328.34.5.047.116.06.235.107.356.106.294.207.622.347.897.073.14.153.287.247.413.054.073.146.107.167.227-.094.136-.1.334-.154.5-.24.757-.146 1.693.194 2.25.107.166.362.534.703.393.3-.12.234-.5.32-.835.02-.08.007-.133.048-.187v.015c.094.188.188.367.274.555.206.328.566.668.867.895.16.12.287.328.487.402v-.02h-.015c-.043-.058-.1-.086-.154-.133a3.445 3.445 0 01-.35-.4 8.76 8.76 0 01-.747-1.218c-.11-.21-.202-.436-.29-.643-.04-.08-.04-.2-.107-.24-.1.146-.247.273-.32.453-.127.288-.14.642-.188 1.01-.027.007-.014 0-.027.014-.214-.052-.287-.274-.367-.46-.2-.475-.233-1.238-.06-1.785.047-.14.247-.582.167-.716-.042-.127-.174-.2-.247-.303a2.478 2.478 0 01-.24-.427c-.16-.374-.24-.788-.414-1.162-.08-.173-.22-.354-.334-.513-.127-.18-.267-.307-.368-.52-.033-.073-.08-.194-.027-.274.014-.054.042-.075.094-.09.088-.072.335.022.422.062.247.1.455.194.662.334.094.066.195.193.315.226h.14c.214.047.455.014.655.073.355.114.675.28.962.46a5.953 5.953 0 012.085 2.286c.08.154.115.295.188.455.14.33.313.663.455.982.14.315.275.636.476.897.1.14.502.213.682.286.133.06.34.115.46.188.23.14.454.3.67.454.11.076.443.243.463.378z'

  const path = new Path2D(mysqlSvgPath)
  ctx.save()
  const scale = 7.0
  const ox = 128 - (24 * scale) / 2
  const oy = 114 - (24 * scale) / 2
  ctx.translate(ox, oy)
  ctx.scale(scale, scale)

  const logoGrad = ctx.createLinearGradient(0, 0, 24, 24)
  logoGrad.addColorStop(0, '#00758f')
  logoGrad.addColorStop(0.7, '#00a0be')
  logoGrad.addColorStop(1, '#f29111')
  ctx.fillStyle = logoGrad
  ctx.fill(path)
  ctx.restore()

  // Small bottom label: MySQL
  ctx.fillStyle = '#faf8f2'
  ctx.font = 'bold 18px ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace'
  ctx.textAlign = 'center'
  ctx.fillText('MySQL', 128, 222)

  const texture = new THREE.CanvasTexture(canvas)
  texture.generateMipmaps = true
  texture.minFilter = THREE.LinearMipmapLinearFilter
  return texture
}

/**
 * Creates the small, elegant Java code snippet texture.
 * Exact snippet text: System.out.println("Sujal");
 */
function createJavaSnippetTexture(): THREE.CanvasTexture {
  const canvas = document.createElement('canvas')
  canvas.width = 512
  canvas.height = 120
  const ctx = canvas.getContext('2d')!

  // Glassy frosted pill card background
  ctx.fillStyle = 'rgba(16, 24, 20, 0.94)'
  drawRoundedRect(ctx, 4, 4, 504, 112, 14)
  ctx.fill()

  ctx.strokeStyle = '#39834a'
  ctx.lineWidth = 2
  ctx.stroke()

  ctx.strokeStyle = 'rgba(255, 255, 255, 0.08)'
  ctx.lineWidth = 1
  drawRoundedRect(ctx, 8, 8, 496, 104, 10)
  ctx.stroke()

  // Terminal chevron / indicator dot
  ctx.fillStyle = '#6db33f'
  ctx.beginPath()
  ctx.arc(26, 60, 4.5, 0, Math.PI * 2)
  ctx.fill()

  // Exact code text: System.out.println("Sujal");
  ctx.font = 'bold 21px ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace'
  const startY = 67
  let x = 44

  const chunks = [
    { text: 'System', color: '#61afef' },
    { text: '.out.', color: '#abb2bf' },
    { text: 'println', color: '#e5c07b' },
    { text: '(', color: '#abb2bf' },
    { text: '"Sujal"', color: '#98c379' },
    { text: ');', color: '#abb2bf' },
  ]

  for (const chunk of chunks) {
    ctx.fillStyle = chunk.color
    ctx.fillText(chunk.text, x, startY)
    x += ctx.measureText(chunk.text).width
  }

  const texture = new THREE.CanvasTexture(canvas)
  texture.generateMipmaps = true
  texture.minFilter = THREE.LinearMipmapLinearFilter
  return texture
}

function checkWebGLSupport(): boolean {
  if (typeof window === 'undefined') return true
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return false
  try {
    const canvas = document.createElement('canvas')
    return Boolean(
      window.WebGLRenderingContext &&
      (canvas.getContext('webgl') || canvas.getContext('experimental-webgl'))
    )
  } catch {
    return false
  }
}

export function HeroVisual3D() {
  const mountRef = useRef<HTMLDivElement>(null)
  const [hasWebGL, setHasWebGL] = useState(checkWebGLSupport)

  useEffect(() => {
    if (!hasWebGL) return

    const container = mountRef.current
    if (!container) return

    // Scene, Camera, Renderer
    const scene = new THREE.Scene()
    const width = container.clientWidth || 400
    const height = container.clientHeight || 420

    const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 100)
    camera.position.z = 5.2

    let renderer: THREE.WebGLRenderer
    try {
      renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true, powerPreference: 'high-performance' })
      renderer.setSize(width, height)
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
      container.appendChild(renderer.domElement)
    } catch {
      queueMicrotask(() => setHasWebGL(false))
      return
    }

    // Master Group for mouse and scroll interaction
    const masterGroup = new THREE.Group()
    scene.add(masterGroup)

    // Palette Colors:
    // Forest Charcoal: #24332B, Fresh Green: #39834A, Soft Lime: #D8F0A2, Warm Ivory: #FAF8F2
    const greenColor = 0x39834a
    const limeColor = 0xd8f0a2
    const ivoryColor = 0xfaf8f2
    const charcoalColor = 0x24332b

    // 1. Core Faceted Octahedron (Solid architectural crystal)
    const coreGeo = new THREE.OctahedronGeometry(0.9, 0)
    const coreMat = new THREE.MeshStandardMaterial({
      color: ivoryColor,
      roughness: 0.35,
      metalness: 0.1,
      flatShading: true,
      polygonOffset: true,
      polygonOffsetFactor: 1,
      polygonOffsetUnits: 1,
    })
    const coreMesh = new THREE.Mesh(coreGeo, coreMat)
    masterGroup.add(coreMesh)

    // Core Wireframe Outline
    const coreWireGeo = new THREE.EdgesGeometry(coreGeo)
    const coreWireMat = new THREE.LineBasicMaterial({ color: greenColor, linewidth: 1.5 })
    const coreWireMesh = new THREE.LineSegments(coreWireGeo, coreWireMat)
    coreMesh.add(coreWireMesh)

    // 2. Precision Outer Wireframe Icosahedron
    const outerGeo = new THREE.IcosahedronGeometry(1.65, 0)
    const outerWireGeo = new THREE.EdgesGeometry(outerGeo)
    const outerWireMat = new THREE.LineBasicMaterial({
      color: charcoalColor,
      transparent: true,
      opacity: 0.45,
    })
    const outerWireMesh = new THREE.LineSegments(outerWireGeo, outerWireMat)
    masterGroup.add(outerWireMesh)

    // 3. Kinetic Orthogonal Rings (Kinetic coordinate rings)
    const ring1Geo = new THREE.TorusGeometry(1.85, 0.012, 16, 80)
    const ring1Mat = new THREE.MeshBasicMaterial({ color: greenColor })
    const ring1Mesh = new THREE.Mesh(ring1Geo, ring1Mat)
    ring1Mesh.rotation.x = Math.PI / 3
    masterGroup.add(ring1Mesh)

    const ring2Geo = new THREE.TorusGeometry(2.05, 0.01, 16, 80)
    const ring2Mat = new THREE.MeshBasicMaterial({ color: limeColor })
    const ring2Mesh = new THREE.Mesh(ring2Geo, ring2Mat)
    ring2Mesh.rotation.y = Math.PI / 4
    masterGroup.add(ring2Mesh)

    // 4. Lattice Nodes at vertices
    const nodeGeo = new THREE.SphereGeometry(0.045, 12, 12)
    const nodeMat = new THREE.MeshBasicMaterial({ color: greenColor })
    const nodePositions = outerGeo.getAttribute('position')
    const nodesGroup = new THREE.Group()

    for (let i = 0; i < nodePositions.count; i++) {
      const node = new THREE.Mesh(nodeGeo, nodeMat)
      node.position.fromBufferAttribute(nodePositions, i)
      nodesGroup.add(node)
    }
    masterGroup.add(nodesGroup)

    // 5. Targeted Enhancement: 3 Recognizable Logos & 1 Java Code Snippet
    const javaTexture = createJavaLogoTexture()
    const springTexture = createSpringBootLogoTexture()
    const mysqlTexture = createMysqlLogoTexture()
    const snippetTexture = createJavaSnippetTexture()

    // (A) Java Logo (Top Left Orbit)
    const javaBadgeGroup = new THREE.Group()
    const javaBadgeGeo = new THREE.CylinderGeometry(0.28, 0.28, 0.035, 32)
    const javaSideMat = new THREE.MeshStandardMaterial({ color: 0x1f2e25, metalness: 0.8, roughness: 0.3 })
    const javaCapMat = new THREE.MeshBasicMaterial({ map: javaTexture })
    const javaBadgeMesh = new THREE.Mesh(javaBadgeGeo, [javaSideMat, javaCapMat, javaCapMat])
    javaBadgeMesh.rotation.x = Math.PI / 2
    javaBadgeGroup.add(javaBadgeMesh)
    javaBadgeGroup.position.set(-1.85, 0.95, 0.3)
    javaBadgeGroup.rotation.set(0.08, 0.12, -0.04)
    masterGroup.add(javaBadgeGroup)

    // (B) Spring Boot Logo (Top Right Orbit)
    const springBadgeGroup = new THREE.Group()
    const springBadgeGeo = new THREE.CylinderGeometry(0.28, 0.28, 0.035, 6)
    const springSideMat = new THREE.MeshStandardMaterial({ color: 0x182c1d, metalness: 0.8, roughness: 0.3 })
    const springCapMat = new THREE.MeshBasicMaterial({ map: springTexture })
    const springBadgeMesh = new THREE.Mesh(springBadgeGeo, [springSideMat, springCapMat, springCapMat])
    springBadgeMesh.rotation.x = Math.PI / 2
    springBadgeMesh.rotation.z = Math.PI / 6
    springBadgeGroup.add(springBadgeMesh)
    springBadgeGroup.position.set(1.85, 0.95, 0.3)
    springBadgeGroup.rotation.set(0.08, -0.12, 0.04)
    masterGroup.add(springBadgeGroup)

    // (C) MySQL Database Logo (Bottom Right Orbit)
    const mysqlBadgeGroup = new THREE.Group()
    const mysqlBadgeGeo = new THREE.CylinderGeometry(0.28, 0.28, 0.035, 32)
    const mysqlSideMat = new THREE.MeshStandardMaterial({ color: 0x12242b, metalness: 0.8, roughness: 0.3 })
    const mysqlCapMat = new THREE.MeshBasicMaterial({ map: mysqlTexture })
    const mysqlBadgeMesh = new THREE.Mesh(mysqlBadgeGeo, [mysqlSideMat, mysqlCapMat, mysqlCapMat])
    mysqlBadgeMesh.rotation.x = Math.PI / 2
    mysqlBadgeGroup.add(mysqlBadgeMesh)
    mysqlBadgeGroup.position.set(1.75, -0.9, 0.35)
    mysqlBadgeGroup.rotation.set(0.06, -0.1, 0.02)
    masterGroup.add(mysqlBadgeGroup)

    // (D) Java Code Snippet Label: System.out.println("Sujal"); (Bottom Left Orbit)
    const snippetGeo = new THREE.PlaneGeometry(1.3, 0.33)
    const snippetMat = new THREE.MeshBasicMaterial({
      map: snippetTexture,
      transparent: true,
      opacity: 0.94,
      side: THREE.DoubleSide,
    })
    const snippetMesh = new THREE.Mesh(snippetGeo, snippetMat)
    snippetMesh.position.set(-1.45, -1.1, 0.45)
    snippetMesh.rotation.set(0.06, 0.1, 0)
    masterGroup.add(snippetMesh)

    // 6. Minimal Ambient and Directional Lights
    const ambientLight = new THREE.AmbientLight(0xffffff, 1.4)
    scene.add(ambientLight)

    const dirLight1 = new THREE.DirectionalLight(0xffffff, 1.8)
    dirLight1.position.set(4, 5, 4)
    scene.add(dirLight1)

    const dirLight2 = new THREE.DirectionalLight(greenColor, 1.0)
    dirLight2.position.set(-4, -3, 2)
    scene.add(dirLight2)

    // Mouse Parallax & Motion Variables
    let mouseX = 0
    let mouseY = 0
    let targetRotationX = 0
    let targetRotationY = 0

    const handleMouseMove = (e: MouseEvent) => {
      const rect = container.getBoundingClientRect()
      const x = ((e.clientX - rect.left) / rect.width) * 2 - 1
      const y = -(((e.clientY - rect.top) / rect.height) * 2 - 1)
      mouseX = x * 0.4
      mouseY = y * 0.3
    }

    window.addEventListener('mousemove', handleMouseMove, { passive: true })

    // Scroll Transformation
    let scrollYOffset = 0
    const handleScroll = () => {
      scrollYOffset = window.scrollY * 0.0012
    }
    window.addEventListener('scroll', handleScroll, { passive: true })

    // Resize Handler
    const handleResize = () => {
      if (!container || !renderer) return
      const w = container.clientWidth
      const h = container.clientHeight
      camera.aspect = w / h
      camera.updateProjectionMatrix()
      renderer.setSize(w, h)
    }
    window.addEventListener('resize', handleResize)

    // Listen for theme changes to dynamically update materials
    const updateThemeColors = (dark: boolean) => {
      if (dark) {
        coreMat.color.setHex(0x1c2921)
        coreWireMat.color.setHex(0x48a85f)
        outerWireMat.color.setHex(0xd8f0a2)
        outerWireMat.opacity = 0.6
      } else {
        coreMat.color.setHex(ivoryColor)
        coreWireMat.color.setHex(greenColor)
        outerWireMat.color.setHex(charcoalColor)
        outerWireMat.opacity = 0.45
      }
    }

    // Set initial colors based on current document theme
    updateThemeColors(document.documentElement.classList.contains('dark'))

    const handleThemeChange = (e: Event) => {
      const customEvent = e as CustomEvent<{ theme: 'light' | 'dark' }>
      updateThemeColors(customEvent.detail?.theme === 'dark')
    }
    window.addEventListener('sn-theme-change', handleThemeChange)

    // Animation Loop
    let animationFrameId: number
    const clock = new THREE.Clock()

    const animate = () => {
      animationFrameId = requestAnimationFrame(animate)
      const delta = clock.getDelta()
      const time = clock.getElapsedTime()

      // Continuous kinetic rotation of original core crystal & rings
      coreMesh.rotation.y += delta * 0.4
      coreMesh.rotation.x += delta * 0.2
      outerWireMesh.rotation.y -= delta * 0.25
      ring1Mesh.rotation.z += delta * 0.3
      ring2Mesh.rotation.x -= delta * 0.35

      // Subtle complementary floating motion for the 3 logos and code snippet
      javaBadgeGroup.position.y = 0.95 + Math.sin(time * 1.4) * 0.03
      springBadgeGroup.position.y = 0.95 + Math.cos(time * 1.3) * 0.03
      mysqlBadgeGroup.position.y = -0.9 + Math.sin(time * 1.2 + 1.0) * 0.03
      snippetMesh.position.y = -1.1 + Math.cos(time * 1.1 + 2.0) * 0.02

      // Smooth mouse tilt lerp
      targetRotationX += (mouseY - targetRotationX) * 0.06
      targetRotationY += (mouseX - targetRotationY) * 0.06

      masterGroup.rotation.x = targetRotationX + scrollYOffset * 0.5
      masterGroup.rotation.y = targetRotationY + scrollYOffset * 0.8

      renderer.render(scene, camera)
    }

    animate()

    // Cleanup
    return () => {
      cancelAnimationFrame(animationFrameId)
      window.removeEventListener('mousemove', handleMouseMove)
      window.removeEventListener('scroll', handleScroll)
      window.removeEventListener('resize', handleResize)
      window.removeEventListener('sn-theme-change', handleThemeChange)

      if (container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement)
      }

      // Dispose original resources
      coreGeo.dispose()
      coreMat.dispose()
      coreWireGeo.dispose()
      coreWireMat.dispose()
      outerGeo.dispose()
      outerWireGeo.dispose()
      outerWireMat.dispose()
      ring1Geo.dispose()
      ring1Mat.dispose()
      ring2Geo.dispose()
      ring2Mat.dispose()
      nodeGeo.dispose()
      nodeMat.dispose()

      // Dispose newly added badge & snippet resources
      javaBadgeGeo.dispose()
      javaSideMat.dispose()
      javaCapMat.dispose()
      javaTexture.dispose()

      springBadgeGeo.dispose()
      springSideMat.dispose()
      springCapMat.dispose()
      springTexture.dispose()

      mysqlBadgeGeo.dispose()
      mysqlSideMat.dispose()
      mysqlCapMat.dispose()
      mysqlTexture.dispose()

      snippetGeo.dispose()
      snippetMat.dispose()
      snippetTexture.dispose()

      renderer.dispose()
    }
  }, [hasWebGL])

  return (
    <div className="relative w-full h-full flex flex-col items-center justify-center">
      {hasWebGL ? (
        <div ref={mountRef} className="w-full h-[360px] sm:h-[420px] cursor-grab active:cursor-grabbing" />
      ) : (
        /* Accessible Fallback Graphic for reduced motion or no WebGL */
        <div className="w-full h-[360px] sm:h-[420px] flex items-center justify-center p-8">
          <svg
            viewBox="0 0 200 200"
            className="w-48 h-48 text-accent-green stroke-current fill-none"
            strokeWidth="1.5"
            aria-label="Computational Geometric Architecture Graphic"
          >
            <polygon points="100,20 180,70 180,150 100,190 20,150 20,70" opacity="0.4" />
            <polygon points="100,45 155,80 155,140 100,165 45,140 45,80" />
            <circle cx="100" cy="105" r="32" className="text-accent-green stroke-current" strokeWidth="2" />
            <line x1="100" y1="20" x2="100" y2="190" strokeDasharray="3,3" opacity="0.5" />
            <line x1="20" y1="70" x2="180" y2="150" strokeDasharray="3,3" opacity="0.5" />
          </svg>
        </div>
      )}

      {/* Understated caption */}
      <div className="text-[11px] font-mono text-text-secondary mt-1 flex items-center gap-2">
        <span className="w-1.5 h-1.5 rounded-full bg-accent-green animate-pulse" />
        <span>Computational Architecture · Distributed Systems</span>
      </div>
    </div>
  )
}
