<script lang="ts">

    import ProgressStepBar, {type ProgressStep, ProgressStepStatus} from "$lib/progress-step-bar";
    import Box from "$lib/box";
    import DemoBlock from "../../DemoBlock.svelte";


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

<div style="width: 100%; padding: 12px">
    <div class="demo-blocks">
        <DemoBlock style="grid-column: 1/7" title="步骤进度演示 - 横向">
            <Box style="border-radius: 6px; width: 100%;">
                <ProgressStepBar {steps} backgroundColor="#ffffff"/>
            </Box>
        </DemoBlock>
        <DemoBlock style="grid-column: 1/7" title="步骤进度演示 - 更改底色">
            <Box style="border-radius: 6px; width: 100%;">
                <ProgressStepBar {steps} backgroundColor="#f0f0f0"/>
            </Box>
        </DemoBlock>
        <DemoBlock style="grid-column: 1/2" title="步骤进度演示 - 纵向">
            <Box style="border-radius: 6px; height: 500px">
                <ProgressStepBar {steps} backgroundColor="#ffffff" direction="vertical"/>
            </Box>
        </DemoBlock>
    </div>
</div>