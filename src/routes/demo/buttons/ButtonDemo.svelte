<script lang="ts">
    import Button from "$lib/button/Button.svelte";
    import Separator from "$lib/separator";
    import ActionBar from "$lib/action-bar";

    let n: number = 0;

    const handleButtonClick = () => {
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
            <Button label="default" type="default" onClick={handleButtonClick}></Button>
            <Button label="primary" type="primary" onClick={handleButtonClick}></Button>
            <Button label="secondary"type="secondary" onClick={handleButtonClick}></Button>
            <Separator height="28px"/>
            <Button label="导入" type="third" onClick={handleButtonClick}></Button>
            <Button label="导出" type="forth" onClick={handleButtonClick}></Button>
            <Button label="disabled" type="primary" disabled onClick={handleButtonClick}></Button>
        </ActionBar>
    </div>

    <div style="padding-top: 30px; background-color: #FFFFFF;">
        <div class="example-description">
            <h1>Buttons with icon</h1>
            <div>
                <span>Clicked: {n}</span>
            </div>
        </div>
        <ActionBar style="margin-top: 20px">
            <Button label="default" icon="icon_google_zoom_in" type="default" onClick={handleButtonClick}></Button>
            <Button label="primary" icon="icon_google_zoom_out" type="primary" onClick={handleButtonClick}></Button>
            <Button label="secondary"icon="icon_google_delete_outline" type="secondary" onClick={handleButtonClick}></Button>
            <Separator height="28px"/>
            <Button label="导入" icon="icon_google_file_download" type="third" onClick={handleButtonClick}></Button>
            <Button label="导出" icon="icon_google_file_upload" type="forth" onClick={handleButtonClick}></Button>
            <Button label="disabled" icon="icon_google_file_upload" type="primary" disabled onClick={handleButtonClick}></Button>
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
            <Button label="default" size="big" icon="icon_google_zoom_in" type="default" onClick={handleButtonClick}></Button>
            <Button label="primary" size="big" icon="icon_google_zoom_out" type="primary" onClick={handleButtonClick}></Button>
            <Button label="secondary"size="big" icon="icon_google_delete_outline" type="secondary" onClick={handleButtonClick}></Button>
            <Separator height="28px"/>
            <Button label="导入" size="big" icon="icon_google_file_download" type="third" onClick={handleButtonClick}></Button>
            <Button label="导出" size="big" icon="icon_google_file_upload" type="forth" onClick={handleButtonClick}></Button>
        </ActionBar>
    </div>

    <div style="padding-top: 30px; background-color: #FFFFFF;">
        <div class="example-description">
            <h1>mini size Buttons</h1>
            <div>
                <span>Clicked: {n}</span>
            </div>
        </div>
        <ActionBar style="margin-top: 20px">
            <Button label="default" size="mini" type="default" onClick={handleButtonClick}></Button>
            <Button label="primary" size="mini" type="primary" onClick={handleButtonClick}></Button>
            <Button label="secondary" size="mini"  type="secondary" onClick={handleButtonClick}></Button>
            <Separator height="28px"/>
            <Button label="导入" size="mini" icon="icon_google_file_download" type="third" onClick={handleButtonClick}></Button>
            <Button label="导出" size="mini" icon="icon_google_file_upload" type="forth" onClick={handleButtonClick}></Button>
        </ActionBar>
    </div>

    <div style="padding-top: 30px; background-color: #FFFFFF;">
        <div class="example-description">
            <h1>Round Buttons</h1>
            <div>
                <span>Clicked: {n}</span>
            </div>
        </div>
        <ActionBar style="margin-top: 20px">
            <Button label="default" variant="round" type="default" onClick={handleButtonClick}></Button>
            <Button label="primary" variant="round"  type="primary" onClick={handleButtonClick}></Button>
            <Button label="secondary" variant="round"  type="secondary" onClick={handleButtonClick}></Button>
            <Separator height="28px"/>
            <Button label="导入" variant="round" icon="icon_google_file_download" type="third" onClick={handleButtonClick}></Button>
            <Button label="导出" variant="round" icon="icon_google_file_upload" type="forth" onClick={handleButtonClick}></Button>
        </ActionBar>
    </div>



    <div style="padding-top: 30px; background-color: #FFFFFF;">
        <div class="example-description">
            <h1>Plain Buttons</h1>
            <div>
                <span>Clicked: {n}</span>
            </div>
        </div>
        <ActionBar style="margin-top: 20px">
            <Button label="default" variant="plain" type="default" onClick={handleButtonClick}></Button>
            <Button label="primary" variant="plain"  type="primary" onClick={handleButtonClick}></Button>
            <Button label="secondary" variant="plain"  type="secondary" onClick={handleButtonClick}></Button>
            <Separator height="28px"/>
            <Button label="导入" variant="plain" icon="icon_google_file_download" type="third" onClick={handleButtonClick}></Button>
            <Button label="导出" variant="plain" icon="icon_google_file_upload" type="forth" onClick={handleButtonClick}></Button>
        </ActionBar>
    </div>
</div>