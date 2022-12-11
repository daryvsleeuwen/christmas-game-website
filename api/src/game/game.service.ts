import { Injectable } from '@nestjs/common';
import { AuthService } from 'src/auth/auth.service';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class GameService {
  gameRules = [];
  diceInstructions = [];

  constructor(private prisma: PrismaService, private auth: AuthService) {
    this.gameRules = [
      "Gooi nog een keer. Na jouw beurt draait de speelrichting", 
      "Laat de persoon met de meeste cadeaus er 1 geven aan die met de minste cadeaus", 
      "Kies een cadeau uit van je eigen stapel. Deze gaat uit het spel en mag je altijd behouden", 
      "Als iemand iets van je pakt kun je dat met deze kaart teniet doen (1x). Beurt van ander is dan voorbij",
      ".... Moet 1 cadeau aan jou geven",
      "Laat 1 cadeau bij je pakken door iedereen die in April jarig is", 
      "Laat 1 cadeau bij je pakken door iedereen die in Juli jarig is", 
      "Neem 1 cadeau weg bij de tweede vrouw rechts van je", 
      "Neem 1 cadeau weg bij de tweede man rechts van je",
      "Je krijgt 1 cadeau van de tweede man rechts van je",
      "Laat iedereen 1 cadeau uitzoeken bij de persoon rechts van hem. (Dat cadeau mag een ander niet kiezen)", 
      "Pak het kleinste cadeau dat bij iemand ligt", 
      "Pak het grootste cadeau dat bij iemand ligt", 
      "Pak 1 cadeau bij iemand die meer dan 6 cadeaus heeft liggen",
      "Wissel alle cadeaus met de persoon links van je",
      "Wissel alle cadeaus met de persoon rechts van je",
      "Laat 1 cadeau van eigenaar wisselen. Jij krijgt zelf niets en hoeft niets te geven", 
      "Pak het cadeau dat het laatste van je is afgenomen terug. Maakt niet uit wie het nu heeft", 
      "Laat 2 cadeaus van verschillende personen van eigenaar wisselen. Jij krijgt zelf niets en hoeft niets te geven. Ruilen hoeft ook niet!", 
      "Pak 1 cadeau bij iemand die meer dan 6 cadeaus heeft liggen",
      "Geef het grootste cadeau dat je hebt aan de persoon rechts van je",
      "Geef het zwaarste cadeau dat je hebt aan de persoon rechts van je",
      "Kies 1 cadeau uit van je eigen stapel. Deze gaat uit het spel en mag je altijd behouden", 
      "Als iemand iets van je pakt kun je dat met deze kaart teniet doen (1x). Beurt van de ander is dan voorbij", 
      "Zoek het cadeau met de meeste kleur ROOD erin. Pak het voor bij je eigen cadeaus. Cadeaupapier telt mee!", 
      "Zoek het cadeau met de meeste kleur GROEN erin. Pak het voor bij je eigen cadeaus. Cadeaupapier telt mee!",
      "Degene die na jou aan de beurt is, pakt een kaartje. Hij hoeft deze ronde niet te dobbelen",
      "Heb je meer dan 2 cadeaus? Houd er 2 en geef de rest aan de persoon met de minste cadeaus",
      "Laat de persoon met de meeste cadeaus er 1 geven aan die met de minste cadeaus", 
      "Laat twee personen (Niet jijzelf) 1 cadeau met elkaar wisselen. Ze bepalen zelf wat", 
      "Iedereen pakt een cadeau van zijn stapel en geeft dan door naar links", 
      "Ruil al je cadeaus met de persoon die de meeste cadeaus heeft. Zelf tel je niet mee en bij een gelijk aantal bepaal je zelf met wie je ruilt",
      "Geef een willekeurig cadeau van je linkerbuurman aan een ander persoon. (Niet aan jezelf)",
      "Laat een willekeurig persoon van je linkerbuurman een cadeau pakken"
    ],

    this.diceInstructions = [
      'Pak het grootste cadeau dat bij iemand ligt',
      'Geen opdracht! Ga verder met het spel',
      'Je mag een cadeau van je eigen stapel uitpakken!',
      'Geen opdracht! Ga verder met het spel',
      'Geen opdracht! Ga verder met het spel',
      'Geef het grootste cadeau dat je hebt aan de persoon rechts van je',
    ];
  }

  async getGameRules() {
    return {gameRules: this.gameRules, diceInstructions: this.diceInstructions};
  }

  async hasAlreadyPlayed(clientIp: string) {
    const session = await this.prisma.gameSession.findUnique({
      where: {
        clientIp: clientIp,
      },
    });

    if (session) return true;
    return false;
  }

  async createNewGame(clientIp: string, accessToken: string) {
    if(accessToken){
      const isAuth = await this.auth.isAuth(accessToken)

      if(isAuth){
        return await this.prisma.gameSession.create({
          data: {
            clientIp: clientIp,
          },
        });
      }
    }

    const hasAlreadyPlayed = await this.hasAlreadyPlayed(clientIp);

    if (hasAlreadyPlayed) {
      return {
        error:
          'Je hebt op dit netwerk je gratis ronde al gespeeld. Upgrade naar premium om zoveel rondes te spelen als je wilt',
        alreadyPlayed: true,
      };
    }

    return await this.prisma.gameSession.create({
      data: {
        clientIp: clientIp,
      },
    });
  }
}
