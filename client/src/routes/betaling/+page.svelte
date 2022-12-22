<script lang="ts">
	import { onMount } from "svelte";
    import Loader from "../../components/loader.svelte";
    import { CheckCircleIcon, AlertCircleIcon } from 'svelte-feather-icons'
	import axios from "../../axios/index";
    
    let stripe: any
    let loading: boolean = true
    let success: boolean | null = null

    onMount(async () =>{
        stripe =  Stripe('pk_test_51IDYoBCCbk95O9pLpLYr0Jk8D3AsZrFWYXITe0780vmYYfriP5LHJt5aXtuNG4n4huM17F7ptFvibeMEh5AhjEOD00CSY8HOR1')

        const url = new URL(window.location)
        const params = new URLSearchParams(url.search)

        const clientSecret = params.get('payment_intent_client_secret')
        if(clientSecret !== null){
            const { paymentIntent } = await stripe.retrievePaymentIntent(clientSecret)
            loading = false

            if(paymentIntent.status === 'succeeded'){
                success = true

                if(params.get('email') !== null){
                    const accountResponse = await axios.post('auth/signup', { email: params.get('email'), stripeClientSecret: clientSecret })

                    if(accountResponse.data){

                    }
                }
            }   
        }
    })
</script>

<div class="main payment-return-page">
    {#if loading }
        <Loader size={60} />
    {:else}
        {#if success }
            <div class="status-icon">
                <CheckCircleIcon size="100"/>
            </div>
            <p class="payment-return-page__title">Bedankt voor je aankoop!</p>
            <p class="payment-return-page__description">We hebben een mail naar je gestuurd met een login link. Deze blifjt altijd geldig</p>
        {:else}
            <div class="status-icon">
                <AlertCircleIcon size="90"/>
            </div>
            <p class="payment-return-page__title">Oepss.. er is iets misgegaan tijdens het betalen</p>
        {/if}
    {/if}
</div>

<style lang="scss">
    .payment-return-page{
        display: flex;
        justify-content: center;
        align-items: center;
        flex-direction: column;
        padding: 50px 30px;

        p{
            color: white;
            text-align: center;
        }

        &__title{
            font-size: 34px;
            font-weight: 500;
            margin-bottom: 50px;
        }

        &__description{
            font-size: 22px;
            font-weight: 300;
            margin-bottom: 100px;
        }
    }

    :global {
        .status-icon{
            margin-bottom: 35px;

            svg{
                stroke: $gold;
            }
        }
    }
</style>
