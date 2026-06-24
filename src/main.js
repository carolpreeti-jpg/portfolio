// Smooth scroll handling
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
	anchor.addEventListener('click', function (e) {
		e.preventDefault();
		const target = document.querySelector(this.getAttribute('href'));
		if (target) {
			target.scrollIntoView({ behavior: 'smooth' });
		}
	});
});

// Active nav link
const observerOptions = {
	threshold: 0.3
};

const observer = new IntersectionObserver((entries) => {
	entries.forEach(entry => {
		if (entry.isIntersecting) {
			const id = entry.target.id;
			document.querySelectorAll('.nav-link').forEach(link => {
				link.classList.remove('active');
			});
			const activeLink = document.querySelector(`a[href="#${id}"]`);
			if (activeLink) activeLink.classList.add('active');
		}
	});
}, observerOptions);

document.querySelectorAll('section[id]').forEach(section => {
	observer.observe(section);
});
