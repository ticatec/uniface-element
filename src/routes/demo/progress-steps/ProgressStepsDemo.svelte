<script lang="ts">

    import ProgressStepBar, {type ProgressStep, ProgressStepStatus} from "$lib/progress-step-bar";
    import Box from "$lib/box";


    let steps: Array<ProgressStep> = [
        {
            topic: '步骤1步骤1步骤1步骤1步骤1步骤1步骤1',
            comment: "这里是提示文字",
            status: ProgressStepStatus.Processing
        },
        {
            topic: '步骤2',
            comment: "这里是提示文字",
            status: ProgressStepStatus.Pending
        },
        {
            topic: '步骤3',
            comment: "这里是提示文字",
            status: ProgressStepStatus.Pending
        },
        {
            topic: '步骤4',
            comment: "这里是提示文字",
            status: ProgressStepStatus.Pending
        },
        {
            topic: '步骤5',
            comment: "这里是提示文字",
            status: ProgressStepStatus.Pending
        },
        {
            topic: '步骤6',
            comment: "这里是提示文字",
            status: ProgressStepStatus.Pending
        }
    ]

    let step = 0;
    let int1 = setInterval(() => {
        steps[step].status = ProgressStepStatus.Completed;
        step++;
        steps = [...steps];
        console.log(step, steps);
        if (step == steps.length) {
            clearInterval(int1);
        } else {
            steps[step].status = ProgressStepStatus.Processing;
        }
    }, 3000);

</script>

<div style="padding: 30px; width: 100%; height: 100%; box-sizing: border-box; overflow: auto">

    <div>执行步骤演示</div>

    <div style="margin-top: 8px">
        <Box style="border-radius: 6px; width: 100%;">
            <ProgressStepBar {steps} backgroundColor="#ffffff"/>
        </Box>
    </div>

    <div style="margin-top: 8px; height: 500px; width: 240px">
        <Box style="border-radius: 6px; height: 100%;">
            <ProgressStepBar {steps} backgroundColor="#ffffff" direction="vertical"/>
        </Box>

    </div>
</div>