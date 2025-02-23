<script lang="ts">

    export let direction: "horizontal" | "vertical" = "vertical";
    export let width: number = 2;
    export let bindingPanel: any = null;

    let fixed: boolean = true;

    let style: string;


    $: style = direction == "horizontal" ? `height: ${width}px` : `width: ${width}px`;

    let isDragging = false;

    const startDrag = (event: MouseEvent) => {
        if (!fixed) {
            isDragging = true;
            document.addEventListener("mousemove", onDrag);
            document.addEventListener("mouseup", stopDrag);
        } else {
            event.preventDefault();
            event.stopPropagation();
        }
    }

    const onDrag = (event: MouseEvent) => {
        if (isDragging && bindingPanel) {
            if (direction === "horizontal") {
                bindingPanel.style.height = `${Math.max(5, event.movementY + bindingPanel.clientHeight)}px`;
            } else {
                bindingPanel.style.width = `${Math.max(5, event.movementX + bindingPanel.clientWidth)}px`;
            }
        }
    }

    const stopDrag = () => {
        isDragging = false;
        document.removeEventListener("mousemove", onDrag);
        document.removeEventListener("mouseup", stopDrag);
    }

    $:fixed = bindingPanel == null;
</script>

<div class="uniface-divider {direction}" class:fixed {style} aria-hidden="true" on:mousedown={startDrag}>

</div>
