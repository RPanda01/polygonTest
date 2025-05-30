class WorkZone extends HTMLElement {
    constructor() {
        super();
        this.scale = 1;
        this.panX = 0;
        this.panY = 0;
        this.polygons = []; 
        this.selectedPolygon = null;
        this.innerHTML = `
      <div class="zone-header">Рабочая зона</div>
      <div class="zone-content">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1000 1000">
          <g class="grid"></g>
          <g class="scale-x"></g>
          <g class="scale-y"></g>
          <g class="polygons"></g>
        </svg>
      </div>
    `;
    }

    connectedCallback() {
        const svg = this.querySelector('svg');
        const zoneContent = this.querySelector('.zone-content');
        this.drawGrid();
        this.drawScales();

        // Загружаем сохраненные полигоны рабочей зоны
        this.loadWorkZonePolygons();

        this.enableZoomAndPan(svg, zoneContent);

        svg.addEventListener('dragover', e => e.preventDefault());
        svg.addEventListener('drop', e => {
            e.preventDefault();
            const points = e.dataTransfer.getData('text/plain');
            const source = e.dataTransfer.getData('source');

            this.addPolygon(points);
            if (source === 'buffer') {
                document.querySelector('buffer-zone').removePolygon(points);
            } else if (source === 'work') {

            }
        });
    }

    clearPolygons() {
        this.polygons = [];
        const polygonsGroup = this.querySelector('.polygons');
        polygonsGroup.innerHTML = '';
        this.saveWorkZonePolygons();
    }


    addPolygon(points) {
        // Добавляем в массив, если еще нет
        if (!this.polygons.includes(points)) {
            this.polygons.push(points);
        }

        const polygonsGroup = this.querySelector('.polygons');
        const g = document.createElementNS('http://www.w3.org/2000/svg', 'g');
        g.classList.add('polygon-group');

        const polygon = document.createElementNS('http://www.w3.org/2000/svg', 'polygon');
        polygon.setAttribute('points', points);
        polygon.setAttribute('fill', 'rgba(76, 175, 80, 0.7)');
        polygon.setAttribute('stroke', '#4CAF50');
        polygon.setAttribute('stroke-width', '2');
        polygon.classList.add('polygon');
        polygon.dataset.points = points;

        g.appendChild(polygon);
        polygonsGroup.appendChild(g);

        this.setupPolygonDragAndDrop(g, points);

        // Удаление по двойному клику
        g.addEventListener('dblclick', () => {
            if (confirm('Удалить этот полигон?')) {
                this.removePolygonFromArray(points);
                g.remove();
                this.saveWorkZonePolygons();
            }
        });

        this.saveWorkZonePolygons();
    }

    setupPolygonDragAndDrop(g, points) {
        let isDragging = false;
        let startX, startY;
        let originalPoints = points.split(' ').map(p => p.split(',').map(Number));
        let currentPoints = [...originalPoints];

        g.addEventListener('mousedown', e => {
            if (e.target.closest('.polygon-group')) {
                isDragging = true;
                startX = e.clientX;
                startY = e.clientY;
                g.style.opacity = '0.7';
                this.selectedPolygon = points;
                e.preventDefault();
                e.stopPropagation();
            }
        });

        const handleMouseMove = (e) => {
            if (isDragging && this.selectedPolygon === points) {
                const deltaX = (e.clientX - startX) / this.scale;
                const deltaY = (e.clientY - startY) / this.scale;

                currentPoints = originalPoints.map(([x, y]) => [
                    x + deltaX,
                    y + deltaY
                ]);

                const newPointsStr = currentPoints.map(p => p.join(',')).join(' ');
                g.querySelector('polygon').setAttribute('points', newPointsStr);

                // Подсвечиваем буферную зону при наведении
                const bufferZone = document.querySelector('buffer-zone');
                const bufferRect = bufferZone.getBoundingClientRect();

                if (e.clientX >= bufferRect.left && e.clientX <= bufferRect.right &&
                    e.clientY >= bufferRect.top && e.clientY <= bufferRect.bottom) {
                    bufferZone.classList.add('drag-over');
                } else {
                    bufferZone.classList.remove('drag-over');
                }
            }
        };

        const handleMouseUp = (e) => {
            if (isDragging && this.selectedPolygon === points) {
                isDragging = false;
                g.style.opacity = '1';

                const bufferZone = document.querySelector('buffer-zone');
                const bufferRect = bufferZone.getBoundingClientRect();

                if (e.clientX >= bufferRect.left && e.clientX <= bufferRect.right &&
                    e.clientY >= bufferRect.top && e.clientY <= bufferRect.bottom) {

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
                    bufferZone.addPolygon(newPointsStr);
                    this.removePolygonFromArray(points);
                    g.remove();
                    this.saveWorkZonePolygons();
                } else {
                    // Оставляем в текущей зоне с обновлёнными координатами
                    const newPointsStr = currentPoints.map(p => p.join(',')).join(' ');
                    g.querySelector('polygon').setAttribute('points', newPointsStr);
                    g.querySelector('polygon').dataset.points = newPointsStr;

                    const index = this.polygons.indexOf(points);
                    if (index > -1) {
                        this.polygons[index] = newPointsStr;
                    }
                    this.saveWorkZonePolygons();
                }

                bufferZone.classList.remove('drag-over');
                this.selectedPolygon = null;
                originalPoints = currentPoints;
            }
        };


        // Добавляем обработчики к document
        document.addEventListener('mousemove', handleMouseMove);
        document.addEventListener('mouseup', handleMouseUp);
    }

    removePolygon(points) {
        this.removePolygonFromArray(points);
        const polygonsGroup = this.querySelector('.polygons');
        const polygons = Array.from(polygonsGroup.querySelectorAll('polygon'));
        polygons.forEach(poly => {
            if (poly.getAttribute('points') === points || poly.dataset.points === points) {
                poly.parentElement.remove();
            }
        });
        this.saveWorkZonePolygons();
    }

    removePolygonFromArray(points) {
        const index = this.polygons.indexOf(points);
        if (index > -1) {
            this.polygons.splice(index, 1);
        }
    }

    enableZoomAndPan(svg, container) {
        let isDragging = false;
        let lastX, lastY;

        container.addEventListener('wheel', e => {
            e.preventDefault();
            const delta = e.deltaY > 0 ? 0.9 : 1.1;
            this.scale = Math.max(0.1, Math.min(5, this.scale * delta));
            this.updateTransform(svg);
            this.drawGrid();
            this.drawScales();
        });

        container.addEventListener('mousedown', e => {
            if (!e.target.closest('.polygon-group')) {
                isDragging = true;
                lastX = e.clientX;
                lastY = e.clientY;
                container.style.cursor = 'grabbing';
                e.preventDefault();
            }
        });

        const handlePanMove = (e) => {
            if (isDragging) {
                const deltaX = e.clientX - lastX;
                const deltaY = e.clientY - lastY;

                this.panX += deltaX / this.scale;
                this.panY += deltaY / this.scale;

                this.updateTransform(svg);
                this.drawScales();
                lastX = e.clientX;
                lastY = e.clientY;
            }
        };

        const handlePanEnd = () => {
            if (isDragging) {
                isDragging = false;
                container.style.cursor = 'grab';
            }
        };

        document.addEventListener('mousemove', handlePanMove);
        document.addEventListener('mouseup', handlePanEnd);
    }

    updateTransform(svg) {
        svg.querySelector('.polygons').setAttribute('transform', `scale(${this.scale}) translate(${this.panX}, ${this.panY})`);
    }

    drawGrid() {
        const grid = this.querySelector('.grid');
        grid.innerHTML = '';

        // Определяем шаг сетки в зависимости от масштаба
        let baseStep = 50;
        let step = baseStep;

        // Адаптивный шаг для разных масштабов
        if (this.scale < 0.5) {
            step = baseStep * 4;
        } else if (this.scale < 1) {
            step = baseStep * 2;
        } else if (this.scale > 2) {
            step = baseStep / 2;
        } else if (this.scale > 4) {
            step = baseStep / 4;
        }

        for (let x = 0; x <= 1000; x += step) {
            const line = document.createElementNS('http://www.w3.org/2000/svg', 'line');
            line.setAttribute('x1', x);
            line.setAttribute('y1', 0);
            line.setAttribute('x2', x);
            line.setAttribute('y2', 400);
            line.setAttribute('stroke', '#e0e0e0');
            line.setAttribute('stroke-width', '0.5');
            grid.appendChild(line);
        }

        for (let y = 0; y <= 400; y += step) {
            const line = document.createElementNS('http://www.w3.org/2000/svg', 'line');
            line.setAttribute('x1', 0);
            line.setAttribute('y1', y);
            line.setAttribute('x2', 1000);
            line.setAttribute('y2', y);
            line.setAttribute('stroke', '#e0e0e0');
            line.setAttribute('stroke-width', '0.5');
            grid.appendChild(line);
        }
    }

    drawScales() {
        this.drawXScale();
        this.drawYScale();
    }

    drawXScale() {
        const scaleX = this.querySelector('.scale-x');
        scaleX.innerHTML = '';

        let baseStep = 50;
        let step = baseStep;

        if (this.scale < 0.5) {
            step = baseStep * 4;
        } else if (this.scale < 1) {
            step = baseStep * 2;
        } else if (this.scale > 2) {
            step = baseStep / 2;
        } else if (this.scale > 4) {
            step = baseStep / 4;
        }

        const bgRect = document.createElementNS('http://www.w3.org/2000/svg', 'rect');
        bgRect.setAttribute('x', 0);
        bgRect.setAttribute('y', 0);
        bgRect.setAttribute('width', 1000);
        bgRect.setAttribute('height', 25);
        bgRect.setAttribute('fill', 'rgba(248, 249, 250, 0.95)');
        bgRect.setAttribute('stroke', '#dee2e6');
        bgRect.setAttribute('stroke-width', '1');
        scaleX.appendChild(bgRect);

        const startX = 50; 
        for (let x = startX; x <= 1000; x += step) {
            const majorTick = document.createElementNS('http://www.w3.org/2000/svg', 'line');
            majorTick.setAttribute('x1', x);
            majorTick.setAttribute('y1', 20);
            majorTick.setAttribute('x2', x);
            majorTick.setAttribute('y2', 25);
            majorTick.setAttribute('stroke', '#495057');
            majorTick.setAttribute('stroke-width', '1');
            scaleX.appendChild(majorTick);

            const text = document.createElementNS('http://www.w3.org/2000/svg', 'text');
            text.setAttribute('x', x);
            text.setAttribute('y', 15);
            text.setAttribute('text-anchor', 'middle');
            text.setAttribute('font-family', 'Arial, sans-serif');
            text.setAttribute('font-size', '10');
            text.setAttribute('fill', '#495057');
            const realValue = Math.round((x / this.scale) - this.panX);
            text.textContent = realValue;
            scaleX.appendChild(text);

            if (step >= 20) {
                const halfStep = step / 2;
                if (x + halfStep <= 1000) {
                    const minorTick = document.createElementNS('http://www.w3.org/2000/svg', 'line');
                    minorTick.setAttribute('x1', x + halfStep);
                    minorTick.setAttribute('y1', 22);
                    minorTick.setAttribute('x2', x + halfStep);
                    minorTick.setAttribute('y2', 25);
                    minorTick.setAttribute('stroke', '#6c757d');
                    minorTick.setAttribute('stroke-width', '0.5');
                    scaleX.appendChild(minorTick);
                }
            }
        }

        const title = document.createElementNS('http://www.w3.org/2000/svg', 'text');
        title.setAttribute('x', 500);
        title.setAttribute('y', 8);
        title.setAttribute('text-anchor', 'middle');
        title.setAttribute('font-family', 'Arial, sans-serif');
        title.setAttribute('font-size', '12');
        title.setAttribute('font-weight', 'bold');
        title.setAttribute('fill', '#212529');
        title.textContent = 'X';
        scaleX.appendChild(title);
    }


    drawYScale() {
        const scaleY = this.querySelector('.scale-y');
        scaleY.innerHTML = '';

        let baseStep = 50;
        let step = baseStep;

        if (this.scale < 0.5) {
            step = baseStep * 4;
        } else if (this.scale < 1) {
            step = baseStep * 2;
        } else if (this.scale > 2) {
            step = baseStep / 2;
        } else if (this.scale > 4) {
            step = baseStep / 4;
        }

        const bgRect = document.createElementNS('http://www.w3.org/2000/svg', 'rect');
        bgRect.setAttribute('x', 0);
        bgRect.setAttribute('y', 0);
        bgRect.setAttribute('width', 30);
        bgRect.setAttribute('height', 400);
        bgRect.setAttribute('fill', 'rgba(248, 249, 250, 0.95)');
        bgRect.setAttribute('stroke', '#dee2e6');
        bgRect.setAttribute('stroke-width', '1');
        scaleY.appendChild(bgRect);

        const startY = 50; // отступ для первого числа
        for (let y = startY; y <= 400; y += step) {
            const majorTick = document.createElementNS('http://www.w3.org/2000/svg', 'line');
            majorTick.setAttribute('x1', 25);
            majorTick.setAttribute('y1', y);
            majorTick.setAttribute('x2', 30);
            majorTick.setAttribute('y2', y);
            majorTick.setAttribute('stroke', '#495057');
            majorTick.setAttribute('stroke-width', '1');
            scaleY.appendChild(majorTick);

            const text = document.createElementNS('http://www.w3.org/2000/svg', 'text');
            text.setAttribute('x', 22);
            text.setAttribute('y', y + 3);
            text.setAttribute('text-anchor', 'end');
            text.setAttribute('font-family', 'Arial, sans-serif');
            text.setAttribute('font-size', '10');
            text.setAttribute('fill', '#495057');
            const realValue = Math.round((y / this.scale) - this.panY);
            text.textContent = realValue;
            scaleY.appendChild(text);

            if (step >= 20) {
                const halfStep = step / 2;
                if (y + halfStep <= 400) {
                    const minorTick = document.createElementNS('http://www.w3.org/2000/svg', 'line');
                    minorTick.setAttribute('x1', 27);
                    minorTick.setAttribute('y1', y + halfStep);
                    minorTick.setAttribute('x2', 30);
                    minorTick.setAttribute('y2', y + halfStep);
                    minorTick.setAttribute('stroke', '#6c757d');
                    minorTick.setAttribute('stroke-width', '0.5');
                    scaleY.appendChild(minorTick);
                }
            }
        }

        const title = document.createElementNS('http://www.w3.org/2000/svg', 'text');
        title.setAttribute('x', 8);
        title.setAttribute('y', 200);
        title.setAttribute('text-anchor', 'middle');
        title.setAttribute('font-family', 'Arial, sans-serif');
        title.setAttribute('font-size', '12');
        title.setAttribute('font-weight', 'bold');
        title.setAttribute('fill', '#212529');
        title.setAttribute('transform', 'rotate(-90, 8, 200)');
        title.textContent = 'Y';
        scaleY.appendChild(title);
    }


    // Методы для сохранения и загрузки данных рабочей зоны
    saveWorkZonePolygons() {
        const storage = typeof localStorage !== 'undefined' ? localStorage : {
            data: {},
            setItem(key, value) { this.data[key] = value; },
            getItem(key) { return this.data[key] || null; }
        };

        try {
            storage.setItem('workZonePolygons', JSON.stringify(this.polygons));
        } catch (e) {
            console.warn('Не удалось сохранить полигоны рабочей зоны');
        }
    }

    loadWorkZonePolygons() {
        const storage = typeof localStorage !== 'undefined' ? localStorage : {
            data: {},
            setItem(key, value) { this.data[key] = value; },
            getItem(key) { return this.data[key] || null; }
        };

        const saved = storage.getItem('workZonePolygons');
        if (saved) {
            try {
                const polygons = JSON.parse(saved);
                polygons.forEach(points => {
                    this.polygons.push(points);
                    this.renderSinglePolygon(points);
                });
            } catch (e) {
                console.warn('Не удалось загрузить сохраненные полигоны рабочей зоны');
            }
        }
    }

    renderSinglePolygon(points) {
        const polygonsGroup = this.querySelector('.polygons');
        const g = document.createElementNS('http://www.w3.org/2000/svg', 'g');
        g.classList.add('polygon-group');

        const polygon = document.createElementNS('http://www.w3.org/2000/svg', 'polygon');
        polygon.setAttribute('points', points);
        polygon.setAttribute('fill', 'rgba(76, 175, 80, 0.7)');
        polygon.setAttribute('stroke', '#4CAF50');
        polygon.setAttribute('stroke-width', '2');
        polygon.classList.add('polygon');
        polygon.dataset.points = points;

        g.appendChild(polygon);
        polygonsGroup.appendChild(g);

        this.setupPolygonDragAndDrop(g, points);

        // Удаление по двойному клику
        g.addEventListener('dblclick', () => {
            if (confirm('Удалить этот полигон?')) {
                this.removePolygonFromArray(points);
                g.remove();
                this.saveWorkZonePolygons();
            }
        });
    }

    getPolygonsData() {
        return this.polygons;
    }
}

customElements.define('work-zone', WorkZone);