
import { useEffect, useRef } from 'react'
import { ArrowRight, Leaf, Sprout } from 'lucide-react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

const TOTAL_FRAMES = 90

export default function Hero() {
  const sectionRef = useRef(null)
  const canvasRef = useRef(null)
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

      image.onload = () => renderFrame(frameRef.current)

      return image
    })

    function renderFrame(index) {
      if (cancelled) return

      const target = Math.max(
        0,
        Math.min(TOTAL_FRAMES - 1, Math.round(index))
      )

      let image = images[target]

      if (!image?.complete || !image.naturalWidth) {
        image = images.find(
          (img, i) =>
            Math.abs(i - target) <= 3 &&
            img.complete &&
            img.naturalWidth
        )
      }

      if (!image) return

      const width = canvas.clientWidth
      const height = canvas.clientHeight

      if (!width || !height) return

      const dpr = Math.min(window.devicePixelRatio || 1, 2)

      if (
        canvas.width !== Math.round(width * dpr) ||
        canvas.height !== Math.round(height * dpr)
      ) {
        canvas.width = Math.round(width * dpr)
        canvas.height = Math.round(height * dpr)
      }

      ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
      ctx.clearRect(0, 0, width, height)

      const isMobile = window.matchMedia('(max-width: 650px)').matches

      // Contain on mobile to show the complete bowl.
      // Cover on desktop to fill the cinematic frame.
      const scale = isMobile
        ? Math.min(width / image.width, height / image.height)
        : Math.max(width / image.width, height / image.height)

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

    const resizeObserver = new ResizeObserver(() => {
      renderFrame(frameRef.current)
    })

    resizeObserver.observe(canvas)

    const mm = gsap.matchMedia()

    mm.add(
      {
        mobile: '(max-width: 650px)',
        desktop: '(min-width: 651px)'
      },
      (context) => {
        const { mobile } = context.conditions
        const animation = { frame: 0 }

        gsap.to(animation, {
          frame: TOTAL_FRAMES - 1,
          ease: 'none',

          onUpdate: () => {
            frameRef.current = animation.frame
            renderFrame(animation.frame)
          },

          scrollTrigger: {
            trigger: section,
            start: mobile ? 'top top' : 'top top',
            end: mobile ? '+=1000' : '+=2200',
            scrub: mobile ? 0.25 : 0.5,

            // Don't pin the entire page on mobile.
            pin: !mobile,

            anticipatePin: 1,
            invalidateOnRefresh: true
          }
        })
      },
      section
    )

    renderFrame(0)

    return () => {
      cancelled = true
      resizeObserver.disconnect()
      mm.revert()

      images.forEach(image => {
        image.onload = null
        image.onerror = null
        image.src = ''
      })
    }
  }, [])

  return (
    <section className="hero oat-story" ref={sectionRef}>

      <div className="hero-copy">
        <div className="eyebrow">
          <Leaf size={15} />
          REAL FOOD, FEEL-GOOD ENERGY
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
          aria-label="FitWellth oatmeal preparation animation"
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
