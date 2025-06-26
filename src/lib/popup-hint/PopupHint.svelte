<script lang="ts">
    import Portal from "svelte-portal";
    import utils from "$lib/common/utils";
    import {onMount} from "svelte";
    import {initialize, type ShowHint} from "$lib/popup-hint/IHint";

    let message = ''; // 提示信息ø
    let targetElement: Element | null = null;
    let hintVisible = false;
    let hintStyle = '';

    onMount(async () => {
        initialize(show);
    })

    // 显示提示框函数
    const show: ShowHint = async (element: Element, text: string, x: number, y: number) => {
        element.addEventListener('mouseleave', hideHint);
        message = text;
        calculatePosition(x, y);
        setTimeout(()=> {
            if (targetElement == element) {
                hintVisible = true;
            }
        }, 500);
        targetElement = element;
    };

    // 计算提示框的位置
    const calculatePosition = (x: number, y: number) => {
        hintStyle = `max-width: 50%; left: ${x + 6}px; top: ${y + 6}px`;
    }

    // 隐藏提示框
    const hideHint = () => {
        hintVisible = false;
        if (targetElement) {
            targetElement.removeEventListener('mouseleave', hideHint);
        }
        targetElement = null;
    };

</script>


<Portal target="body">
    {#if hintVisible}
        <div class="uniface-popup-hint" style={hintStyle}>
            <span>{message}</span>
        </div>
    {/if}
</Portal>
