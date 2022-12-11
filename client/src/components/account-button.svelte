<script lang="ts">
    import { UserIcon } from 'svelte-feather-icons'

    const openUserSettings = () =>{
        
    }
</script>

<div class="button account-action">
    <p>Account</p>
    <div class="account-action__button">
        <UserIcon size="24"/>
    </div>
</div>

<style lang="scss">
    .account-action{
        display: flex;
        align-items: center;
        
        p{
            margin-right: 15px;
            margin-bottom: 0;
            font-size: 16px;
            color: white;
        }

        &__button{
            display: flex;
            justify-content: center;
            align-items: center;
            width: 50px;
            height: 50px;
            border-radius: 100%;
            background-color: $red;
            cursor: pointer;

            svg{
                width: 50%;

                path, circle{
                    stroke: white;
                }
            }
        }
    }
</style>