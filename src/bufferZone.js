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
        this.eventHandlers = new Map(); // Для отслеживания обработчиков событий
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
                // Получаем координаты курсора в SVG буферной зоны
                const svgPoint = this.getScaledCoordinates(e, svg);

                // Вычисляем центр полигона
                const originalPoints = points.split(' ').map(p => p.split(',').map(Number));
                const centroid = originalPoints.reduce(
                    (acc, [x, y]) => [acc[0] + x, acc[1] + y],
                    [0, 0]
                ).map(sum => sum / originalPoints.length);

                // Смещаем полигон так, чтобы его центр был в точке курсора
                const shiftX = svgPoint.x - centroid[0];
                const shiftY = svgPoint.y - centroid[1];

                const shiftedPoints = originalPoints.map(([x, y]) => [
                    x + shiftX,
                    y + shiftY
                ]);

                const newPointsStr = shiftedPoints.map(p => p.join(',')).join(' ');
                this.addPolygon(newPointsStr);
                document.querySelector('work-zone').removePolygon(points);
            }
        });
    }

    disconnectedCallback() {
        // Очищаем все обработчики событий
        this.eventHandlers.forEach(handlers => {
            document.removeEventListener('mousemove', handlers.mousemove);
            document.removeEventListener('mouseup', handlers.mouseup);
        });
        this.eventHandlers.clear();
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
        polygon.setAttribute('fill', '#ff0000'); 
        polygon.setAttribute('stroke', '#ff0000');
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

    // Преобразование координат мыши в координаты SVG
    getScaledCoordinates(e, svg) {
        const rect = svg.getBoundingClientRect();
        const viewBox = svg.viewBox.baseVal;

        const scaleX = viewBox.width / rect.width;
        const scaleY = viewBox.height / rect.height;

        const x = (e.clientX - rect.left) * scaleX + viewBox.x;
        const y = (e.clientY - rect.top) * scaleY + viewBox.y;

        return { x, y };
    }

    setupPolygonHandlers(g, points) {
        let isDragging = false;
        let lastX, lastY;
        let originalPoints = points.split(' ').map(p => p.split(',').map(Number));
        let currentPoints = [...originalPoints];

        const svg = this.querySelector('svg');

        const mouseDownHandler = (e) => {
            isDragging = true;
            const coords = this.getScaledCoordinates(e, svg);
            lastX = coords.x;
            lastY = coords.y;
            g.style.opacity = '0.7';
            this.selectedPolygon = points;
            e.preventDefault();
            e.stopPropagation();
        };

        const handleMouseMove = (e) => {
            if (isDragging && this.selectedPolygon === points) {
                const coords = this.getScaledCoordinates(e, svg);

                // Считаем дельту в координатах SVG
                const deltaX = coords.x - lastX;
                const deltaY = coords.y - lastY;

                // Обновляем последние координаты
                lastX = coords.x;
                lastY = coords.y;

                // Обновляем текущие точки
                currentPoints = currentPoints.map(([x, y]) => [
                    x + deltaX,
                    y + deltaY
                ]);

                const newPointsStr = currentPoints.map(p => p.join(',')).join(' ');
                g.querySelector('polygon').setAttribute('points', newPointsStr);

                // Подсвечиваем рабочую зону при наведении (используем экранные координаты)
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

                    // Получаем координаты курсора в рабочей зоне с учетом масштаба и панорамирования
                    const workSvg = workZone.querySelector('svg');
                    const workRect = workSvg.getBoundingClientRect();
                    const viewBox = workSvg.viewBox.baseVal;

                    // Преобразуем экранные координаты в SVG координаты
                    const scaleX = viewBox.width / workRect.width;
                    const scaleY = viewBox.height / workRect.height;
                    const svgX = (e.clientX - workRect.left) * scaleX + viewBox.x;
                    const svgY = (e.clientY - workRect.top) * scaleY + viewBox.y;

                    // Учитываем трансформацию рабочей зоны (масштаб и панорамирование)
                    const realX = (svgX / workZone.scale) - workZone.panX;
                    const realY = (svgY / workZone.scale) - workZone.panY;

                    // Вычисляем центр текущего полигона
                    const centroid = currentPoints.reduce(
                        (acc, [x, y]) => [acc[0] + x, acc[1] + y],
                        [0, 0]
                    ).map(sum => sum / currentPoints.length);

                    // Смещаем полигон так, чтобы его центр был в точке курсора
                    const shiftX = realX - centroid[0];
                    const shiftY = realY - centroid[1];

                    const shiftedPoints = currentPoints.map(([x, y]) => [
                        x + shiftX,
                        y + shiftY
                    ]);

                    const newPointsStr = shiftedPoints.map(p => p.join(',')).join(' ');
                    workZone.addPolygon(newPointsStr);
                    this.removePolygon(points);
                } else {
                    // Обновляем originalPoints для следующего перемещения
                    originalPoints = [...currentPoints];
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
            }
        };

        // Добавляем обработчики событий
        g.addEventListener('mousedown', mouseDownHandler);
        document.addEventListener('mousemove', handleMouseMove);
        document.addEventListener('mouseup', handleMouseUp);

        // Сохраняем ссылки на обработчики для последующего удаления
        this.eventHandlers.set(points, {
            mousemove: handleMouseMove,
            mouseup: handleMouseUp,
            mousedown: mouseDownHandler,
            element: g
        });

        // Альтернативный способ - двойной клик для копирования
        g.addEventListener('dblclick', () => {
            const workZone = document.querySelector('work-zone');
            workZone.addPolygon(points);
        });
    }

    removePolygon(points) {
        // Удаляем обработчики событий
        if (this.eventHandlers.has(points)) {
            const handlers = this.eventHandlers.get(points);
            document.removeEventListener('mousemove', handlers.mousemove);
            document.removeEventListener('mouseup', handlers.mouseup);
            handlers.element.removeEventListener('mousedown', handlers.mousedown);
            this.eventHandlers.delete(points);
        }

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

if (!customElements.get('buffer-zone')) {
    customElements.define('buffer-zone', BufferZone);
}