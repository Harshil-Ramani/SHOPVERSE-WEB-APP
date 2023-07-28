let search=document.querySelector('#search a');
let checkboxs=document.querySelectorAll('input[type="checkbox"]');

search.addEventListener('click',(event)=>{
    event.preventDefault();
    let text=document.querySelector('#search input').value;
    if(text==='')return;
    text=text+findquerys();
    window.location.href=`/product/${text}`;
});

function findquerys(){
    let query="";
    for(let checkbox of checkboxs){
        if(checkbox.checked){
            if(query==="")query="?";
            if(query!=="?")query=query+"&";
            query=query+checkbox.name+'='+checkbox.value;
        }
    }
    return query;
}

checkboxs.forEach(checkbox=>{
    checkbox.addEventListener("click",event=>{
        let text=document.querySelector('#search input').value;
        if(text==='')return;
        text=text+findquerys();
        window.location.href=`/product/${text}`;
    });
});

let log=document.getElementById('log');
log.addEventListener('click',async event=>{
    event.preventDefault();
    let element=event.target;
    if(element.innerHTML==="Login"){
        document.location.href='/login';
    }
    else{
        let res=await fetch('/api/logout',{
            method: "delete",
        });
        document.location.href='/home';
    }
});