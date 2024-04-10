let bossName = "";
let creatureName = "";
let tibiaDrome = "- 🎰 TIBIA DROME: ultimo dia 17/04/2024 as 05:00";
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
function processarTexto() {
  let texto1 = document.getElementById("inputText1").value;
  let texto2 = document.getElementById("inputText2").value;
  let texto3 = document.getElementById("inputText3").value;
  let texto = texto1 + "<br><br>" + texto2 + "<br><br>" + texto3; // Concatenando os três textos

  // Obtendo as referências das divs de saída
  let output1 = document.getElementById("output1");
  let output2 = document.getElementById("output2");
  let output3 = document.getElementById("output3");

  // Limpar o conteúdo anterior das divs de saída
  output1.innerHTML = "";
  output2.innerHTML = "";
  output3.innerHTML = "";

  // Obtendo a data atual no formato "dd/MM"
  let dataAtual = obterDataAtual();

  //check do ciclo de oramond
  var outputContent = getOutputContent();
  console.log(outputContent); // Irá exibir o conteúdo da div "output" no console

  // Adicionando a primeira linha com a data atual em cada div de saída
  output1.innerHTML +=
    "<strong>Check diário</strong> - " + dataAtual + "<br><br>";
  output2.innerHTML += "- <strong>" + outputContent + ".</strong><br><br>";
  output3.innerHTML +=
    "<strong>Check diário</strong> - " + dataAtual + "<br><br>";

  // Função para copiar o conteúdo de uma div especificada pelo ID
  function copyContent(divId) {
    var outputDiv = document.getElementById(divId);
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
  }

  // Selecionar os botões de cópia específicos para cada div
  document.getElementById("copyButton1").addEventListener("click", function () {
    copyContent("output1");
  });

  document.getElementById("copyButton2").addEventListener("click", function () {
    copyContent("output2");
  });

  document.getElementById("copyButton3").addEventListener("click", function () {
    copyContent("output3");
  });

  //Yasir
  if (
    texto.includes(
      "Oriental ships sighted! A trader for exotic creature products may currently be visiting Carlin, Ankrahmun or Liberty Bay."
    )
  ) {
    output1.innerHTML += "- 👳‍♂️ <strong>YASIR ESTÁ ONLINE!</strong>.<br><br>";
  }

  // Horestis
  if (texto.includes("Horestis near Ankrahmun is slumbering in his tomb")) {
    output1.innerHTML +=
      "- ⚱️ <strong>Ankrahmun - Horestis</strong> - JARROS - Respawn forte pleno - Bestiário.<br><br>";
  }
  if (
    texto.includes(
      "The great Pharaoh Horestis near Ankrahmun has risen from his slumber"
    )
  ) {
    output1.innerHTML +=
      "- 🦂 <strong>Ankrahmun - Horestis</strong> - TODOS OS JARROS QUEBRADOS - Continua respawn forte pleno - Bestiários.<br><br>";
  }
  if (
    texto.includes(
      "Horestis's body has been desecrated. His curse now hangs over Ankrahmun like the shadow of the vulture and his tomb is almost empty"
    )
  ) {
    output1.innerHTML +=
      "- 🦂 <strong>Ankrahmun - Horestis</strong> - Respawn fraco - Bestiário.<br><br>";
  }
  if (
    texto.includes(
      "Horestis's body has been desecrated. By now, his curse has ended though. His minions are recovering slowly"
    )
  ) {
    output1.innerHTML +=
      "- 🦂 <strong>Ankrahmun - Horestis</strong> - Respawn forte reduzido - Bestiário.<br><br>";
  }

  // Twisted Waters
  if (texto.includes("The great lake near Port Hope is clean")) {
    output1.innerHTML +=
      "- 💧 <strong>Port Hope - Shimmer Swimmers</strong> - O lago está limpo.<br><br>";
  }
  if (
    texto.includes("Corpses are piling up in the great lake near Port Hope")
  ) {
    output1.innerHTML +=
      "- 💧 <strong>Port Hope - Shimmer Swimmers</strong> - O lago está prestes a sujar.<br><br>";
  }
  if (
    texto.includes(
      "The great lake near Port Hope is dirty. Shimmer swimmers can be seen under the surface"
    )
  ) {
    output1.innerHTML +=
      "- 💧 <strong>Port Hope - Shimmer Swimmers</strong> - O lago está sujo e com peixes.<br><br>";
  }
  if (
    texto.includes(
      "The great lake near Port Hope is dirty. No shimmer swimmers have been seen under the surface for quite some time now"
    )
  ) {
    output1.innerHTML +=
      "- 💧 <strong>Port Hope - Shimmer Swimmers</strong> -  Acabaram os peixes e o Lago ficará limpo no próximo SS.<br><br>";
  }

  // Deeplings
  if (
    texto.includes(
      "The creatures of the deep are currently hiding in the black waters beneath"
    )
  ) {
    output1.innerHTML +=
      "- 🔱 <strong>Gray Island - Deepling</strong> - 01 - cristal e âncora.<br><br>";
  }
  if (
    texto.includes(
      "God-king Qjell seems to be pleased, the floodgates to the Drowned Library have opened"
    )
  ) {
    output1.innerHTML +=
      "- 🔱 <strong>Gray Island - Deepling</strong> - 02 - dia de bater caixa.<br><br>";
  }
  if (texto.includes("The inner arcanum of the deep has been breached.")) {
    output1.innerHTML +=
      "- 🔱 <strong>Gray Island - Deepling</strong> - 03 - dia de verificar boss.<br><br>";
  }

  // Hive
  if (texto.includes("The hive is well defended and prepared for war")) {
    output1.innerHTML +=
      "- 🐞 <strong>Gray Island - Hive</strong> - 01 - colméia está fechada.<br><br>";
  }
  if (texto.includes("The defences of the hive are breached")) {
    output1.innerHTML +=
      "- 🐞 <strong>Gray Island - Hive</strong> - 02 - parte da colméia está aberta.<br><br>";
  }
  if (texto.includes("The hives defences have fallen")) {
    output1.innerHTML +=
      "- 🐞 <strong>Gray Island - Hive</strong> - 03 - maioria do local acessível sem gastar Favour Points.<br><br>";
  }

  // Oramond
  if (texto.includes("The Fire-Feathered Serpent is fast asleep")) {
    output1.innerHTML +=
      "- 🐍 <strong>Oramond</strong> - Área subaquática - 0000~1499 Seacrest Serpents mortas.<br><br>";
  }
  if (texto.includes("The Fire-Feathered Serpent dreams")) {
    output1.innerHTML +=
      "- 🐍 <strong>Oramond</strong> - Área subaquática - 1500~2999 Seacrest Serpents mortas.<br><br>";
  }
  if (texto.includes("The Fire-Feathered Serpent is awake")) {
    output1.innerHTML +=
      "- 🐍 <strong>Oramond</strong> - Área subaquática - 000~999 Renegade Quara mortos - se alguém fazer a quest e o servidor atingir 1k de morte, voltará pro início.<br><br>";
  }

  // Thornfire
  if (
    texto.includes(
      "Countless firestarters are in their cells below Shadowthorn"
    )
  ) {
    output1.innerHTML +=
      "- 🔥 <strong>Venore - Shadowthorn</strong> - Elfos normais e talvez guardas vivos.<br><br>";
  }
  if (
    texto.includes(
      "Most guards and elves preventing the firestarters from breaking out have been slain"
    )
  ) {
    output1.innerHTML +=
      "- 🔥 <strong>Venore - Shadowthorn</strong> - Vários elfos normais foram mortos - amanhã muda.<br><br>";
  }
  if (
    texto.includes("Shadowthorn burns, and the followers of the bog with it!")
  ) {
    output1.innerHTML +=
      "- 🔥 <strong>Venore - Shadowthorn</strong> - a Vila está em chamas.<br><br>";
  }
  if (
    texto.includes(
      "Shadowthorn burns, but the Tibians have been successfully fighting the fire as well as the firefighters"
    )
  ) {
    output1.innerHTML +=
      "- 🔥 <strong>Venore - Shadowthorn</strong> - A vila está em chamas mas voltará ao normal amanhã.<br><br>";
  }

  // Febre Venore
  if (
    texto.includes(
      "The swamp fever has broken out in Venore and feverish citizens are roaming the streets"
    )
  ) {
    output1.innerHTML +=
      "- 💊 <strong>Venore - Febre</strong> - Raids a cada 30~90 min.<br><br>";
  }
  if (
    texto.includes(
      "The swamp fever in Venore is currently under control and there is enough medicine"
    )
  ) {
    output1.innerHTML +=
      "- 💊 <strong>Venore - Febre</strong> - Tudo normal...<br><br>";
  }
  if (
    texto.includes(
      "The swamp fever in Venore is currently under control, but medicine is direly needed to prevent the next"
    )
  ) {
    output1.innerHTML +=
      "- 💊 <strong>Venore - Febre</strong> - Npc pede medicine Pouch - impede raid.<br><br>";
  }

  // Steamship
  if (
    texto.includes(
      "The steamship from Thais to Kazordoon is currently not running"
    )
  ) {
    output1.innerHTML +=
      "- 🛥️ <strong>Thais - Barco a vapor</strong> - Precisa de Carvão.<br><br>";
  }
  if (
    texto.includes("The steamship from Thais to Kazordoon is currently runnin")
  ) {
    output1.innerHTML +=
      "- 🛥️ <strong>Thais - Barco a vapor</strong> - Rota ativa.<br><br>";
  }

  // Horses
  if (texto.includes("Horses are on the loose near Thais")) {
    output1.innerHTML +=
      "- 🐎 <strong>Thais - Cavalos</strong> - Bestiario de todos os tipos - você pode domar o <strong>wild horse</strong> que nasce a cada 3 horas a partir do SS.<br><br>";
  }
  if (texto.includes("The horse services near Thais and Venore are working")) {
    output1.innerHTML +=
      "- 🐎 <strong>Thais - Cavalos</strong> - tudo normal.<br><br>";
  }

  // Master's Voice
  if (
    texto.includes(
      "The strange tower with the servants on Edron is covered in slime"
    )
  ) {
    output1.innerHTML +=
      "- 🧫 <strong>Edron - Master's Voice</strong> - Dungeon com Slime.<br><br>";
  }

  // Demon War
  if (texto.includes("The demon war is in a stalemate once again")) {
    output1.innerHTML +=
      "- 👿 <strong>Edron - Demon War</strong> - empatado.<br><br>";
  }
  if (texto.includes("The Shaburak are in advantage right now")) {
    output1.innerHTML +=
      "- 👿 <strong>Edron - Demon War</strong> - Shaburak (vermelho) lord - bestiário.<br><br>";
  }
  if (texto.includes("The Shaburak have summoned their leaders")) {
    output1.innerHTML +=
      "- 👿 <strong>Edron - Demon War</strong> - Shaburak (vermelho) prince e lord - bestiário e achievement.<br><br>";
  }
  if (texto.includes("The Askarak are in advantage right now")) {
    output1.innerHTML +=
      "- 👿 <strong>Edron - Demon War</strong> - Askarak (verde) lord - bestiário.<br><br>";
  }
  if (texto.includes("The Askarak have summoned their leaders")) {
    output1.innerHTML +=
      "- 👿 <strong>Edron - Demon War</strong> - Askarak (verde) prince e lord - bestiário e achievement.<br><br>";
  }

  // Raging Mage
  if (texto.includes("The raging mage in Zao has been slain")) {
    output1.innerHTML +=
      "- 🪄 <strong>Zao - Raging Mage</strong> - Portal Fechado - mataram os 2000 Yielothax - mataram o boss.<br><br>";
  }
  if (texto.includes("The raging mage is currently in his tower in Zao")) {
    output1.innerHTML +=
      "- 🪄 <strong>Zao - Raging Mage</strong> - PORTAL ABERTO - Yielothax/BOSS.<br><br>";
  }

  // White Deer
  if (
    texto.includes("There are white deer roaming the region near Ab'Dendriel")
  ) {
    output1.innerHTML +=
      "- 🫎 <strong>Ab'dendriel - White Deer</strong> - ativo.<br><br>";
  }
  if (
    texto.includes(
      "The number of white deer near Ab'Dendriel seems to be dwindling"
    )
  ) {
    output1.innerHTML +=
      "- 🫎 <strong>Ab'dendriel - White Deer</strong> - ativo mas população caindo.<br><br>";
  }
  if (
    texto.includes("Starving wolves are roaming the region near Ab'Dendriel")
  ) {
    output1.innerHTML +=
      "- 🫎 <strong>Ab'dendriel - White Deer</strong> - Starving Wolf - entregar captured wolf.<br><br>";
  }

  //Awash
  if (
    texto.includes(
      "The mine tunnels under Kazordoon are currently flooded. Coal is needed to get the waterpumps running"
    )
  ) {
    output1.innerHTML +=
      "- ⚒️ <strong>Kazordoon - Mina Pick 'N Shovel</strong> - mina inundada - usar carvão.<br><br>";
  }
  if (
    texto.includes(
      "The mine tunnels under Kazordoon are currently flooded, but enough coal has been delivered to keep the waterpumps running. The tunnels should be dry soon"
    )
  ) {
    output1.innerHTML +=
      "- ⚒️ <strong>Kazordoon - Mina Pick 'N Shovel</strong> - Água drenada - precisa matar para evitar inundação.<br><br>";
  }
  if (
    texto.includes(
      "The water in the mine tunnels under Kazordoon is drained and enough deeplings have been killed today to ensure it remains that way"
    )
  ) {
    output1.innerHTML +=
      "- ⚒️ <strong>Kazordoon - Mina Pick 'N Shovel</strong> - Água drenada - mataram o suficiente pra evitar inundação.<br><br>";
  }
  if (
    texto.includes(
      "Too many deeplings survived during the last five days, they will flood the tunnels and nothing can stop the"
    )
  ) {
    output1.innerHTML +=
      "- ⚒️ <strong>Kazordoon - Mina Pick 'N Shovel</strong> - agua drenada - último dia.<br><br>";
  }

  //Quadro de avisos Adventurers Guild
  if (
    texto.includes(
      "Several banks in major coastal towns are being robbed! The thieves are still on the loose!"
    )
  ) {
    output1.innerHTML +=
      "- 💰 <strong>Roubo ao banco</strong> - Ativo - seja rápido.<br><br>";
  }
  if (
    texto.includes(
      "Sharpen your sword! The witch Wyda seems to be bored so pay her a visit!"
    )
  ) {
    output1.innerHTML +=
      "- 🧙 <strong>Venore - Pantano</strong> - Wyda está entediada - achievements Torn Treasures e Someone's Bored.<br><br>";
  }
  if (
    texto.includes(
      "In case you have some spare tentacle pieces, you can now use Devovorga's very essence to enter a boss lair!"
    )
  ) {
    output1.innerHTML +=
      "- 🦑 <strong>Yalahar - Vengoth - Tentacle Pieces</strong> - boss - achievement dos bosses.<br><br>";
  }
  if (
    texto.includes(
      "The river south of the outlaw camp is flooding. A small island there should now be reachable safely."
    )
  ) {
    output1.innerHTML +=
      "- 🏕️ <strong>Outlaw Camp</strong> - área sudoeste inundada - achievement <strong>Down the Drain</strong>.<br><br>";
  }
  if (
    texto.includes(
      "Nomads travel the eternal sands of Ankrahmun's desert. There must be a camp somewhere."
    )
  ) {
    output1.innerHTML +=
      "- ⛺ <strong>Ankrahmun</strong> - Acampamento Nomad - bestiario e achievement <strong>Chest Robber</strong>.<br><br>";
  }
  if (
    texto.includes(
      "The volcano on Goroma sends its fiery message into the sky. A lot of creatures are flooding the lands together"
    )
  ) {
    output1.innerHTML +=
      "- 🌋 <strong>Goroma - Vulcão ativo</strong> - bestiario e achievement Fire from the Earth.<br><br>";
  }
  if (
    texto.includes(
      "The full moon has a strange impact on the island of Grimvale. The small forest there seems darker, filled with nightly howls."
    )
  ) {
    output1.innerHTML +=
      "- 🐺 <strong>Dias 12, 13 e 14</strong> - licantropia não desaparece sozinho, usem purple nightshade blossom. Licantropos irão dropar moonlight crystal nesses dias.<br><br>";
  }
  if (
    texto.includes(
      "A fiery fury gate has opened near one of the major cities somewhere in Tibia."
    )
  ) {
    output1.innerHTML +=
      "- 🚪 <strong>Fury Gates</strong> - Ativo em algum lugar - montaria e boss.<br><br>";
  }
  if (
    texto.includes(
      "are ravaging the wildlife north of the Green Claw Swamp. But the animals seem to fight ba"
    )
  ) {
    output1.innerHTML +=
      "- 🏹 <strong>Kazordoon</strong> - Caverna leste - <strong>hunters e poacher</strong>.<br><br>";
  }
  if (
    texto.includes(
      "The wild animals north of the Green Claw Swamp clearly dominate the area. But poachers come here to hunt them."
    )
  ) {
    output1.innerHTML +=
      "- 🐻 <strong>Kazordoon</strong> - Caverna leste - <strong>boar e bear</strong>.<br><br>";
  }
  if (
    texto.includes(
      "Poachers have slaughtered nearly all wild animals north of the Green Claw Swamp. But vengeful spirits show up there now!"
    )
  ) {
    output1.innerHTML +=
      "- 🐺 <strong>Kazordoon</strong> - Caverna leste - <strong>ghost wolf e gloom wolf</strong>.<br><br>";
  }
  if (
    texto.includes(
      "A hive infestation has been sighted south-west of Liberty Bay! An unnerving humming and buzzing is filling the air."
    )
  ) {
    output1.innerHTML +=
      "- 🐞 <strong>Liberty Bay</strong> Mini colméia ativa no oeste - achievement Cartography 101.<br><br>";
  }
  if (
    texto.includes(
      "Hail to the King! It's Kingsday in Thais, join the celebration!"
    )
  ) {
    output1.innerHTML +=
      "- 👑 <strong>Thais</strong> - dia do rei - achievement <strong>Loyal Subject</strong> e chance de bestiário - troll guard.<br><br>";
  }
  if (
    texto.includes(
      "Looks like the Queen's own royal trees are being cut down! The lumberjacks responsible shall be put to justice."
    )
  ) {
    output1.innerHTML +=
      "- 🪓 <strong>Carlin</strong> - Lenhador Ativo - achievement Whistle-Blower ou npc (não pode os dois).<br><br>";
  }
  if (
    texto.includes(
      "A whole nest of spiders needs to be exterminated as Mamma Longlegs is on the loose."
    )
  ) {
    output1.innerHTML +=
      "- 🕷️ <strong>Venore - Estrada oeste</strong> - boss giant spider e achievement <strong>Nestling</strong>.<br><br>";
  }
  if (
    texto.includes(
      "sandstorm travels through Darama, leading to isles full of deadly creatures inside a nightmare. Avoid the Ankrahmun tar"
    )
  ) {
    output1.innerHTML +=
      "- 🏝️ <strong>Nightmare Isle</strong> - perto da <strong>Tumba do petróleo</strong>.<br><br>";
  }
  if (
    texto.includes(
      "A sandstorm travels through Darama, leading to isles full of deadly creatures inside a nightmare. Avoid the northernmost coast!"
    )
  ) {
    output1.innerHTML +=
      "- 🏝️ <strong>Nightmare Isle</strong> - norte de <strong>Darashia</strong>.<br><br>";
  }
  if (
    texto.includes(
      "A sandstorm travels through Darama, leading to isles full of deadly creatures inside a nightmare. Avoid the river near Drefia!"
    )
  ) {
    output1.innerHTML +=
      "- 🏝️ <strong>Nightmare Isle</strong> - perto de <strong>Drefia</strong>.<br><br>";
  }
  if (
    texto.includes(
      "Not again! Noodles has taken some royal freedom and left the castle, after him in the name of the king!"
    )
  ) {
    output1.innerHTML +=
      "- 🐕 <strong>Thais</strong> - Cachorro Noodles fugiu - achievement <strong>Dog Sitter</strong> e recompensa.<br><br>";
  }
  if (
    texto.includes(
      "The river in Zao Steppe runs deep, there may be more fish than usual!"
    )
  ) {
    output1.innerHTML +=
      "- 🏞️ <strong>Zao</strong> - Rio planice sul ativo - achievement <strong>Desert Fisher</strong>.<br><br>";
  }
  if (
    texto.includes(
      "Adventurers have told of a Spirit Gate in the Daramian mountains. Fight the restless undead!"
    )
  ) {
    output1.innerHTML +=
      "- 👻 <strong>Spirit Ground</strong> - <strong>divisa Dara/Ank</strong>.<br><br>";
  }
  if (
    texto.includes(
      "Stampede! The Ape God has stirred up Tiquanda's elephants again!"
    )
  ) {
    output1.innerHTML +=
      "- 🐘 <strong>Port Hope</strong> - <strong>Terrified elephant</strong> - bestiario - achievement <strong>Trail of the Ape God</strong>.<br><br>";
  }
  if (
    texto.includes(
      "Judging by the unnerved mammoths in Svargrond, enough snow has melted away to reveal some very special flora."
    )
  ) {
    output1.innerHTML +=
      "- ❄️ <strong>Svargrond</strong> - Neve derretendo - <strong>flores</strong> - achievement <strong>Ice Harvester</strong>.<br><br>";
  }
  if (
    texto.includes(
      "A big iceberg has been washed up at the coast north of Port Hope. It seems to be inhabited by strange white furballs."
    )
  ) {
    output1.innerHTML +=
      "- 🧊 <strong>Port Hope - Iceberg</strong> - chakoya e achievement Cartography 101.<br><br>";
  }
  if (
    texto.includes(
      "Strange sounds echo through Trapwood as hunters and dworcs fight over the holy grounds and the game that roams there."
    )
  ) {
    output1.innerHTML +=
      "- 🏹 <strong>Port Hope</strong> - hunter OU voodoomaster na área norte da medusa tower - bestiario.<br><br>";
  }
  if (
    texto.includes(
      "Bibby Bloodbath and her crew are roaming the lands, destroying everything in their path."
    )
  ) {
    output1.innerHTML +=
      "- 👹 <strong>Bibby Bloodbath</strong> - ativo - achievement <strong>Bibby's Bloodbath</strong>.<br><br>";
  }
  if (
    texto.includes(
      "Adventurers have told of a Spirit Gate in Vengoth. Fight the restless undead!"
    )
  ) {
    output1.innerHTML +=
      "- 👻 <strong>Spirit Ground</strong> - <strong>Vengoth</strong>.<br><br>";
  }
  if (
    texto.includes(
      "Adventurers have told of a Spirit Gate in the Ghostlands. Fight the restless undead!"
    )
  ) {
    output1.innerHTML +=
      "- 👻 <strong>Spirit Ground</strong> - <strong>Ghostland</strong>.<br><br>";
  }
  if (
    texto.includes(
      "An ice bridge now connects Svargrond to a frosty island, where monsters and a strange frozen creature"
    )
  ) {
    output1.innerHTML += "- 🧊 <strong>Chyllfroest</strong> Ativa.<br><br>";
  }

  //Galthen no check
  output3.innerHTML += "- 🎒 <strong>" + mensagemGlobal + ".</strong><br><br>";

  //rashid
  output3.innerHTML +=
    "- <strong>👳‍♂️ Rashid está em " + rashid + ". <br><br> </strong>";
  //Criatudas em destaque
  output3.innerHTML +=
    "- <strong> 🧌 Criatura do dia</strong>: " + creatureName + ".<br><br>";
  output3.innerHTML +=
    "- <strong>👺 Boss do dia</strong>: " + bossName + ".<br><br>";

  //Boss Arena
  if (nomeSelecionado !== "Selecione o boss da Arena") {
    output3.innerHTML +=
      "- 👹 <strong>Boss Arena: " + nomeSelecionado + ".</strong><br><br>";
  }
  //tibiaDrome
  output3.innerHTML += tibiaDrome + ".<br><br>";

  //Oramond ==================================================================================================================
  if (
    texto.includes(
      "The citizens of Rathleton voted for the shortcut back from the catacombs."
    )
  ) {
    output2.innerHTML +=
      "- ↪️ Oramond: Atalho para sair das catacombs de Demons.<br><br>";
  }
  if (texto.includes("The citizens of Rathleton voted for Lisa.")) {
    output2.innerHTML += "- 👹 Boss Lisa ativo.<br><br>";
  }
  if (texto.includes("The citizens of Rathleton voted for the Glooth Fairy")) {
    output2.innerHTML += "- 👹 Boss Glooth Fairy ativo.<br><br>";
  }
  if (texto.includes("citizens of Rathleton voted for Bullwa")) {
    output2.innerHTML += "- 👹 Boss Bullwark ativo.<br><br>";
  }
  if (
    texto.includes(
      "The citizens of Rathleton voted for the mechanical creatures raids."
    )
  ) {
    output2.innerHTML +=
      "- 🧰 Maior chance de raid de Mechanical Creatures na glooth factory (Salão glooth bomb).<br><br>";
  }
  if (texto.includes("for the wild life creatures raid")) {
    output2.innerHTML +=
      "- 🌲 Maior chance da raid Wild Life na glooth factory (Salão do Tremor Worm).<br><br>";
  }
  if (
    texto.includes(
      "The citizens of Rathleton voted for the wrath of evil in the dungeon."
    )
  ) {
    output2.innerHTML +=
      "- 🦹‍♂️ Wrath of Evil na Magistrate Dungeon (Rathleton Catacombs).<br><br>";
  }
  if (
    texto.includes(
      "The citizens of Rathleton voted for the golems in the dungeon."
    )
  ) {
    output2.innerHTML +=
      "- 🗿 Golens na Magistrate Dungeon (Rathleton Catacombs).<br><br>";
  }
  if (texto.includes("voted for the minotaurs in the dunge")) {
    output2.innerHTML +=
      "- 🐂 Minotaurs na Magistrate Dungeon (Rathleton Catacombs).<br><br>";
  }

  // Se nenhum caso corresponder, exiba uma mensagem padrão
  // if (output.innerHTML === "") {
  //   output.innerHTML = "Nenhuma informação correspondente encontrada.";
  // }
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

//Ciclo Oramond================================================================================================================================================

// Função para salvar a entrada no localStorage
function saveToLocalStorage(input) {
  localStorage.setItem("inputData", input);
}

// Função para recuperar a entrada do localStorage
function getFromLocalStorage() {
  return localStorage.getItem("inputData");
}

// Função para limpar o localStorage
function clearLocalStorage() {
  localStorage.removeItem("inputData");
  // Recarregar a página para atualizar a exibição
  location.reload();
}

// Função para processar a entrada
function processInput() {
  var input = getFromLocalStorage();

  if (input) {
    // Se houver uma entrada no localStorage, exiba-a
    document.getElementById("output").innerHTML =
      "<strong>Check Oramond - Até " + input + "</strong>";
    document.getElementById("inputField").style.display = "none"; // Esconder o campo de entrada se houver entrada no localStorage
  } else {
    // Se não houver uma entrada no localStorage, exiba o campo de entrada
    document.getElementById("inputField").style.display = "block";
  }
}

// Função para salvar a entrada no localStorage e exibir a saída
function saveAndDisplayOutput() {
  var input = document.getElementById("inputText").value;
  // Salvar a entrada no localStorage
  saveToLocalStorage(input);
  // Exibir a saída
  var outputContent = "Check Oramond - Até " + input;
  document.getElementById("output").textContent = outputContent;
  // Esconder o campo de entrada
  document.getElementById("inputField").style.display = "none";

  return outputContent; // Retornar o conteúdo da saída
}

// Ao carregar a página, verificar se há entrada no localStorage
window.onload = function () {
  calcularDiasParaProximoDia10();
  processInput();
  console.log(mensagemGlobal);
};

// Função para obter o conteúdo da div "output"
function getOutputContent() {
  return document.getElementById("output").textContent;
}

//Funçao boss arena
var nomeSelecionado;
function selecionarNome() {
  var selectElement = document.getElementById("nomesSelect");
  nomeSelecionado = selectElement.value;
  console.log("Boss:", nomeSelecionado);
}

//galthen
var mensagemGlobal; // Criando a variável global mensagemGlobal
function calcularDiasParaProximoDia10() {
  var hojeDataLocal = new Date(); // Renomeando a variável hojeData
  var proximoDia10DataLocal = new Date(hojeDataLocal); // Renomeando a variável proximoDia10Data

  proximoDia10DataLocal.setDate(10);

  if (hojeDataLocal.getDate() > 10) {
    proximoDia10DataLocal.setMonth(proximoDia10DataLocal.getMonth() + 1);
  }

  var diferencaMilissegundosLocal =
    proximoDia10DataLocal.getTime() - hojeDataLocal.getTime();

  var diasFaltandoLocal = Math.ceil(
    diferencaMilissegundosLocal / (1000 * 60 * 60 * 24)
  );

  if (hojeDataLocal.getDate() === 10) {
    mensagemGlobal = "Hoje é dia de pegar a GALTHEN'S BAG!";
  } else {
    mensagemGlobal =
      "Faltam " + diasFaltandoLocal + " dias para pegar a proxima galthen bag.";
  }

  document.getElementById("mensagem").textContent = mensagemGlobal;

  return mensagemGlobal;
}
