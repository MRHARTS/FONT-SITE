// ==========================================
// GAMER ID GENERATOR - TEXT STYLES ENGINE
// ==========================================

const textStyles = [
    { name: 'Bold', category: 'bold', transform: (text) => [...text].map(char => {
        const code = char.charCodeAt(0);
        if (code >= 97 && code <= 122) return String.fromCharCode(code - 97 + 0x1D41F);
        if (code >= 65 && code <= 90) return String.fromCharCode(code - 65 + 0x1D401);
        return char;
    }).join('') },
    { name: 'Italic', category: 'italic', transform: (text) => [...text].map(char => {
        const code = char.charCodeAt(0);
        if (code >= 97 && code <= 122) return String.fromCharCode(code - 97 + 0x1D433);
        if (code >= 65 && code <= 90) return String.fromCharCode(code - 65 + 0x1D41B);
        return char;
    }).join('') },
    { name: 'Bold Italic', category: 'italic', transform: (text) => [...text].map(char => {
        const code = char.charCodeAt(0);
        if (code >= 97 && code <= 122) return String.fromCharCode(code - 97 + 0x1D47F);
        if (code >= 65 && code <= 90) return String.fromCharCode(code - 65 + 0x1D467);
        return char;
    }).join('') },
    { name: 'Gothic', category: 'special', transform: (text) => [...text].map(char => {
        const code = char.charCodeAt(0);
        if (code >= 97 && code <= 122) return String.fromCharCode(code - 97 + 0x1D51F);
        if (code >= 65 && code <= 90) return String.fromCharCode(code - 65 + 0x1D505);
        return char;
    }).join('') },
    { name: 'Double Strike', category: 'special', transform: (text) => [...text].map(char => {
        const code = char.charCodeAt(0);
        if (code >= 97 && code <= 122) return String.fromCharCode(code - 97 + 0x1D4DD);
        if (code >= 65 && code <= 90) return String.fromCharCode(code - 65 + 0x1D4B9);
        return char;
    }).join('') },
    { name: 'Script', category: 'special', transform: (text) => [...text].map(char => {
        const code = char.charCodeAt(0);
        if (code >= 97 && code <= 122) return String.fromCharCode(code - 97 + 0x1D4B7);
        if (code >= 65 && code <= 90) return String.fromCharCode(code - 65 + 0x1D49F);
        return char;
    }).join('') },
    { name: 'Sans-Serif', category: 'special', transform: (text) => [...text].map(char => {
        const code = char.charCodeAt(0);
        if (code >= 97 && code <= 122) return String.fromCharCode(code - 97 + 0x1D5EF);
        if (code >= 65 && code <= 90) return String.fromCharCode(code - 65 + 0x1D5D5);
        return char;
    }).join('') },
    { name: 'Monospace', category: 'special', transform: (text) => [...text].map(char => {
        const code = char.charCodeAt(0);
        if (code >= 97 && code <= 122) return String.fromCharCode(code - 97 + 0x1D68B);
        if (code >= 65 && code <= 90) return String.fromCharCode(code - 65 + 0x1D671);
        return char;
    }).join('') },
    { name: 'Small Caps', category: 'special', transform: (text) => [...text].map(char => {
        const code = char.charCodeAt(0);
        if (code >= 97 && code <= 122) return String.fromCharCode(code - 97 + 0x1D00);
        return char.toUpperCase();
    }).join('') },
    { name: 'Superscript', category: 'numbers', transform: (text) => {
        const map = { '0': '⁰', '1': '¹', '2': '²', '3': '³', '4': '⁴', '5': '⁵', '6': '⁶', '7': '⁷', '8': '⁸', '9': '⁹', 'a': 'ᵃ', 'b': 'ᵇ', 'c': 'ᶜ', 'd': 'ᵈ', 'e': 'ᵉ', 'f': 'ᶠ', 'g': 'ᵍ', 'h': 'ʰ', 'i': 'ⁱ', 'j': 'ʲ', 'k': 'ᵏ', 'l': 'ˡ', 'm': 'ᵐ', 'n': 'ⁿ', 'o': 'ᵒ', 'p': 'ᵖ', 'r': 'ʳ', 's': 'ˢ', 't': 'ᵗ', 'u': 'ᵘ', 'v': 'ᵛ', 'w': 'ʷ', 'x': 'ˣ', 'y': 'ʸ', 'z': 'ᶻ' };
        return [...text].map(char => map[char.toLowerCase()] || char).join('');
    } },
    { name: 'Subscript', category: 'numbers', transform: (text) => {
        const map = { '0': '₀', '1': '₁', '2': '₂', '3': '₃', '4': '₄', '5': '₅', '6': '₆', '7': '₇', '8': '₈', '9': '₉', 'a': 'ₐ', 'e': 'ₑ', 'h': 'ₕ', 'i': 'ᵢ', 'j': 'ⱼ', 'k': 'ₖ', 'l': 'ₗ', 'm': 'ₘ', 'n': 'ₙ', 'o': 'ₒ', 'p': 'ₚ', 'r': 'ᵣ', 's': 'ₛ', 't': 'ₜ', 'u': 'ᵤ', 'v': 'ᵥ', 'x': 'ₓ' };
        return [...text].map(char => map[char.toLowerCase()] || char).join('');
    } },
    { name: 'Upside Down', category: 'symbols', transform: (text) => {
        const map = { 'a': 'ɐ', 'b': 'q', 'c': 'ɔ', 'd': 'p', 'e': 'ǝ', 'f': 'ɟ', 'g': 'ƃ', 'h': 'ɥ', 'i': 'ᴉ', 'j': 'ɾ', 'k': 'ʞ', 'l': 'l', 'm': 'ɯ', 'n': 'u', 'o': 'o', 'p': 'd', 'q': 'b', 'r': 'ɹ', 's': 's', 't': 'ʇ', 'u': 'n', 'v': 'ʌ', 'w': 'ʍ', 'x': 'x', 'y': 'ʎ', 'z': 'z' };
        return [...text].map(char => map[char.toLowerCase()] || char).join('').split('').reverse().join('');
    } },
    { name: 'Circles', category: 'symbols', transform: (text) => {
        const map = { 'a': 'ⓐ', 'b': 'ⓑ', 'c': 'ⓒ', 'd': 'ⓓ', 'e': 'ⓔ', 'f': 'ⓕ', 'g': 'ⓖ', 'h': 'ⓗ', 'i': 'ⓘ', 'j': 'ⓙ', 'k': 'ⓚ', 'l': 'ⓛ', 'm': 'ⓜ', 'n': 'ⓝ', 'o': 'ⓞ', 'p': 'ⓟ', 'q': 'ⓠ', 'r': 'ⓡ', 's': 'ⓢ', 't': 'ⓣ', 'u': 'ⓤ', 'v': 'ⓥ', 'w': 'ⓦ', 'x': 'ⓧ', 'y': 'ⓨ', 'z': 'ⓩ' };
        return [...text].map(char => map[char.toLowerCase()] || char).join('');
    } },
    { name: 'Brackets', category: 'special', transform: (text) => `【${text}】` },
    { name: 'Angle', category: 'special', transform: (text) => `❰${text}❱` },
    { name: 'Fancy Brackets', category: 'special', transform: (text) => `『${text}』` },
    { name: 'Stars', category: 'symbols', transform: (text) => `✧${text}✧` },
    { name: 'Diamonds', category: 'symbols', transform: (text) => `◆${text}◆` },
    { name: 'Hearts', category: 'symbols', transform: (text) => `❤${text}❤` },
    { name: 'Arrows ◄', category: 'symbols', transform: (text) => `◄ ${text} ◄` },
    { name: 'Arrows ►', category: 'symbols', transform: (text) => `► ${text} ►` },
    { name: 'Flames', category: 'symbols', transform: (text) => `🔥${text}🔥` },
    { name: 'Lightning', category: 'symbols', transform: (text) => `⚡${text}⚡` },
    { name: 'Skull', category: 'symbols', transform: (text) => `☠${text}☠` },
    { name: 'Dots', category: 'special', transform: (text) => [...text].join('•') },
    { name: 'Dashes', category: 'special', transform: (text) => [...text].join('-') },
    { name: 'Underscores', category: 'special', transform: (text) => [...text].join('_') },
    { name: 'Spaced', category: 'special', transform: (text) => [...text].join(' ') },
    { name: 'Double Line', category: 'special', transform: (text) => [...text].join('║') },
    { name: 'Pipe', category: 'special', transform: (text) => [...text].join('|') },
    { name: 'Tilde', category: 'special', transform: (text) => [...text].join('~') },
    { name: 'Equals', category: 'special', transform: (text) => [...text].join('=') },
    { name: 'Plus', category: 'special', transform: (text) => [...text].join('+') },
    { name: 'Asterisk', category: 'symbols', transform: (text) => [...text].join('*') },
    { name: 'Exclamation', category: 'special', transform: (text) => [...text].join('!') },
    { name: 'Parentheses', category: 'special', transform: (text) => `(${text})` },
    { name: 'Curly', category: 'special', transform: (text) => `{${text}}` },
    { name: 'Quotes', category: 'special', transform: (text) => `"${text}"` },
    { name: 'Single Quotes', category: 'special', transform: (text) => `'${text}'` },
    { name: 'Backticks', category: 'special', transform: (text) => `` `${text}` `` },
    { name: 'Gaming Tag', category: 'symbols', transform: (text) => `[${text}]` },
    { name: 'Double Circle', category: 'symbols', transform: (text) => `⊚${text}⊚` },
    { name: 'Crown', category: 'symbols', transform: (text) => `👑${text}👑` },
    { name: 'Trophy', category: 'symbols', transform: (text) => `🏆${text}🏆` },
    { name: 'Bomb', category: 'symbols', transform: (text) => `💣${text}💣` },
    { name: 'Sword', category: 'symbols', transform: (text) => `⚔${text}⚔` },
    { name: 'Shield', category: 'symbols', transform: (text) => `🛡${text}🛡` },
    { name: 'Hex', category: 'symbols', transform: (text) => `⬡${text}⬡` },
    { name: 'Triangle', category: 'symbols', transform: (text) => `▲${text}▲` },
    { name: 'Inv Triangle', category: 'symbols', transform: (text) => `▼${text}▼` },
    { name: 'Squares Block', category: 'symbols', transform: (text) => `■${text}■` },
    { name: 'Circles Block', category: 'symbols', transform: (text) => `●${text}●` },
    { name: 'Neon Gamer', category: 'symbols', transform: (text) => `░${text}░` },
    { name: 'Gradient Effect', category: 'symbols', transform: (text) => [...text].map((char, i) => i % 2 === 0 ? char : '·').join('') },
    { name: 'Wave', category: 'symbols', transform: (text) => [...text].map((char, i) => char + (i % 2 === 0 ? '~' : '^')).join('') },
    { name: 'Zigzag', category: 'symbols', transform: (text) => [...text].map((char, i) => (i % 2 === 0 ? '>' : '<') + char).join('') },
    { name: 'Mirror', category: 'special', transform: (text) => {
        const reversed = [...text].reverse().join('');
        return `${reversed}|${text}`;
    } },
    { name: 'Double', category: 'special', transform: (text) => `${text}${text}` },
    { name: 'Triple', category: 'special', transform: (text) => `${text}${text}${text}` },
    { name: 'Chaos Mix', category: 'symbols', transform: (text) => [...text].map(char => Math.random() > 0.5 ? char.toUpperCase() : char.toLowerCase()).join('') },
    { name: 'Sparkle', category: 'symbols', transform: (text) => `✨${text}✨` },
    { name: 'Rainbow', category: 'symbols', transform: (text) => `🌈${text}🌈` },
    { name: 'Thunder', category: 'symbols', transform: (text) => `⚡️${text}⚡️` },
    { name: 'Ice', category: 'symbols', transform: (text) => `❄${text}❄` },
    { name: 'Skull v2', category: 'symbols', transform: (text) => `💀${text}💀` },
    { name: 'Ghost', category: 'symbols', transform: (text) => `👻${text}👻` },
    { name: 'Alien', category: 'symbols', transform: (text) => `👽${text}👽` },
    { name: 'Robot', category: 'symbols', transform: (text) => `🤖${text}🤖` },
    { name: 'Phoenix', category: 'symbols', transform: (text) => `🔥${text}🔥` },
    { name: 'Dragon', category: 'symbols', transform: (text) => `🐉${text}🐉` },
    { name: 'Ninja', category: 'symbols', transform: (text) => `🥷${text}🥷` },
    { name: 'Vampire', category: 'symbols', transform: (text) => `🧛${text}🧛` },
    { name: 'Demon', category: 'symbols', transform: (text) => `😈${text}😈` },
    { name: 'Angel', category: 'symbols', transform: (text) => `😇${text}😇` },
    { name: 'Space', category: 'symbols', transform: (text) => `🚀${text}🚀` },
    { name: 'Bomb v2', category: 'symbols', transform: (text) => `💥${text}💥` },
    { name: 'Fire', category: 'symbols', transform: (text) => `🔥${text}🔥` },
];

const nameInput = document.getElementById('nameInput');
const styleFilter = document.getElementById('styleFilter');
const stylesGrid = document.getElementById('stylesGrid');
const emptyState = document.getElementById('emptyState');
const charCount = document.getElementById('charCount');

function generateStyles(inputText) {
    if (!inputText.trim()) {
        stylesGrid.innerHTML = '';
        emptyState.classList.remove('hidden');
        return;
    }

    emptyState.classList.add('hidden');
    const filterValue = styleFilter.value;
    const filteredStyles = filterValue === 'all' 
        ? textStyles 
        : textStyles.filter(style => style.category === filterValue);

    stylesGrid.innerHTML = filteredStyles.map(style => {
        const transformedText = style.transform(inputText);
        return createStyleCard(style.name, transformedText);
    }).join('');

    document.querySelectorAll('.copy-btn').forEach(btn => {
        btn.addEventListener('click', handleCopy);
    });
}

function createStyleCard(label, text) {
    return `
        <div class="style-card">
            <div class="style-label">${label}</div>
            <div class="style-text">${escapeHtml(text)}</div>
            <button class="copy-btn" data-text="${text}">📋 Copy</button>
        </div>
    `;
}

function handleCopy(event) {
    const btn = event.target;
    const text = btn.getAttribute('data-text');

    navigator.clipboard.writeText(text).then(() => {
        btn.textContent = '✅ Copied!';
        btn.classList.add('copied');

        setTimeout(() => {
            btn.textContent = '📋 Copy';
            btn.classList.remove('copied');
        }, 2000);
    }).catch(() => {
        fallbackCopy(text);
        btn.textContent = '✅ Copied!';
        btn.classList.add('copied');
        setTimeout(() => {
            btn.textContent = '📋 Copy';
            btn.classList.remove('copied');
        }, 2000);
    });
}

function fallbackCopy(text) {
    const textarea = document.createElement('textarea');
    textarea.value = text;
    document.body.appendChild(textarea);
    textarea.select();
    document.execCommand('copy');
    document.body.removeChild(textarea);
}

function escapeHtml(text) {
    const map = {
        '&': '&amp;',
        '<': '&lt;',
        '>': '&gt;',
        '"': '&quot;',
        "'": '&#039;'
    };
    return text.replace(/[&<>"']/g, m => map[m]);
}

nameInput.addEventListener('input', (e) => {
    const inputText = e.target.value;
    charCount.textContent = inputText.length;
    generateStyles(inputText);
});

styleFilter.addEventListener('change', () => {
    const inputText = nameInput.value;
    generateStyles(inputText);
});

nameInput.addEventListener('focus', () => {
    nameInput.placeholder = '⌨️ Start typing...';
});

nameInput.addEventListener('blur', () => {
    nameInput.placeholder = 'Enter your name or username...';
});

document.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', (e) => {
        e.preventDefault();
        const toolId = link.getAttribute('data-tool');
        
        document.querySelectorAll('.nav-link').forEach(l => l.classList.remove('active'));
        link.classList.add('active');
        
        document.querySelectorAll('.tool-section').forEach(section => {
            section.classList.remove('active');
        });
        document.getElementById(toolId).classList.add('active');
    });
});

console.log('🎮 Gamer ID Generator loaded! Total styles:', textStyles.length);
