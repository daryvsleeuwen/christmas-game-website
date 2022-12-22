<script lang="ts">
	import { onMount } from "svelte";
    import Loader from "../../../components/loader.svelte";
    import Button from "../../../components/button.svelte";
    import type { PageData } from './$types';

    export let data: PageData
    let error: boolean  = data.error 

    onMount(() =>{
        if(!error){
            window.localStorage.setItem('accessToken', data.accessToken)
        }
    })

    const linkToHome = () =>{
        window.location = '/'
    }
</script>

<div class="main auto-login-page">
    {#if !error}
        <p class="login-title">Je bent nu ingelogd. Klik op de knop om naar de home pagina te gaan</p>
        <Button title="Naar de home pagina" type="secondary" onClick={linkToHome} margin={false} hoverEffect={false} />
    {:else}
        <p class="login-title">Dit is geen geldig account</p>
    {/if}
</div>

<style lang="scss">
    .auto-login-page{
        display: flex;
        justify-content: center;
        align-items: center;
        padding: 30px;
    }

    .login-title{
        font-size: 24px;
        font-weight: 500;
        margin-bottom: 40px;
        text-align: center;
        color: white;
    }
</style>
