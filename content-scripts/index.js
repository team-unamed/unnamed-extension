let s, p;
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
        const chatContainer = document.createElement('div');
        chatContainer.classList.add('chat-container');

        // Create individual message divs
        const message1 = document.createElement('div');
        message1.classList.add('message');
        message1.textContent = 'You: hey';

        const message2 = document.createElement('div');
        message2.classList.add('message');
        message2.textContent = 'Codeium: Hello! How can I assist you today?';

        // Append messages to the chat container
        chatContainer.appendChild(message1);
        chatContainer.appendChild(message2);

        // Create an input field
        const inputField = document.createElement('input');
        inputField.type = 'text';
        inputField.classList.add('input-field');
        inputField.placeholder = "Ask anything — use '@' to mention code blocks";

        // Append the chat container and input field to the body
        
        let plugin=document.createElement('div');
        plugin.classList.add('plugItIn');
        plugin.classList.add('active');
        plugin.appendChild(chatContainer);
        plugin.appendChild(inputField);
        p.appendChild(plugin);
        console.log(plugin);

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
                console.log(s, "in timeout");
                console.log(p);
                call_back();
        }, 2000);
};
// code
console.log("before");
getS(btn);






