<script lang="ts">
	import { onDestroy, onMount } from "svelte";
    import { millisecondsToTime } from "../utils/index";
    
    export let minutes: number;
    export let onFinish: () => void;

    let milliseconds: number = 0
    let startTime: number = Date.now()
    let currentTime: number = 0
    let timer: any = null

    onMount(() =>{
        milliseconds = minutes * 60 * 1000

        timer = setInterval(() =>{
            currentTime = milliseconds - (Date.now() - startTime);

            if(!(currentTime > 0)){
                clearInterval(timer)
                onFinish()
            }
        }, 1000)
    })

    onDestroy(() =>{
        clearInterval(timer)
    })
</script>

<div class="timer">
    <p>{millisecondsToTime(currentTime)}</p>
</div>

<style lang="scss">
    .timer{
        display: block;
        font-size: 24px;
        text-align: center;

        p{
            color: white;
            font-size: 38px;
        }
    }
</style>
