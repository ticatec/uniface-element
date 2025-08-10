<script lang="ts">
    import {TextButton} from "$lib/button";
    import Separator from "$lib/separator";
    import ActionBar from "$lib/action-bar";

    let n: number = 0;

    const handleButtonClick = async () => {
        n = n + 1;
    }
</script>

<div style="width: 100%; height: 100%; padding: 15px; box-sizing: border-box; overflow: auto">
    <div style="padding-top: 30px; background-color: #FFFFFF;">
        <div class="example-description">
            <h1>Buttons variant types</h1>
            <div>
                <span>Clicked: {n}</span>
            </div>
        </div>
        <ActionBar style="margin-top: 20px">
            <TextButton label="default" type="default" onClick={handleButtonClick}></TextButton>
            <TextButton label="primary" type="primary" onClick={handleButtonClick}></TextButton>
            <TextButton label="secondary"type="secondary" onClick={handleButtonClick}></TextButton>
            <Separator height="28px"/>
            <TextButton label="导入" type="third" onClick={handleButtonClick}></TextButton>
            <TextButton label="导出" type="forth" onClick={handleButtonClick}></TextButton>
            <TextButton label="disabled" type="primary" disabled onClick={handleButtonClick}></TextButton>
        </ActionBar>
    </div>

    <div style="padding-top: 30px; background-color: #FFFFFF;">
        <div class="example-description">
            <h1>Big size Buttons</h1>
            <div>
                <span>Clicked: {n}</span>
            </div>
        </div>
        <ActionBar style="margin-top: 20px">
            <TextButton label="default" size="big" type="default" onClick={handleButtonClick}></TextButton>
            <TextButton label="Text Button" size="big" type="primary" onClick={handleButtonClick}></TextButton>
            <TextButton label="secondary"size="big" type="secondary" onClick={handleButtonClick}></TextButton>
            <Separator height="28px"/>
            <TextButton label="导入" size="big" type="third" onClick={handleButtonClick}></TextButton>
            <TextButton label="导出" size="big" type="forth" onClick={handleButtonClick}></TextButton>
        </ActionBar>
    </div>

    <div style="padding-top: 30px; background-color: #FFFFFF;">
        <div class="example-description">
            <h1>Mini size Buttons</h1>
            <div>
                <span>Clicked: {n}</span>
            </div>
        </div>
        <ActionBar style="margin-top: 20px">
            <TextButton label="default" size="mini" type="default" onClick={handleButtonClick}></TextButton>
            <TextButton label="primary" size="mini" type="primary" onClick={handleButtonClick}></TextButton>
            <TextButton label="secondary" size="mini"  type="secondary" onClick={handleButtonClick}></TextButton>
            <Separator height="22px"/>
            <TextButton label="导入" size="mini"  type="third" onClick={handleButtonClick}></TextButton>
            <TextButton label="导出" size="mini"  type="forth" onClick={handleButtonClick}></TextButton>
        </ActionBar>
    </div>

</div>