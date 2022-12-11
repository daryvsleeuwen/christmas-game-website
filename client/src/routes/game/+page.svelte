<script lang="ts">
    import AccountButton from "../../components/account-button.svelte";
    import Timer from "../../components/timer.svelte";
    import { ClockIcon } from 'svelte-feather-icons'
    import axios from "../../axios/index";
    
    export let data: {gameRules: string[], diceInstructions: string[], hasAlreadyPlayed: boolean }

    let init: boolean = false
    let displayTimer: boolean = true
    let currentDice: number = 0
    let randomRotation: number = 0
    let diceRollAnimationClass: string = ''
    let diceInstructionAnimationClass: string = ''
    let diceDisabled: boolean = false
    let diceInstruction: string = 'Klik op de dobbelsteen voor een willekeurige opdracht!'

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

    const sendGameToServer = () =>{

    }

    const finishGame = () =>{
        //check if current user is valid. Then display popup to play another round. 
        //Otherwise notify user to buy the premium subscription and that they otherwise cannot play a new round
    }
</script>

<div class="main game-page">
    <div class="d-flex align-items-center justify-content-between top-menu">
        <div class="toggle-timer-button" on:click={() => { displayTimer = !displayTimer }}>
            <ClockIcon size="24" class="toggle-timer-button__icon"/>
            <p>{displayTimer ? 'Verberg de tijd': 'Laat de tijd zien'}</p>
        </div>
        <AccountButton/>
    </div>
    <div class="flex-fill d-flex flex-column justify-content-between align-items-center">
        <div class="game-timer{displayTimer ? '': ' game-timer--hidden'}">
            <Timer minutes={30} onFinish={finishGame}/>
        </div>
        <p class="current-dice-instruction{diceInstructionAnimationClass}" on:animationend={(event) => {fadeDiceInstruction(event.animationName)}}>{diceInstruction}</p>
        <div class="w-100">
            <p class="roll-dice-title">Klik om te dobbelen</p>
            <div class="roll-dice-button" on:click={startDiceRollingAnimation}>
                <img class="roll-dice-icon{diceRollAnimationClass}" src="/images/dice-{currentDice + 1}.svg" style="transform: rotate({randomRotation}deg);" on:animationend={(event) => {rollDice(event.animationName)}}>
            </div>
        </div>
    </div>
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
            fill: white;
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
    }
</style>