<script lang="ts">
	import { onMount } from "svelte";
    import Button from "../components/button.svelte";
    import Popup from "../components/popup.svelte";
    import { gameRulesPopup, alreadyPlayedPopup } from "../stores/popup-store";

    export let data: {gameRules: string[], diceInstructions: string[], hasAlreadyPlayed: boolean }

    onMount(() =>{
        if(data.hasAlreadyPlayed){
            openAlreadyPlayedPopup()
        }
    })

    const startNewGame = () =>{
        if(data.hasAlreadyPlayed){
            closeGameRulesPopup()
            openAlreadyPlayedPopup()
        }
        else{
            window.location.href = '/game'
        }
    }

    const openGameRulesPopup = () =>{
        gameRulesPopup.set(true)
    }

    const closeGameRulesPopup = () =>{
        gameRulesPopup.set(false)
    }

    const openAlreadyPlayedPopup = () =>{
        alreadyPlayedPopup.set(true)
    }

    const closeAlreadyPlayedPopup= () =>{
        alreadyPlayedPopup.set(false)
    }

    const buyPremium = () =>{

    }
</script>

<div class="main home-page">
    <img src="/images/christmas-tree.svg" class="christmas-tree-decoration">
    <div class="container">
        <p class="intro-title">Welkom bij het leukste <b>Kerstspel</b></p>
        <p class="game-explanation">Hoe werkt het spel? Iedereen koopt van te voren <b>3</b> of <b>4</b> cadeautjes voor een vooraf bepaald bedrag. Tijdens het spel houdt iedereen altijd minimaal 1 cadeautje voor zich. Dus een opdracht gaat niet door als dat betekent dat je geen cadeau meer zou overhouden.</p>
        <div class="call-to-actions">
            <Button title="Start het spel" type="secondary" onClick={startNewGame} margin={true}/>
            <Button title="Wat zijn de spelregels?" type="secondary" onClick={openGameRulesPopup} margin={true}/>
            <Button title="Premium versie" type="primary" onClick={buyPremium} margin={true}>
                <div slot="side-slot" class="premium-slot"><p>€1</p></div>
            </Button>
            <p class="premium-perk">+ Onbeperkt aantal rondes</p>
            <p class="premium-perk">+ Eigen regels maken</p>
        </div>
    </div>
    <Popup openState={gameRulesPopup}>
        <div slot="content" class="game-rules__popup">
            {#each data.diceInstructions as instruction, index}
                <div class="d-flex align-items-center game-rules__row{index === data.diceInstructions.length - 1 ? ' mb-5' : ''}">
                    <img src="/images/dice-{index + 1}.svg">
                    <p>{instruction}</p>
                </div>
            {/each}
            <Button title="Start het spel" type="primary" onClick={startNewGame} margin={true} hoverEffect={false}/>
            <Button title="Sluiten" type="secondary" onClick={closeGameRulesPopup} margin={false} hoverEffect={false}/>
        </div>
    </Popup>


    <Popup openState={alreadyPlayedPopup}>
        <div slot="content" class="already-played__popup">
            <p class="already-played__title">Je hebt je gratis rondje op dit netwerk al gespeeld. Upgrade naar <b>Premium</b> om zoveel rondes te spelen als je wilt</p>
            <Button title="Premium versie" type="primary" onClick={buyPremium} margin={true} hoverEffect={false}>
                <div slot="side-slot" class="premium-slot"><p>€1</p></div>
            </Button>
            <Button title="Sluiten" type="secondary" onClick={closeAlreadyPlayedPopup} margin={false} hoverEffect={false}/>
        </div>
    </Popup>
</div>

<style lang="scss" scoped>
    .home-page{
        width: 100vw;
        height: 100vh;
        overflow: hidden;
        position: relative;

        .container{
            z-index: 1;
        }
    }

    .intro-title{
        font-size: 38px;
        color: white;
        font-weight: 500;
        text-align: center;
        margin: 80px auto 30px auto;

        b{
            font-weight: 600;
            color: $dark-green;
        }
    }

    .game-explanation{
        color: white;
        font-size: 16px;
        font-weight: 200;
        text-align: center;
        margin: 0 auto 60px auto;
        max-width: 700px;

        b{
            font-weight: 600;
            font-size: 20px;
            color: $gold;
        }
    }

    .call-to-actions{
        width: 230px;
        margin: 0 auto;

        .premium-perk{
            color: white;
            font-size: 16px;
            font-weight: 300;
            text-align: center;
            margin-top: -10px;
            margin-bottom: 15px;
        }
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
            color: $green;
        }
    }

    .christmas-tree-decoration{
        position: absolute;
        width: 500px;
        height: auto;
        left: -40px;
        bottom: -40px;
        pointer-events: none;

        @media (max-width: 700px){
            width: auto;
            height: 32vh;
            left: -10px;
            bottom: -10px;
        }
    }

    .game-rules{
        &__popup{
            max-width: 500px;
        }

        &__row{
            margin-bottom: 20px;

            img{
                width: 35px;
                height: 35px;
                margin-right: 20px;
            }

            p{
                font-size: 16px;
                flex: 1;
                margin: 0;
            }
        }

        @media (max-width: 700px){
            &__row{
                margin-bottom: 15px;

                img{
                    width: 30px;
                    height: 30px;
                }

                p{
                    font-size: 14px;
                }
            }        
        }
    }

    .already-played{
        &__popup{
            max-width: 400px;
        }

        &__title{
                font-size: 20px;
                font-weight: 500;
                margin-bottom: 30px;

                b{
                    font-weight: 600;
                    color: $red;
                }
            }
    }

    @media (max-width: 700px){
        .intro-title{
            font-size: 32px;
            margin-top: 40px;
        }

        .game-explanation{
            display: none;
        }
    }
</style>
