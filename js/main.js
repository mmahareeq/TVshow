let url = "https://api.tvmaze.com/shows/10/episodes"
let wrapper =document.querySelector('.wrapper');
let showList = document.querySelector('#shows');
let Page = document.querySelector('.pages');
let pre = document.querySelector('.previous');
let next = document.querySelector('.next');
let perPage = 10 ;
let p=1;
let totalPages  ;
let countern = 1;

 let shows;
shows=[];
let episodes=[];

let special = [] ;


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
                image:{original:item.image.original},
            }
            
            episodes.push(epsiode);
            
            
        })
        console.log(data)
        page();
        let start = (p -1 )* perPage;
        let end = start + perPage;
        addEpisode(data.slice(start,end));
        //addEpisode(data);
         
        
        })
    .catch(error=>window.alert(error));   
}

fetchEsipode(); 





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
            let readMore = document.createElement('a');
            let newP = item.summary.substr(0,200);

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
            Summary.innerHTML= newP;
            Summary.classList.add('summary-F');
            readMore.className="link-summary";
            readMore.textContent="Read More";

            Summary.appendChild(readMore);
            // section watch_now 
            watchBtn.textContent="Watch now";
            watchBtn.setAttribute('href',item.url);
            // add to seation 
            name_SE.appendChild(filmName);
            name_SE.appendChild(SE);
            Div.appendChild(name_SE);
            Div.appendChild(Image)
            Div.appendChild(Summary);
            Div.appendChild(watchBtn);
            wrapper.appendChild(Div);
            

         });
         

         special=[];
}
function page(){
    totalPages = Math.ceil(episodes.length/perPage)+1;

    for (let i=0; i<10; i++) {   
        let btnn = document.createElement('button');
        let afterBtn = document.querySelector('after');
        btnn.classList.add('btn');
        btnn.id="item"+(i+1);
        if(i==0){
        btnn.classList.add('btn-primary')
        }
        btnn.textContent=i+1;
        
        Page.append(btnn);
        

    }
}
pre.addEventListener('click',()=>
{
    countern--
    p--;
    console.log(countern);
  if(countern ===11)
  
  {   
      document.querySelector(`#item${p+1}`).classList.remove('btn-primary');
      
      for(let i =0 ; i < Page.children.length;i++)
      {
           console.log(Page.children[i].innerHTML)
           Page.children[i].id="item"+(parseInt(Page.children[i].innerHTML) -10);
           Page.children[i].textContent =parseInt(Page.children[i].innerHTML) -10 ;
           if(i==0)
           {  
              Page.children[i].classList.add('btn-primary');
              
           }
      }
      let start = (p +1 )* perPage;
      let end = start + perPage;
      addEpisode(episodes.slice(start,end));
      countern=1;
      
  }else if((p)===(totalPages))
  {
      //console.log(document.querySelector(`#item${p}`).nextSibling.innerHTML);

      for(let i = 10 ; i >= countern ; i--)
      {
          Page.children[i-1].remove();
          next.remove();
      }
  }
  else{
  
  
  console.log(`p=${p}`)
  let h = document.querySelector(`#item${p+1}`);
  h.classList.remove('btn-primary');
  
  let new1 = document.querySelector(`#item${p}`);
  new1.classList.add('btn-primary');
  let start = (p -1 )* perPage;
  let end = start + perPage;
  addEpisode(episodes.slice(start,end));
  console.log(episodes.length)

  }
})
 next.addEventListener('click',()=>
{     countern++;
      p++;
      console.log(countern);
    if(countern ===11)
    
    {   
        document.querySelector(`#item${p-1}`).classList.remove('btn-primary');
        
        for(let i =0 ; i < Page.children.length;i++)
        {
             console.log(Page.children[i].innerHTML)
             Page.children[i].id="item"+(parseInt(Page.children[i].innerHTML) +10);
             Page.children[i].textContent =parseInt(Page.children[i].innerHTML) +10 ;
             if(i==0)
             {  
                Page.children[i].classList.add('btn-primary');
                
             }
        }
        let start = (p -1 )* perPage;
        let end = start + perPage;
        addEpisode(episodes.slice(start,end));
        countern=1;
        
    }else if((p)===(totalPages))
    {
        //console.log(document.querySelector(`#item${p}`).nextSibling.innerHTML);

        for(let i = 10 ; i >= countern ; i--)
        {
            Page.children[i-1].remove();
            next.remove();
        }
    }
    else{
    
    
    console.log(`p=${p}`)
    let h = document.querySelector(`#item${p-1}`);
    h.classList.remove('btn-primary');
    
    let new1 = document.querySelector(`#item${p}`);
    new1.classList.add('btn-primary');
    let start = (p -1 )* perPage;
    let end = start + perPage;
    addEpisode(episodes.slice(start,end));
    console.log(episodes.length)

    }
   
   
   
})
shows=getAllShows();
shows.sort((a, b) => {
    let fa = a.name.toLowerCase(),
        fb = b.name.toLowerCase();

    if (fa < fb) {
        return -1;
    }
    if (fa > fb) {
        return 1;
    }
    return 0;
});
shows.forEach((item)=>
{
    let list = document.createElement('option');
    list.value=item.id;
    
    list.textContent=item.name;
    
    showList.appendChild(list);
})
