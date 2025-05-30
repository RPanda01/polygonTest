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

class BufferZone extends HTMLElement {
    constructor() {
        super();
        this.polygons = [];
        this.selectedPolygon = null;
        this.innerHTML = `
      <div class="zone-header">Буферная зона</div>
      <div class="zone-content">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1000 1000"></svg>
      </div>
    `;
    }

    connectedCallback() {
        const saved = safeStorage.getItem('polygons');
        if (saved) {
            try {
                this.renderPolygons(JSON.parse(saved));
            } catch (e) {
                console.warn('Не удалось загрузить сохраненные полигоны');
            }
        }

        // Добавляем поддержку drop для полигонов из рабочей зоны
        const svg = this.querySelector('svg');
        svg.addEventListener('dragover', e => e.preventDefault());
        svg.addEventListener('drop', e => {
            e.preventDefault();
            const points = e.dataTransfer.getData('text/plain');
            const source = e.dataTransfer.getData('source');

            if (source === 'work') {
                this.addPolygon(points);
                document.querySelector('work-zone').removePolygon(points);
            }
        });
    }

    addPolygon(points) {
        // Добавляем полигон в массив, если его там еще нет
        if (!this.polygons.includes(points)) {
            this.polygons.push(points);
            this.renderSinglePolygon(points, this.polygons.length - 1);
            this.savePolygons();
        }
    }

    renderSinglePolygon(points, index) {
        const svg = this.querySelector('svg');
        const g = document.createElementNS('http://www.w3.org/2000/svg', 'g');
        g.classList.add('polygon-group');

        const polygon = document.createElementNS('http://www.w3.org/2000/svg', 'polygon');
        polygon.setAttribute('points', points);
        polygon.setAttribute('fill', `hsl(${200 + index * 30}, 70%, 80%)`);
        polygon.setAttribute('stroke', '#1976D2');
        polygon.setAttribute('stroke-width', '2');
        polygon.classList.add('polygon');
        polygon.dataset.points = points;

        g.appendChild(polygon);
        svg.appendChild(g);

        this.setupPolygonHandlers(g, points);
    }

    renderPolygons(polygons) {
        this.polygons = polygons;
        const svg = this.querySelector('svg');
        svg.innerHTML = '';

        polygons.forEach((points, index) => {
            this.renderSinglePolygon(points, index);
        });
    }

    setupPolygonHandlers(g, points) {
        let isDragging = false;
        let startX, startY;
        let originalPoints = points.split(' ').map(p => p.split(',').map(Number));
        let currentPoints = [...originalPoints];

        g.addEventListener('mousedown', e => {
            isDragging = true;
            startX = e.clientX;
            startY = e.clientY;
            g.style.opacity = '0.7';
            this.selectedPolygon = points;
            e.preventDefault();
            e.stopPropagation();
        });

        const handleMouseMove = (e) => {
            if (isDragging && this.selectedPolygon === points) {
                const deltaX = (e.clientX - startX);
                const deltaY = (e.clientY - startY);

                currentPoints = originalPoints.map(([x, y]) => [
                    x + deltaX,
                    y + deltaY
                ]);

                const newPointsStr = currentPoints.map(p => p.join(',')).join(' ');
                g.querySelector('polygon').setAttribute('points', newPointsStr);

                // Подсвечиваем рабочую зону при наведении
                const workZone = document.querySelector('work-zone');
                const workRect = workZone.getBoundingClientRect();

                if (e.clientX >= workRect.left && e.clientX <= workRect.right &&
                    e.clientY >= workRect.top && e.clientY <= workRect.bottom) {
                    workZone.classList.add('drag-over');
                } else {
                    workZone.classList.remove('drag-over');
                }
            }
        };

        const handleMouseUp = (e) => {
            if (isDragging && this.selectedPolygon === points) {
                isDragging = false;
                g.style.opacity = '1';

                const workZone = document.querySelector('work-zone');
                const workRect = workZone.getBoundingClientRect();

                if (e.clientX >= workRect.left && e.clientX <= workRect.right &&
                    e.clientY >= workRect.top && e.clientY <= workRect.bottom) {

                    // Считаем смещение до точки (150, 150)
                    const centroid = originalPoints.reduce(
                        (acc, [x, y]) => [acc[0] + x, acc[1] + y],
                        [0, 0]
                    ).map(sum => sum / originalPoints.length);

                    const shiftX = 150 - centroid[0];
                    const shiftY = 150 - centroid[1];

                    const shiftedPoints = originalPoints.map(([x, y]) => [
                        x + shiftX,
                        y + shiftY
                    ]);

                    const newPointsStr = shiftedPoints.map(p => p.join(',')).join(' ');
                    workZone.addPolygon(newPointsStr);
                    this.removePolygon(points);
                } else {
                    // Оставляем в текущей зоне с обновлёнными координатами
                    const newPointsStr = currentPoints.map(p => p.join(',')).join(' ');
                    g.querySelector('polygon').setAttribute('points', newPointsStr);
                    g.querySelector('polygon').dataset.points = newPointsStr;

                    const index = this.polygons.indexOf(points);
                    if (index > -1) {
                        this.polygons[index] = newPointsStr;
                    }
                    this.savePolygons();
                }

                workZone.classList.remove('drag-over');
                this.selectedPolygon = null;
                originalPoints = currentPoints;
            }
        };


        document.addEventListener('mousemove', handleMouseMove);
        document.addEventListener('mouseup', handleMouseUp);

        // Альтернативный способ - двойной клик для копирования
        g.addEventListener('dblclick', () => {
            const workZone = document.querySelector('work-zone');
            workZone.addPolygon(points);
        });
    }

    removePolygon(points) {
        // Удаляем из массива
        const index = this.polygons.indexOf(points);
        if (index > -1) {
            this.polygons.splice(index, 1);
        }

        // Удаляем из DOM
        const svg = this.querySelector('svg');
        const polygons = Array.from(svg.querySelectorAll('polygon'));
        polygons.forEach(poly => {
            if (poly.getAttribute('points') === points || poly.dataset.points === points) {
                poly.parentElement.remove();
            }
        });

        // Сохраняем изменения
        this.savePolygons();
    }

    savePolygons() {
        try {
            safeStorage.setItem('polygons', JSON.stringify(this.polygons));
        } catch (e) {
            console.warn('Не удалось сохранить полигоны');
        }
    }

    getPolygonsData() {
        return this.polygons;
    }
}

customElements.define('buffer-zone', BufferZone);