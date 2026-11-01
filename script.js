const cards = document.querySelectorAll('.reveal');

const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            observer.unobserve(entry.target);
        }
    });
}, { threshold: 0.15 });

cards.forEach((card, i) => {
    card.style.animationDelay = `${i * 0.15}s`;
    observer.observe(card);
});

const buttons = document.querySelectorAll('.mainButton');
const sections = [...buttons].map((b) => document.getElementById(b.dataset.target));
let locked = false;
let lockTimer;

function setActive(id) {
    buttons.forEach((b) => b.classList.toggle('active', b.dataset.target === id));
}

function updateActive() {
    if (locked) return;

    if (window.innerHeight + window.scrollY >= document.body.scrollHeight - 2) {
        setActive(sections[sections.length - 1].id);
        return;
    }

    let current = sections[0].id;
    sections.forEach((s) => {
        if (s.getBoundingClientRect().top <= window.innerHeight * 0.4) {
            current = s.id;
        }
    });
    setActive(current);
}

window.addEventListener('scroll', updateActive, { passive: true });
updateActive();

buttons.forEach((btn) => {
    btn.addEventListener('click', () => {
        const target = document.getElementById(btn.dataset.target);

        locked = true;
        setActive(btn.dataset.target);
        clearTimeout(lockTimer);
        lockTimer = setTimeout(() => { locked = false; updateActive(); }, 900);

        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    });
});

const privacy = document.getElementById('privacy');

document.querySelector('[data-open="privacy"]').addEventListener('click', () => {
    privacy.showModal();
});

privacy.querySelector('.privacy-close').addEventListener('click', () => {
    privacy.close();
});

privacy.addEventListener('click', (e) => {
    if (e.target === privacy) privacy.close();
});