<script lang="ts">

    import ProgressBar, {ProgressStatus} from "$lib/progress-bar";
    import DemoBlock from "../../DemoBlock.svelte";
    import Button from "$lib/button";
    import {onMount, tick} from "svelte";
    import utils from "$lib/common/utils";

    let progress = 2;
    let status: ProgressStatus = ProgressStatus.progressing;


    onMount(() => {
        reset();
    })

    const reset = async () => {
        progress = 0;
        status = ProgressStatus.progressing;
        await utils.sleep(1)
        let interval = setInterval(() => {
            progress++;
            if (Math.random() < 0.01) {
                status = ProgressStatus.canceled;
                clearInterval(interval);
            }
            if (progress > 99) {
                clearInterval(interval);
            }
            if (progress == 100) {
                status = ProgressStatus.successful;
                clearInterval(interval)
            }
        }, 100);

    }
</script>

<div style="width: 100%; padding: 12px">
    <div class="demo-blocks">
        <DemoBlock style="grid-column: 1/3" title="进度条演示">
            <div style="margin: 0 auto; width: fit-content">
                <ProgressBar {progress} {status}></ProgressBar>
            </div>
        </DemoBlock>
        <DemoBlock style="grid-column: 3/6" title="进度条演示">
            <div>
                <ProgressBar type="liner" {progress} {status}></ProgressBar>
            </div>
        </DemoBlock>
        <DemoBlock style="grid-column: 6/7" title="控制刷新">
            <div style="padding: 12px">
                <Button type="primary" label="重置" disabled={status == ProgressStatus.progressing} onClick={reset}></Button>
            </div>
        </DemoBlock>
    </div>
</div>