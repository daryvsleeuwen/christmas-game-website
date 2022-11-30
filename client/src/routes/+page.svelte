<script lang="ts">
    import Button from "../components/button.svelte";
    import Popup from "../components/popup.svelte";
    import { openState } from "../stores/popup-store";

    export let data: {gameRules: string[] }

    const startNewGame = () =>{

    }

    const openGameRulesPopup = () =>{
        openState.set(true)
    }

    const closeGameRulesPopup = () =>{
        openState.set(false)
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
    <Popup openState={openState}>
        <div slot="content" class="game-rules__popup">
            {#each data.gameRules as rule, index}
                <div class="d-flex align-items-center game-rules__row game-rules__row--{index}">
                    <img src="/images/dice-{index + 1}.svg">
                    <p>{rule}</p>
                </div>
            {/each}
            <Button title="Start het spel" type="primary" onClick={startNewGame} margin={true} hoverEffect={false}/>
            <Button title="Sluiten" type="secondary" onClick={closeGameRulesPopup} margin={false} hoverEffect={false}/>
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

        .premium-perk{
            color: white;
            font-size: 16px;
            font-weight: 300;
            text-align: center;
            margin-top: -10px;
            margin-bottom: 15px;
        }
    }

    .christmas-tree-decoration{
        position: absolute;
        width: 45vw;
        min-width: 450px;
        max-width: 700px;
        height: auto;
        left: -40px;
        bottom: -40px;
        pointer-events: none;

        @media (max-width: 700px){
            display: none;
        }
    }

    .game-rules{
        &__popup{
            width: 500px;
        }

        &__row{
            margin-bottom: 20px;

            &--5{
                margin-bottom: 40px;
            }

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
    }

    @media (max-width: 700px){
        
    }
</style>
