let NameMovie = document.querySelector('#nameMovie');
let Select = document.querySelector("#select-ep");
let wrapper =document.querySelector('.wrapper');
let Search = document.querySelector("#search");
let Length = document.querySelector('#length-list');

let allEp = [];
let SpecialEp=[];
let selectedEP =[];
let query ;


window.addEventListener('load',()=>{

    const params = (new URL(document.location)).searchParams;
    let id =params.get('select');
    console.log(id);
    
    let namemovie = `https://api.tvmaze.com/shows/${id}`    
    fetch(namemovie)
    .then(res=>res.json())
    .then(data=>NameMovie.textContent=data.name)
    .catch(error=>window.alert(error));  
  
    let searchURL = `https://api.tvmaze.com/shows/${id}/episodes`
    fetch(searchURL)
    .then(res=>res.json())
    .then(data=>{
        Length.textContent = "Displaying " +data.length + "/" + data.length + "episodes"
        addEpisode(data)
        addOnSelect(data)
        })
    .catch(error=>window.alert(error));  
    function addOnSelect(data)
{   data.forEach(item=>{
    let add_select = document.createElement("option");
    allEp.push(item);
    let newNumber = item .number;
        let newSeason = item.season
            if(newNumber>0 && newNumber <10)
            {
                newNumber = '0'+newNumber;
            }
            else 
            {
                newNumber = newNumber;
            }
            if(newSeason>0 && newSeason <10)
            {
                newSeason = '0'+newSeason;
            }
            else 
            {
                newSeason = newSeason;
            }

            
            add_select.textContent='S'+newSeason+'E'+newNumber+" - " +item.name;
            add_select.setAttribute('value',item.id);
            Select.appendChild(add_select);

        });   
}
})

function creationButton()
{
    let linked = document.createElement('button');
    let btnBack = document.querySelector('.btn-back');
    linked.setAttribute('onclick','window.location.reload()');
    linked.textContent="Go to back page";
    linked.classList.add('backshow');
    
    btnBack.appendChild(linked);


}

function addEpisode(data)

{       
         wrapper.innerHTML='';
         wrapper.classList.remove("select-ep");
         //let Div = document.createElement('div');
        data.map(item=>{
            // create a tags 

            let Div = document.createElement('div');
            Div.classList.add('wrapper_ep');
            Div.id=item.id;
            let watch_now = document.createElement('div');
            let icon_w= document.createElement('span');
            let name_SE = document.createElement('div');
            let filmName= document.createElement('h3');
            let Summary = document.createElement('div');
            let desc = document.createElement('span');
            let Image = document.createElement('img');
            let SE = document.createElement('span');
            let watchBtn=document.createElement('a');
            
            let newP;
            if(item.summary===null)
            {
                newP="";
            }
            else
            {
               newP = item.summary.substr(0,85);
            }
            //console.log(newP)
        // Film Name && number - Season 
         name_SE.classList.add('name-se');
        filmName.textContent=item.name;
        let newNumber = item .number;
        let newSeason = item.season
            if(newNumber>0 && newNumber <10)
            {
                newNumber = '0'+newNumber;
            }
            else 
            {
                newNumber = newNumber;
            }
            if(newSeason>0 && newSeason <10)
            {
                newSeason = '0'+newSeason;
            }
            else 
            {
                newSeason = newSeason;
            }

            SE.textContent= 'S'+newSeason+'E'+newNumber;
            

            // add a image 
            if(item.image===null)
            {
                Image.setAttribute('src','./placeholderImage.jpg')
            }
            else
            {
                 Image.setAttribute('src',item.image.original);
            }
            // add a summary 
            Summary.classList.add('summary-F')
            desc.textContent="Description:"
            
            Summary.innerHTML= newP;
            Summary.classList.add('summary-F')
            desc.textContent="Description:"
            // section watch_now 
            watchBtn.textContent="Watch now";
            watchBtn.setAttribute('href',item.url)


            // add to seation 
            name_SE.appendChild(filmName);
            name_SE.appendChild(SE);
            Div.appendChild(name_SE);
            Div.appendChild(Image)
            Div.appendChild(Summary);
            Div.appendChild(watchBtn);
            wrapper.appendChild(Div);
            

         });
        
        SpecialEp=[];
        selectedEP=[];
         
    }

    Search.addEventListener('keyup',(e)=>
    {  if (e.keyCode === 13)
        {
            e.preventDefault();
            query=Search.value.toLowerCase();

            
            allEp.forEach(item=>{
                let changeName = item.name.toLowerCase().includes(query);
                if(changeName === true)
                {
                   console.log('yes')
                   SpecialEp.push(item)
                   
                   
                }
                if(item.summary!=null){
                let S = item.summary.toLowerCase().includes(query);
                if(S===true)
                {
                    SpecialEp.push(item);
                }
            }
            
            })
            Length.textContent = "Displaying " +SpecialEp.length + "/" + allEp.length + "episodes";
            addEpisode(SpecialEp);
            creationButton();
    
        }
    })
    

    Select.addEventListener('change',()=>
    {
        let itemSelected = Select.options[Select.selectedIndex].getAttribute('value');
        console.log(itemSelected);
        allEp.forEach(item=>
            {
                if(item.id ==itemSelected )
                  {
                        selectedEP.push(item);
                        
                  }
            })
            Length.textContent = "Displaying " +selectedEP.length + "/" + allEp.length + "episodes";
        addEpisode(selectedEP);
        creationButton();
    
    })