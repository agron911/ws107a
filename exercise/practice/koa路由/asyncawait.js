async function getdata(){
    
    return new Promise((resolve,reject)=>{
        setTimeout(()=>{
            var username='Tom';
            resolve(username);
        },1000)
    })
}

async function test(){
    var data=await getdata();
    console.log(data);
}

test();
