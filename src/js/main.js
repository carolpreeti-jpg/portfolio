// Auto-fit hero title to full viewport width after font load
function fitHeroTitle() {
	const title = document.querySelector('.hero-title')
	const subtitle = document.querySelector('.hero-subtitle')
	if (!title) return
	title.style.fontSize = '100px'
	const range = document.createRange()
	range.selectNodeContents(title)
	const textWidth = range.getBoundingClientRect().width
	if (textWidth > 0) {
		const ratio = (window.innerWidth * 0.855) / textWidth
		title.style.fontSize = (100 * ratio) + 'px'
	}
	const finalRect = range.getBoundingClientRect()
	if (subtitle) {
		subtitle.style.paddingLeft = finalRect.left + 'px'
	}
	const galleryNav = document.querySelector('.gallery-nav')
	if (galleryNav) {
		galleryNav.style.paddingRight = Math.max(0, (window.innerWidth - finalRect.right) - window.innerWidth * 0.02) + 'px'
	}
}

document.fonts.ready.then(fitHeroTitle)
window.addEventListener('resize', fitHeroTitle)

// FAQ accordion
document.querySelectorAll('.faq-question').forEach(btn => {
	btn.addEventListener('click', () => {
		const item = btn.closest('.faq-item')
		const answer = item.querySelector('.faq-answer')
		const isOpen = btn.getAttribute('aria-expanded') === 'true'

		// close all
		document.querySelectorAll('.faq-question').forEach(b => {
			b.setAttribute('aria-expanded', 'false')
			b.closest('.faq-item').querySelector('.faq-answer').classList.remove('open')
		})

		// open clicked if it was closed
		if (!isOpen) {
			btn.setAttribute('aria-expanded', 'true')
			answer.classList.add('open')
		}
	})
})

// Counter animation
function animateCounter(el) {
	const target = parseInt(el.dataset.target, 10)
	const duration = 1200
	const start = performance.now()

	function step(now) {
		const elapsed = now - start
		const progress = Math.min(elapsed / duration, 1)
		const eased = 1 - Math.pow(1 - progress, 3)
		el.textContent = Math.round(eased * target)
		if (progress < 1) requestAnimationFrame(step)
	}

	requestAnimationFrame(step)
}

const observer = new IntersectionObserver(entries => {
	entries.forEach(entry => {
		if (entry.isIntersecting) {
			animateCounter(entry.target)
			observer.unobserve(entry.target)
		}
	})
}, { threshold: 0.3 })

document.querySelectorAll('.stat-number[data-target]').forEach(el => observer.observe(el))

// Nav active link on scroll (only on pages without a hardcoded active link)
const navLinks = document.querySelectorAll('.nav-link')

if (!document.querySelector('.nav-link.active')) {
	const sections = document.querySelectorAll('section[id]')

	const sectionObserver = new IntersectionObserver(entries => {
		entries.forEach(entry => {
			if (entry.isIntersecting) {
				navLinks.forEach(link => {
					link.classList.toggle('active', link.getAttribute('href') === `#${entry.target.id}`)
				})
			}
		})
	}, { threshold: 0.4 })

	sections.forEach(s => sectionObserver.observe(s))
}

// Scroll to top button
document.querySelector('.scroll-top')?.addEventListener('click', () => {
	window.scrollTo({ top: 0, behavior: 'smooth' })
})

// Fade-up entrance for about & footer sections
function fadeUpElement(el, delay) {
	if (!el) return
	const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
	if (reduced) { el.classList.add('fadeup--shown'); return }
	setTimeout(() => {
		el.classList.add('fadeup--enter')
		el.addEventListener('animationend', () => {
			el.classList.add('fadeup--shown')
			el.classList.remove('fadeup--enter')
		}, { once: true })
	}, delay || 0)
}

// Expertise strip
const expertiseStrip = document.querySelector('.expertise-strip')
if (expertiseStrip) {
	const expObs = new IntersectionObserver(entries => {
		if (!entries[0].isIntersecting) return
		const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
		document.querySelectorAll('.expertise-item').forEach((item, i) => {
			if (reduced) { item.classList.add('expertise-item--shown'); return }
			setTimeout(() => {
				item.style.transition = 'opacity .6s ease, transform .6s cubic-bezier(.22,1,.36,1)'
				item.classList.add('expertise-item--shown')
			}, i * 100)
		})
		expObs.unobserve(expertiseStrip)
	}, { threshold: 0.2 })
	expObs.observe(expertiseStrip)
}

const aboutWrap = document.querySelector('.about-wrap')
if (aboutWrap) {
	const aboutObs = new IntersectionObserver(entries => {
		if (!entries[0].isIntersecting) return
		fadeUpElement(document.querySelector('.about-left'), 0)
		fadeUpElement(document.querySelector('.about-right'), 0)
		aboutObs.unobserve(aboutWrap)
	}, { threshold: 0.25 })
	aboutObs.observe(aboutWrap)
}

const footerEl = document.querySelector('footer')
if (footerEl) {
	const footerObs = new IntersectionObserver(entries => {
		if (!entries[0].isIntersecting) return
		fadeUpElement(document.querySelector('.footer-bar'), 0)
		fadeUpElement(document.querySelector('.footer-bottom'), 140)
		footerObs.unobserve(footerEl)
	}, { threshold: 0.3 })
	footerObs.observe(footerEl)
}

// Let's Talk page entrance animations
const ltkMain = document.querySelector('.ltk-main')
if (ltkMain) {
	fadeUpElement(document.querySelector('.ltk-title'), 100)
	fadeUpElement(document.querySelector('.ltk-email'), 260)
	fadeUpElement(document.querySelector('.ltk-buttons'), 400)
}

// Projects page entrance animations
const projectsHero = document.querySelector('.projects-hero')
if (projectsHero) {
	fadeUpElement(document.querySelector('.projects-title'), 100)
	fadeUpElement(document.querySelector('.projects-subtitle'), 260)

	const projectsGrid = document.querySelector('.projects-grid-section')
	if (projectsGrid) {
		const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
		const gridObs = new IntersectionObserver(entries => {
			if (!entries[0].isIntersecting) return
			document.querySelectorAll('.project-card').forEach((card, i) => {
				if (reduced) { card.classList.add('project-card--shown'); return }
				setTimeout(() => {
					card.classList.add('gallery-card--enter')
					card.addEventListener('animationend', () => {
						card.classList.add('project-card--shown')
						card.classList.remove('gallery-card--enter')
					}, { once: true })
				}, i * 70)
			})
			gridObs.unobserve(projectsGrid)
		}, { threshold: 0.05 })
		gridObs.observe(projectsGrid)
	}
}

// About page entrance animations
const apgHero = document.querySelector('.apg-hero')
if (apgHero) {
	fadeUpElement(document.querySelector('.apg-title'), 100)
	fadeUpElement(document.querySelector('.apg-intro-big'), 280)
	fadeUpElement(document.querySelector('.apg-intro-small'), 400)
	fadeUpElement(document.querySelector('.apg-overlay--right'), 420)

	const apgBody = document.querySelector('.apg-body')
	if (apgBody) {
		const bodyObs = new IntersectionObserver(entries => {
			if (!entries[0].isIntersecting) return
			fadeUpElement(document.querySelector('.apg-body-left'), 0)
			fadeUpElement(document.querySelector('.apg-body-right'), 150)
			bodyObs.unobserve(apgBody)
		}, { threshold: 0.15 })
		bodyObs.observe(apgBody)
	}
}

// Gallery entrance — fires after preloader fades out
const preloaderEl = document.getElementById('preloader')
if (preloaderEl) {
	function onPreloaderFade(e) {
		if (e.propertyName !== 'opacity') return
		preloaderEl.removeEventListener('transitionend', onPreloaderFade)
		const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
		const cards = document.querySelectorAll('.gallery-card')
		const delays = [50, 170, 290]
		cards.forEach((card, i) => {
			if (reduced) {
				card.classList.add('gallery-card--shown')
				return
			}
			setTimeout(() => {
				card.classList.add('gallery-card--enter')
				card.addEventListener('animationend', () => {
					card.classList.add('gallery-card--shown')
					card.classList.remove('gallery-card--enter')
				}, { once: true })
			}, delays[i] ?? 0)
		})
	}
	preloaderEl.addEventListener('transitionend', onPreloaderFade)
}
