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

// Nav active link on scroll
const sections = document.querySelectorAll('section[id], footer[id]')
const navLinks = document.querySelectorAll('.nav-link')

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

// Scroll to top button
document.querySelector('.scroll-top')?.addEventListener('click', () => {
	window.scrollTo({ top: 0, behavior: 'smooth' })
})
