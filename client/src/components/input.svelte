<script lang="ts">
    export let type: string = 'text'
    export let placeholder: string
    export let value: string = ''
    export let label: string
    export let onChange: (value: string) => void
    export let error: string | null = null
</script>

<div class="input__wrapper">
    <label class="label">{label}</label>
    <input type="{type}" value={value} class="input{error !== null ? ' input--error': ''}" placeholder={placeholder} on:input={(event) => { onChange(event.target.value) }}>
    {#if error !== null}
        <div class="input__error-message">{error}</div>
    {/if}
</div>

<style lang="scss">
    :global {
        .input__wrapper{
            width: 100%;
            margin-bottom: 30px;

            .label{
                display: block;
                font-size: 16px;
                font-weight: 500;
                margin-bottom: 10px;
            }

            .input{
                width: 100%;
                font-size: 16px;
                font-weight: 400;
                color: $black;
                padding: 12px 24px;
                border-radius: 6px;
                border: 2px solid $black;
                outline: none;
                
                &::placeholder{
                    opacity: 0.5
                }

                &--error{
                    border-color: $red;
                }

                &__error-message{
                    font-size: 14px;
                    color: $red;
                    font-weight: 500;
                    display: block;
                    margin-top: 10px;
                }
            }
        }
    }
</style>