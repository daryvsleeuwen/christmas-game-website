<script lang="ts">
    export let size: number = 30
</script>

<div class="loader" style={`--size: ${size}px`}></div>

<style lang="scss">
    .loader {
        border: 7px solid #DFE0DD;
        border-top: 7px solid $gold;
        border-radius: 50%;
        width: var(--size);
        height: var(--size);
        animation: loading 1600ms linear infinite;

        @keyframes loading {
            0% {
                transform: rotate(0deg);
            }

            100% {
                transform: rotate(-360deg);
            }
        }
    }
</style>
