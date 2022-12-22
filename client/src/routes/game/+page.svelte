<script lang="ts">
	import { onMount } from "svelte";
    import { user } from '../../stores/user';
    import { userSettingsPopup, switchRoundPopup, finishGamePopup, buyPremiumCheckoutPopup, alreadyPlayedPopup } from '../../stores/popup';
    import { isAuth } from "../../auth/index";
    import AccountButton from "../../components/account-button.svelte";
    import Timer from "../../components/timer.svelte";
    import Button from "../../components/button.svelte";
    import Input from "../../components/input.svelte";
    import BuyPremiumPopup from "../../components/buy-premium-popup.svelte";
    import { ClockIcon } from 'svelte-feather-icons'
	import Popup from "../../components/popup.svelte";
	import axios from "../../axios/index";
    
    export let data: {gameRules: string[], diceInstructions: string[], hasAlreadyPlayed: boolean }

    let init: boolean = false
    let hasAlreadyPlayed: boolean | null = null
    let displayTimer: boolean = true
    let currentDice: number = 0
    let currentRound: number = 1
    let amountOfDiceRolled: number = 0
    let randomRotation: number = 0
    let diceRollAnimationClass: string = ''
    let diceInstructionAnimationClass: string = ''
    let diceDisabled: boolean = false
    let diceInstruction: string = 'Klik op de dobbelsteen voor een willekeurige opdracht!'
    let timerRestarter: () => void;
    let userInit: boolean = false

    onMount(async () =>{
        const authUser = await isAuth()
        user.set(authUser)
        userInit = true

	    const hasAlreadyPlayedResponse = await axios.post('game/already-played')
        hasAlreadyPlayed = hasAlreadyPlayedResponse.data

        if(hasAlreadyPlayed && !$user){
            buyPremiumCheckoutPopup.set(true)            
        }
    })

    const rollDice = (animationName: string) =>{
        init = true

        if(animationName.includes('fade-out')){
            currentDice = Math.floor(Math.random() * (6 - 0) + 0);
            randomRotation = Math.floor(Math.random() * (360 - 0) - 180);  
            diceRollAnimationClass = ' fade-in'
        }

        if(animationName.includes('fade-in')){
            diceRollAnimationClass = ''
            diceDisabled = false
        }

        amountOfDiceRolled++

        if(amountOfDiceRolled === 5){
            saveGameSession()
        }
    }

    const fadeDiceInstruction = (animationName: string) => {
        if(animationName.includes('fade-scale-out')){
            setDiceInstruction()
            diceInstructionAnimationClass = ' fade-scale-in'
        }

        if(animationName.includes('fade-scale-in')){
            diceInstructionAnimationClass = ''
        }
    }

    const startDiceRollingAnimation = () =>{
        if(!diceDisabled){
            diceDisabled = true
            diceRollAnimationClass = ' fade-out'
            diceInstructionAnimationClass = ' fade-scale-out'
        }
    }

    const setDiceInstruction = () =>{
        if(currentDice === 0 || currentDice === 5){
            diceInstruction = data.gameRules[Math.floor(Math.random() * (data.gameRules.length - 0) + 0)]
        }

        else{
            diceInstruction = data.diceInstructions[currentDice]
        }
    }

    const saveGameSession = async () =>{
        const session = await axios.post('game/new', { accessToken: $user?.accessToken })
    }

    const switchRound = () =>{
        currentRound = 2

        if (typeof timerRestarter === 'function'){
            timerRestarter()
            switchRoundPopup.set(false)
        }
    }

    const finishGame = () =>{
        if($user){
            finishGamePopup.set(true)
        }
        else{
            buyPremiumCheckoutPopup.set(true)
        }

    }

    const playAgain = () =>{
        finishGamePopup.set(false)

        init = false
        displayTimer = true
        currentDice = 0
        currentRound = 1
        amountOfDiceRolled = 0
        randomRotation = 0
        diceRollAnimationClass = ''
        diceInstructionAnimationClass = ''
        diceDisabled = false
        diceInstruction = 'Klik op de dobbelsteen voor een willekeurige opdracht!'

        if (typeof timerRestarter === 'function'){
            timerRestarter()
            switchRoundPopup.set(false)
        }
    }

    const changeRoundDuration = (value: string) =>{
        if ($user === null) return
        
        const userCopy = {...$user}
        userCopy.gameSettings.roundDuration = Number(value)
        user.set(userCopy)
    }

    const saveUserSettings = async () =>{
        if ($user === null) return
        await axios.post('user/settings/update', { roundDuration: $user.gameSettings.roundDuration})
        closeUserSettingsPopup()
    }

    const closeUserSettingsPopup = () =>{
        userSettingsPopup.set(false)
    }
</script>

<div class="main game-page">
        {#if hasAlreadyPlayed !== null && !(hasAlreadyPlayed && !$user)}
            <div class="d-flex align-items-center justify-content-between top-menu">
                <div class="toggle-timer-button{$user ? '' : ' mx-auto'}" on:click={() => { displayTimer = !displayTimer }}>
                    <ClockIcon size="24" class="toggle-timer-button__icon"/>
                    <p>{displayTimer ? 'Verberg de tijd': 'Laat de tijd zien'}</p>
                </div>
                {#if $user !== null}
                    <AccountButton/>
                {/if}
            </div>
            <div class="flex-fill d-flex flex-column justify-content-between align-items-center">
                <div>
                    <p class="current-game-round">ronde {currentRound}</p>
                    {#if userInit }
                        <div class="game-timer{displayTimer ? '': ' game-timer--hidden'}">
                            <Timer minutes={$user === null ? 10 : $user.gameSettings.roundDuration} onFinish={() => {
                                if(currentRound === 1){
                                    switchRoundPopup.set(true)
                                }
                                else{
                                    finishGame()
                                }
                            }} getRestarter={(restarter) => { timerRestarter = restarter }}/>
                        </div>
                    {/if}
                </div>
                <p class="current-dice-instruction{diceInstructionAnimationClass}" on:animationend={(event) => {fadeDiceInstruction(event.animationName)}}>{diceInstruction}</p>
                <div class="w-100">
                    <p class="roll-dice-title">Klik om te dobbelen</p>
                    <div class="roll-dice-button" on:click={startDiceRollingAnimation}>
                        <img class="roll-dice-icon{diceRollAnimationClass}" src="/images/dice-{currentDice + 1}.svg" style="transform: rotate({randomRotation}deg);" on:animationend={(event) => {rollDice(event.animationName)}}>
                    </div>
                </div>
            </div>

            {#if $user !== null}
                <Popup openState={userSettingsPopup}>
                    <div slot="content" class="user-settings__popup">
                        <p class="user-settings__title">Game instellingen</p>
                        <Input value={$user !== null ? String($user.gameSettings.roundDuration) : ''} type="number" label="Hoelang moet een ronde duren?" placeholder="Minuten" onChange={changeRoundDuration} />
                        <Button title="Opslaan" type="primary" onClick={saveUserSettings} margin={true} hoverEffect={false}/>
                        <Button title="Sluiten" type="secondary" onClick={closeUserSettingsPopup} margin={false} hoverEffect={false}/>
                    </div>
                </Popup>
            {/if}

            <Popup openState={switchRoundPopup} closeOnOuterClick={false}>
                <div slot="content" class="switch-round__popup">
                    <p class="switch-round__title">De eerste ronde is voorbij. Klik op de knop om de tweede ronde te starten</p>
                    <Button title="Start ronde 2" type="secondary" onClick={switchRound} margin={false} hoverEffect={false}/>
                </div>
            </Popup>

            <Popup openState={finishGamePopup} closeOnOuterClick={false}>
                <div slot="content" class="finished-game__popup">
                    <p class="finished-game__title">Het spel is afgelopen! Klik op de knop om nog een keer te spelen</p>
                    <Button title="Start een nieuwe game" type="secondary" onClick={playAgain} margin={false} hoverEffect={false}/>
                </div>
            </Popup>
        {/if}
        <BuyPremiumPopup closeOnOuterClick={false}/>
</div>

<style lang="scss">
    .game-page{
        padding: 30px;

        p{
            color: white
        }

        .top-menu{
            margin-bottom: 30px;
        }

        :global {
            .toggle-timer-button{
                display: flex;
                align-items: center;
                text-align: center;
                cursor: pointer;
                border-radius: $border-radius-md;
                padding: 9px 14px;
                background-color: $red;
                transition: transform 300ms $easing;

                @media (max-width: 700px){
                    &:active{
                        transform: scale(0.95);
                    }
                }

                p{
                    color: white;
                    font-weight: 500;
                    font-size: 14px;
                    margin: 0 0 0 10px;
                    user-select: none;
                }

                &__icon{
                    width: 20px;
                    height: auto;

                    *{
                        stroke: white
                    }
                }
            }
        }

        .current-game-round{
            font-size: 22px;
            font-weight: 300;
            text-align: center;
            margin-bottom: 0;
        }

        .game-timer{
            transform: scale(1);
            opacity: 1;
            transition: all 300ms $easing;

            &--hidden{
                transform: scale(0.8);
                opacity: 0;
            }
        }

        .current-dice-instruction{
            font-size: 30px;
            text-align: center;
            width: 700px;
            max-width: 100%;
            margin-bottom: 60px;
            color: white;
            transition: all 600ms $easing;
        }

        .roll-dice-title{
            display: block;
            width: 100%;
            text-align: center;
            font-size: 16px;
            font-weight: 400;
        }

        .roll-dice-button{
            display: flex;
            justify-content: center;
            align-items: center;
            width: 350px;
            max-width: 100%;
            height: 120px;
            margin: 10px auto 0 auto;
            padding: 10px;
            border-radius: $border-radius-md;
            background-color: $gold;
            cursor: pointer;
            transition: transform 300ms $easing;

            @media (max-width: 700px){
                &:active{
                    transform: scale(0.90);
                }
            }
        }

        .roll-dice-icon{
            width: 60px;
            height: 60px;
            transform: rotate(0deg);
            transition: all 600ms $easing;
        }

        @keyframes fade-out {
            0%{
                opacity: 1;
            }

            100%{
                opacity: 0;
            }
        }

        @keyframes fade-in {
            0%{
                opacity: 0;
            }

            100%{
                opacity: 1;
            }
        }

        @keyframes fade-scale-out {
            0%{
                opacity: 1;
                transform: scale(1);
            }

            100%{
                opacity: 0;
                transform: scale(0.8);
            }
        }

        @keyframes fade-scale-in {
            0%{
                opacity: 0;
                transform: scale(0.8);
            }

            100%{
                opacity: 1;
                transform: scale(1);
            }
        }

        .fade-out{
            animation: fade-out 300ms $easing forwards;
        }

        .fade-in{
            animation: fade-in 300ms $easing forwards;
        }

        .fade-scale-out{
            animation: fade-scale-out 300ms $easing forwards;
        }

        .fade-scale-in{
            animation: fade-scale-in 300ms $easing forwards;
        }

        .user-settings, .switch-round, .finished-game, .buy-premium{
            &__popup{
                max-width: 500px;
            }

            &__title{
                color: $black;
                font-size: 20px;
                font-weight: 500;
                margin-bottom: 30px;
            }
        }
    }
</style>