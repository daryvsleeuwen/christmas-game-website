<script lang="ts">
    export let onClick: () => void;
    export let title: string;
    export let type: string = 'secondary'
    export let margin: boolean = true
    export let hoverEffect: boolean = true
</script>

<div class="button button--{type}{margin ? ' button--margin' : ''}{$$slots["side-slot"] ? ' button--has-children' : ''}{hoverEffect ? ' button--hover' : ''}" on:click={onClick}>
    <p>{title}</p>
    {#if $$slots["side-slot"]}
        <slot name="side-slot"/>
	{/if}
</div>

<style lang="scss" scoped>
    .button{
        display: flex;
        text-align: center;
        cursor: pointer;
        border-radius: $border-radius-md;
        padding: 6px;
        transition: transform 300ms $easing;

        p{
            color: white;
            font-weight: 500;
            font-size: 16px;
            padding: 6px 20px;
            margin: 0 auto;
            user-select: none;
        }

        &--primary{
            background-color: $red;
        }

        &--secondary{
            background-color: $gold;
        }

        &--margin{
            margin-bottom: 20px;
        }

        &--has-children{
            justify-content: space-between;

            p{
                margin: 0;
            }
        }

        &--hover{
            &:hover{
                transform: scale(1.05);
            }
        }
    }
</style>