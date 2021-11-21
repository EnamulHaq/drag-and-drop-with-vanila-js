var dragables = document.querySelectorAll('.dragable')
var containers = document.querySelectorAll('.container')

dragables.forEach(dragable => {
    dragable.addEventListener('dragstart', () => {
        dragable.classList.add('dragging')
    })

    dragable.addEventListener('dragend', () => {
        dragable.classList.remove('dragging')
    })

    containers.forEach(container => {
        container.addEventListener('dragover', e => {
            e.preventDefault()
            const afterElement = getDragAfterElement(container, e.clientY)
            const dragable = document.querySelector('.dragging')
            if (afterElement == null) {
                container.appendChild(dragable)
            } else {
                container.insertBefore(dragable, afterElement)
            }
        })
    })
})

function getDragAfterElement(container, y) {
    const dragableElements = [...container.querySelectorAll('.dragable:not(.dragging)')];

    return dragableElements.reduce((closest, child) => {
        const box = child.getBoundingClientRect()
        const offset = y - box.top - box.height / 2
        console.log(offset)
        if (offset < 0 && offset > closest.offset) {
            return { offset: offset, element: child }
        } else {
            return closest
        }
    }, { offset: Number.NEGATIVE_INFINITY }).element
}