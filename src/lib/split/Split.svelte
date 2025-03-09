<script lang="ts">

    export let direction: "horizontal" | "vertical" = "vertical";
    export let width: number = 2;
    export let bindingPanel: any = null;

    export let reverse: boolean = false;

    let fixed: boolean = true;

    let style: string;


    $: style = direction == "horizontal" ? `height: ${width}px` : `width: ${width}px`;

    let isDragging = false;

    const startDrag = (event: MouseEvent) => {
        if (!fixed) {
            isDragging = true;
            document.addEventListener("mousemove", onDrag);
            document.addEventListener("mouseup", stopDrag);
            document.body.style.cursor = direction == "horizontal" ? 'row-resize' : 'col-resize'
        } else {
            event.preventDefault();
            event.stopPropagation();
        }
    }

    const calculateHeight = (event: MouseEvent) => {
        reverse ? Math.max(5, bindingPanel.clientHeight - event.movementY) : Math.max(5, bindingPanel.clientHeight + event.movementY)
    }

    const calculateWidth = (event: MouseEvent) => {
        return reverse ? Math.max(5, bindingPanel.clientWidth - event.movementX) : Math.max(5, bindingPanel.clientWidth + event.movementX)
    }

    const onDrag = (event: MouseEvent) => {
        if (isDragging && bindingPanel) {
            if (direction === "horizontal") {
                bindingPanel.style.height = `${calculateHeight(event)}px`;
            } else {
                bindingPanel.style.width = `${calculateWidth(event)}px`;
            }
        }
    }

    const stopDrag = () => {
        isDragging = false;
        document.body.style.cursor = 'default';
        document.removeEventListener("mousemove", onDrag);
        document.removeEventListener("mouseup", stopDrag);
    }

    $:fixed = bindingPanel == null;
</script>

<div class="uniface-divider {direction}" class:fixed {style} aria-hidden="true" on:mousedown={startDrag}>

</div>
