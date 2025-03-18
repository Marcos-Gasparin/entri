     // 1. Reference Button
    const button = document.getElementById("launchEntri");

    // 2. Initialize recordsContent
    let recordsContent = "";
    
    // 3. Get DNS Records
    async function loadFile() {
        try {
          const response = await fetch('records.txt');  
          recordsContent = JSON.parse(await response.text());  
          console.log("File loaded:", recordsContent); 
        } catch (error) {
          console.error("Error on loading the file:", error);
        }
      }
      
    loadFile(); 

    // 4. Use Connect 
    async function connectFlow() {
        try {
            // 1. Retrieves JWT from backend
            const response = await fetch('http://localhost:3000/get-token', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
            });
    
            // 2. Verify request success
            if (!response.ok) {
                throw new Error('Error on retrieving JWT from backend');
            }
    
            // 3. Store JWT an applicationId
            const data = await response.json();
            const jwt = data.token; 
            const applicationId = data.applicationId;

            console.log('JWT Token:', jwt);
            console.log(data);

            // 4. Define window.config
            window.config = {
                applicationId: applicationId,
                token: jwt,
                prefilledDomain: "example.com",
                dnsRecords: recordsContent,
                whiteLabel: {
                    "hideEntriLogo": true,
                    "hideConfetti": true,
                    "logo": "https://i.imgur.com/kBgnBtx.png",
                    "theme": {
                        "fg": "#fff",
                        "bg": "#fa7268"
                    },
                    "logoBackgroundColor": "#444444",
                    "removeLogoBorder": true,
                    "customCopy": {
                        "initialScreen": {
                            "title": {
                                "en": "Start configuring your domain",
                                "es": "Empieza a configurar tu dominio"
                            },
                            "subTitle": {
                                "en": "Hit the continue button below",
                                "es": "Pulsa el botón de continuar abajo"
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
            }
            console.log('Config:', window.config);
    
            // 5. Unlock button
            button.disabled = false;
            button.textContent = "Launch Entri";
            button.addEventListener("click", function () {
                entri.showEntri(window.config);
            });
    
        } catch (error) {
            console.error('Error on creating config object', error);
            button.textContent = "Failed to Load Entri";
        }
    }
    

    // 6. Checks if modal ir loaded and ready
    function checkEntriLoaded() {
        if (typeof entri !== "undefined") {
            console.log("Entri is loaded and ready to use.");
            connectFlow();  
        } else {
            console.error("Entri is loading...");
            setTimeout(checkEntriLoaded, 500);
        }
    }

    // 7. Waits for DOM
    document.addEventListener("DOMContentLoaded", checkEntriLoaded);

    function handleOnEntriClose(event) {
        console.log('onEntriClose', event.detail);
        }
    window.addEventListener('onEntriClose', handleOnEntriClose, false);