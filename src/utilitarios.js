export const desenhoRect = (deteccoes, ctx) => {
    deteccoes.forEach(element => {
        const [x,y,width,height] = element['bbox'];
        const texto = element['class'];

        const cor = 'green'
        ctx.strokeStyle = cor
        ctx.font = '18px Arial'
        ctx.fillStyle = cor

        ctx.beginPath()
        ctx.fillText(texto, x, y)
        ctx.rect(x, y, width, height)
        ctx.stroke()
    });
}