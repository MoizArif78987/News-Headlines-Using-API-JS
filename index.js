//API key
//677cbe8590a1477dad89cad7be5d428f


let newsAccordion = document.getElementById('newsAccordian');

let slideshow=document.getElementById('slideshow');

//Creating an ajax get request
const xhr = new XMLHttpRequest();
xhr.open('POST', `https://newsapi.org/v2/top-headlines?country=us&apiKey=677cbe8590a1477dad89cad7be5d428f`, true);

xhr.onload = function () {
    if (this.status === 200) {
        let json = JSON.parse(this.responseText);
        let article = json.articles;
        let newsHTML="";
        let news='';

        slideshow_func(article);
        for (let i = 0; i < article.length; i++) {
            console.log(article[i]);
           
            news = `<div class="card">
            <div class="card-header">
                <h2 class="mb-0">
                    <button class="btn btn-link collapsed" type="button" data-bs-toggle="collapse"
                        data-bs-target="#collapse${i}" aria-expanded="false" aria-controls="collape${i}">
                       ${article[i].title}
                    </button>
                </h2>
            </div>
            <div class="collapse" id="collapse${i}" aria-labelledby="heading${i}" data-parent="#newsAccordian">
                <div class="card-body">
                ${article[i].description} <a href="${article[i].url}" target='_blank'>Read More about this<hr></a>
                
                <div class="card" style="width: 50rem;">
                <img src="${article[i].urlToImage}" alt="Trying to load the image">
                </div>
                </div>
            </div>
        </div>`
        newsHTML+=news;
        }
        newsAccordion.innerHTML=newsHTML;
        
    }
    else {
        console.log(`Error Occured error status: ${this.status} `);
    }
}

xhr.send();
// xhr.getResponseHeader('Content-type','application/json')




function slideshow_func(URLs)
{
    let picture='';
    let i=0;
    console.log(URLs[i].urlToImage);
    picture=`<div class="carousel-item active">
    <img src="${URLs[i].urlToImage}" class="d-block w-100" alt="Loading Image">
  </div>`;
    let nextBtn=document.getElementById('nextBtn');
    let prevBtn=document.getElementById('prevBtn');
    nextBtn.addEventListener('click',function(){
        if(i<URLs.length){
            i++;
        }
        else{
            i=0;
        }
        picture=`<div class="carousel-item active">
        <img src="${URLs[i].urlToImage}" class="d-block w-100" alt="Loading Image">
      </div>`;
    })
    prevBtn.addEventListener('click',function(){
        if(i==0)
        {
            i=(URLs.length)-1;
        }
        else{
            i--;
        }
        picture=`<div class="carousel-item active">
        <img src="${URLs[i].urlToImage}" class="d-block w-100" alt="Loading Image">
      </div>`;
    })
    slideshow.innerHTML=picture;
}