const revealElements = document.querySelectorAll('.reveal');
const skillBars = document.querySelectorAll('.bar span');
const tenureElement = document.querySelector('[data-current-tenure]');

const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add('is-visible');
    }
  });
}, { threshold: 0.16 });

revealElements.forEach((element) => {
  revealObserver.observe(element);
});

const barObserver = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (!entry.isIntersecting) {
      return;
    }

    const targetValue = entry.target.style.getPropertyValue('--value').trim();
    if (targetValue) {
      entry.target.style.width = targetValue;
    }

    barObserver.unobserve(entry.target);
  });
}, { threshold: 0.3 });

skillBars.forEach((bar) => {
  barObserver.observe(bar);
});

if (tenureElement) {
  const startYear = Number(tenureElement.dataset.startYear);
  const startMonth = Number(tenureElement.dataset.startMonth);
  const today = new Date();

  const currentYear = today.getFullYear();
  const currentMonth = today.getMonth() + 1;

  const totalMonths = (currentYear - startYear) * 12 + (currentMonth - startMonth);
  const safeMonths = Math.max(0, totalMonths);
  const years = Math.floor(safeMonths / 12);
  const months = safeMonths % 12;

  tenureElement.textContent = `在職期間：${years}年${months}か月満了（${currentYear}年${currentMonth}月時点）`;
}
