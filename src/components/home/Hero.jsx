
import { useEffect, useRef } from 'react'
import { ArrowRight, Leaf, Sprout } from 'lucide-react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

const TOTAL_FRAMES = 90

export default function Hero() {
  const sectionRef = useRef(null)
  const canvasRef = useRef(null)
  const imagesRef = useRef([])
  const frameRef = useRef(0)

  useEffect(() => {
    const canvas = canvasRef.current
    const section = sectionRef.current
    if (!canvas || !section) return

    const ctx = canvas.getContext('2d')
    let cancelled = false

    const images = Array.from({ length: TOTAL_FRAMES }, (_, i) => {
      const image = new Image()
      image.src = `/animations/oat-bowl/frame_${String(i).padStart(3, '0')}.webp`
      return image
    })

    imagesRef.current = images

    function renderFrame(index) {
      if (cancelled) return

      const image = images[Math.round(index)]
      if (!image?.complete || !image.naturalWidth) return

      const width = canvas.clientWidth
      const height = canvas.clientHeight
      const dpr = Math.min(window.devicePixelRatio || 1, 2)

      if (canvas.width !== width * dpr ||
          canvas.height !== height * dpr) {
        canvas.width = width * dpr
        canvas.height = height * dpr
      }

      ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
      ctx.clearRect(0, 0, width, height)

      const scale = Math.max(
        width / image.width,
        height / image.height
      )

      const drawWidth = image.width * scale
      const drawHeight = image.height * scale

      ctx.drawImage(
        image,
        (width - drawWidth) / 2,
        (height - drawHeight) / 2,
        drawWidth,
        drawHeight
      )
    }

    // Render the first frame as soon as it is ready.
    images[0].onload = () => renderFrame(0)

    // Redraw the current frame when the browser resizes.
    const resizeObserver = new ResizeObserver(() => {
      renderFrame(frameRef.current)
    })
    resizeObserver.observe(canvas)

    const animation = { frame: 0 }

    const trigger = gsap.to(animation, {
      frame: TOTAL_FRAMES - 1,
      ease: 'none',
      onUpdate: () => {
        frameRef.current = animation.frame
        renderFrame(animation.frame)
      },
      scrollTrigger: {
        trigger: section,
        start: 'top top',
        end: '+=2200',
        scrub: 0.5,
        pin: true,
        anticipatePin: 1,
        invalidateOnRefresh: true
      }
    })

    return () => {
      cancelled = true
      resizeObserver.disconnect()
      trigger.scrollTrigger?.kill()
      trigger.kill()
      images.forEach(image => {
        image.onload = null
      })
    }
  }, [])

  return (
    <section className="hero oat-story" ref={sectionRef}>
      <div className="hero-copy">
        <div className="eyebrow">
          <Leaf size={15} /> REAL FOOD, FEEL-GOOD ENERGY
        </div>

        <h1>
          Small choices.<br />
          <em>Stronger</em> you.
        </h1>

        <p>
          Wholesome oats, traditional ragi malt and fresh sprouts —
          made to make everyday eating feel good.
        </p>

        <div className="hero-actions">
          <a className="btn btn-primary" href="#menu">
            Explore our menu <ArrowRight size={17} />
          </a>
          <a className="text-link" href="#story">
            Our little story <span>↗</span>
          </a>
        </div>

        <div className="hero-proof">
          <div className="proof-avatars">
            <span>🌾</span>
            <span>🥣</span>
            <span>🌱</span>
          </div>
          <div>
            <strong>Simple ingredients,</strong>
            <small>thoughtfully put together</small>
          </div>
        </div>
      </div>

      <div className="hero-visual oat-cinematic">
        <canvas
          ref={canvasRef}
          className="oat-animation-canvas"
          aria-label="A bowl of oatmeal being prepared with falling fresh ingredients"
        />

        <div className="oat-animation-label">
          <Sprout size={16} />
          <span>GOODNESS IN EVERY BOWL</span>
        </div>

        <div className="oat-scroll-label">
          SCROLL TO EXPERIENCE THE GOODNESS ↓
        </div>
      </div>

      <div className="hero-bottom">
        GOODNESS YOU CAN TASTE <span>✳</span>
        EVERYDAY FUEL <span>✳</span>
        MADE FRESH WITH CARE
      </div>
    </section>
  )
}
