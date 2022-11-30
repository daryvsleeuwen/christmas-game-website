<script lang="ts">
    export let openState: any
    let count: number = 0
    let fadeClass: string = ''
    let scaleClass: string = ''
    
    $: {
        count++

        if(count > 1){
            if($openState){
                fadeClass = ' popup-fade-in'
                scaleClass = ' popup-scale-in'
            }
            else{
                fadeClass = ' popup-fade-out'
                scaleClass = ' popup-scale-out'

            }
        }
    }
</script>

<div class="popup{fadeClass}">
    <div class="popup__overlay" on:click={() => { openState.set(false) }}></div>
    {#if $$slots["content"]}
        <div class="popup__content{scaleClass}">
            <slot name="content"/>
            <img src="/images/christmas-sock.svg" class="popup__decoration"/>
        </div>
	{/if}
</div>

<style lang="scss" scoped>
    @keyframes fade-in{
        0%{
            opacity: 0;
        }

        100%{
            opacity: 1;
        }
    }

    @keyframes fade-out{
        0%{
            opacity: 1;
        }

        100%{
            opacity: 0;
        }
    }

    @keyframes scale-in{
        0%{
            transform: scale(0.8);
        }

        100%{
            transform: scale(1);
        }
    }

    @keyframes scale-out{
        0%{
            transform: scale(1);

        }

        100%{
            transform: scale(0.8);
        }
    }

    .popup-fade-in{
        pointer-events: all !important;
        transform-origin: center center;
        animation: fade-in 400ms $easing forwards;
    }

    .popup-fade-out{
        transform-origin: center center;
        animation: fade-out 400ms $easing forwards;
    }

    .popup-scale-in{
        transform-origin: center center;
        animation: scale-in 400ms $easing forwards;
    }

    .popup-scale-out{
        transform-origin: center center;
        animation: scale-out 400ms $easing forwards;
    }

    .popup{
        opacity: 0;
        position: absolute;
        left: 0;
        top: 0;
        z-index: 1000;
        width: 100vw;
        height: 100vh;
        display: flex;
        justify-content: center;
        align-items: center;
        pointer-events: none;

        &__overlay{
            position: absolute;
            left: 0;
            top: 0;
            width: 100%;
            height: 100%;
            background-color: $black;
            opacity: 0.4;
        }

        &__content{
            transform: scale(0.8);
            position: relative;
            padding: 35px;
            background-color: white;
            border-radius: $border-radius-lg;
        }

        &__decoration{
            position: absolute;
            right: -80px;
            top: 0;
            transform: translate(-50%, -50%);
            width: 100px;
            height: auto;
        }
    }
</style>
