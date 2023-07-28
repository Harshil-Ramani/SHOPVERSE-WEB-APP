async function increment(event){
    try{
        let response=await fetch("/api/userid");
        if(response.ok)
        {
            let user_id=await response.text(),product_id=event.target.getAttribute('data-productid');
            if(user_id!=""){
                let data={user_id:user_id,product_id:product_id};
                let res=await fetch('/api/cartitem/increment',{
                    method: "put",
                    headers:{ 'Content-Type':'application/json'},
                    body: JSON.stringify(data)
                });
            }
            else window.location.href='/login';
        }
    }
    catch(err){
        console.log(err);
    }
    location.reload();
}

async function decrement(event){
    try{
        let response=await fetch("/api/userid");
        if(response.ok)
        {
            let user_id=await response.text(),product_id=event.target.getAttribute('data-productid');
            if(user_id!=""){
                let data={user_id:user_id,product_id:product_id};
                let res=await fetch('/api/cartitem/decrement',{
                    method: "put",
                    headers:{ 'Content-Type':'application/json'},
                    body: JSON.stringify(data)
                });
            }
            else window.location.href='/login';
        }
    }
    catch(err){
        console.log(err);
    }
    location.reload();
}