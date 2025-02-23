<script lang="ts">
    import Portal from "svelte-portal";
    import type {ShowHint} from "$lib/common/ShowHint";
    import utils from "$lib/common/utils";

    let message = ''; // 提示信息ø
    let targetElement: Element | null = null;
    let hintVisible = false;
    let hintStyle = '';

    // 显示提示框函数
    export const show: ShowHint = async (element: Element, text: string, x: number, y: number) => {
        if (targetElement != null) {
            targetElement.removeEventListener('mouseout', hideHint);
        }
        targetElement = element;
        message = text;
        await utils.sleep(1);
        targetElement.addEventListener('mouseout', hideHint);
        calculatePosition(x, y);
        hintVisible = true;
    };

    // 计算提示框的位置
    const calculatePosition = (x: number, y: number) => {
        if (targetElement) {
            const rect = targetElement.getBoundingClientRect();
            hintStyle = `max-width: ${rect.width + 20}px; left: ${x + 10}px; top: ${y}px`;
        }
    }

    // 隐藏提示框
    const hideHint = () => {
        hintVisible = false;
        if (targetElement) {
            targetElement.removeEventListener('mouseout', hideHint);
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
