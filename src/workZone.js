class WorkZone extends HTMLElement {
    constructor() {

        super();
        this.scale = parseFloat(localStorage.getItem('workZoneScale')) || 1;
        this.panX = parseFloat(localStorage.getItem('workZonePanX')) || 0;
        this.panY = parseFloat(localStorage.getItem('workZonePanY')) || 0;
        this.polygons = [];
        this.selectedPolygon = null;
        this.innerHTML = `
      <div class="zone-header">Рабочая зона</div>
      <div class="zone-content">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1000 300">
          <g class="grid"></g>
          <g class="scale-x"></g>
          <g class="scale-y"></g>
          <g class="scale-ruler"></g>
          <g class="polygons"></g>
        </svg>
      </div>
    `;
    }


    getSVGCursorCoords(e, svg) {
        const rect = svg.getBoundingClientRect();
        const viewBox = svg.viewBox.baseVal;
        const scaleX = viewBox.width / rect.width;
        const scaleY = viewBox.height / rect.height;
        return {
            x: (e.clientX - rect.left) * scaleX + viewBox.x,
            y: (e.clientY - rect.top) * scaleY + viewBox.y
        };
    }

    connectedCallback() {
        // Восстанавливаем масштаб и панорамирование из localStorage
        const storage = typeof localStorage !== 'undefined' ? localStorage : {
            data: {},
            setItem(key, value) { this.data[key] = value; },
            getItem(key) { return this.data[key] || null; }
        };

        this.scale = parseFloat(storage.getItem('workZoneScale')) || 1;
        this.panX = parseFloat(storage.getItem('workZonePanX')) || 0;
        this.panY = parseFloat(storage.getItem('workZonePanY')) || 0;

        const svg = this.querySelector('svg');
        const zoneContent = this.querySelector('.zone-content');

        // Загружаем сохраненные полигоны рабочей зоны
        this.loadWorkZonePolygons();

        // Применяем трансформацию и рисуем сетку/шкалы
        this.updateTransform(svg);
        this.drawGrid();
        this.drawScales();
        this.drawScaleRuler();

        this.enableZoomAndPan(svg, zoneContent);

        svg.addEventListener('dragover', e => e.preventDefault())
        svg.addEventListener('drop', e => {
            e.preventDefault();
            const points = e.dataTransfer.getData('text/plain');
            const source = e.dataTransfer.getData('source');

            // Получаем координаты курсора с учетом трансформации рабочей зоны
            const rect = svg.getBoundingClientRect();
            const viewBox = svg.viewBox.baseVal;
            const scaleX = viewBox.width / rect.width;
            const scaleY = viewBox.height / rect.height;
            const svgX = (e.clientX - rect.left) * scaleX + viewBox.x;
            const svgY = (e.clientY - rect.top) * scaleY + viewBox.y;

            // Учитываем трансформацию (масштаб и панорамирование)
            const realX = (svgX / this.scale) - this.panX;
            const realY = (svgY / this.scale) - this.panY;

            // Вычисляем центр полигона
            const originalPoints = points.split(' ').map(p => p.split(',').map(Number));
            const centroid = originalPoints.reduce(
                (acc, [x, y]) => [acc[0] + x, acc[1] + y],
                [0, 0]
            ).map(sum => sum / originalPoints.length);

            // Смещаем полигон так, чтобы его центр был в точке курсора
            const shiftX = realX - centroid[0];
            const shiftY = realY - centroid[1];

            const shiftedPoints = originalPoints.map(([x, y]) => [
                x + shiftX,
                y + shiftY
            ]);

            const newPointsStr = shiftedPoints.map(p => p.join(',')).join(' ');
            this.addPolygon(newPointsStr);

            if (source === 'buffer') {
                document.querySelector('buffer-zone').removePolygon(points);
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
        polygon.setAttribute('fill', 'rgba(255, 0, 0, 0.7)');
        polygon.setAttribute('stroke', '#ff0000');
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
        let lastX, lastY;
        let originalPoints = points.split(' ').map(p => p.split(',').map(Number));
        let currentPoints = [...originalPoints];

        const svg = this.querySelector('svg');

        // Преобразование координат мыши в SVG-координаты
        const getScaledCoordinates = (e, svg) => {
            const rect = svg.getBoundingClientRect();
            const viewBox = svg.viewBox.baseVal;
            const scaleX = viewBox.width / rect.width;
            const scaleY = viewBox.height / rect.height;
            // Координаты относительно viewBox
            const svgX = (e.clientX - rect.left) * scaleX + viewBox.x;
            const svgY = (e.clientY - rect.top) * scaleY + viewBox.y;
            // Учитываем масштаб и панорамирование рабочей зоны
            const realX = (svgX / this.scale) - this.panX;
            const realY = (svgY / this.scale) - this.panY;
            return { x: realX, y: realY };
        };

        g.addEventListener('mousedown', e => {
            if (e.target.closest('.polygon-group')) {
                isDragging = true;
                const coords = getScaledCoordinates(e, svg);
                lastX = coords.x;
                lastY = coords.y;
                g.style.opacity = '0.7';
                this.selectedPolygon = points;
                e.preventDefault();
                e.stopPropagation();
            }
        });

        const handleMouseMove = (e) => {
            if (isDragging && this.selectedPolygon === points) {
                const coords = getScaledCoordinates(e, svg);
                const deltaX = coords.x - lastX;
                const deltaY = coords.y - lastY;

                lastX = coords.x;
                lastY = coords.y;

                currentPoints = currentPoints.map(([x, y]) => [
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

                    // Получаем координаты курсора в SVG буферной зоны
                    const bufferSvg = bufferZone.querySelector('svg');
                    const bufferSvgPoint = this.getSVGCursorCoords(e, bufferSvg);

                    // Вычисляем центр текущего полигона
                    const centroid = currentPoints.reduce(
                        (acc, [x, y]) => [acc[0] + x, acc[1] + y],
                        [0, 0]
                    ).map(sum => sum / currentPoints.length);

                    // Смещаем полигон так, чтобы его центр был в точке курсора
                    const shiftX = bufferSvgPoint.x - centroid[0];
                    const shiftY = bufferSvgPoint.y - centroid[1];

                    const shiftedPoints = currentPoints.map(([x, y]) => [
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

            const rect = container.getBoundingClientRect();
            const mouseX = e.clientX - rect.left;
            const mouseY = e.clientY - rect.top;

            const svgX = (mouseX / this.scale) - this.panX;
            const svgY = (mouseY / this.scale) - this.panY;

            // Шаг масштабирования 10%
            const step = 0.1;
            let newScale = this.scale + (e.deltaY > 0 ? -step : step);

            // Ограничения
            newScale = Math.max(0.1, Math.min(5, newScale));

            // Округляем до ближайших 10%
            newScale = Math.round(newScale * 10) / 10;

            this.panX = (mouseX / newScale) - svgX;
            this.panY = (mouseY / newScale) - svgY;

            this.scale = newScale;

            this.updateTransform(svg);
            this.drawGrid();
            this.drawScales();
            this.drawScaleRuler();
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
                this.drawGrid();
                this.drawScales();
                this.drawScaleRuler();

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
        const transformGroup = svg.querySelector('.polygons');
        const gridGroup = svg.querySelector('.grid');

        const transform = `scale(${this.scale}) translate(${this.panX}, ${this.panY})`;

        transformGroup.setAttribute('transform', transform);
        gridGroup.setAttribute('transform', transform);
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

        // Вычисляем видимую область с учетом трансформации
        const visibleLeft = -this.panX;
        const visibleTop = -this.panY;
        const visibleRight = visibleLeft + (1000 / this.scale);
        const visibleBottom = visibleTop + (400 / this.scale);

        // Находим начальные и конечные позиции для линий сетки
        const startX = Math.floor(visibleLeft / step) * step;
        const endX = Math.ceil(visibleRight / step) * step;
        const startY = Math.floor(visibleTop / step) * step;
        const endY = Math.ceil(visibleBottom / step) * step;

        // Рисуем вертикальные линии
        for (let x = startX; x <= endX; x += step) {
            const line = document.createElementNS('http://www.w3.org/2000/svg', 'line');
            line.setAttribute('x1', x);
            line.setAttribute('y1', startY);
            line.setAttribute('x2', x);
            line.setAttribute('y2', endY);
            line.setAttribute('stroke', '#e0e0e0');
            line.setAttribute('stroke-width', 0.5 / this.scale);
            grid.appendChild(line);
        }

        // Рисуем горизонтальные линии
        for (let y = startY; y <= endY; y += step) {
            const line = document.createElementNS('http://www.w3.org/2000/svg', 'line');
            line.setAttribute('x1', startX);
            line.setAttribute('y1', y);
            line.setAttribute('x2', endX);
            line.setAttribute('y2', y);
            line.setAttribute('stroke', '#e0e0e0');
            line.setAttribute('stroke-width', 0.5 / this.scale);
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

        // Вычисляем видимую область X
        const visibleLeft = -this.panX;
        const visibleRight = visibleLeft + (1000 / this.scale);
        const startX = Math.floor(visibleLeft / step) * step;
        const endX = Math.ceil(visibleRight / step) * step;

        for (let x = startX; x <= endX; x += step) {
            const screenX = (x + this.panX) * this.scale;

            if (screenX >= 50 && screenX <= 1000) {
                const majorTick = document.createElementNS('http://www.w3.org/2000/svg', 'line');
                majorTick.setAttribute('x1', screenX);
                majorTick.setAttribute('y1', 20);
                majorTick.setAttribute('x2', screenX);
                majorTick.setAttribute('y2', 25);
                majorTick.setAttribute('stroke', '#495057');
                majorTick.setAttribute('stroke-width', '1');
                scaleX.appendChild(majorTick);

                const text = document.createElementNS('http://www.w3.org/2000/svg', 'text');
                text.setAttribute('x', screenX);
                text.setAttribute('y', 15);
                text.setAttribute('text-anchor', 'middle');
                text.setAttribute('font-family', 'Arial, sans-serif');
                text.setAttribute('font-size', '10');
                text.setAttribute('fill', '#495057');
                text.textContent = Math.round(x);
                scaleX.appendChild(text);

                if (step >= 20) {
                    const halfStep = step / 2;
                    const screenHalfX = ((x + halfStep) + this.panX) * this.scale;

                    if (screenHalfX >= 50 && screenHalfX <= 1000) {
                        const minorTick = document.createElementNS('http://www.w3.org/2000/svg', 'line');
                        minorTick.setAttribute('x1', screenHalfX);
                        minorTick.setAttribute('y1', 22);
                        minorTick.setAttribute('x2', screenHalfX);
                        minorTick.setAttribute('y2', 25);
                        minorTick.setAttribute('stroke', '#6c757d');
                        minorTick.setAttribute('stroke-width', '0.5');
                        scaleX.appendChild(minorTick);
                    }
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

        // Вычисляем видимую область Y
        const visibleTop = -this.panY;
        const visibleBottom = visibleTop + (400 / this.scale);
        const startY = Math.floor(visibleTop / step) * step;
        const endY = Math.ceil(visibleBottom / step) * step;

        for (let y = startY; y <= endY; y += step) {
            const screenY = (y + this.panY) * this.scale;

            if (screenY >= 50 && screenY <= 400) {
                const majorTick = document.createElementNS('http://www.w3.org/2000/svg', 'line');
                majorTick.setAttribute('x1', 25);
                majorTick.setAttribute('y1', screenY);
                majorTick.setAttribute('x2', 30);
                majorTick.setAttribute('y2', screenY);
                majorTick.setAttribute('stroke', '#495057');
                majorTick.setAttribute('stroke-width', '1');
                scaleY.appendChild(majorTick);

                const text = document.createElementNS('http://www.w3.org/2000/svg', 'text');
                text.setAttribute('x', 22);
                text.setAttribute('y', screenY + 3);
                text.setAttribute('text-anchor', 'end');
                text.setAttribute('font-family', 'Arial, sans-serif');
                text.setAttribute('font-size', '10');
                text.setAttribute('fill', '#495057');
                text.textContent = Math.round(y);
                scaleY.appendChild(text);

                if (step >= 20) {
                    const halfStep = step / 2;
                    const screenHalfY = ((y + halfStep) + this.panY) * this.scale;

                    if (screenHalfY >= 50 && screenHalfY <= 400) {
                        const minorTick = document.createElementNS('http://www.w3.org/2000/svg', 'line');
                        minorTick.setAttribute('x1', 27);
                        minorTick.setAttribute('y1', screenHalfY);
                        minorTick.setAttribute('x2', 30);
                        minorTick.setAttribute('y2', screenHalfY);
                        minorTick.setAttribute('stroke', '#6c757d');
                        minorTick.setAttribute('stroke-width', '0.5');
                        scaleY.appendChild(minorTick);
                    }
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

    drawScaleRuler() {
        const scaleRuler = this.querySelector('.scale-ruler');
        scaleRuler.innerHTML = '';

        // Позиция линейки (правый верхний угол)
        const rulerX = 50;
        const rulerY = 50;
        const rulerWidth = 150;
        const rulerHeight = 50;

        // Вычисляем реальное расстояние для отрезка на экране
        const referenceLength = 50; // пикселей на экране
        const realLength = referenceLength / this.scale;

        // Определяем подходящий масштаб для отображения
        const displayLength = Math.round(realLength);
        const unit = 'px';

        // Рисуем линию масштаба
        const line = document.createElementNS('http://www.w3.org/2000/svg', 'line');
        line.setAttribute('x1', rulerX + 10);
        line.setAttribute('y1', rulerY + 20);
        line.setAttribute('x2', rulerX + 10 + referenceLength);
        line.setAttribute('y2', rulerY + 20);
        line.setAttribute('stroke', '#ccc');
        line.setAttribute('stroke-width', '2');
        scaleRuler.appendChild(line);

        // Засечки на концах
        const leftTick = document.createElementNS('http://www.w3.org/2000/svg', 'line');
        leftTick.setAttribute('x1', rulerX + 10);
        leftTick.setAttribute('y1', rulerY + 15);
        leftTick.setAttribute('x2', rulerX + 10);
        leftTick.setAttribute('y2', rulerY + 25);
        leftTick.setAttribute('stroke', '#ccc');
        leftTick.setAttribute('stroke-width', '2');
        scaleRuler.appendChild(leftTick);

        const rightTick = document.createElementNS('http://www.w3.org/2000/svg', 'line');
        rightTick.setAttribute('x1', rulerX + 10 + referenceLength);
        rightTick.setAttribute('y1', rulerY + 15);
        rightTick.setAttribute('x2', rulerX + 10 + referenceLength);
        rightTick.setAttribute('y2', rulerY + 25);
        rightTick.setAttribute('stroke', '#ccc');
        rightTick.setAttribute('stroke-width', '2');
        scaleRuler.appendChild(rightTick);

        // Текст с расстоянием
        const text = document.createElementNS('http://www.w3.org/2000/svg', 'text');
        text.setAttribute('x', rulerX + 10 + referenceLength / 2);
        text.setAttribute('y', rulerY + 12);
        text.setAttribute('text-anchor', 'middle');
        text.setAttribute('font-family', 'Arial, sans-serif');
        text.setAttribute('font-size', '10');
        text.setAttribute('font-weight', 'bold');
        text.setAttribute('fill', '#ccc');
        text.textContent = `${displayLength} ${unit}`;
        scaleRuler.appendChild(text);

        // Информация о масштабе
        const scaleText = document.createElementNS('http://www.w3.org/2000/svg', 'text');
        scaleText.setAttribute('x', rulerX);
        scaleText.setAttribute('y', rulerY);
        scaleText.setAttribute('text-anchor', 'start');
        scaleText.setAttribute('font-family', 'Arial, sans-serif');
        scaleText.setAttribute('font-size', '12');
        scaleText.setAttribute('font-weight', 'bold');
        scaleText.setAttribute('fill', '#ccc');
        scaleText.textContent = `Масштаб: ${Math.round(this.scale * 100)}%`;
        scaleRuler.appendChild(scaleText);
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
            storage.setItem('workZoneScale', this.scale);
            storage.setItem('workZonePanX', this.panX);
            storage.setItem('workZonePanY', this.panY);
        } catch (e) {
            console.warn('Не удалось сохранить данные');
        }
    }


    loadWorkZonePolygons() {
        const storage = typeof localStorage !== 'undefined' ? localStorage : {
            data: {},
            setItem(key, value) { this.data[key] = value; },
            getItem(key) { return this.data[key] = value; }
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
        polygon.setAttribute('fill', 'rgba(255, 0, 0, 0.7)');
        polygon.setAttribute('stroke', '#ff0000');
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

if (!customElements.get('work-zone')) {
    customElements.define('work-zone', WorkZone);
}