const showdown = require('showdown');
const converter = new showdown.Converter();

let s, p;
let header;
let goBtn;

let inputField, chatContainer, plugin;
const btn = () => {
        //adding button to the side panel
        const parent_div = document.createElement('div');
        parent_div.classList.add('d-flex');
        parent_div.classList.add('py-1');
        parent_div.style.width = 'auto';
        parent_div.style.placeContent = 'center';

        const child_div = document.createElement('div');
        child_div.classList.add("remixui_icon");
        child_div.classList.add("m-0");
        child_div.classList.add("pt-1");
        child_div.classList.add("py-1");
        parent_div.appendChild(child_div);

        const i = document.createElement('img');
        i.classList.add('invert');
        i.classList.add("dark");
        i.classList.add("remixui_image");
        i.src = "https://icones.pro/wp-content/uploads/2021/05/icone-de-chat-violet.png";

        child_div.appendChild(i);
        if (s === null) alert("Refresh page");
        else s.appendChild(parent_div);
        //onclick functionality for button
        parent_div.onclick = promptPanel;
}

const promptPanel = () => {
        //make other plugin side panel hidden
        p.childNodes.forEach(element => {
                if (element.classList.value === "plugItIn active") {
                        element.classList.value = "d-none";
                }
                console.log(element.classList.value);
        });
        const style = document.createElement('style');
        style.innerHTML = `
        .chat-container {
                width: 100%
                margin: auto;
                background-color: #222336;
                color: white;
                border-radius: 5px;
                font-size:120%;
            }
    
            /* Individual message styles */
            .message {
                padding: 10px;
                border-bottom: 1px solid #444;
                display:block;
            }
    
            /* Input field styles */
            .input-field {
                width: 100%;
                padding: 10px;
                border: none;
                background-color: #35384c;
                color: white;
                border-radius: 5px;
            }
            pre {
                background-color: #2F2928;
                padding: 10px;
                border-radius: 5px;
                position: relative;
              }
              .copy-button {
                position: absolute;
                top: 5px;
                right: 10px;
                background-color: #007bff;
                color: #fff;
                border: none;
                border-radius: 5px;
                padding: 5px 10px;
                cursor: pointer;
              }
              .copy{
                border:none;
                background-color: #222336;
                color: white;
              }
        `;

        document.head.appendChild(style);
        chatContainer = document.createElement('div');
        chatContainer.classList.add('chat-container');
        //checking if the api is working
        fetch('https://unamed-ai-api.vercel.app/')
                .then(res => {
                        console.log("Working");
                })
                .catch(err => {
                        console.log(err);
                })
        //initial messages in the panel
        const message1 = document.createElement('div');
        message1.classList.add('message');
        message1.textContent = 'Unnamed: ';

        const message2 = createMessage("Unnamed: How can I help you!");

        chatContainer.appendChild(message2);
        //creating input field and Go button
        goBtn = document.createElement('button');
        goBtn.innerHTML = 'Go';
        goBtn.onclick = promptGiven;
        goBtn.classList.add('input-field');
        inputField = document.createElement('input');
        inputField.type = 'text';
        inputField.classList.add('input-field');
        inputField.placeholder = "Ask anything to Unnamed";
        
        const prompt = document.createElement('div');
        prompt.appendChild(inputField);
        prompt.classList.add('input-field');
        // Append the chat container and input field to the body
        header.innerHTML = "Unnamed";
        plugin = document.createElement('div');
        plugin.classList.add('plugItIn');
        plugin.classList.add('active');
        plugin.appendChild(chatContainer);
        plugin.appendChild(inputField);
        plugin.appendChild(goBtn);
        p.appendChild(plugin);

}

const promptGiven = async () => {
        console.log(inputField.value);
        let message = createMessage("You: " + inputField.value);
        chatContainer.appendChild(message);

        let ans;
        //fetching answer from api
        await fetch(`https://unamed-ai-api.vercel.app/ask?question=${inputField.value}&model=solidity&master_key=${apiKey}`, {
                method: 'POST',
        })
                .then((res) => {
                        // Check if the response is successful (status code 200)
                        if (res.ok) {
                                // Parse the response body as JSON
                                return res.json();
                        } else {
                                // If response is not successful, throw an error
                                throw new Error('Request failed');
                        }
                })
                .then((data) => {
                        // Handle the JSON response data
                        //checking if response has code in it
                        var regex = /```([^`]*)```/;
                        var match = regex.exec(data.answer);
                        var extractedText = match ? match[1].trim() : '';
                        ans = data.answer;
                        let ans_message = createMessage("Unnamed: " + ans, extractedText);
                        chatContainer.appendChild(ans_message);
                })
                .catch((err) => {
                        // Handle errors
                        console.log(err);
                });

        plugin.childNodes[1] = inputField;
        plugin.childNodes[2] = goBtn;
        inputField.value = "";
}

//fucntion to create message according to string and code
const createMessage = (value, code) => {
        let message;
        if (code) {
                message = document.createElement('span');
                const m = document.createElement('span');
                message.classList.add('message');
                message.innerHTML = converter.makeHtml(value);
                const copyButton = document.createElement('button');
                copyButton.innerHTML = 'Copy Code';
                copyButton.classList.add('copy');
                copyButton.onclick=() => {
                        navigator.clipboard.writeText(code);
                }
                message.appendChild(copyButton);
        }
        else {
                message = document.createElement('span');
                const m = document.createElement('span');
                message.classList.add('message');
                message.innerHTML = converter.makeHtml(value);
        }
        return message;
}

//used this to add button to side panel only  after it is loaded
var getS = function (call_back) {
        setTimeout(function () {
                s = document.getElementById("otherIcons");
                p = document.getElementsByClassName("pluginsContainer")[0].firstChild;
                header = document.getElementById("side-panel").firstChild.childNodes[1];
                if(!header){
                        alert("Refresh page");
                }
                header=header.firstChild.firstChild;
                call_back();
        }, 2000);
};

getS(btn);






