let url = "https://api.tvmaze.com/shows/1/episodes"
let wrapper =document.querySelector('.wrapper')
let episodes=[];

function fetchEsipode()
{  
    fetch(url)
    .then(res=>res.json())
    .then(data=>

        {   
           data.map((item,index)=>{
            
            let epsiode = {
                id:item.id,
                name:item.name,
                season:item.season,
                number:item.number,
                summary:item.summary,
                image:item.image.medium
            }
            
            episodes.push(epsiode);
            
            
        })
        
        addEpisode(data);
        })
}

fetchEsipode(); 





function addEpisode(data)

{       
    
        data.map(item=>{
            // create a tags 

            
            let Div = document.createElement('div');
            Div.classList.add('wrapper_ep');
            let watch_now = document.createElement('div');
            let icon_w= document.createElement('span');
            let name_SE = document.createElement('div');
            let filmName= document.createElement('h3');
            let Summary = document.createElement('div');
            let desc = document.createElement('span');
            let Image = document.createElement('img');
            let SE = document.createElement('span');
            let newP = item.summary.substr(0,85);
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
            Image.setAttribute('src',item.image.original);

            // add a summary 
            Summary.classList.add('summary-F')
            desc.textContent="Description:"
            
            Summary.innerHTML= newP;
            Summary.classList.add('summary-F')
            desc.textContent="Description:"
            // section watch_now 
             icon_w.textContent="watch now "
            watch_now.classList.add('fade-watch');
            watch_now.appendChild(icon_w);
            // add to seation 
            name_SE.appendChild(filmName);
            name_SE.appendChild(SE);
            Div.appendChild(name_SE);
            Div.appendChild(Image)
            Div.appendChild(Summary);
            Div.appendChild(watch_now);
            wrapper.appendChild(Div);
            

         });   
    

         
}

/*document.onreadystatechange = function() {
    if (document.readyState !== "complete") {
        console.log("heel")
    }
    else
    {
        console.log('mariam');
        

    }

    

    */