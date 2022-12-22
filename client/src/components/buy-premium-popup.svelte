<script lang="ts">
	import axios from "../axios/index";
	import { onMount } from "svelte";
	import Popup from "./popup.svelte";
    import { buyPremiumCheckoutPopup } from '../stores/popup/index'
	import Button from "./button.svelte";
	import Input from "./input.svelte";

    let stripe: any
    let idealBankElement: HTMLElement 
    let ideal: any = null
    let email: string | null = null
    let paymentIsLoading: boolean = false

    onMount(() =>{
        stripe =  Stripe('pk_test_51IDYoBCCbk95O9pLpLYr0Jk8D3AsZrFWYXITe0780vmYYfriP5LHJt5aXtuNG4n4huM17F7ptFvibeMEh5AhjEOD00CSY8HOR1')

        const options = {
            style: {
                base: {
                    padding: '10px 12px',
                    color: '#32325d',
                    border: '2px solid #292929',
                    fontSize: '16px',
                    '::placeholder': {
                        color: '#aab7c4'
                    }
                }
            }
        }

        const elements = stripe.elements()
        ideal = elements.create('idealBank', options)
        ideal.mount(idealBankElement)
    })

    const createPaymentIntent = async () =>{
        if(!ideal) return
        paymentIsLoading = true
        const paymentResponse = await axios.post('payment/intent/new')

        if(paymentResponse.data){
            const {error} = await stripe.confirmIdealPayment(paymentResponse.data.clientSecret, {
                payment_method: {
                    ideal: ideal,
                    billing_details: {
                        name: email
                    },
                },
                return_url: `http://localhost:5173/betaling?email=${email}`,
             });
        }
    }

    const setEmail = (value: string) =>{
        email = value
    }
</script>

<div class="buy-premium-checkout-popup">
    <Popup openState={buyPremiumCheckoutPopup}>
        <div slot="content" class="premium-checkout__popup">
            <p class="premium-checkout-popup__title">Je hebt je gratis ronde al gespeeld</p>
            <p class="premium-checkout-popup__title">Betaal €2 en speel zoveel rondes als je wilt</p>
            <Input label="E-mailadres" error={email === '' ? 'Vul een geldig e-mailadres in' : null} placeholder="E-maildres" onChange={setEmail} />
            <p  class="select-ideal-bank-title">Selecteer je bank</p>
            <div class="ideal-bank-element">
                <div class="ideal-bank-element__stripe" bind:this={idealBankElement}></div>
            </div>
            <Button title="Betalen" type="primary" onClick={createPaymentIntent} loader={paymentIsLoading} margin={false} hoverEffect={false}>
                <div slot="side-slot" class="premium-slot"><p>€2</p></div>
            </Button>
        </div>
    </Popup>    
</div>

<style lang="scss">
    .premium-checkout-popup{    
        &__title{
                color: $black;
                font-size: 20px;
                font-weight: 500;
                margin-bottom: 30px;
        }
    }

    .select-ideal-bank-title{
        margin-top: 50px;
        margin-bottom: 15px;
        color: $black;
        font-size: 16px;
        font-weight: 500;
    }

    .ideal-bank-element{
        margin-bottom: 30px;
        border: 2px solid $black;
        border-radius: 6px;
    }

    .premium-slot{
            display: flex;
            justify-content: center;
            align-items: center;
            border-radius: $border-radius-md;
            background-color: white;
            width: 36px;

            p{
                margin: 0;
                color: $green !important;
            }
        }
</style>