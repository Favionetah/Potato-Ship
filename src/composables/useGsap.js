export function useGsap() {
  const gsap = window.gsap
  const ScrollTrigger = window.ScrollTrigger

  function createTimeline(delay = 0) {
    return gsap.timeline({ delay })
  }

  function fadeInUp(el, options = {}) {
    return gsap.fromTo(el,
      { opacity: 0, y: 40 },
      {
        opacity: 1,
        y: 0,
        duration: options.duration || 0.8,
        delay: options.delay || 0,
        ease: 'power3.out',
        ...options
      }
    )
  }

  function staggerFadeIn(elements, options = {}) {
    return gsap.fromTo(elements,
      { opacity: 0, y: 30 },
      {
        opacity: 1,
        y: 0,
        duration: options.duration || 0.6,
        stagger: options.stagger || 0.1,
        ease: 'power2.out',
        ...options
      }
    )
  }

  function scrollReveal(el, options = {}) {
    return gsap.fromTo(el,
      { opacity: 0, y: 50 },
      {
        opacity: 1,
        y: 0,
        duration: options.duration || 0.8,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: el,
          start: 'top 85%',
          ...options.scrollTrigger
        }
      }
    )
  }

  function splitTextToSpans(el) {
    const text = el.textContent
    el.textContent = ''
    const chars = text.split('')
    chars.forEach(char => {
      const span = document.createElement('span')
      span.textContent = char === ' ' ? '\u00A0' : char
      span.style.display = 'inline-block'
      el.appendChild(span)
    })
    return el.querySelectorAll('span')
  }

  function tilt3D(card, options = {}) {
    const strength = options.strength || 10

    function handleMove(e) {
      const rect = card.getBoundingClientRect()
      const x = e.clientX - rect.left
      const y = e.clientY - rect.top
      const centerX = rect.width / 2
      const centerY = rect.height / 2
      const rotateX = -(y - centerY) / centerY * strength
      const rotateY = (x - centerX) / centerX * strength

      gsap.to(card, {
        rotateX,
        rotateY,
        scale: 1.02,
        duration: 0.3,
        ease: 'power2.out',
        overwrite: 'auto'
      })
    }

    function handleLeave() {
      gsap.to(card, {
        rotateX: 0,
        rotateY: 0,
        scale: 1,
        duration: 0.5,
        ease: 'elastic.out(1, 0.4)',
        overwrite: 'auto'
      })
    }

    card.addEventListener('mousemove', handleMove)
    card.addEventListener('mouseleave', handleLeave)

    return () => {
      card.removeEventListener('mousemove', handleMove)
      card.removeEventListener('mouseleave', handleLeave)
    }
  }

  function floatingElement(el, options = {}) {
    gsap.to(el, {
      y: options.y || -20,
      x: options.x || 10,
      rotation: options.rotation || 5,
      duration: options.duration || 3,
      ease: 'sine.inOut',
      yoyo: true,
      repeat: -1,
      delay: options.delay || 0
    })
  }

  function animateGradient(bgEl) {
    const colors = [
      { r: 46, g: 56, b: 65 },
      { r: 54, g: 68, b: 82 },
      { r: 46, g: 56, b: 65 }
    ]
    let current = 0

    gsap.timeline({ repeat: -1, yoyo: true, duration: 8 })
      .to(bgEl, {
        backgroundPosition: '100% 50%',
        ease: 'sine.inOut',
        duration: 8
      })
      .to(bgEl, {
        backgroundPosition: '0% 50%',
        ease: 'sine.inOut',
        duration: 8
      })
  }

  function animateServiceCard(type, container) {
    if (!container) return null
    const tl = gsap.timeline({ paused: true })

    switch (type) {
      case 'corporativa': {
        const buildings = container.querySelectorAll('.anim-building')
        gsap.set(buildings, { scaleY: 0, transformOrigin: 'bottom center', opacity: 0 })
        tl.to(buildings, {
          scaleY: 1,
          opacity: 0.6,
          stagger: 0.08,
          duration: 0.6,
          ease: 'elastic.out(1, 0.5)'
        })
        break
      }
      case 'landing': {
        const funnel = container.querySelector('.anim-funnel')
        const dots = container.querySelectorAll('.anim-lead-dot')
        const checks = container.querySelectorAll('.anim-check')
        gsap.set(funnel, { scaleY: 0, opacity: 0, transformOrigin: 'top center' })
        gsap.set(dots, { opacity: 0, y: -15 })
        gsap.set(checks, { scale: 0, opacity: 0 })
        tl.to(funnel, { scaleY: 1, opacity: 0.3, duration: 0.35, ease: 'power2.out' })
        tl.to(dots, {
          y: 30, opacity: 0.8, stagger: 0.07, duration: 0.35, ease: 'power2.in'
        }, '-=0.1')
        tl.to(checks, {
          scale: 1, opacity: 1, stagger: 0.06, duration: 0.2, ease: 'back.out(3)'
        }, '-=0.2')
        break
      }
      case 'catalogo': {
        const items = container.querySelectorAll('.anim-shelf-item')
        gsap.set(items, { y: 40, opacity: 0, scale: 0.85 })
        tl.to(items, {
          y: 0, opacity: 0.7, scale: 1,
          stagger: { each: 0.05, from: 'start' },
          duration: 0.4, ease: 'back.out(1.6)'
        })
        break
      }
      case 'menu': {
        const card = container.querySelector('.anim-menu-card')
        const lines = container.querySelectorAll('.anim-menu-line')
        gsap.set(card, { scaleX: 0, scaleY: 0.1, opacity: 0, transformOrigin: 'top center' })
        gsap.set(lines, { scaleX: 0, opacity: 0, transformOrigin: 'left center' })
        tl.to(card, { scaleX: 1, scaleY: 1, opacity: 1, duration: 0.4, ease: 'back.out(1.5)' })
        tl.to(lines, {
          scaleX: 1, opacity: 0.35, stagger: 0.06, duration: 0.25, ease: 'power2.out'
        }, '-=0.15')
        break
      }
      case 'portafolio': {
        const squares = container.querySelectorAll('.anim-gal-square')
        gsap.set(squares, { rotationY: -90, opacity: 0, transformOrigin: 'left center' })
        tl.to(squares, {
          rotationY: 0, opacity: 0.5, stagger: 0.07,
          duration: 0.4, ease: 'power2.out'
        })
        break
      }
      case 'informativa': {
        const shape = container.querySelector('.anim-morph')
        gsap.set(shape, { borderRadius: '50%', scale: 0.7, opacity: 0, clipPath: 'polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)' })
        tl.to(shape, { scale: 1, opacity: 0.5, duration: 0.5, ease: 'back.out(1.7)' })
        tl.to(shape, { borderRadius: '4px', duration: 0.35, ease: 'back.out(1.7)' })
        tl.to(shape, {
          borderRadius: '0%',
          clipPath: 'polygon(50% 8%, 50% 8%, 100% 100%, 0% 100%)',
          duration: 0.5,
          ease: 'power2.inOut'
        })
        break
      }
      case 'mantenimiento': {
        const gear = container.querySelector('.anim-gear')
        const dots = container.querySelectorAll('.anim-gear-dot')
        gsap.set(gear, { rotation: 0, opacity: 0 })
        gsap.set(dots, { scale: 0, opacity: 0 })
        tl.to(gear, { rotation: 360, opacity: 0.5, duration: 0.8, ease: 'power1.inOut' })
        tl.to(dots, {
          scale: 1, opacity: 0.3, stagger: 0.06, duration: 0.2, ease: 'back.out(2)'
        }, '-=0.5')
        break
      }
      case 'optimizacion': {
        const bar = container.querySelector('.anim-speed-bar')
        const trails = container.querySelectorAll('.anim-speed-trail')
        gsap.set(bar, { xPercent: -120, opacity: 0 })
        gsap.set(trails, { xPercent: -120, opacity: 0 })
        tl.to(bar, { xPercent: 120, opacity: 0.7, duration: 0.45, ease: 'power3.in' })
        tl.to(trails, {
          xPercent: 120, opacity: 0.3, stagger: 0.04,
          duration: 0.4, ease: 'power3.in'
        }, '-=0.35')
        break
      }
      case 'dominio': {
        const center = container.querySelector('.anim-signal-center')
        const waves = container.querySelectorAll('.anim-signal-wave')
        gsap.set(center, { scale: 0, opacity: 0 })
        gsap.set(waves, { scale: 0.2, opacity: 0 })
        tl.to(center, { scale: 1, opacity: 0.7, duration: 0.3, ease: 'back.out(2)' })
        tl.to(waves, {
          scale: 2.5, opacity: 0.3, stagger: 0.1,
          duration: 0.5, ease: 'power2.out'
        }, '-=0.1')
        break
      }
      case 'publicacion': {
        const rocket = container.querySelector('.anim-rocket')
        const flames = container.querySelectorAll('.anim-flame')
        gsap.set(rocket, { y: 15, opacity: 0 })
        gsap.set(flames, { y: 8, opacity: 0, scale: 0.7 })
        tl.to(rocket, { y: -12, opacity: 0.6, duration: 0.45, ease: 'power2.out' })
        tl.to(flames, {
          y: -4, opacity: 0.4, scale: 1,
          stagger: 0.03, duration: 0.3, ease: 'power2.out'
        }, '-=0.35')
        break
      }
    }

    return tl
  }

  return {
    gsap,
    ScrollTrigger,
    createTimeline,
    fadeInUp,
    staggerFadeIn,
    scrollReveal,
    splitTextToSpans,
    tilt3D,
    floatingElement,
    animateGradient,
    animateServiceCard
  }
}
