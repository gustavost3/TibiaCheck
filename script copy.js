let bossName = "";
let creatureName = "";
let tibiaDrome = "- 🎰 TIBIA DROME: ultimo dia 29/05/2024 as 05:00";
document.addEventListener("DOMContentLoaded", function () {
  //Consultando boss boostado
  fetch("https://api.tibiadata.com/v4/boostablebosses")
    .then((response) => response.json())
    .then((data) => {
      const boostedBoss = data.boostable_bosses.boosted;
      const bossesListElement = document.getElementById("boss");
      bossesListElement.innerHTML = ""; // Limpa a lista antes de adicionar os novos elementos

      if (boostedBoss.featured) {
        // Verifica se o chefe boosted é 'featured'
        const bossElement = document.createElement("div");
        const boostableLabel = document.createElement("p");
        const bossImage = document.createElement("img"); // Criando a tag de imagem
        bossImage.src = boostedBoss.image_url; // Define o atributo src com a URL da imagem
        // bossImage.alt = boostedBoss.name; // Define o atributo alt com o nome do chefe

        const bossNameElement = document.createElement("p"); // Criando um elemento <p> para o nome do chefe
        bossNameElement.textContent = boostedBoss.name; // Definindo o texto do elemento <p>

        bossElement.appendChild(bossImage); // Adiciona a imagem ao elemento do chefe
        bossElement.appendChild(bossNameElement); // Adiciona o nome do chefe abaixo da imagem
        bossName = boostedBoss.name; //Salva o nome do boss boostado na variavel bossName
        bossesListElement.appendChild(bossElement);
      } else {
        bossesListElement.textContent =
          "Nenhum chefe boostado em destaque encontrado.";
      }
    })
    .catch((error) => {
      console.error("Erro ao buscar dados:", error);
    });

  //consultando criaturas boostadas
  fetch("https://api.tibiadata.com/v4/creatures")
    .then((response) => response.json())
    .then((data) => {
      const creaturesList = data.creatures.creature_list; // Acessa a lista de criaturas
      const creaturesListElement = document.getElementById("criatura");
      creaturesListElement.innerHTML = ""; // Limpa a lista antes de adicionar os novos elementos

      creaturesList.forEach((creature) => {
        if (creature.featured) {
          // Verifica se a criatura é 'featured'
          const creatureElement = document.createElement("div");
          const creatureImage = document.createElement("img"); // Criando a tag de imagem
          creatureImage.src = creature.image_url; // Define o atributo src com a URL da imagem
          // creatureImage.alt = ""; // Define uma descrição genérica para a imagem

          const creatureNameElement = document.createElement("p"); // Criando um elemento <p> para o nome da criatura
          creatureNameElement.textContent = `${creature.name}`; // Definindo o texto do elemento <p>
          creatureName = creature.name; //Salva o nome da criatura boostada na variavel creatureName

          creatureElement.appendChild(creatureImage); // Adiciona a imagem ao elemento da criatura
          creatureElement.appendChild(creatureNameElement); // Adiciona o nome da criatura abaixo da imagem
          creaturesListElement.appendChild(creatureElement);
        }
      });
    })
    .catch((error) => {
      console.error("Erro ao buscar dados das criaturas:", error);
    });
});

//Codigo para mostrar data
function obterDataAtual() {
  let data = new Date();
  let dia = String(data.getDate()).padStart(2, "0");
  let mes = String(data.getMonth() + 1).padStart(2, "0"); // +1 porque os meses são indexados de 0 a 11
  let ano = data.getFullYear();
  return dia + "/" + mes + "/" + ano;
}

// Código JavaScript para processar o texto inserido
function processarTextoGuia() {
  let texto1 = document.getElementById("inputText1").value;
  let textoOutputDiario = texto1 + "<br><br>";
  let outputDiario = document.getElementById("outputDiario");
  let outputFeatured = document.getElementById("outputFeatured"); //mostrar criaturas em destaque em div separada

  // Limpar o conteúdo anterior
  outputDiario.innerHTML = "";
  outputFeatured.innerHTML = "";
  // Obtendo a data atual no formato "dd/MM"
  let dataAtual = obterDataAtual();

  // Adicionando a primeira linha com a data atual
  outputDiario.innerHTML +=
    "<strong>Check diário</strong> - " + dataAtual + "<br><br>";
  outputFeatured.innerHTML +=
    "<strong>Check diário</strong> - " + dataAtual + "<br><br>";

  document
    .getElementById("copyButtonDiario")
    .addEventListener("click", function () {
      var outputDiv = document.getElementById("outputDiario");
      var textToCopy = outputDiv.innerText || outputDiv.textContent;

      // Criar um elemento de texto temporário para copiar o texto
      var tempTextArea = document.createElement("textarea");
      tempTextArea.value = textToCopy;

      // Adicionar o elemento temporário à página
      document.body.appendChild(tempTextArea);

      // Selecionar e copiar o texto
      tempTextArea.select();
      document.execCommand("copy");

      // Remover o elemento temporário
      document.body.removeChild(tempTextArea);

      alert("Conteúdo copiado!");
    });

  //Yasir
  if (
    textoOutputDiario.includes(
      "Oriental ships sighted! A trader for exotic creature products may currently be visiting Carlin, Ankrahmun or Liberty Bay."
    )
  ) {
    outputDiario.innerHTML +=
      "- 👳‍♂️ <strong>YASIR ESTÁ ONLINE!</strong>.<br><br>";
  }

  // Horestis
  if (
    textoOutputDiario.includes(
      "Horestis near Ankrahmun is slumbering in his tomb"
    )
  ) {
    outputDiario.innerHTML +=
      "- ⚱️ <strong>Ankrahmun - Horestis</strong> - JARROS - Respawn forte pleno - Bestiário.<br><br>";
  }
  if (
    textoOutputDiario.includes(
      "The great Pharaoh Horestis near Ankrahmun has risen from his slumber"
    )
  ) {
    outputDiario.innerHTML +=
      "- 🦂 <strong>Ankrahmun - Horestis</strong> - TODOS OS JARROS QUEBRADOS - Continua respawn forte pleno - Bestiários.<br><br>";
  }
  if (
    textoOutputDiario.includes(
      "Horestis's body has been desecrated. His curse now hangs over Ankrahmun like the shadow of the vulture and his tomb is almost empty"
    )
  ) {
    outputDiario.innerHTML +=
      "- 🦂 <strong>Ankrahmun - Horestis</strong> - Respawn fraco - Bestiário.<br><br>";
  }
  if (
    textoOutputDiario.includes(
      "Horestis's body has been desecrated. By now, his curse has ended though. His minions are recovering slowly"
    )
  ) {
    outputDiario.innerHTML +=
      "- 🦂 <strong>Ankrahmun - Horestis</strong> - Respawn forte reduzido - Bestiário.<br><br>";
  }

  // Twisted Waters
  if (textoOutputDiario.includes("The great lake near Port Hope is clean")) {
    outputDiario.innerHTML +=
      "- 💧 <strong>Port Hope - Shimmer Swimmers</strong> - O lago está limpo.<br><br>";
  }
  if (
    textoOutputDiario.includes(
      "Corpses are piling up in the great lake near Port Hope"
    )
  ) {
    outputDiario.innerHTML +=
      "- 💧 <strong>Port Hope - Shimmer Swimmers</strong> - O lago está prestes a sujar.<br><br>";
  }
  if (
    textoOutputDiario.includes(
      "The great lake near Port Hope is dirty. Shimmer swimmers can be seen under the surface"
    )
  ) {
    outputDiario.innerHTML +=
      "- 💧 <strong>Port Hope - Shimmer Swimmers</strong> - O lago está sujo e com peixes.<br><br>";
  }
  if (
    textoOutputDiario.includes(
      "The great lake near Port Hope is dirty. No shimmer swimmers have been seen under the surface for quite some time now"
    )
  ) {
    outputDiario.innerHTML +=
      "- 💧 <strong>Port Hope - Shimmer Swimmers</strong> -  Acabaram os peixes e o Lago ficará limpo no próximo SS.<br><br>";
  }

  // Deeplings
  if (
    textoOutputDiario.includes(
      "The creatures of the deep are currently hiding in the black waters beneath"
    )
  ) {
    outputDiario.innerHTML +=
      "- 🔱 <strong>Gray Island - Deepling</strong> - 01 - cristal e âncora.<br><br>";
  }
  if (
    textoOutputDiario.includes(
      "God-king Qjell seems to be pleased, the floodgates to the Drowned Library have opened"
    )
  ) {
    outputDiario.innerHTML +=
      "- 🔱 <strong>Gray Island - Deepling</strong> - 02 - dia de bater caixa.<br><br>";
  }
  if (
    textoOutputDiario.includes(
      "The inner arcanum of the deep has been breached."
    )
  ) {
    outputDiario.innerHTML +=
      "- 🔱 <strong>Gray Island - Deepling</strong> - 03 - dia de verificar boss.<br><br>";
  }

  // Hive
  if (
    textoOutputDiario.includes("The hive is well defended and prepared for war")
  ) {
    outputDiario.innerHTML +=
      "- 🐞 <strong>Gray Island - Hive</strong> - 01 - colméia está fechada.<br><br>";
  }
  if (textoOutputDiario.includes("The defences of the hive are breached")) {
    outputDiario.innerHTML +=
      "- 🐞 <strong>Gray Island - Hive</strong> - 02 - parte da colméia está aberta.<br><br>";
  }
  if (textoOutputDiario.includes("The hives defences have fallen")) {
    outputDiario.innerHTML +=
      "- 🐞 <strong>Gray Island - Hive</strong> - 03 - maioria do local acessível sem gastar Favour Points.<br><br>";
  }

  // Oramond
  if (textoOutputDiario.includes("The Fire-Feathered Serpent is fast asleep")) {
    outputDiario.innerHTML +=
      "- 🐍 <strong>Oramond</strong> - Área subaquática - 0000~1499 Seacrest Serpents mortas.<br><br>";
  }
  if (textoOutputDiario.includes("The Fire-Feathered Serpent dreams")) {
    outputDiario.innerHTML +=
      "- 🐍 <strong>Oramond</strong> - Área subaquática - 1500~2999 Seacrest Serpents mortas.<br><br>";
  }
  if (textoOutputDiario.includes("The Fire-Feathered Serpent is awake")) {
    outputDiario.innerHTML +=
      "- 🐍 <strong>Oramond</strong> - Área subaquática - 000~999 Renegade Quara mortos - se alguém fazer a quest e o servidor atingir 1k de morte, voltará pro início.<br><br>";
  }

  // Thornfire
  if (
    textoOutputDiario.includes(
      "Countless firestarters are in their cells below Shadowthorn"
    )
  ) {
    outputDiario.innerHTML +=
      "- 🔥 <strong>Venore - Shadowthorn</strong> - Elfos normais e talvez guardas vivos.<br><br>";
  }
  if (
    textoOutputDiario.includes(
      "Most guards and elves preventing the firestarters from breaking out have been slain"
    )
  ) {
    outputDiario.innerHTML +=
      "- 🔥 <strong>Venore - Shadowthorn</strong> - Vários elfos normais foram mortos - amanhã muda.<br><br>";
  }
  if (
    textoOutputDiario.includes(
      "Shadowthorn burns, and the followers of the bog with it!"
    )
  ) {
    outputDiario.innerHTML +=
      "- 🔥 <strong>Venore - Shadowthorn</strong> - a Vila está em chamas.<br><br>";
  }
  if (
    textoOutputDiario.includes(
      "Shadowthorn burns, but the Tibians have been successfully fighting the fire as well as the firefighters"
    )
  ) {
    outputDiario.innerHTML +=
      "- 🔥 <strong>Venore - Shadowthorn</strong> - A vila está em chamas mas voltará ao normal amanhã.<br><br>";
  }

  // Febre Venore
  if (
    textoOutputDiario.includes(
      "The swamp fever has broken out in Venore and feverish citizens are roaming the streets"
    )
  ) {
    outputDiario.innerHTML +=
      "- 💊 <strong>Venore - Febre</strong> - Raids a cada 30~90 min.<br><br>";
  }
  if (
    textoOutputDiario.includes(
      "The swamp fever in Venore is currently under control and there is enough medicine"
    )
  ) {
    outputDiario.innerHTML +=
      "- 💊 <strong>Venore - Febre</strong> - Tudo normal...<br><br>";
  }
  if (
    textoOutputDiario.includes(
      "The swamp fever in Venore is currently under control, but medicine is direly needed to prevent the next"
    )
  ) {
    outputDiario.innerHTML +=
      "- 💊 <strong>Venore - Febre</strong> - Npc pede medicine Pouch - impede raid.<br><br>";
  }

  // Steamship
  if (
    textoOutputDiario.includes(
      "The steamship from Thais to Kazordoon is currently not running"
    )
  ) {
    outputDiario.innerHTML +=
      "- 🛥️ <strong>Thais - Barco a vapor</strong> - Precisa de Carvão.<br><br>";
  }
  if (
    textoOutputDiario.includes(
      "The steamship from Thais to Kazordoon is currently runnin"
    )
  ) {
    outputDiario.innerHTML +=
      "- 🛥️ <strong>Thais - Barco a vapor</strong> - Rota ativa.<br><br>";
  }

  // Horses
  if (textoOutputDiario.includes("Horses are on the loose near Thais")) {
    outputDiario.innerHTML +=
      "- 🐎 <strong>Thais - Cavalos</strong> - Bestiario de todos os tipos - você pode domar o <strong>wild horse</strong> que nasce a cada 3 horas a partir do SS.<br><br>";
  }
  if (
    textoOutputDiario.includes(
      "The horse services near Thais and Venore are working"
    )
  ) {
    outputDiario.innerHTML +=
      "- 🐎 <strong>Thais - Cavalos</strong> - tudo normal.<br><br>";
  }

  // Master's Voice
  if (
    textoOutputDiario.includes(
      "The strange tower with the servants on Edron is covered in slime"
    )
  ) {
    outputDiario.innerHTML +=
      "- 🧫 <strong>Edron - Master's Voice</strong> - Dungeon com Slime.<br><br>";
  }

  // Demon War
  if (
    textoOutputDiario.includes("The demon war is in a stalemate once again")
  ) {
    outputDiario.innerHTML +=
      "- 👿 <strong>Edron - Demon War</strong> - empatado.<br><br>";
  }
  if (textoOutputDiario.includes("The Shaburak are in advantage right now")) {
    outputDiario.innerHTML +=
      "- 👿 <strong>Edron - Demon War</strong> - Shaburak (vermelho) lord - bestiário.<br><br>";
  }
  if (textoOutputDiario.includes("The Shaburak have summoned their leaders")) {
    outputDiario.innerHTML +=
      "- 👿 <strong>Edron - Demon War</strong> - Shaburak (vermelho) prince e lord - bestiário e achievement.<br><br>";
  }
  if (textoOutputDiario.includes("The Askarak are in advantage right now")) {
    outputDiario.innerHTML +=
      "- 👿 <strong>Edron - Demon War</strong> - Askarak (verde) lord - bestiário.<br><br>";
  }
  if (textoOutputDiario.includes("The Askarak have summoned their leaders")) {
    outputDiario.innerHTML +=
      "- 👿 <strong>Edron - Demon War</strong> - Askarak (verde) prince e lord - bestiário e achievement.<br><br>";
  }

  // Raging Mage
  if (textoOutputDiario.includes("The raging mage in Zao has been slain")) {
    outputDiario.innerHTML +=
      "- 🪄 <strong>Zao - Raging Mage</strong> - Portal Fechado - mataram os 2000 Yielothax - mataram o boss.<br><br>";
  }
  if (
    textoOutputDiario.includes(
      "The raging mage is currently in his tower in Zao"
    )
  ) {
    outputDiario.innerHTML +=
      "- 🪄 <strong>Zao - Raging Mage</strong> - PORTAL ABERTO - Yielothax/BOSS.<br><br>";
  }

  // White Deer
  if (
    textoOutputDiario.includes(
      "There are white deer roaming the region near Ab'Dendriel"
    )
  ) {
    outputDiario.innerHTML +=
      "- 🫎 <strong>Ab'dendriel - White Deer</strong> - ativo.<br><br>";
  }
  if (
    textoOutputDiario.includes(
      "The number of white deer near Ab'Dendriel seems to be dwindling"
    )
  ) {
    outputDiario.innerHTML +=
      "- 🫎 <strong>Ab'dendriel - White Deer</strong> - ativo mas população caindo.<br><br>";
  }
  if (
    textoOutputDiario.includes(
      "Starving wolves are roaming the region near Ab'Dendriel"
    )
  ) {
    outputDiario.innerHTML +=
      "- 🫎 <strong>Ab'dendriel - White Deer</strong> - Starving Wolf - entregar captured wolf.<br><br>";
  }

  //Awash
  if (
    textoOutputDiario.includes(
      "The mine tunnels under Kazordoon are currently flooded. Coal is needed to get the waterpumps running"
    )
  ) {
    outputDiario.innerHTML +=
      "- ⚒️ <strong>Kazordoon - Mina Pick 'N Shovel</strong> - mina inundada - usar carvão.<br><br>";
  }
  if (
    textoOutputDiario.includes(
      "The mine tunnels under Kazordoon are currently flooded, but enough coal has been delivered to keep the waterpumps running. The tunnels should be dry soon"
    )
  ) {
    outputDiario.innerHTML +=
      "- ⚒️ <strong>Kazordoon - Mina Pick 'N Shovel</strong> - Água drenada - precisa matar para evitar inundação.<br><br>";
  }
  if (
    textoOutputDiario.includes(
      "The water in the mine tunnels under Kazordoon is drained and enough deeplings have been killed today to ensure it remains that way"
    )
  ) {
    outputDiario.innerHTML +=
      "- ⚒️ <strong>Kazordoon - Mina Pick 'N Shovel</strong> - Água drenada - mataram o suficiente pra evitar inundação.<br><br>";
  }
  if (
    textoOutputDiario.includes(
      "Too many deeplings survived during the last five days, they will flood the tunnels and nothing can stop the"
    )
  ) {
    outputDiario.innerHTML +=
      "- ⚒️ <strong>Kazordoon - Mina Pick 'N Shovel</strong> - agua drenada - último dia.<br><br>";
  }

  //Quadro de avisos Adventurers Guild
  if (
    textoOutputDiario.includes(
      "Several banks in major coastal towns are being robbed! The thieves are still on the loose!"
    )
  ) {
    outputDiario.innerHTML +=
      "- 💰 <strong>Roubo ao banco</strong> - Ativo - seja rápido.<br><br>";
  }
  if (
    textoOutputDiario.includes(
      "Sharpen your sword! The witch Wyda seems to be bored so pay her a visit!"
    )
  ) {
    outputDiario.innerHTML +=
      "- 🧙 <strong>Venore - Pantano</strong> - Wyda está entediada - achievements Torn Treasures e Someone's Bored.<br><br>";
  }
  if (
    textoOutputDiario.includes(
      "In case you have some spare tentacle pieces, you can now use Devovorga's very essence to enter a boss lair!"
    )
  ) {
    outputDiario.innerHTML +=
      "- 🦑 <strong>Yalahar - Vengoth - Tentacle Pieces</strong> - boss - achievement dos bosses.<br><br>";
  }
  if (
    textoOutputDiario.includes(
      "The river south of the outlaw camp is flooding. A small island there should now be reachable safely."
    )
  ) {
    outputDiario.innerHTML +=
      "- 🏕️ <strong>Outlaw Camp</strong> - área sudoeste inundada - achievement <strong>Down the Drain</strong>.<br><br>";
  }
  if (
    textoOutputDiario.includes(
      "Nomads travel the eternal sands of Ankrahmun's desert. There must be a camp somewhere."
    )
  ) {
    outputDiario.innerHTML +=
      "- ⛺ <strong>Ankrahmun</strong> - Acampamento Nomad - bestiario e achievement <strong>Chest Robber</strong>.<br><br>";
  }
  if (
    textoOutputDiario.includes(
      "The volcano on Goroma sends its fiery message into the sky. A lot of creatures are flooding the lands together"
    )
  ) {
    outputDiario.innerHTML +=
      "- 🌋 <strong>Goroma - Vulcão ativo</strong> - bestiario e achievement Fire from the Earth.<br><br>";
  }
  if (
    textoOutputDiario.includes(
      "The full moon has a strange impact on the island of Grimvale. The small forest there seems darker, filled with nightly howls."
    )
  ) {
    outputDiario.innerHTML +=
      "- 🐺 <strong>Dias 12, 13 e 14</strong> - licantropia não desaparece sozinho, usem purple nightshade blossom. Licantropos irão dropar moonlight crystal nesses dias.<br><br>";
  }
  if (
    textoOutputDiario.includes(
      "A fiery fury gate has opened near one of the major cities somewhere in Tibia."
    )
  ) {
    outputDiario.innerHTML +=
      "- 🚪 <strong>Fury Gates</strong> - Ativo em algum lugar - montaria e boss.<br><br>";
  }
  if (
    textoOutputDiario.includes(
      "are ravaging the wildlife north of the Green Claw Swamp. But the animals seem to fight ba"
    )
  ) {
    outputDiario.innerHTML +=
      "- 🏹 <strong>Kazordoon</strong> - Caverna leste - <strong>hunters e poacher</strong>.<br><br>";
  }
  if (
    textoOutputDiario.includes(
      "The wild animals north of the Green Claw Swamp clearly dominate the area. But poachers come here to hunt them."
    )
  ) {
    outputDiario.innerHTML +=
      "- 🐻 <strong>Kazordoon</strong> - Caverna leste - <strong>boar e bear</strong>.<br><br>";
  }
  if (
    textoOutputDiario.includes(
      "Poachers have slaughtered nearly all wild animals north of the Green Claw Swamp. But vengeful spirits show up there now!"
    )
  ) {
    outputDiario.innerHTML +=
      "- 🐺 <strong>Kazordoon</strong> - Caverna leste - <strong>ghost wolf e gloom wolf</strong>.<br><br>";
  }
  if (
    textoOutputDiario.includes(
      "A hive infestation has been sighted south-west of Liberty Bay! An unnerving humming and buzzing is filling the air."
    )
  ) {
    outputDiario.innerHTML +=
      "- 🐞 <strong>Liberty Bay</strong> Mini colméia ativa no oeste - achievement Cartography 101.<br><br>";
  }
  if (
    textoOutputDiario.includes(
      "Hail to the King! It's Kingsday in Thais, join the celebration!"
    )
  ) {
    outputDiario.innerHTML +=
      "- 👑 <strong>Thais</strong> - dia do rei - achievement <strong>Loyal Subject</strong> e chance de bestiário - troll guard.<br><br>";
  }
  if (
    textoOutputDiario.includes(
      "Looks like the Queen's own royal trees are being cut down! The lumberjacks responsible shall be put to justice."
    )
  ) {
    outputDiario.innerHTML +=
      "- 🪓 <strong>Carlin</strong> - Lenhador Ativo - achievement Whistle-Blower ou npc (não pode os dois).<br><br>";
  }
  if (
    textoOutputDiario.includes(
      "A whole nest of spiders needs to be exterminated as Mamma Longlegs is on the loose."
    )
  ) {
    outputDiario.innerHTML +=
      "- 🕷️ <strong>Venore - Estrada oeste</strong> - boss giant spider e achievement <strong>Nestling</strong>.<br><br>";
  }
  if (
    textoOutputDiario.includes(
      "sandstorm travels through Darama, leading to isles full of deadly creatures inside a nightmare. Avoid the Ankrahmun tar"
    )
  ) {
    outputDiario.innerHTML +=
      "- 🏝️ <strong>Nightmare Isle</strong> - perto da <strong>Tumba do petróleo</strong>.<br><br>";
  }
  if (
    textoOutputDiario.includes(
      "A sandstorm travels through Darama, leading to isles full of deadly creatures inside a nightmare. Avoid the northernmost coast!"
    )
  ) {
    outputDiario.innerHTML +=
      "- 🏝️ <strong>Nightmare Isle</strong> - norte de <strong>Darashia</strong>.<br><br>";
  }
  if (
    textoOutputDiario.includes(
      "A sandstorm travels through Darama, leading to isles full of deadly creatures inside a nightmare. Avoid the river near Drefia!"
    )
  ) {
    outputDiario.innerHTML +=
      "- 🏝️ <strong>Nightmare Isle</strong> - perto de <strong>Drefia</strong>.<br><br>";
  }
  if (
    textoOutputDiario.includes(
      "Not again! Noodles has taken some royal freedom and left the castle, after him in the name of the king!"
    )
  ) {
    outputDiario.innerHTML +=
      "- 🐕 <strong>Thais</strong> - Cachorro Noodles fugiu - achievement <strong>Dog Sitter</strong> e recompensa.<br><br>";
  }
  if (
    textoOutputDiario.includes(
      "The river in Zao Steppe runs deep, there may be more fish than usual!"
    )
  ) {
    outputDiario.innerHTML +=
      "- 🏞️ <strong>Zao</strong> - Rio planice sul ativo - achievement <strong>Desert Fisher</strong>.<br><br>";
  }
  if (
    textoOutputDiario.includes(
      "Adventurers have told of a Spirit Gate in the Daramian mountains. Fight the restless undead!"
    )
  ) {
    outputDiario.innerHTML +=
      "- 👻 <strong>Spirit Ground</strong> - <strong>divisa Dara/Ank</strong>.<br><br>";
  }
  if (
    textoOutputDiario.includes(
      "Stampede! The Ape God has stirred up Tiquanda's elephants again!"
    )
  ) {
    outputDiario.innerHTML +=
      "- 🐘 <strong>Port Hope</strong> - <strong>Terrified elephant</strong> - bestiario - achievement <strong>Trail of the Ape God</strong>.<br><br>";
  }
  if (
    textoOutputDiario.includes(
      "Judging by the unnerved mammoths in Svargrond, enough snow has melted away to reveal some very special flora."
    )
  ) {
    outputDiario.innerHTML +=
      "- ❄️ <strong>Svargrond</strong> - Neve derretendo - <strong>flores</strong> - achievement <strong>Ice Harvester</strong>.<br><br>";
  }
  if (
    textoOutputDiario.includes(
      "A big iceberg has been washed up at the coast north of Port Hope. It seems to be inhabited by strange white furballs."
    )
  ) {
    outputDiario.innerHTML +=
      "- 🧊 <strong>Port Hope - Iceberg</strong> - chakoya e achievement Cartography 101.<br><br>";
  }
  if (
    textoOutputDiario.includes(
      "Strange sounds echo through Trapwood as hunters and dworcs fight over the holy grounds and the game that roams there."
    )
  ) {
    outputDiario.innerHTML +=
      "- 🏹 <strong>Port Hope</strong> - hunter OU voodoomaster na área norte da medusa tower - bestiario.<br><br>";
  }
  if (
    textoOutputDiario.includes(
      "Bibby Bloodbath and her crew are roaming the lands, destroying everything in their path."
    )
  ) {
    outputDiario.innerHTML +=
      "- 👹 <strong>Bibby Bloodbath</strong> - ativo - achievement <strong>Bibby's Bloodbath</strong>.<br><br>";
  }
  if (
    textoOutputDiario.includes(
      "Adventurers have told of a Spirit Gate in Vengoth. Fight the restless undead!"
    )
  ) {
    outputDiario.innerHTML +=
      "- 👻 <strong>Spirit Ground</strong> - <strong>Vengoth</strong>.<br><br>";
  }
  if (
    textoOutputDiario.includes(
      "Adventurers have told of a Spirit Gate in the Ghostlands. Fight the restless undead!"
    )
  ) {
    outputDiario.innerHTML +=
      "- 👻 <strong>Spirit Ground</strong> - <strong>Ghostland</strong>.<br><br>";
  }
  if (
    textoOutputDiario.includes(
      "An ice bridge now connects Svargrond to a frosty island, where monsters and a strange frozen creature"
    )
  ) {
    outputDiario.innerHTML +=
      "- 🧊 <strong>Chyllfroest</strong> Ativa.<br><br>";
  }
  //rashid
  outputFeatured.innerHTML +=
    "- <strong>👳‍♂️ Rashid está em " + rashid + ". <br><br> </strong>";
  //Criatudas em destaque
  outputFeatured.innerHTML +=
    "- <strong> 🧌 Criatura do dia</strong>: " + creatureName + ".<br><br>";
  outputFeatured.innerHTML +=
    "- <strong>👺 Boss do dia</strong>: " + bossName + ".<br><br>";
  //tibiaDrome
  outputFeatured.innerHTML += tibiaDrome + ".<br><br>";
}

function criaturasDestaque() {
  let criaturasDestaque = document.getElementById("outputFeatured");

  // Limpar o conteúdo anterior
  criaturasDestaque.innerHTML = "";
  // Obtendo a data atual no formato "dd/MM"
  let dataAtual = obterDataAtual();

  // Adicionando a primeira linha com a data atual
  criaturasDestaque.innerHTML +=
    "<strong>Check diário</strong> - " + dataAtual + "<br><br>";

  document
    .getElementById("copyButtonDestaque")
    .addEventListener("click", function () {
      var criaturaDestaqueDiv = document.getElementById("criaturasDestaque");
      var textToCopy =
        criaturaDestaqueDiv.innerText || criaturaDestaqueDiv.textContent;

      // Criar um elemento de texto temporário para copiar o texto
      var tempTextArea = document.createElement("textarea");
      tempTextArea.value = textToCopy;

      // Adicionar o elemento temporário à página
      document.body.appendChild(tempTextArea);

      // Selecionar e copiar o texto
      tempTextArea.select();
      document.execCommand("copy");

      // Remover o elemento temporário
      document.body.removeChild(tempTextArea);

      alert("Conteúdo copiado!");
    });
}
function checkOramond() {
  //Oramond ==================================================================================================================
  if (
    texto.includes(
      "The citizens of Rathleton voted for the shortcut back from the catacombs."
    )
  ) {
    output.innerHTML +=
      "- Oramond: Atalho para sair das catacombs de Demons.<br><br>";
  }
  if (texto.includes("The citizens of Rathleton voted for Lisa.")) {
    output.innerHTML += "- Boss Lisa ativo.<br><br>";
  }
  if (texto.includes("The citizens of Rathleton voted for the Glooth Fairy")) {
    output.innerHTML += "- Boss Glooth Fairy ativo.<br><br>";
  }
  if (texto.includes("citizens of Rathleton voted for Bullwa")) {
    output.innerHTML += "- Boss Bullwark ativo.<br><br>";
  }
  if (
    texto.includes(
      "The citizens of Rathleton voted for the mechanical creatures raids."
    )
  ) {
    output.innerHTML +=
      "- Maior chance de raid de Mechanical Creatures na glooth factory (Salão glooth bomb).<br><br>";
  }
  if (texto.includes("for the wild life creatures raid")) {
    output.innerHTML +=
      "- Maior chance da raid Wild Life na glooth factory (Salão do Tremor Worm).<br><br>";
  }
  if (
    texto.includes(
      "The citizens of Rathleton voted for the wrath of evil in the dungeon."
    )
  ) {
    output.innerHTML +=
      "- Wrath of Evil na Magistrate Dungeon (Rathleton Catacombs).<br><br>";
  }
  if (
    texto.includes(
      "The citizens of Rathleton voted for the golems in the dungeon."
    )
  ) {
    output.innerHTML +=
      "- Golens na Magistrate Dungeon (Rathleton Catacombs).<br><br>";
  }
  if (texto.includes("voted for the minotaurs in the dunge")) {
    output.innerHTML +=
      "- Minotaurs na Magistrate Dungeon (Rathleton Catacombs).<br><br>";
  }

  // Se nenhum caso corresponder, exiba uma mensagem padrão
  if (output.innerHTML === "") {
    output.innerHTML = "Nenhuma informação correspondente encontrada.";
  }
}
let rashid;
function obterNomeDoDiaDaSemana() {
  const data = new Date();
  const diaDaSemana = data.getDay(); // 0 é domingo, 1 é segunda-feira, etc.

  const nomesDosDias = [
    "Carlin",
    "Svargrond",
    "Liberty Bay",
    "Port Hope",
    "Ankrahmun",
    "Darashia",
    "Edron",
  ];
  const nomeDoDia = nomesDosDias[diaDaSemana];

  const elementoNomeDia = document.getElementById("nomeDoDiaDaSemana");
  elementoNomeDia.textContent = nomeDoDia;
  rashid = nomeDoDia;
}

window.addEventListener("DOMContentLoaded", obterNomeDoDiaDaSemana);
