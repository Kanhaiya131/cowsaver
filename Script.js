const menuToggle = document.querySelector(".menu-toggle");
const siteNav = document.querySelector(".site-nav");

if (menuToggle && siteNav) {
	menuToggle.addEventListener("click", () => {
		const isOpen = siteNav.classList.toggle("open");
		menuToggle.setAttribute("aria-expanded", String(isOpen));
		menuToggle.textContent = isOpen ? "Close" : "Menu";
	});

	siteNav.querySelectorAll("a").forEach((link) => {
		link.addEventListener("click", () => {
			siteNav.classList.remove("open");
			menuToggle.setAttribute("aria-expanded", "false");
			menuToggle.textContent = "Menu";
		});
	});
}

const revealElements = document.querySelectorAll(".reveal");
const counters = document.querySelectorAll(".counter");

const counterAnimation = (element) => {
	const target = Number(element.dataset.target || 0);
	const duration = 1400;
	const start = performance.now();

	const update = (currentTime) => {
		const progress = Math.min((currentTime - start) / duration, 1);
		const value = Math.floor(progress * target);
		element.textContent = value.toLocaleString("en-IN");
		if (progress < 1) requestAnimationFrame(update);
	};

	requestAnimationFrame(update);
};

const observer = new IntersectionObserver(
	(entries, obs) => {
		entries.forEach((entry) => {
			if (!entry.isIntersecting) return;
			entry.target.classList.add("show");

			if (entry.target.classList.contains("counter")) {
				counterAnimation(entry.target);
			}

			obs.unobserve(entry.target);
		});
	},
	{ threshold: 0.18 }
);

revealElements.forEach((el) => observer.observe(el));
counters.forEach((counter) => observer.observe(counter));

const parallaxSections = document.querySelectorAll(".parallax");

const applyParallax = () => {
	const scrollY = window.pageYOffset;
	parallaxSections.forEach((section) => {
		const speed = Number(section.dataset.speed || 0.1);
		section.style.backgroundPositionY = `${scrollY * speed}px`;
	});
};

window.addEventListener("scroll", applyParallax, { passive: true });
applyParallax();
