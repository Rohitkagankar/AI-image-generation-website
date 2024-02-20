const generateForm=document.querySelector(".generate-form");

const handleFormSubmission=(e) =>{
    e.preventDefault();
    
    //get user input and image quantity from the form
    const userPrompt =e.srcElement[0].value;
    const userImgQuantity = e.srcElement[1].value;

    //Creating HTML markup for image cards with loading state
    const imgCardMarkup = Array.from({length: userImgQuantity},()=>
        `<div class="img-card loading">
            <img src="./images/Spinner-1s-200px.gif" alt="">
            <a href="" class="download-btn">
                <img src="./images/downloading.png" alt="download icon">
            </a>
        </div>`
    ).join("");
    
    console.log(imgCardMarkup);
}


generateForm.addEventListener("submit",handleFormSubmission);