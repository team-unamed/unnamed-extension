const showdown = require('showdown');
const converter = new showdown.Converter();
require('dotenv').config();

let s, p;
let header;
let goBtn;





let inputField, chatContainer, plugin;
const btn = () => {


        console.log(s);
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
        console.log(parent_div);
        if (s === null) alert("Refresh page");
        else s.appendChild(parent_div);
        parent_div.onclick = promptPanel;
}

const promptPanel = () => {
        console.log(p.childNodes, "Array");
        p.childNodes.forEach(element => {
                if (element.classList.value === "plugItIn active") {
                        element.classList.value = "d-none";
                }
                console.log(element.classList.value);
        });
        // p=Array.prototype.slice.call(p);
        // console.log(p,"Array");
        // Create a chat container div

        const style = document.createElement('style');
        style.innerHTML = `
        .chat-container {
                width: 100%
                margin: auto;
                background-color: #222336;
                color: white;
                border-radius: 5px;
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

        // Create individual message divs



        fetch('https://unamed-ai-api.vercel.app/')
                .then(res => {
                        console.log("Working");
                })
                .catch(err => {
                        console.log(err);
                })
        const message1 = document.createElement('div');
        message1.classList.add('message');
        message1.textContent = 'Unnamed: ';

        // const message2 = document.createElement('div');
        // message2.classList.add('message');
        const message2 = createMessage("Unnamed: How can I help you!");

        // Append messages to the chat container
        // chatContainer.appendChild(message1);
        chatContainer.appendChild(message2);

        // Create an input field
        goBtn = document.createElement('button');
        goBtn.innerHTML = 'Go';
        goBtn.onclick = promptGiven;
        goBtn.classList.add('input-field');
        inputField = document.createElement('input');
        inputField.type = 'text';
        inputField.classList.add('input-field');
        inputField.placeholder = "Ask anything — use '@' to mention code blocks";
        inputField.appendChild(goBtn);


        const prompt = document.createElement('div');
        prompt.appendChild(inputField);
        //prompt.appendChild(goBtn);
        prompt.classList.add('input-field');
        // Append the chat container and input field to the body
        header.innerHTML = "Hello";
        plugin = document.createElement('div');
        plugin.classList.add('plugItIn');
        plugin.classList.add('active');
        plugin.appendChild(chatContainer);
        plugin.appendChild(inputField);
        plugin.appendChild(goBtn);
        p.appendChild(plugin);
        console.log(plugin);

}

const promptGiven = async () => {
        console.log(inputField.value);
        let message = createMessage("You: " + inputField.value);
        chatContainer.appendChild(message);

        let ans;
        console.log(process.env.API_KEY);
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
                        console.log(data.answer);
                        var regex = /```([^`]*)```/;
                        var match = regex.exec(data.answer);
                        var extractedText = match ? match[1].trim() : '';


                        if (extractedText) {
                                console.log(extractedText);
                        }

                        ans = data.answer;
                        let ans_message = createMessage("Unnamed: " + ans, extractedText);
                        chatContainer.appendChild(ans_message);
                })
                .catch((err) => {
                        // Handle errors
                        console.log(err);
                });



        // console.log(plugin.childNodes[0]);//=chatContainer;
        plugin.childNodes[1] = inputField;
        plugin.childNodes[2] = goBtn;
        console.log(chatContainer);
        console.log(plugin.childNodes);
        inputField.value = "";
}


const createMessage = (value, code) => {
        let message;
        if (code) {
                message = document.createElement('span');
                const m = document.createElement('span');
                //m.textContent=value;
                message.classList.add('message');
                message.markdown = "1";
                //message.appendChild(m);
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
                //m.textContent=value;
                message.classList.add('message');
                message.markdown = "1";
                //message.appendChild(m);
                message.innerHTML = converter.makeHtml(value);
        }
        return message;
}

{/* <div class="d-flex py-1" style="width: auto; place-content: center;">
        <div class="remixui_icon m-0  pt-1" plugin="udapp" data-id="verticalIconsKindudapp" id="verticalIconsKindudapp">
                <img data-id="" class="invert dark remixui_image " src="assets/img/deployAndRun.webp" alt="udapp">
        </div>
</div> */}

var getS = function (call_back) {
        setTimeout(function () {
                s = document.getElementById("otherIcons");
                p = document.getElementsByClassName("pluginsContainer")[0].firstChild;
                header = document.getElementById("side-panel").firstChild.childNodes[1].firstChild.firstChild;
                console.log(header.innerHTML);
                console.log(s, "in timeout");
                // const scriptElement = document.createElement('script');
                // scriptElement.src = 'https://cdn.jsdelivr.net/npm/marked/script.min.js';
                // document.head.appendChild(scriptElement);
                //console.log(process.env.API_KEY)
                console.log(p);
                call_back();
        }, 2000);
};
// code
console.log("before");
getS(btn);






