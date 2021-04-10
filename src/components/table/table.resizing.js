import { $ } from '@core/dom';
export function resizeHandler(event, $root) {
    const resizeType = event.target.dataset.resize

    const $resizer = $(event.target)
    const $target = $resizer.closest('[data-resizeable]')
    const elBox = $target.getCoords()

    let resizeOptions = {}
    let resizedElements = []

    const sideProp = resizeType === 'col' ? 'bottom' : 'right'
    $resizer.css({ opacity: 1, [sideProp]: '-2000px' })

    if (resizeType === 'col') {
        resizedElements = $root.findAll(`[data-col = "${$target.data.col}"]`)
    } else {
        resizedElements.push($target)
    }

    document.onmousemove = (e) => {

        if (resizeType === 'col') {
            const dx = e.pageX - elBox.right
            const newWidth = elBox.width + dx

            $resizer.css({ right: -dx + 'px' })
            if (newWidth > 0) resizeOptions = { width: newWidth + 'px' }
        }
        else {
            const dy = e.pageY - elBox.bottom
            const newHeight = elBox.height + dy

            $resizer.css({ bottom: -dy + 'px' })
            if (newHeight > 0) resizeOptions = { height: newHeight + 'px' }
        }
    }

    document.onmouseup = () => {
        document.onmousemove = null
        document.onmouseup = null
        resizedElements.forEach(element => element.css(resizeOptions))

        resizedElements = []
        resizeOptions = {}

        $resizer.css({ opacity: 0, bottom: 0, right: 0 })

    }

}