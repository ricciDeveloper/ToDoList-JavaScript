const button = document.getElementById("save");
const input = document.querySelector("input");
const list = document.getElementById("task-list");

function adicionarTarefa(){
    const tarefaNome = input.value.trim();

    if(tarefaNome === ""){
        alert("Insira uma tarefa!")
        return;
    }

    const li = document.createElement("li");
    const span = document.createElement("span");
    span.textContent = tarefaNome;
    li.appendChild(span);

    const btnRemover = document.createElement("button");
    btnRemover.classList.add("btnRemove");
    btnRemover.textContent = "🗑️";
    btnRemover.addEventListener("click", removerTarefa);

    li.appendChild(btnRemover);

    list.appendChild(li);

    input.value = "";
    input.focus();

}



function removerTarefa(){
    const li = event.target.parentElement;
    list.removeChild(li);
}


button.addEventListener("click", adicionarTarefa);

input.addEventListener("keypress", (e) => {
    if(e.key ==="Enter"){
        adicionarTarefa();
    }
});