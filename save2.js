require("dotenv").config()
    
// 1. Referência ao botão
const button = document.getElementById("launchEntri");

// 2. Parâmetros do Entri (substitua pelos valores reais)
const applicationId = process.env.applicationId;
const secret = process.env.secret;
let recordsContent = "";

async function loadFile() {
    try {
      const response = await fetch('records.txt');  
      recordsContent = await response.text();  // Armazena o conteúdo
      console.log("Arquivo carregado:", recordsContent); // Confirmação no console
    } catch (error) {
      console.error("Erro ao carregar o arquivo:", error);
    }
  }
  
loadFile();  // Chama a função para carregar o arquivo

// 3. Função assíncrona para obter o JWT e criar a config
async function connectFlow() {
    try {
        const response = await fetch('https://api.goentri.com/token', {
            method: 'POST',
            body: JSON.stringify({
                applicationId: applicationId,
                secret: secret
            }),
            headers: {
                'Content-Type': 'application/json'
            }
        });

        const data = await response.json();
        const jwt = data.auth_token;  // Obtém o JWT

        console.log('JWT Token:', jwt);

        // 4. Define window.config após obter o JWT
        window.config = {
            applicationId: applicationId,
            token: jwt,
            prefilledDomain: "example.com",
            dnsRecords: recordsContent,
            whiteLabel: {
                "hideEntriLogo": true,
                "hideConfetti": true,
                "logo": "https://static-00.iconduck.com/assets.00/random-1dice-icon-437x512-ksswhjk8.png",
                "theme": {
                "fg": "#fff",
                "bg": "#fa7268"
                },
                "logoBackgroundColor": "#444444",
                "removeLogoBorder": true,
                "customCopy": {
                "initialScreen": {
                    "title": {
                    "en": "Custom title",
                    "es": "Título custom"
                    },
                    "subTitle": {
                    "en": "Custom subtitle",
                    "es": "Subtítulo custom"
                    }
                },
                "manuallyScreen": {
                    "disableManualSetupDocumentationLink": true,
                    "stepByStepGuide": {
                    "en": "Follow our <link>step-by-step</link> guide",
                    "es": "Sigue nuestra guía <link>paso-a-paso</link>"
                    }
                }
                }

            }
        };

        console.log('Config:', window.config);

        // 5. Habilita o botão e adiciona o evento de clique
        button.disabled = false;
        button.textContent = "Launch Entri";
        button.addEventListener("click", function () {
            entri.showEntri(window.config);
        });

    } catch (error) {
        console.error('Erro ao obter o JWT ou criar o config:', error);
        button.textContent = "Failed to Load Entri";
    }
}

// 6. Espera o Entri ser carregado antes de iniciar o fluxo
function checkEntriLoaded() {
    if (typeof entri !== "undefined") {
        console.log("Entri is loaded and ready to use.");
        connectFlow();  // Chama a função para obter o JWT e configurar o botão
    } else {
        console.error("Entri ainda não carregou. Tentando novamente...");
        setTimeout(checkEntriLoaded, 500); // Tenta novamente depois de 500ms
    }
}

// 7. Aguarda o DOM estar carregado antes de verificar o Entri
document.addEventListener("DOMContentLoaded", checkEntriLoaded);

function handleOnEntriClose(event) {
    console.log('onEntriClose', event.detail);
    }
window.addEventListener('onEntriClose', handleOnEntriClose, false);