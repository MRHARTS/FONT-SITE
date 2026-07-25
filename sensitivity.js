// ==========================================
// FREE FIRE SENSITIVITY ANALYZER ENGINE
// Updated for 0-200 Sensitivity Range
// ==========================================

// Device database with specs
const deviceDatabase = {
    'iphone-13': { name: 'iPhone 13', ram: 4, dpi: 460, category: 'premium' },
    'iphone-14': { name: 'iPhone 14', ram: 6, dpi: 460, category: 'premium' },
    'iphone-15': { name: 'iPhone 15', ram: 8, dpi: 460, category: 'premium' },
    'samsung-s23': { name: 'Samsung Galaxy S23', ram: 8, dpi: 480, category: 'flagship' },
    'samsung-s24': { name: 'Samsung Galaxy S24', ram: 12, dpi: 480, category: 'flagship' },
    'samsung-a13': { name: 'Samsung Galaxy A13', ram: 4, dpi: 400, category: 'budget' },
    'oneplus-11': { name: 'OnePlus 11', ram: 8, dpi: 480, category: 'flagship' },
    'oneplus-12': { name: 'OnePlus 12', ram: 12, dpi: 480, category: 'flagship' },
    'poco-x5': { name: 'Poco X5', ram: 6, dpi: 450, category: 'mid-range' },
    'poco-f5': { name: 'Poco F5', ram: 8, dpi: 450, category: 'mid-range' },
    'redmi-note-12': { name: 'Redmi Note 12', ram: 4, dpi: 400, category: 'budget' },
    'realme-11': { name: 'Realme 11', ram: 6, dpi: 450, category: 'mid-range' },
};

// Sensitivity calculator based on device performance
// Now using 0-200 range (Free Fire & Free Fire Max current update)
function calculateSensitivity(deviceId, ram, dpi, gameVersion, playStyle) {
    const device = deviceDatabase[deviceId];
    const actualRam = parseInt(ram);
    const actualDpi = dpi ? parseInt(dpi) : (device ? device.dpi : 450);
    
    // Base sensitivity values for different play styles (0-200 range)
    const baseValues = {
        aggressive: { horizontal: 160, vertical: 160 },
        balanced: { horizontal: 100, vertical: 100 },
        sniper: { horizontal: 50, vertical: 50 },
        competitive: { horizontal: 85, vertical: 85 }
    };
    
    const base = baseValues[playStyle];
    
    // Adjustment based on RAM (more RAM = smoother gameplay = can use higher sensitivity)
    const ramMultiplier = {
        4: 0.85,
        6: 0.92,
        8: 1.0,
        12: 1.05,
        16: 1.1
    };
    
    const ram_key = Object.keys(ramMultiplier).reverse().find(key => actualRam >= parseInt(key));
    const ramAdjustment = ramMultiplier[ram_key] || 0.85;
    
    // DPI adjustment (higher DPI = screen has more pixels per inch = needs lower sensitivity for same feel)
    const dpiNormalized = actualDpi / 450; // 450 is baseline
    
    // Game version adjustment
    const versionMultiplier = gameVersion === 'ffmax' ? 1.02 : 1.0; // Max is slightly more demanding
    
    // Calculate final sensitivities
    const horizontal = Math.round(base.horizontal * ramAdjustment / dpiNormalized * versionMultiplier);
    const vertical = Math.round(base.vertical * ramAdjustment / dpiNormalized * versionMultiplier);
    
    // Scope sensitivities (lower than regular aiming for precision)
    const redDot = Math.round(horizontal * 0.65);
    const scope2x = Math.round(horizontal * 0.50);
    const scope4x = Math.round(horizontal * 0.35);
    const scope8x = Math.round(horizontal * 0.25);
    
    // Clamp values between 1 and 200
    const clamp = (val) => Math.max(1, Math.min(200, val));
    
    return {
        horizontal: clamp(horizontal),
        vertical: clamp(vertical),
        redDot: clamp(redDot),
        scope2x: clamp(scope2x),
        scope4x: clamp(scope4x),
        scope8x: clamp(scope8x),
    };
}

// Get tips based on device and settings
function getTips(deviceId, ram, playStyle, gameVersion) {
    const tips = [];
    const actualRam = parseInt(ram);
    
    if (actualRam <= 4) {
        tips.push('🔴 Your device has lower RAM. Lower your graphics settings for smoother gameplay.');
        tips.push('💡 Consider using lower sensitivity (50-100) to reduce processing load.');
    } else if (actualRam >= 12) {
        tips.push('🟢 Your device has excellent specs! You can push sensitivity higher (150+).');
        tips.push('⚡ Try custom sensitivity tweaking once you get comfortable.');
    }
    
    if (playStyle === 'aggressive') {
        tips.push('🎯 High sensitivity (140-180) is great for rushing. Make sure your device doesn\'t overheat.');
        tips.push('⚔️ Aggressive play requires more precision. Practice in Training Ground first.');
    } else if (playStyle === 'sniper') {
        tips.push('🔭 Low sensitivity (30-60) is perfect for long-range shots. Increase your crosshair size.');
        tips.push('🎯 Practice pre-aiming common sniper spots to improve your game.');
    } else if (playStyle === 'competitive') {
        tips.push('🏆 These are pro-level settings (80-100). Adjust ±10 based on your comfort.');
        tips.push('⚙️ Test in Team Deathmatch before using in ranked matches.');
    } else if (playStyle === 'balanced') {
        tips.push('⚖️ Balanced sensitivity (90-110) works for all playstyles. Great for learning.');
        tips.push('🎮 This is a safe middle ground while you develop your preferred playstyle.');
    }
    
    if (gameVersion === 'ffmax') {
        tips.push('📱 Free Fire Max has better graphics & physics. Ensure your device stays cool.');
    } else {
        tips.push('⚡ Original Free Fire is optimized. Great for consistent 60 FPS performance.');
    }
    
    tips.push('💾 Save these settings and don\'t change them too often - consistency builds muscle memory!');
    tips.push('🎮 The new 0-200 range gives you more control. Fine-tune by ±5-10 for comfort.');
    
    return tips.slice(0, 6); // Return top 6 tips
}

// ==========================================
// DOM ELEMENTS
// ==========================================

const deviceForm = document.getElementById('deviceForm');
const deviceName = document.getElementById('deviceName');
const customDeviceGroup = document.getElementById('customDeviceGroup');
const customDeviceName = document.getElementById('customDeviceName');
const deviceRam = document.getElementById('deviceRam');
const screenDpi = document.getElementById('screenDpi');
const gameVersion = document.getElementById('gameVersion');
const playStyle = document.getElementById('playStyle');

const sensitivityResults = document.getElementById('sensitivityResults');
const deviceSummary = document.getElementById('deviceSummary');
const tipsSection = document.querySelector('.tips-section');
const backBtn = document.getElementById('backBtn');

// ==========================================
// EVENT LISTENERS
// ==========================================

deviceName.addEventListener('change', (e) => {
    if (e.target.value === 'custom') {
        customDeviceGroup.style.display = 'block';
    } else {
        customDeviceGroup.style.display = 'none';
    }
});

deviceForm.addEventListener('submit', (e) => {
    e.preventDefault();
    
    const selectedDevice = deviceName.value;
    const selectedRam = deviceRam.value;
    const selectedDpi = screenDpi.value;
    const selectedGame = gameVersion.value;
    const selectedStyle = playStyle.value;
    
    // Get device display name
    let displayName;
    if (selectedDevice === 'custom') {
        displayName = customDeviceName.value || 'Custom Device';
    } else {
        displayName = deviceDatabase[selectedDevice]?.name || 'Unknown Device';
    }
    
    // Calculate sensitivities
    const sensitivities = calculateSensitivity(
        selectedDevice,
        selectedRam,
        selectedDpi,
        selectedGame,
        selectedStyle
    );
    
    // Get tips
    const gameVersionName = selectedGame === 'ffmax' ? 'Free Fire Max' : 'Free Fire';
    const playStyleDisplay = selectedStyle.charAt(0).toUpperCase() + selectedStyle.slice(1);
    const tips = getTips(selectedDevice, selectedRam, selectedStyle, selectedGame);
    
    // Update device summary
    displayDeviceSummary(displayName, selectedRam, selectedDpi, gameVersionName, playStyleDisplay);
    
    // Update sensitivity values
    updateSensitivityCards(sensitivities);
    
    // Update tips
    updateTips(tips);
    
    // Update settings summary
    updateSettingsSummary(sensitivities, displayName, selectedRam, gameVersionName, playStyleDisplay);
    
    // Show results section
    sensitivityResults.classList.remove('hidden');
    sensitivityResults.scrollIntoView({ behavior: 'smooth' });
});

function displayDeviceSummary(device, ram, dpi, gameVersion, playStyle) {
    deviceSummary.innerHTML = `
        <h3>Your Device Configuration</h3>
        <div class="device-details">
            <div class="detail-item">
                <div class="detail-label">📱 Device</div>
                <div class="detail-value">${device}</div>
            </div>
            <div class="detail-item">
                <div class="detail-label">🧠 RAM</div>
                <div class="detail-value">${ram} GB</div>
            </div>
            <div class="detail-item">
                <div class="detail-label">📺 DPI</div>
                <div class="detail-value">${dpi || 'Auto'}</div>
            </div>
            <div class="detail-item">
                <div class="detail-label">🎮 Game</div>
                <div class="detail-value">${gameVersion}</div>
            </div>
            <div class="detail-item">
                <div class="detail-label">⚔️ Play Style</div>
                <div class="detail-value">${playStyle}</div>
            </div>
        </div>
    `;
}

function updateSensitivityCards(sensitivities) {
    document.getElementById('horSensitivity').textContent = sensitivities.horizontal;
    document.getElementById('verSensitivity').textContent = sensitivities.vertical;
    document.getElementById('redDotSensitivity').textContent = sensitivities.redDot;
    document.getElementById('scope2xSensitivity').textContent = sensitivities.scope2x;
    document.getElementById('scope4xSensitivity').textContent = sensitivities.scope4x;
    document.getElementById('scope8xSensitivity').textContent = sensitivities.scope8x;
}

function updateTips(tips) {
    const newTipsList = document.createElement('ul');
    newTipsList.className = 'tips-list';
    
    tips.forEach(tip => {
        const li = document.createElement('li');
        li.textContent = tip;
        newTipsList.appendChild(li);
    });
    
    tipsSection.innerHTML = '<h3>💡 Tips & Recommendations</h3>';
    tipsSection.appendChild(newTipsList);
}

function updateSettingsSummary(sensitivities, device, ram, gameVersion, playStyle) {
    const summary = `
FREE FIRE SENSITIVITY SETTINGS (0-200 Range)
========================================
Device: ${device}
RAM: ${ram} GB
Game Version: ${gameVersion}
Play Style: ${playStyle}

RECOMMENDED SETTINGS:
--------------------
Horizontal Sensitivity: ${sensitivities.horizontal}
Vertical Sensitivity: ${sensitivities.vertical}
Red Dot Sensitivity: ${sensitivities.redDot}
2x Scope Sensitivity: ${sensitivities.scope2x}
4x Scope Sensitivity: ${sensitivities.scope4x}
8x Scope Sensitivity: ${sensitivities.scope8x}

SENSITIVITY RANGE: 0-200
GENERATED: ${new Date().toLocaleString()}

========================================
Generated with ❤️ by GamerID Pro
    `;
    
    document.getElementById('settingsSummary').textContent = summary;
}

// Copy functionality for sensitivity cards
document.addEventListener('click', (e) => {
    if (e.target.classList.contains('copy-sensitivity-btn')) {
        const valueType = e.target.getAttribute('data-value');
        const valueMap = {
            'horizontal': document.getElementById('horSensitivity').textContent,
            'vertical': document.getElementById('verSensitivity').textContent,
            'redDot': document.getElementById('redDotSensitivity').textContent,
            'scope2x': document.getElementById('scope2xSensitivity').textContent,
            'scope4x': document.getElementById('scope4xSensitivity').textContent,
            'scope8x': document.getElementById('scope8xSensitivity').textContent,
        };
        
        const valueToCopy = valueMap[valueType];
        
        navigator.clipboard.writeText(valueToCopy).then(() => {
            e.target.textContent = '✅ Copied!';
            e.target.classList.add('copied');
            setTimeout(() => {
                e.target.textContent = 'Copy';
                e.target.classList.remove('copied');
            }, 2000);
        });
    }
});

// Copy all settings
const copyAllBtn = document.getElementById('copyAllBtn');
if (copyAllBtn) {
    copyAllBtn.addEventListener('click', () => {
        const settingsSummary = document.getElementById('settingsSummary').textContent;
        navigator.clipboard.writeText(settingsSummary).then(() => {
            copyAllBtn.textContent = '✅ All Settings Copied!';
            copyAllBtn.classList.add('copied');
            setTimeout(() => {
                copyAllBtn.textContent = 'Copy All Settings';
                copyAllBtn.classList.remove('copied');
            }, 2000);
        });
    });
}

// Back button
if (backBtn) {
    backBtn.addEventListener('click', () => {
        sensitivityResults.classList.add('hidden');
        deviceForm.reset();
        customDeviceGroup.style.display = 'none';
    });
}

console.log('🔒 Free Fire Sensitivity Analyzer loaded! (0-200 Range)');
