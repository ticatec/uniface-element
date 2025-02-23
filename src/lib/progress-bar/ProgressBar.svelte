<script lang="ts">

    import {ProgressStatus} from "./ProgressStatus";

    export let progress = 0; // 进度，范围 0-100
    export let size = 100; // 圆的大小
    export let type: "circular" | "liner" = "circular"; // "circular" 或 "linear"
    export let height: number = 5; // 仅直线模式使用
    export let showText = true; // 是否显示进度文本
    export let status: ProgressStatus = ProgressStatus.progressing;



    const radius = (size - height) / 2;
    const circumference = 2 * Math.PI * radius;
    $: offset = circumference * (1 - progress / 100);

    let strokeColor: string = "var(--uniface-progress-bar-color, #22BDFF)";

    const getCurrentColor = (value: ProgressStatus): string => {
        switch (value) {
            case ProgressStatus.successful:
                return 'var(--uniface-progress-bar-success-color, #2DC071)'
            case ProgressStatus.failure:
                return 'var(--uniface-progress-bar-failure-color, #FF685B)'
            case ProgressStatus.canceled:
                return 'var(--uniface-progress-bar-canceled-color, #FFC53)'
            default:
                return 'var(--uniface-progress-bar-color, #22BDFF)'
        }
    }

    $: strokeColor = getCurrentColor(status);



</script>

{#if type === "circular"}
    <svg width={size} height={size} viewBox="0 0 {size} {size}">
        <circle cx={size / 2} cy={size / 2} r={radius} fill="none" stroke="var(--uniface-progress-bar-bg, #E2E8F0)" stroke-width={height}/>
        <circle
                cx={size / 2} cy={size / 2} r={radius}
                fill="none" stroke={strokeColor} stroke-width={height}
                stroke-linecap="round"
                stroke-dasharray={circumference}
                stroke-dashoffset={offset}
                transform="rotate(-90 {size / 2} {size / 2})"
        />
        {#if showText}
            <text x="50%" y="50%" text-anchor="middle" dominant-baseline="middle"
                  font-size="{status === ProgressStatus.progressing ? '1em' : '2em'}"
                  fill={strokeColor}>
                {#if status == ProgressStatus.successful}
                    ✔
                {:else if status == ProgressStatus.failure}
                    &#x2715;
                {:else if status == ProgressStatus.canceled}
                    !
                {:else}
                    {progress}%
                {/if}
            </text>
        {/if}
    </svg>

{:else}
    <div class="uniface-progress-container {status}" >
        <div class="progress-bar" style="width: 100%; height: {height}px;">
            <div class="progress-fill" style="width: {progress}%"></div>
        </div>
        {#if showText}
            <span class="progress-text">
                {#if status == ProgressStatus.successful}
                    ✔
                {:else if status == ProgressStatus.failure}
                    &#x2715;
                {:else}
                    {progress}%
                {/if}
            </span>
        {/if}
    </div>
{/if}