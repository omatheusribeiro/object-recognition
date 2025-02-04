export const drawRect = (detections, ctx) => {
    detections.forEach(element => {
        const [x, y, width, height] = element['bbox'];
        const text = element['class'];

        const color = 'green';
        ctx.strokeStyle = color;
        ctx.font = '18px Arial';
        ctx.fillStyle = color;

        ctx.beginPath();
        ctx.fillText(text, x, y);
        ctx.rect(x, y, width, height);
        ctx.stroke();
    });
}