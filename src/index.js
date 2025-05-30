import './styles.css';
import './bufferZone.js';
import './workZone.js';

const storage = {
    data: {},
    setItem(key, value) {
        this.data[key] = value;
    },
    getItem(key) {
        return this.data[key] || null;
    },
    removeItem(key) {
        delete this.data[key];
    }
};

const safeStorage = typeof localStorage !== 'undefined' ? localStorage : storage;

function generateRandomPolygons() {
    const count = Math.floor(Math.random() * 12) + 4;
    return Array.from({ length: count }, (_, index) => {
        const centerX = 50 + Math.random() * 300;
        const centerY = 50 + Math.random() * 200;
        const radius = 20 + Math.random() * 40;
        const sides = Math.floor(Math.random() * 5) + 3;

        const points = [];
        for (let i = 0; i < sides; i++) {
            const angle = (i / sides) * 2 * Math.PI;
            const r = radius * (0.7 + Math.random() * 0.6);
            const x = centerX + Math.cos(angle) * r;
            const y = centerY + Math.sin(angle) * r;
            points.push(`${x.toFixed(1)},${y.toFixed(1)}`);
        }

        return points.join(' ');
    });
}

// Обработчики событий
document.addEventListener('DOMContentLoaded', () => {
    document.getElementById('createBtn').addEventListener('click', () => {
        const polygons = generateRandomPolygons();
        document.querySelector('buffer-zone').renderPolygons(polygons);
    });

    document.getElementById('saveBtn').addEventListener('click', () => {
        try {
            const data = document.querySelector('buffer-zone').getPolygonsData();
            safeStorage.setItem('polygons', JSON.stringify(data));
            alert('Полигоны сохранены успешно!');
        } catch (e) {
            alert('Ошибка при сохранении');
        }
    });

    document.getElementById('resetBtn').addEventListener('click', () => {
        if (confirm('Вы уверены, что хотите сбросить все сохраненные данные?')) {
            safeStorage.removeItem('polygons');
            safeStorage.removeItem('workZonePolygons');
            document.querySelector('buffer-zone').renderPolygons([]);
            document.querySelector('work-zone').clearPolygons();
            alert('Данные сброшены!');
        }
    });

});