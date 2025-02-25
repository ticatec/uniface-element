<script lang="ts">

    import ProgressBar from "$lib/progress-bar";
    import {ProgressStatus} from "$lib/progress-bar/ProgressStatus";
    import Box from "$lib/box";

    let progress = 2;
    let status: ProgressStatus;

    let interval = setInterval(() => {
        progress++;
        if (Math.random() < 0.01) {
            status = ProgressStatus.canceled;
            clearInterval(interval);
        }
        if (progress > 99) {
            clearInterval(interval);
        }
    }, 100);

</script>

<div style="padding: 30px; width: 100%; height: 100%; box-sizing: border-box; overflow: auto">
    <div>进度条演示</div>

    <div style="margin-top: 8px">
        <ProgressBar {progress} {status}></ProgressBar>
    </div>

    <div style="margin-top: 8px">
        <ProgressBar type="liner" {progress} {status}></ProgressBar>
    </div>
</div>