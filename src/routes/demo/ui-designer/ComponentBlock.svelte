<script lang="ts">

    import type VisComponent from "./VisComponent";

    export let component: VisComponent;

</script>

<div class="component-block">
    <img src={component.img}/>
    <div>
        <span>{component.text}</span>
    </div>
</div>

