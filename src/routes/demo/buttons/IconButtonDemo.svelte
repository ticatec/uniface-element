<script lang="ts">
    import {IconButton} from "$lib/button";
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
            <h1>Normal Icon Buttons</h1>
            <div>
                <span>Clicked: {n}</span>
            </div>
        </div>
        <ActionBar style="margin-top: 20px">
            <IconButton icon="icon_google_zoom_in" type="default" onClick={handleButtonClick}></IconButton>
            <IconButton icon="icon_google_zoom_out" type="primary" onClick={handleButtonClick}></IconButton>
            <IconButton icon="icon_google_delete_outline" type="secondary" onClick={handleButtonClick}></IconButton>
            <Separator height="28px"/>
            <IconButton icon="icon_google_file_download" type="third" onClick={handleButtonClick}></IconButton>
            <IconButton icon="icon_google_file_upload" type="forth" onClick={handleButtonClick}></IconButton>
            <IconButton icon="icon_google_file_upload" disabled type="forth" onClick={handleButtonClick}></IconButton>
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
            <IconButton size="big" icon="icon_google_zoom_in" type="default" onClick={handleButtonClick}></IconButton>
            <IconButton size="big" icon="icon_google_zoom_out" type="primary" onClick={handleButtonClick}></IconButton>
            <IconButton size="big" icon="icon_google_delete_outline" type="secondary" onClick={handleButtonClick}></IconButton>
            <Separator height="28px"/>
            <IconButton size="big" icon="icon_google_file_download" type="third" onClick={handleButtonClick}></IconButton>
            <IconButton size="big" icon="icon_google_file_upload" type="forth" onClick={handleButtonClick}></IconButton>
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
                <IconButton size="mini" icon="icon_google_zoom_in" type="default" onClick={handleButtonClick}></IconButton>
                <IconButton size="mini" icon="icon_google_zoom_out" type="primary" onClick={handleButtonClick}></IconButton>
                <IconButton size="mini" icon="icon_google_delete_outline" type="secondary" onClick={handleButtonClick}></IconButton>
                <Separator height="28px"/>
                <IconButton size="mini" icon="icon_google_file_download" type="third" onClick={handleButtonClick}></IconButton>
                <IconButton size="mini" icon="icon_google_file_upload" type="forth" onClick={handleButtonClick}></IconButton>
            </ActionBar>
        </div>
 <!--
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
        </div> -->
</div>