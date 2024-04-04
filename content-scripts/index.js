let s, p;
let header;
let goBtn;

let inputField,chatContainer,plugin;
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
        i.src="https://icones.pro/wp-content/uploads/2021/05/icone-de-chat-violet.png";

        child_div.appendChild(i);
        console.log(parent_div);
        if (s === null) alert("Refresh page");
        else s.appendChild(parent_div);
        parent_div.onclick = promptPanel;
}

const promptPanel = () => {
        console.log(p.childNodes,"Array");
        p.childNodes.forEach(element => {
                if(element.classList.value==="plugItIn active"){
                        element.classList.value="d-none";
                }
                console.log(element.classList.value);
        });
        // p=Array.prototype.slice.call(p);
        // console.log(p,"Array");
        // Create a chat container div

        const style =document.createElement('style');
        style.innerHTML=`
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
        `;
        document.head.appendChild(style);
        chatContainer = document.createElement('div');
        chatContainer.classList.add('chat-container');

        // Create individual message divs
        const requestOptions = {
                method: 'GET',
                headers: {
                  'Access-Control-Allow-Origin': 'https://remix.ethereum.org/',
                },
              };
        

        fetch('https://unamed-ai-k7ml7hype-aaravatgits-projects.vercel.app/',requestOptions)
        .then(res=>{
                console.log(res);
        })
        .catch(err=>{
                console.log(err);
        })
        const message1 = document.createElement('div');
        message1.classList.add('message');
        message1.textContent = 'Unnamed: ';

        // const message2 = document.createElement('div');
        // message2.classList.add('message');
        // message2.textContent = 'Codeium: Hello! How can I assist you today?';

        // Append messages to the chat container
        // chatContainer.appendChild(message1);
        // chatContainer.appendChild(message2);

        // Create an input field
        goBtn=document.createElement('button');
        goBtn.innerHTML='Go';
        goBtn.onclick=promptGiven;
        goBtn.classList.add('input-field');
        inputField = document.createElement('input');
        inputField.type = 'text';
        inputField.classList.add('input-field');
        inputField.placeholder = "Ask anything — use '@' to mention code blocks";
        inputField.appendChild(goBtn);
        
        
        const prompt=document.createElement('div');
        prompt.appendChild(inputField);
        //prompt.appendChild(goBtn);
        prompt.classList.add('input-field');
        // Append the chat container and input field to the body
        header.innerHTML="Hello";
        plugin=document.createElement('div');
        plugin.classList.add('plugItIn');
        plugin.classList.add('active');
        plugin.appendChild(chatContainer);
        plugin.appendChild(inputField);
        plugin.appendChild(goBtn);
        p.appendChild(plugin);
        console.log(plugin);

}

const promptGiven=()=>{
        console.log(inputField.value);


        const message= document.createElement('div');
        message.classList.add('message');
        message.textContent = inputField.value;
        chatContainer.appendChild(message);
        // console.log(plugin.childNodes[0]);//=chatContainer;
        plugin.childNodes[1]=inputField;
        plugin.childNodes[2]=goBtn;
        console.log(chatContainer);
        console.log(plugin.childNodes);
        inputField.value="";
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
                header=document.getElementById("side-panel").firstChild.childNodes[1].firstChild.firstChild;
                console.log(header.innerHTML);
                console.log(s, "in timeout");
                console.log(p);
                call_back();
        }, 2000);
};
// code
console.log("before");
getS(btn);






