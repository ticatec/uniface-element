<script lang="ts">

    import type {ButtonActions} from "$lib/action-bar/ButtonAction";
    import ActionBar from "$lib/action-bar";
    import Button from "$lib/button";
    import Separator from "$lib/separator";


    let n: number = 0;

    const handleButtonClick = () => {
        n = n + 1;
    }

    let buttons: ButtonActions = [
        {
            label: "Save", type: "primary", handler:handleButtonClick
        },
        {
            label: "Commit", type: "primary", handler: handleButtonClick
        },
        null,
        {
            label: "Export", type: "forth", icon: "icon_google_file_download", handler:handleButtonClick
        },
        {
            label: "Import", type: "forth", icon: "icon_google_file_upload", handler: handleButtonClick
        },
        null,
        {
            label: "Close", type: "secondary", handler: handleButtonClick
        },
        {
            label: "Disabled", type: "secondary", disabled: true, handler: handleButtonClick
        }
    ]


</script>


<div style="width: 100%; height: 100%; padding: 15px; box-sizing: border-box; overflow: auto">
    <div style="padding-top: 30px; background-color: #FFFFFF;">
        <div class="example-description">
            <h1>Build action bar with button arrays.</h1>
            <div>
                <span>Clicked: {n}</span>
            </div>
        </div>
        <ActionBar style="margin-top: 20px" buttons={buttons}>
        </ActionBar>
    </div>

    <div style="padding-top: 30px; background-color: #FFFFFF;">
        <div class="example-description">
            <h1>Using slot show buttons</h1>
            <div>
                <span>Clicked: {n}</span>
            </div>
        </div>
        <ActionBar style="margin-top: 20px">
            <Button label="default" icon="icon_google_zoom_in" type="default" onClick={handleButtonClick}></Button>
            <Button label="primary" icon="icon_google_zoom_out" type="primary" onClick={handleButtonClick}></Button>
            <Button label="secondary" icon="icon_google_delete_outline" type="secondary" onClick={handleButtonClick}></Button>
            <Separator height="28px"/>
            <Button label="导出" icon="icon_google_file_download" type="third" onClick={handleButtonClick}></Button>
            <Button label="导入" icon="icon_google_file_upload" type="forth" onClick={handleButtonClick}></Button>
            <Button label="disabled" icon="icon_google_file_upload" type="primary" disabled onClick={handleButtonClick}></Button>
        </ActionBar>
    </div>
</div>