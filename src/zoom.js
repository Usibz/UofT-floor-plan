document.addEventListener('DOMContentLoaded', function() {
    const img = document.getElementById('floorplan');
    let zoomed = false;
    const areas = document.querySelectorAll('area');

    function calculatePolygonCentroid(coords) {
        let x = 0, y = 0, n = coords.length / 2;
        for (let i = 0; i < coords.length; i += 2) {
            x += coords[i];
            y += coords[i + 1];
        }
        return [x / n, y / n];
    }

    areas.forEach(area => {
        area.addEventListener('click', function(event) {
            event.preventDefault();
            const coords = area.coords.split(',').map(Number);
            let centerX, centerY;

            if (area.shape === 'rect') {
                centerX = (coords[0] + coords[2]) / 2;
                centerY = (coords[1] + coords[3]) / 2;
            } else if (area.shape === 'poly') {
                [centerX, centerY] = calculatePolygonCentroid(coords);
            }

            const rect = img.getBoundingClientRect();
            const offsetX = centerX / img.naturalWidth;
            const offsetY = centerY / img.naturalHeight;

            if (!zoomed) {
                img.style.transformOrigin = `${(offsetX) * 100}% ${(offsetY) * 100}%`;
                img.style.transform = 'scale(5)';
            } else {
                img.style.transformOrigin = 'center center';
                img.style.transform = 'scale(1)';
            }
            zoomed = !zoomed;
        });
    });

    img.addEventListener('click', function() {
        if (zoomed) {
            img.style.transformOrigin = 'center center';
            img.style.transform = 'scale(1)';
            zoomed = false;
        }
    });
});
