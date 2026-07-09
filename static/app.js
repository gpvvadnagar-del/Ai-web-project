const modeSelect = document.getElementById('mode-select');
const scoreInput = document.getElementById('score-input');
const scaleSelect = document.getElementById('scale-select');
const marksObtained = document.getElementById('marks-obtained');
const marksTotal = document.getElementById('marks-total');
const scoreMode = document.getElementById('score-mode');
const marksMode = document.getElementById('marks-mode');
const outputPercentage = document.getElementById('output-percentage');
const outputFormula = document.getElementById('output-formula');
const copyBtn = document.getElementById('copy-btn');
const toast = document.getElementById('toast');
const themeToggle = document.getElementById('theme-toggle');

const scaleLabels = {
    '10': '10-point scale',
    '4': '4-point scale'
};

function formatPercentage(value) {
    return `${value.toFixed(2)}%`;
}

function updateResult() {
    const mode = modeSelect ? modeSelect.value : 'score';

    if (mode === 'score') {
        const score = Number(scoreInput.value);
        const scale = Number(scaleSelect.value);

        if (!scoreInput.value || Number.isNaN(score) || score < 0 || score > scale) {
            outputPercentage.textContent = 'Enter a valid score';
            outputFormula.textContent = 'Percentage = (score / scale) × 100';
            return;
        }

        const percentage = (score / scale) * 100;
        outputPercentage.textContent = formatPercentage(percentage);
        outputFormula.textContent = `Percentage = (${score} / ${scale}) × 100 = ${percentage.toFixed(2)}%`;
        return;
    }

    // marks mode
    const obtained = Number(marksObtained.value);
    const total = Number(marksTotal.value);

    if (!marksObtained.value || !marksTotal.value || Number.isNaN(obtained) || Number.isNaN(total) || total <= 0 || obtained < 0 || obtained > total) {
        outputPercentage.textContent = 'Enter valid marks';
        outputFormula.textContent = 'Percentage = (obtained / total) × 100';
        return;
    }

    const percentage = (obtained / total) * 100;
    outputPercentage.textContent = formatPercentage(percentage);
    outputFormula.textContent = `Percentage = (${obtained} / ${total}) × 100 = ${percentage.toFixed(2)}%`;
}

// Listen for changes
scoreInput && scoreInput.addEventListener('input', updateResult);
scaleSelect && scaleSelect.addEventListener('change', updateResult);
marksObtained && marksObtained.addEventListener('input', updateResult);
marksTotal && marksTotal.addEventListener('input', updateResult);

modeSelect && modeSelect.addEventListener('change', () => {
    const mode = modeSelect.value;
    if (mode === 'score') {
        scoreMode.classList.remove('hidden');
        marksMode.classList.add('hidden');
    } else {
        scoreMode.classList.add('hidden');
        marksMode.classList.remove('hidden');
    }
    clearForm(false);
});

window.addEventListener('DOMContentLoaded', updateResult);

// Copy to clipboard + toast
if (copyBtn) {
    copyBtn.addEventListener('click', async () => {
        try {
            const text = outputPercentage.textContent || '';
            await navigator.clipboard.writeText(text);
            showToast('Copied to clipboard');
            sessionStorage.setItem('last_copied', new Date().toISOString());
        } catch (err) {
            console.error('Copy failed', err);
            showToast('Copy failed');
        }
    });
}

// Theme handling
function applyTheme(theme) {
    if (theme === 'light') document.documentElement.classList.add('light-theme');
    else document.documentElement.classList.remove('light-theme');
}

function toggleTheme() {
    const current = localStorage.getItem('site-theme') || 'dark';
    const next = current === 'dark' ? 'light' : 'dark';
    localStorage.setItem('site-theme', next);
    applyTheme(next);
}

if (themeToggle) {
    themeToggle.addEventListener('click', toggleTheme);
}

// Initialize theme
const savedTheme = localStorage.getItem('site-theme') || 'dark';
applyTheme(savedTheme);

function showToast(msg) {
    if (!toast) return;
    toast.textContent = msg;
    toast.classList.add('visible');
    setTimeout(() => toast.classList.remove('visible'), 1800);
}

function clearForm(focus = true) {
    if (scoreInput) scoreInput.value = '';
    if (marksObtained) marksObtained.value = '';
    if (marksTotal) marksTotal.value = '';
    if (scaleSelect) scaleSelect.value = '10';
    // Preserve the current mode's visibility; don't override user's selection.
    outputPercentage.textContent = '0%';
    outputFormula.textContent = 'Percentage = (score / scale) × 100';
    if (focus) {
        const mode = modeSelect ? modeSelect.value : 'score';
        if (mode === 'score' && scoreInput) scoreInput.focus();
        else if (mode === 'marks' && marksObtained) marksObtained.focus();
    }
}

// Clear form on fresh load or when navigating back/forward
window.addEventListener('pageshow', (event) => {
    clearForm(true);
});

// Keyboard shortcut: Ctrl+Shift+T toggles theme
window.addEventListener('keydown', (e) => {
    if (e.ctrlKey && e.shiftKey && e.code === 'KeyT') {
        e.preventDefault();
        toggleTheme();
        showToast('Theme toggled');
    }
});
