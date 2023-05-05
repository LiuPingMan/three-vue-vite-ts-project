import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'
import Stats from 'stats.js'
import { GUI } from 'dat.gui'

class ThreeHelper {
  scene = new THREE.Scene()
  camera = new THREE.PerspectiveCamera()
  renderer = new THREE.WebGLRenderer()
  container: HTMLElement
  controls!: OrbitControls
  axes!: THREE.AxesHelper
  stats!: Stats
  gui!: GUI
  constructor(container: HTMLElement) {
    this.container = container
    this.container.style.position = 'relative'
    this.init()
  }
  /**
   * 初始化场景
   */
  private init() {
    this.initCamera()
    this.camera.position.z = 30
    this.renderer.setSize(this.container.offsetWidth, this.container.offsetHeight)
    this.container.appendChild(this.renderer.domElement)
    this.initControls()
    this.initAxes()
    this.initStats()
    this.initGui()
    this.bindEvents()
  }
  /**
   * 初始化相机
   */
  private initCamera() {
    this.camera.fov = 75
    this.camera.aspect = this.container.offsetWidth / this.container.offsetHeight
    this.camera.near = 0.1
    this.camera.far = 1000
    this.camera.updateProjectionMatrix()
  }
  /**
   * 初始化轨道控制器
   */
  private initControls() {
    this.controls = new OrbitControls(this.camera, this.renderer.domElement)
    this.controls.update()
  }
  /**
   * 初始化坐标轴
   */
  private initAxes() {
    this.axes = new THREE.AxesHelper(1000)
    this.scene.add(this.axes)
  }
  /**
   * 初始化性能指示器
   */
  private initStats() {
    this.stats = new Stats()
    const { dom } = this.stats
    dom.style.position = 'absolute'
    dom.style.top = 'auto'
    dom.style.bottom = '0'
    this.container.appendChild(dom)
  }
  /**
   * 初始化GUI
   */
  private initGui() {
    this.gui = new GUI({ closed: true })
    const { domElement } = this.gui
    domElement.parentElement?.removeChild(domElement)
    domElement.style.position = 'absolute'
    domElement.style.top = '0'
    domElement.style.right = '0'
    this.container.appendChild(domElement)
  }
  /**
   * 渲染循环
   * @param callback 回调方法
   */
  animate(callback?: Function) {
    requestAnimationFrame(this.animate.bind(this, callback))
    callback && callback()
    this.stats.update()
    this.renderer.render(this.scene, this.camera)
  }
  /**
   * 绑定事件
   */
  private bindEvents() {
    window.addEventListener('resize', this.handleContainerResize.bind(this))
  }
  /**
   * 处理浏览器窗口大小变换
   */
  private handleContainerResize() {
    this.renderer.setSize(this.container.offsetWidth, this.container.offsetHeight)
    this.camera.aspect = this.container.offsetWidth / this.container.offsetHeight
    this.camera.updateProjectionMatrix()
  }
}

export default ThreeHelper
