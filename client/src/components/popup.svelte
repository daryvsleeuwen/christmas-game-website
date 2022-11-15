<script>
   export let open = false
</script>

<div class="popup{open ? ' popup-fade-in' : ' popup-fade-out'}">
    <div class="popup__overlay"></div>
    {#if $$slots["content"]}
        <div class="popup__content{open ? ' popup-scale-in' : ' popup-scale-out'}">
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
        transform-origin: center center;
        animation: fade-in 400ms $easing forwards;
    }

    .popup-fade-out{
        pointer-events: none;
        transform-origin: center center;
        animation: fade-out 400ms $easing forwards;
    }

    .popup-scale-in{
        transform-origin: center center;
        animation: scale-in 400ms $easing forwards;
    }

    .popup-scale-out{
        pointer-events: none;
        transform-origin: center center;
        animation: scale-out 400ms $easing forwards;
    }

    .popup{
        position: absolute;
        left: 0;
        top: 0;
        z-index: 1000;
        width: 100vw;
        height: 100vh;
        display: flex;
        justify-content: center;
        align-items: center;

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
