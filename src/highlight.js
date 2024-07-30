// scripts.js

document.addEventListener('DOMContentLoaded', function () {
    const areas = document.querySelectorAll('area');

    areas.forEach(area => {
        area.addEventListener('mouseover', function () {
            createOverlay(area);
        });

        area.addEventListener('mouseout', function () {
            removeOverlay();
        });
    });

    function createOverlay(area) {
        const coords = area.coords.split(',').map(Number);
        const shape = area.shape;
        const room_class = area.classList;
        const overlay = document.createElement('div');
        overlay.classList.add('overlay');
        if (room_class.length != 0) {
            overlay.classList.add(room_class);
        }

        if (shape === 'rect') {
            const [x1, y1, x2, y2] = coords;
            overlay.style.left = `${x1}px`;
            overlay.style.top = `${y1}px`;
            overlay.style.width = `${x2 - x1}px`;
            overlay.style.height = `${y2 - y1}px`;
        } else if (shape === 'poly') {
            const points = [];
            for (let i = 0; i < coords.length; i += 2) {
                points.push(`${coords[i]}px ${coords[i + 1]}px`);
            }
            overlay.style.clipPath = `polygon(${points.join(',')})`;
            overlay.style.left = 0;
            overlay.style.top = 0;
            overlay.style.width = '100%';
            overlay.style.height = '100%';
        }

        document.querySelector('.floorplan-container').appendChild(overlay);
    }

    function removeOverlay() {
        const overlay = document.querySelector('.overlay');
        if (overlay) {
            overlay.remove();
        }
    }
});

