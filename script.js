const baseUrl = "https://www.anapioficeandfire.com/api/";
var buttonNum = 1;

const CreateScrollMenu = async () => {
    await fetch(baseUrl + "books")
    .then(res => res.json())
    .then(data => 
        {
                    // console.log("Total Data : " +data.length);
                    // console.log(data);
                    // var prevButton = document.createElement ("button");
                    // prevButton.innerHTML="<<";
                    // prevButton.setAttribute("id","prevButton");
                    // prevButton.setAttribute("class","prev-button");
                    // scrollBarDiv.append(prevButton);
                    for(var i=1;i<=data.length;i++)
                    {
                        var buttonScroll = document.createElement ("button");
                        var buttonScrollText = document.createElement ("span");
                        buttonScrollText.innerText = i;
                        buttonScroll.setAttribute("id","btnid"+i);
                        buttonScroll.setAttribute("class","nav-button");
                        buttonScroll.appendChild(buttonScrollText);
                        scrollBarDiv.appendChild(buttonScroll);
                    }
                    // var nextButton = document.createElement ("button");
                    // nextButton.innerHTML=">>";
                    // nextButton.setAttribute("id","nextButton");
                    // nextButton.setAttribute("class","next-button");
                    // scrollBarDiv.append(nextButton);
        })
    .catch((err) => {console.log(err);});
}





const getBookData = async (page) => {
    await fetch(baseUrl + "books?page=" + page + "&pageSize=1")
    .then(res => res.json())
    .then(data => 
        {   
            var contentDiv = document.createElement("div");
            contentDiv.setAttribute("id","content")
            //getBookData(1);
            mainContain.appendChild(contentDiv);
            var bname=data[0].name;
            var bisbn=data[0].isbn;
            var bnopages=data[0].numberOfPages;
            var bauthor=[];
            for (var i=0;i<data[0].authors.length;i++)
            {
                bauthor[i]=data[0].authors[i];
            }
            var bpublish=data[0].publisher;
            var breleasedate=Date.parse(data[0].released);
            
            
            console.log("Name : " + bname);
            console.log("ISBN : " + bisbn);
            console.log("Number of Pages : " + bnopages);
            console.log("Author : " + bauthor); 
            
            console.log("Publisher Name : " + bpublish);
            console.log("Release Date : "+ breleasedate);

            var bcharecters = [];

            //console.log("Characters : ")
            for(var j=0;j<5;j++)
            {
                var fetchURL = data[0].characters[j];   
                //console.log(fetchURL);
                var charecters = (async (fetchURL) => {
                    await fetch(fetchURL)
                    .then(res => res.json())
                    .then(data => 
                        {
                            bcharecters= data.name;
                            //console.log(data.name);
                            console.log(bcharecters);
                        })  
                    .catch((err) => {console.log("Error in Character Name Fetch : " + err)});
                })(fetchURL);
            }
           console.log("Charecters : ", + bcharecters);

            
           var dispTable = document.createElement("table");
           
           var tableBody = document.createElement("tbody");
           

            var tableRow1 = document.createElement("tr");
            var tabRow1Col1 = document.createElement("td");
            var tabRow1Col2 = document.createElement("td");
            var tabRow1Col1Text = document.createTextNode("Name");
            var tabRow1Col2Text = document.createTextNode(bname);
            tabRow1Col1.append(tabRow1Col1Text);
            tabRow1Col2.append(tabRow1Col2Text);
            tableRow1.append(tabRow1Col1,tabRow1Col2);

            var tableRow2 = document.createElement("tr");
            var tabRow2Col1 = document.createElement("td");
            var tabRow2Col2 = document.createElement("td");
            var tabRow2Col1Text = document.createTextNode("ISBN");
            var tabRow2Col2Text = document.createTextNode(bisbn);
            tabRow2Col1.append(tabRow2Col1Text);
            tabRow2Col2.append(tabRow2Col2Text);
            tableRow2.append(tabRow2Col1,tabRow2Col2);

            var tableRow3 = document.createElement("tr");
            var tabRow3Col1 = document.createElement("td");
            var tabRow3Col2 = document.createElement("td");
            var tabRow3Col1Text = document.createTextNode("Number of Pages");
            var tabRow3Col2Text = document.createTextNode(bnopages);
            tabRow3Col1.append(tabRow3Col1Text);
            tabRow3Col2.append(tabRow3Col2Text);
            tableRow3.append(tabRow3Col1,tabRow3Col2);

            var tableRow4 = document.createElement("tr");
            var tabRow4Col1 = document.createElement("td");
            var tabRow4Col2 = document.createElement("td");
            var tabRow4Col1Text = document.createTextNode("Author");
            var tabRow4Col2Text = document.createTextNode(bauthor);
            tabRow4Col1.append(tabRow4Col1Text);
            tabRow4Col2.append(tabRow4Col2Text);
            tableRow4.append(tabRow4Col1,tabRow4Col2);

            var tableRow5 = document.createElement("tr");
            var tabRow5Col1 = document.createElement("td");
            var tabRow5Col2 = document.createElement("td");
            var tabRow5Col1Text = document.createTextNode("Publisher Name");
            var tabRow5Col2Text = document.createTextNode(bpublish);
            tabRow5Col1.append(tabRow5Col1Text);
            tabRow5Col2.append(tabRow5Col2Text);
            tableRow5.append(tabRow5Col1,tabRow5Col2);
            
            var tableRow6 = document.createElement("tr");
            var tabRow6Col1 = document.createElement("td");
            var tabRow6Col2 = document.createElement("td");
            var tabRow6Col1Text = document.createTextNode("Release Date");
            var tabRow6Col2Text = document.createTextNode(breleasedate);
            tabRow6Col1.append(tabRow6Col1Text);
            tabRow6Col2.append(tabRow6Col2Text);
            tableRow6.append(tabRow6Col1,tabRow6Col2);

            var tableRow7 = document.createElement("tr");
            var tabRow7Col1 = document.createElement("td");
            var tabRow7Col2 = document.createElement("td");
            var tabRow7Col1Text = document.createTextNode("Charecters");
            var tabRow7Col2Text = document.createTextNode(bcharecters);
            tabRow7Col1.append(tabRow7Col1Text);
            tabRow7Col2.append(tabRow7Col2Text);
            tableRow7.append(tabRow7Col1,tabRow7Col2);
            
            tableBody.append(tableRow1,tableRow2,tableRow3,tableRow4,tableRow5,tableRow6,tableRow7);
            dispTable.append(tableBody);
            contentDiv.append(dispTable);
        })
    .catch((err) => {console.log("Error in Table Display : " + err);});
};
//getBooksData();
//getBookData(7);
getBookData(buttonNum);
var mainContain = document.createElement("div");
mainContain.setAttribute("id","main-container");
document.body.append(mainContain);

var pageHeading = document.createElement("h1");
pageHeading.innerText="Book Search Portal";
mainContain.append(pageHeading);

var pageSubHeading = document.createElement("h2");
pageSubHeading.innerText = "Click on the corresponding numbers to view details about the book";
mainContain.append(pageSubHeading);

var scrollBarDiv = document.createElement("div");
scrollBarDiv.setAttribute("id","scrollMenu");
CreateScrollMenu();
mainContain.append(scrollBarDiv);

//document.getElementById("btnid1").addEventListener('click', () => getBookData(1));




var eventListen = document.addEventListener('click',function(e){
    
    if(e.target.classList.contains('nav-button'))
    {
            buttonNum=e.target.innerText;
            //alert(buttonNum);
            console.log(buttonNum);
            getBookData(buttonNum);
    }
})

// var prevButtonListen = document.addEventListener('click',function(e){
//     if(e.target.classList.contains('prev-button'))
//     {
//         if(buttonNum>1)
//         {
//             buttonNum = parstInt(buttonNum) - 1;
//             getBookData(buttonNum);
//         }
//         else
//         {
//             alert("No Previous Pages");
//         }
//     }
// });

// var nextButtonListen = document.addEventListener('click',function(e){
//     if(e.target.classList.contains('next-button'))
//     {   
//         const TotalPages = async () => {
//             await fetch(baseUrl + "books")
//             .then(res => res.json())
//             .then(data => 
//                 {
//                     alert(data.length);
//                     if(buttonNum<data.length)
//                     {
//                         buttonNum = parseInt(buttonNum) + 1;
//                         getBookData(buttonNum);
//                     }
//                     else
//                     {
//                         alert("This is the last page!");
//                     }
//                 }
//             )
//             .catch ((ex) => {console.log(ex)});
//         }
//     }
// });